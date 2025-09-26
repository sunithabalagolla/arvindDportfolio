const express = require('express');
const router = express.Router();

// Import controllers
const {
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
} = require('../controllers/authController');

// Import middleware
const {
    authenticate,
    requireVerified,
    verifyRefreshToken,
    logUserActivity,
    checkTokenExpiry,
    revokeToken
} = require('../middleware/auth');

const {
    validateRegistration,
    validateLogin,
    validatePasswordReset,
    validateProfileUpdate,
    validatePasswordChange,
    validateOTPRequest,
    sanitizeInput
} = require('../middleware/validation');

// Apply sanitization to all routes
router.use(sanitizeInput);

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post('/register', validateRegistration, registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Login user with email and password  
 * @access  Public
 */
router.post('/login', validateLogin, loginUser);

/**
 * @route   POST /api/auth/login-otp
 * @desc    Request OTP for passwordless login
 * @access  Public
 */
router.post('/login-otp', validateOTPRequest, loginWithOTP);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token using refresh token
 * @access  Private (requires refresh token)
 */
router.post('/refresh', verifyRefreshToken, refreshToken);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (invalidate tokens)
 * @access  Private
 */
router.post('/logout', 
    authenticate, 
    logUserActivity('logout'),
    revokeToken, 
    logoutUser
);

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', 
    authenticate, 
    checkTokenExpiry,
    logUserActivity('get-profile'),
    getUserProfile
);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', 
    authenticate,
    requireVerified,
    validateProfileUpdate,
    logUserActivity('update-profile'),
    updateUserProfile
);

/**
 * @route   PUT /api/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
router.put('/change-password', 
    authenticate,
    requireVerified,
    validatePasswordChange,
    logUserActivity('change-password'),
    changePassword
);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Request password reset OTP
 * @access  Public
 */
router.post('/forgot-password', validateOTPRequest, forgotPassword);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password using OTP
 * @access  Public
 */
router.post('/reset-password', validatePasswordReset, resetPassword);

/**
 * @route   GET /api/auth/verify-token
 * @desc    Verify if token is still valid
 * @access  Private
 */
router.get('/verify-token', authenticate, checkTokenExpiry, (req, res) => {
    res.json({
        success: true,
        message: 'Token is valid',
        data: {
            user: {
                id: req.user._id,
                email: req.user.email,
                firstName: req.user.firstName,
                isVerified: req.user.isVerified,
                role: req.user.role
            },
            tokenValid: true
        }
    });
});

module.exports = router;