const bcrypt = require('bcryptjs');
const User = require('../models/User');
const OTP = require('../models/OTP');
const { generateToken, generateRefreshToken } = require('../middleware/auth');
const { sendOTPEmail, sendWelcomeEmail } = require('../utils/sendEmail');
const { generateOTPWithLogging } = require('../utils/generateOTP');

/**
 * Register new user
 * @route POST /api/auth/register
 * @access Public
 */
const registerUser = async (req, res) => {
    try {
        const { firstName, email, password } = req.body;
        
        console.log(`👤 Registration attempt for: ${email}`);
        
        // Check if user already exists (double check)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }
        
        // Create new user (password will be hashed by pre-save middleware)
        const user = new User({
            firstName,
            email,
            password,
            isVerified: false // User needs to verify email first
        });
        
        await user.save();
        console.log(`✅ User created: ${user.email} (ID: ${user._id})`);
        
        // Generate and send OTP for email verification
        const otpCode = generateOTPWithLogging('signup', email);
        
        // Create OTP record
        await OTP.createOTP(
            email, 
            'signup', 
            req.ip || req.connection.remoteAddress,
            req.get('User-Agent')
        );
        
        // Send OTP email
        await sendOTPEmail(email, otpCode, 'signup', firstName);
        
        console.log(`📧 Registration OTP sent to: ${email}`);
        
        res.status(201).json({
            success: true,
            message: 'Registration successful! Please check your email for verification code.',
            data: {
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    email: user.email,
                    isVerified: user.isVerified,
                    createdAt: user.createdAt
                },
                otpSent: true,
                expiresIn: parseInt(process.env.OTP_EXPIRES_IN) || 10
            }
        });
        
    } catch (error) {
        console.error('❌ Registration error:', error.message);
        
        // Handle specific MongoDB errors
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Email is already registered'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again.',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
};

/**
 * Login user with email and password
 * @route POST /api/auth/login
 * @access Public
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log(`🔐 Login attempt for: ${email}`);
        
        // Find user by credentials (uses static method with login attempt tracking)
        const user = await User.findByCredentials(email, password);
        
        // Check if user is verified
        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: 'Please verify your email before logging in',
                requiresVerification: true,
                email: user.email
            });
        }
        
        // Generate tokens
        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);
        
        console.log(`✅ User logged in: ${user.email}`);
        
        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    email: user.email,
                    isVerified: user.isVerified,
                    role: user.role,
                    lastLogin: user.lastLogin,
                    createdAt: user.createdAt
                },
                token,
                refreshToken,
                expiresIn: process.env.JWT_EXPIRES_IN || '7d'
            }
        });
        
    } catch (error) {
        console.error('❌ Login error:', error.message);
        
        // Handle specific authentication errors
        if (error.message.includes('Invalid credentials')) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        
        if (error.message.includes('Account temporarily locked')) {
            return res.status(423).json({
                success: false,
                message: 'Account temporarily locked due to too many failed login attempts. Please try again later.'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Login failed. Please try again.',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
};

/**
 * Login user with email and OTP
 * @route POST /api/auth/login-otp
 * @access Public
 */
const loginWithOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        console.log(`📱 OTP login request for: ${email}`);
        
        // Check if user exists and is verified
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: 'Please verify your email first'
            });
        }
        
        // Check rate limiting for OTP requests
        const canRequest = await OTP.canRequestNewOTP(email, 'login');
        if (!canRequest.canRequest) {
            return res.status(429).json({
                success: false,
                message: canRequest.message,
                waitTime: canRequest.waitTime
            });
        }
        
        // Generate and send OTP for login
        const otpCode = generateOTPWithLogging('login', email);
        
        await OTP.createOTP(
            email, 
            'login', 
            req.ip || req.connection.remoteAddress,
            req.get('User-Agent')
        );
        
        // Send OTP email
        await sendOTPEmail(email, otpCode, 'login', user.firstName);
        
        console.log(`📧 Login OTP sent to: ${email}`);
        
        res.json({
            success: true,
            message: 'OTP sent to your email. Please check your inbox.',
            data: {
                email,
                otpSent: true,
                expiresIn: parseInt(process.env.OTP_EXPIRES_IN) || 10,
                purpose: 'login'
            }
        });
        
    } catch (error) {
        console.error('❌ OTP login request error:', error.message);
        
        res.status(500).json({
            success: false,
            message: 'Failed to send login OTP. Please try again.',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
};

/**
 * Refresh access token
 * @route POST /api/auth/refresh
 * @access Private (requires refresh token)
 */
const refreshToken = async (req, res) => {
    try {
        const user = req.user; // Set by verifyRefreshToken middleware
        
        console.log(`🔄 Token refresh for: ${user.email}`);
        
        // Generate new access token
        const newToken = generateToken(user);
        
        res.json({
            success: true,
            message: 'Token refreshed successfully',
            data: {
                token: newToken,
                expiresIn: process.env.JWT_EXPIRES_IN || '7d'
            }
        });
        
    } catch (error) {
        console.error('❌ Token refresh error:', error.message);
        
        res.status(500).json({
            success: false,
            message: 'Token refresh failed. Please login again.'
        });
    }
};

/**
 * Logout user
 * @route POST /api/auth/logout
 * @access Private
 */
const logoutUser = async (req, res) => {
    try {
        // The revokeToken middleware handles the actual logout logic
        console.log(`🚪 User logout: ${req.user.email}`);
        
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
        
    } catch (error) {
        console.error('❌ Logout error:', error.message);
        
        res.status(500).json({
            success: false,
            message: 'Logout failed'
        });
    }
};

/**
 * Get current user profile
 * @route GET /api/auth/profile
 * @access Private
 */
const getUserProfile = async (req, res) => {
    try {
        const user = req.user;
        
        console.log(`👤 Profile request for: ${user.email}`);
        
        res.json({
            success: true,
            message: 'Profile retrieved successfully',
            data: {
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    email: user.email,
                    isVerified: user.isVerified,
                    role: user.role,
                    profileImage: user.profileImage,
                    lastLogin: user.lastLogin,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            }
        });
        
    } catch (error) {
        console.error('❌ Get profile error:', error.message);
        
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve profile'
        });
    }
};

