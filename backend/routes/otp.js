const express = require('express');
const router = express.Router();

// Import controllers
const {
    verifyOTP,
    resendOTP,
    getOTPStatus,
    cleanupOTPs,
    getOTPStats
} = require('../controllers/otpController');

// Import middleware
const {
    authenticate,
    requireAdmin,
    logUserActivity
} = require('../middleware/auth');

const {
    validateOTPVerification,
    validateOTPRequest,
    validateEmailParam,
    sanitizeInput
} = require('../middleware/validation');

// Apply sanitization to all routes
router.use(sanitizeInput);

/**
 * @route   POST /api/otp/verify
 * @desc    Verify OTP code
 * @access  Public
 */
router.post('/verify', validateOTPVerification, verifyOTP);

/**
 * @route   POST /api/otp/resend
 * @desc    Resend OTP to email
 * @access  Public
 */
router.post('/resend', validateOTPRequest, resendOTP);

/**
 * @route   GET /api/otp/status/:email
 * @desc    Get OTP status for email (Development only)
 * @access  Public (Development only)
 */
router.get('/status/:email', 
    validateEmailParam,
    getOTPStatus
);

/**
 * @route   DELETE /api/otp/cleanup
 * @desc    Clean up expired OTPs (Admin only)
 * @access  Private (Admin only)
 */
router.delete('/cleanup', 
    authenticate,
    requireAdmin,
    logUserActivity('otp-cleanup'),
    cleanupOTPs
);

/**
 * @route   GET /api/otp/stats
 * @desc    Get OTP statistics (Admin only)
 * @access  Private (Admin only)
 */
router.get('/stats', 
    authenticate,
    requireAdmin,
    logUserActivity('get-otp-stats'),
    getOTPStats
);

/**
 * @route   POST /api/otp/test
 * @desc    Test OTP functionality (Development only)
 * @access  Public (Development only)
 */
router.post('/test', (req, res) => {
    // Only allow in development mode
    if (process.env.NODE_ENV !== 'development') {
        return res.status(403).json({
            success: false,
            message: 'This endpoint is only available in development mode'
        });
    }

    const { email, purpose = 'signup' } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email is required for OTP test'
        });
    }

    res.json({
        success: true,
        message: 'OTP test endpoint working',
        data: {
            email,
            purpose,
            testMode: true,
            environment: process.env.NODE_ENV,
            timestamp: new Date().toISOString()
        }
    });
});

/**
 * @route   GET /api/otp/health
 * @desc    Check OTP service health
 * @access  Public
 */
router.get('/health', async (req, res) => {
    try {
        const OTP = require('../models/OTP');
        
        // Check if we can connect to OTP collection
        const otpCount = await OTP.countDocuments();
        
        res.json({
            success: true,
            message: 'OTP service is healthy',
            data: {
                status: 'healthy',
                totalOTPs: otpCount,
                timestamp: new Date().toISOString(),
                environment: process.env.NODE_ENV || 'development'
            }
        });
        
    } catch (error) {
        console.error('OTP health check failed:', error.message);
        
        res.status(500).json({
            success: false,
            message: 'OTP service health check failed',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

module.exports = router;




// Verify OTP

// Route: POST /api/otp/verify

// Checks if the OTP code entered by the user is correct and valid.

// Uses validateOTPVerification middleware to ensure input is correct.

// Access: Public

// Resend OTP

// Route: POST /api/otp/resend

// Generates a new OTP and sends it to the user’s email.

// Uses validateOTPRequest middleware to ensure email/purpose is valid.

// Access: Public

// Get OTP Status (Dev Only)

// Route: GET /api/otp/status/:email

// Returns the current OTP status for a given email (like last OTP sent, expiry, etc.).

// Access: Public, only meant for development/testing.

// Clean Up Expired OTPs

// Route: DELETE /api/otp/cleanup

// Removes expired OTPs from the database.

// Only Admin users can do this.

// Uses authenticate, requireAdmin, and logUserActivity.

// Get OTP Statistics

// Route: GET /api/otp/stats

// Returns stats about OTP usage (like total OTPs, possibly failed attempts, etc.).

// Only Admin users can access.

// Test OTP Endpoint (Dev Only)

// Route: POST /api/otp/test

// A test endpoint to verify OTP functionality without actually sending an email.

// Only works in development mode.

// Health Check

// Route: GET /api/otp/health

// Checks if the OTP system/database is working correctly.

// Returns total OTPs in the collection and environment info.

// Sanitization

// sanitizeInput middleware is applied to all routes to prevent malicious input.