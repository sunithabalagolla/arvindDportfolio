const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to authenticate user using JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const authenticate = async (req, res, next) => {
    try {
        // Get token from header
        let token = req.header('Authorization');
        
        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }
        
        // Remove 'Bearer ' from token if present
        if (token.startsWith('Bearer ')) {
            token = token.slice(7);
        }
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by ID from token
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. User not found.'
            });
        }
        
        // Check if user account is verified
        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: 'Account not verified. Please verify your email first.'
            });
        }
        
        // Check if account is locked
        if (user.isLocked) {
            return res.status(423).json({
                success: false,
                message: 'Account temporarily locked. Please try again later.'
            });
        }
        
        // Add user to request object
        req.user = user;
        req.token = token;
        
        console.log(`✅ Authenticated user: ${user.email} (${user.firstName})`);
        
        next();
        
    } catch (error) {
        console.error('❌ Authentication error:', error.message);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token format.'
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired. Please login again.'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Authentication failed. Please try again.'
        });
    }
};

/**
 * Optional authentication - doesn't fail if no token is provided
 * But if token is provided, it must be valid
 */
const optionalAuth = async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        
        // If no token provided, continue without authentication
        if (!token) {
            req.user = null;
            return next();
        }
        
        // Remove 'Bearer ' from token if present
        if (token.startsWith('Bearer ')) {
            token = token.slice(7);
        }
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user
        const user = await User.findById(decoded.id).select('-password');
        
        if (user && user.isVerified && !user.isLocked) {
            req.user = user;
            req.token = token;
        } else {
            req.user = null;
        }
        
        next();
        
    } catch (error) {
        // If token is invalid, continue without authentication
        req.user = null;
        next();
    }
};

/**
 * Middleware to check if user has admin role
 */
const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required.'
        });
    }
    
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Admin access required.'
        });
    }
    
    console.log(`🔐 Admin access granted: ${req.user.email}`);
    next();
};

/**
 * Middleware to check if user can access their own resources or is admin
 */
const requireOwnershipOrAdmin = (userIdParam = 'userId') => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required.'
            });
        }
        
        const targetUserId = req.params[userIdParam];
        
        // Allow if user is admin or accessing their own resource
        if (req.user.role === 'admin' || req.user._id.toString() === targetUserId) {
            next();
        } else {
            res.status(403).json({
                success: false,
                message: 'Access denied. You can only access your own resources.'
            });
        }
    };
};

/**
 * Middleware to generate JWT token for user
 * @param {Object} user - User object
 * @param {string} expiresIn - Token expiration time
 * @returns {string} JWT token
 */
const generateToken = (user, expiresIn = null) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
    };
    
    const options = {
        expiresIn: expiresIn || process.env.JWT_EXPIRES_IN || '7d'
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

/**
 * Middleware to generate refresh token
 * @param {Object} user - User object
 * @returns {string} Refresh token
 */
const generateRefreshToken = (user) => {
    const payload = {
        id: user._id,
        type: 'refresh'
    };
    
    const options = {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

/**
 * Middleware to verify refresh token
 */
const verifyRefreshToken = async (req, res, next) => {
    try {
        let token = req.body.refreshToken || req.header('X-Refresh-Token');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Refresh token required.'
            });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.type !== 'refresh') {
            return res.status(401).json({
                success: false,
                message: 'Invalid refresh token type.'
            });
        }
        
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user || !user.isVerified) {
            return res.status(401).json({
                success: false,
                message: 'Invalid refresh token.'
            });
        }
        
        req.user = user;
        req.refreshToken = token;
        
        next();
        
    } catch (error) {
        console.error('❌ Refresh token verification error:', error.message);
        
        res.status(401).json({
            success: false,
            message: 'Invalid refresh token.'
        });
    }
};

/**
 * Middleware to check if user is verified
 */
const requireVerified = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required.'
        });
    }
    
    if (!req.user.isVerified) {
        return res.status(403).json({
            success: false,
            message: 'Email verification required. Please verify your email first.'
        });
    }
    
    next();
};

/**
 * Middleware to extract user info from token without requiring authentication
 * Useful for optional authentication scenarios
 */
const extractUserInfo = async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        
        if (token && token.startsWith('Bearer ')) {
            token = token.slice(7);
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select('-password');
            
            if (user) {
                req.userInfo = {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    role: user.role,
                    isVerified: user.isVerified
                };
            }
        }
        
        next();
        
    } catch (error) {
        // Continue without user info if token is invalid
        next();
    }
};

/**
 * Middleware to log user activity
 */
const logUserActivity = (action = 'unknown') => {
    return (req, res, next) => {
        if (req.user) {
            console.log(` User Activity: ${req.user.email} performed "${action}" at ${new Date().toISOString()}`);
            
            // Here you could save to database for audit trails
            // Example: UserActivity.create({ userId: req.user._id, action, timestamp: new Date(), ip: req.ip });
        }
        
        next();
    };
};

/**
 * Middleware to check token expiry and warn if close to expiring
 */
const checkTokenExpiry = (req, res, next) => {
    if (req.token) {
        try {
            const decoded = jwt.decode(req.token);
            const now = Math.floor(Date.now() / 1000);
            const timeUntilExpiry = decoded.exp - now;
            
            // Warn if token expires in less than 1 hour
            if (timeUntilExpiry < 3600) {
                res.set('X-Token-Warning', 'Token expires soon');
                console.log(`⚠️ Token for ${req.user.email} expires in ${Math.floor(timeUntilExpiry / 60)} minutes`);
            }
        } catch (error) {
            // Continue if we can't decode token
        }
    }
    
    next();
};

/**
 * Middleware to revoke token (for logout)
 */
const revokeToken = async (req, res, next) => {
    try {
        // In a production app, you'd typically add the token to a blacklist
        // For now, we'll just log the logout
        if (req.user && req.token) {
            console.log(`🚪 User logged out: ${req.user.email} at ${new Date().toISOString()}`);
            
            // Update user's last login (optional)
            await User.findByIdAndUpdate(req.user._id, {
                lastLogin: new Date()
            });
        }
        
        next();
        
    } catch (error) {
        console.error('❌ Error during token revocation:', error.message);
        next(); // Continue even if logging fails
    }
};

module.exports = {
    authenticate,
    optionalAuth,
    requireAdmin,
    requireOwnershipOrAdmin,
    requireVerified,
    generateToken,
    generateRefreshToken,
    verifyRefreshToken,
    extractUserInfo,
    logUserActivity,
    checkTokenExpiry,
    revokeToken
};

// This authentication middleware includes:
// ✅ JWT token verification with proper error handling
// ✅ User authentication with account status checks
// ✅ Role-based access control (admin, user)
// ✅ Ownership verification for resource access
// ✅ Refresh token support for secure token renewal
// ✅ Optional authentication for flexible endpoints
// ✅ Token expiry warnings and activity logging
// ✅ Account verification checks and security features