/**
 * Update user profile
 * @route PUT /api/auth/profile
 * @access Private
 */
const updateUserProfile = async (req, res) => {
    try {
        const { firstName } = req.body;
        const user = req.user;
        
        console.log(`✏️ Profile update for: ${user.email}`);
        
        // Update allowed fields
        const updateData = {};
        if (firstName !== undefined) updateData.firstName = firstName;
        
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');
        
        console.log(`✅ Profile updated for: ${updatedUser.email}`);
        
        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                user: updatedUser
            }
        });
        
    } catch (error) {
        console.error('❌ Profile update error:', error.message);
        
        res.status(500).json({
            success: false,
            message: 'Profile update failed',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
};

/**
 * Change user password
 * @route PUT /api/auth/change-password
 * @access Private
 */
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = req.user;
        
        console.log(`🔒 Password change request for: ${user.email}`);
        
        // Get user with password
        const userWithPassword = await User.findById(user._id).select('+password');
        
        // Verify current password
        const isCurrentPasswordValid = await userWithPassword.comparePassword(currentPassword);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }
        
        // Update password (will be hashed by pre-save middleware)
        userWithPassword.password = newPassword;
        await userWithPassword.save();
        
        console.log(`✅ Password changed for: ${user.email}`);
        
        res.json({
            success: true,
            message: 'Password changed successfully'
        });
        
    } catch (error) {
        console.error('❌ Password change error:', error.message);
        
        res.status(500).json({
            success: false,
            message: 'Password change failed',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
};

/**
 * Request password reset
 * @route POST /api/auth/forgot-password
 * @access Public
 */
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        console.log(`🔑 Password reset request for: ${email}`);
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            // Don't reveal if email exists or not for security
            return res.json({
                success: true,
                message: 'If an account with that email exists, a password reset code has been sent.'
            });
        }
        
        // Check rate limiting
        const canRequest = await OTP.canRequestNewOTP(email, 'password-reset');
        if (!canRequest.canRequest) {
            return res.status(429).json({
                success: false,
                message: canRequest.message,
                waitTime: canRequest.waitTime
            });
        }
        
        // Generate and send OTP for password reset
        const otpCode = generateOTPWithLogging('password-reset', email);
        
        await OTP.createOTP(
            email, 
            'password-reset', 
            req.ip || req.connection.remoteAddress,
            req.get('User-Agent')
        );
        
        // Send password reset email
        await sendOTPEmail(email, otpCode, 'password-reset', user.firstName);
        
        console.log(`📧 Password reset OTP sent to: ${email}`);
        
        res.json({
            success: true,
            message: 'Password reset code sent to your email',
            data: {
                email,
                expiresIn: parseInt(process.env.OTP_EXPIRES_IN) || 10
            }
        });
        
    } catch (error) {
        console.error('❌ Forgot password error:', error.message);
        
        res.status(500).json({
            success: false,
            message: 'Failed to send password reset code. Please try again.'
        });
    }
};

/**
 * Reset password with OTP
 * @route POST /api/auth/reset-password
 * @access Public
 */
const resetPassword = async (req, res) => {
    try {
        const { email, otpCode, newPassword } = req.body;
        
        console.log(`🔄 Password reset attempt for: ${email}`);
        
        // Verify OTP
        const otpResult = await OTP.verifyOTP(email, otpCode, 'password-reset', req.ip);
        
        if (!otpResult.success) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP code'
            });
        }
        
        // Find user and update password
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Update password (will be hashed by pre-save middleware)
        user.password = newPassword;
        await user.save();
        
        // Reset login attempts if any
        if (user.loginAttempts > 0) {
            await user.resetLoginAttempts();
        }
        
        console.log(`✅ Password reset successful for: ${email}`);
        
        res.json({
            success: true,
            message: 'Password reset successful. You can now login with your new password.'
        });
        
    } catch (error) {
        console.error('❌ Password reset error:', error.message);
        
        res.status(500).json({
            success: false,
            message: 'Password reset failed. Please try again.',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    loginWithOTP,
    refreshToken,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    changePassword,
    forgotPassword,
    resetPassword
};

// This auth controller includes:
// ✅ User registration with email verification
// ✅ Login with password and account security
// ✅ Login with OTP (passwordless)
// ✅ Token refresh functionality
// ✅ Profile management (get/update)
// ✅ Password change with current password verification
// ✅ Password reset with OTP verification
// ✅ Comprehensive error handling and logging
// ✅ Rate limiting and security features