const { body, validationResult, param, query } = require('express-validator');
const User = require('../models/User');
const { isValidEmail } = require('../utils/sendEmail');

/**
 * Handle validation errors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(error => ({
            field: error.path || error.param,
            message: error.msg,
            value: error.value
        }));
        
        console.log('❌ Validation errors:', formattedErrors);
        
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: formattedErrors
        });
    }
    
    next();
};

/**
 * Validation rules for user registration
 */
const validateRegistration = [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s'-]+$/)
        .withMessage('First name can only contain letters, spaces, hyphens, and apostrophes')
        .escape(), // Sanitize HTML

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail()
        .isLength({ max: 255 })
        .withMessage('Email cannot exceed 255 characters')
        .custom(async (email) => {
            // Additional email validation
            if (!isValidEmail(email)) {
                throw new Error('Invalid email format');
            }
            
            // Check if email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email is already registered');
            }
            
            // Check for disposable email domains (optional)
            const disposableDomains = [
                '10minutemail.com',
                'guerrillamail.com',
                'mailinator.com',
                'tempmail.org'
            ];
            
            const emailDomain = email.split('@')[1];
            if (disposableDomains.includes(emailDomain)) {
                throw new Error('Please use a permanent email address');
            }
            
            return true;
        }),

    body('password')
        .isLength({ min: 6, max: 128 })
        .withMessage('Password must be between 6 and 128 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number')
        .custom((password) => {
            // Check for common weak passwords
            const weakPasswords = [
                'password',
                '123456',
                'password123',
                'admin',
                'qwerty',
                'letmein'
            ];
            
            if (weakPasswords.includes(password.toLowerCase())) {
                throw new Error('Password is too common. Please choose a stronger password');
            }
            
            // Check for repeated characters
            if (/(.)\1{2,}/.test(password)) {
                throw new Error('Password cannot contain more than 2 repeated characters in a row');
            }
            
            return true;
        }),

    body('agree')
        .isBoolean()
        .withMessage('Agreement field must be a boolean')
        .custom((agree) => {
            if (agree !== true) {
                throw new Error('You must agree to the Terms of Service and Privacy Policy');
            }
            return true;
        }),

    handleValidationErrors
];

/**
 * Validation rules for user login
 */
const validateLogin = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 1, max: 128 })
        .withMessage('Password cannot be empty or exceed 128 characters'),

    handleValidationErrors
];

/**
 * Validation rules for OTP verification
 */
const validateOTPVerification = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('otpCode')
        .trim()
        .notEmpty()
        .withMessage('OTP code is required')
        .isLength({ min: 4, max: 8 })
        .withMessage('OTP code must be between 4 and 8 characters')
        .matches(/^[0-9A-Z]+$/)
        .withMessage('OTP code can only contain numbers and uppercase letters'),

    body('purpose')
        .optional()
        .trim()
        .isIn(['signup', 'login', 'password-reset', 'email-change'])
        .withMessage('Invalid OTP purpose'),

    handleValidationErrors
];

/**
 * Validation rules for OTP request
 */
const validateOTPRequest = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('purpose')
        .optional()
        .trim()
        .isIn(['signup', 'login', 'password-reset', 'email-change'])
        .withMessage('Invalid OTP purpose'),

    handleValidationErrors
];

/**
 * Validation rules for password reset
 */
const validatePasswordReset = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('otpCode')
        .trim()
        .notEmpty()
        .withMessage('OTP code is required')
        .isLength({ min: 4, max: 8 })
        .withMessage('OTP code must be between 4 and 8 characters'),

    body('newPassword')
        .isLength({ min: 6, max: 128 })
        .withMessage('New password must be between 6 and 128 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number'),

    handleValidationErrors
];

/**
 * Validation rules for profile update
 */
const validateProfileUpdate = [
    body('firstName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s'-]+$/)
        .withMessage('First name can only contain letters, spaces, hyphens, and apostrophes')
        .escape(),

    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail()
        .custom(async (email, { req }) => {
            if (email) {
                const existingUser = await User.findOne({ 
                    email, 
                    _id: { $ne: req.user._id } 
                });
                
                if (existingUser) {
                    throw new Error('Email is already in use by another account');
                }
            }
            return true;
        }),

    handleValidationErrors
];

/**
 * Validation rules for password change
 */
const validatePasswordChange = [
    body('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),

    body('newPassword')
        .isLength({ min: 6, max: 128 })
        .withMessage('New password must be between 6 and 128 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number')
        .custom((newPassword, { req }) => {
            if (newPassword === req.body.currentPassword) {
                throw new Error('New password must be different from current password');
            }
            return true;
        }),

    body('confirmPassword')
        .custom((confirmPassword, { req }) => {
            if (confirmPassword !== req.body.newPassword) {
                throw new Error('Password confirmation does not match new password');
            }
            return true;
        }),

    handleValidationErrors
];

/**
 * Validation rules for email parameters
 */
const validateEmailParam = [
    param('email')
        .isEmail()
        .withMessage('Invalid email format in URL parameter')
        .normalizeEmail(),

    handleValidationErrors
];

/**
 * Validation rules for user ID parameters
 */
const validateUserIdParam = [
    param('userId')
        .isMongoId()
        .withMessage('Invalid user ID format'),

    handleValidationErrors
];

/**
 * Validation rules for pagination queries
 */
const validatePaginationQuery = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),

    query('sort')
        .optional()
        .isIn(['createdAt', '-createdAt', 'firstName', '-firstName', 'email', '-email'])
        .withMessage('Invalid sort field'),

    handleValidationErrors
];

/**
 * Custom sanitization middleware
 */
const sanitizeInput = (req, res, next) => {
    // Remove any null bytes from all string inputs
    const sanitizeValue = (value) => {
        if (typeof value === 'string') {
            return value.replace(/\0/g, '');
        }
        if (typeof value === 'object' && value !== null) {
            for (const key in value) {
                value[key] = sanitizeValue(value[key]);
            }
        }
        return value;
    };

    req.body = sanitizeValue(req.body);
    req.query = sanitizeValue(req.query);
    req.params = sanitizeValue(req.params);

    next();
};

/**
 * Rate limiting validation
 */
const validateRateLimit = (req, res, next) => {
    // This is typically handled by express-rate-limit middleware
    // But we can add custom validation here if needed
    const userAgent = req.get('User-Agent');
    const ip = req.ip || req.connection.remoteAddress;

    // Block suspicious user agents
    const suspiciousAgents = [
        'curl',
        'wget',
        'python-requests',
        'node-fetch'
    ];

    if (userAgent && suspiciousAgents.some(agent => 
        userAgent.toLowerCase().includes(agent)
    )) {
        console.log(`🚫 Blocked suspicious user agent: ${userAgent} from IP: ${ip}`);
        return res.status(403).json({
            success: false,
            message: 'Access denied'
        });
    }

    next();
};

module.exports = {
    validateRegistration,
    validateLogin,
    validateOTPVerification,
    validateOTPRequest,
    validatePasswordReset,
    validateProfileUpdate,
    validatePasswordChange,
    validateEmailParam,
    validateUserIdParam,
    validatePaginationQuery,
    handleValidationErrors,
    sanitizeInput,
    validateRateLimit
};

// This validation middleware includes:
// ✅ Registration validation with strong password rules
// ✅ Email validation with duplicate checking and disposable email blocking
// ✅ OTP validation for verification and requests
// ✅ Security features like input sanitization and suspicious user agent blocking
// ✅ Profile update validation with email uniqueness check
// ✅ Password change validation with confirmation matching
// ✅ Parameter validation for URLs and queries
// ✅ Detailed error messages with field-specific feedback