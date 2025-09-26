const crypto = require('crypto');

/**
 * Generate a random OTP code
 * @param {number} length - Length of the OTP (default: 6)
 * @param {string} type - Type of OTP ('numeric', 'alphanumeric', 'alphabetic')
 * @returns {string} Generated OTP code
 */
const generateOTP = (length = 6, type = 'numeric') => {
    const otpLength = parseInt(process.env.OTP_LENGTH) || length;
    
    try {
        switch (type.toLowerCase()) {
            case 'numeric':
                return generateNumericOTP(otpLength);
            
            case 'alphanumeric':
                return generateAlphanumericOTP(otpLength);
            
            case 'alphabetic':
                return generateAlphabeticOTP(otpLength);
            
            default:
                return generateNumericOTP(otpLength);
        }
    } catch (error) {
        console.error('Error generating OTP:', error);
        // Fallback to simple numeric OTP
        return generateSimpleNumericOTP(otpLength);
    }
};

/**
 * Generate numeric OTP using crypto for better randomness
 * @param {number} length - Length of the OTP
 * @returns {string} Numeric OTP
 */
const generateNumericOTP = (length) => {
    if (length < 4 || length > 10) {
        throw new Error('OTP length must be between 4 and 10 digits');
    }
    
    // Use crypto.randomInt for better security
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    
    return crypto.randomInt(min, max + 1).toString();
};

/**
 * Generate alphanumeric OTP (numbers and letters)
 * @param {number} length - Length of the OTP
 * @returns {string} Alphanumeric OTP
 */
const generateAlphanumericOTP = (length) => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let otp = '';
    
    // Use crypto.randomBytes for secure random generation
    const randomBytes = crypto.randomBytes(length);
    
    for (let i = 0; i < length; i++) {
        otp += chars[randomBytes[i] % chars.length];
    }
    
    return otp;
};

/**
 * Generate alphabetic OTP (only letters)
 * @param {number} length - Length of the OTP
 * @returns {string} Alphabetic OTP
 */
const generateAlphabeticOTP = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let otp = '';
    
    const randomBytes = crypto.randomBytes(length);
    
    for (let i = 0; i < length; i++) {
        otp += chars[randomBytes[i] % chars.length];
    }
    
    return otp;
};

/**
 * Fallback simple numeric OTP generator
 * @param {number} length - Length of the OTP
 * @returns {string} Simple numeric OTP
 */
const generateSimpleNumericOTP = (length) => {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
};

/**
 * Generate OTP with custom pattern
 * @param {string} pattern - Pattern like 'NNN-NNN' where N=number, A=letter
 * @returns {string} OTP with custom pattern
 */
const generatePatternOTP = (pattern) => {
    let otp = '';
    
    for (const char of pattern) {
        switch (char.toLowerCase()) {
            case 'n':
                otp += crypto.randomInt(0, 10).toString();
                break;
            case 'a':
                const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                otp += letters[crypto.randomInt(0, letters.length)];
                break;
            default:
                otp += char; // Keep special characters like -
        }
    }
    
    return otp;
};

/**
 * Validate OTP format
 * @param {string} otp - OTP to validate
 * @param {string} type - Expected OTP type
 * @param {number} expectedLength - Expected length
 * @returns {boolean} Is valid OTP
 */
const validateOTPFormat = (otp, type = 'numeric', expectedLength = 6) => {
    if (!otp || typeof otp !== 'string') {
        return false;
    }
    
    if (otp.length !== expectedLength) {
        return false;
    }
    
    switch (type.toLowerCase()) {
        case 'numeric':
            return /^\d+$/.test(otp);
        
        case 'alphanumeric':
            return /^[0-9A-Z]+$/.test(otp.toUpperCase());
        
        case 'alphabetic':
            return /^[A-Z]+$/.test(otp.toUpperCase());
        
        default:
            return /^\d+$/.test(otp);
    }
};

/**
 * Generate secure OTP with additional entropy
 * @param {number} length - Length of OTP
 * @returns {string} Secure numeric OTP
 */
const generateSecureOTP = (length = 6) => {
    // Add timestamp entropy to make it more unpredictable
    const timestamp = Date.now();
    const randomBytes = crypto.randomBytes(8);
    
    // Combine timestamp and random bytes for seed
    const seed = timestamp.toString() + randomBytes.toString('hex');
    const hash = crypto.createHash('sha256').update(seed).digest('hex');
    
    // Extract numeric digits from hash
    let otp = '';
    let hashIndex = 0;
    
    while (otp.length < length && hashIndex < hash.length) {
        const char = hash[hashIndex];
        if (/\d/.test(char)) {
            otp += char;
        }
        hashIndex++;
    }
    
    // If we don't have enough digits, pad with random numbers
    while (otp.length < length) {
        otp += crypto.randomInt(0, 10).toString();
    }
    
    return otp;
};

/**
 * Get OTP configuration from environment
 * @returns {object} OTP configuration
 */
const getOTPConfig = () => {
    return {
        length: parseInt(process.env.OTP_LENGTH) || 6,
        expiryMinutes: parseInt(process.env.OTP_EXPIRES_IN) || 10,
        maxAttempts: parseInt(process.env.OTP_MAX_ATTEMPTS) || 3,
        resendCooldown: parseInt(process.env.OTP_RESEND_COOLDOWN) || 60
    };
};

/**
 * Generate OTP with logging
 * @param {string} purpose - Purpose of OTP
 * @param {string} email - Email for logging
 * @returns {string} Generated OTP
 */
const generateOTPWithLogging = (purpose = 'verification', email = 'unknown') => {
    const config = getOTPConfig();
    const otp = generateSecureOTP(config.length);
    
    console.log(`🔢 OTP Generated: ${purpose} for ${email} - Length: ${config.length} - Expires in: ${config.expiryMinutes}min`);
    
    return otp;
};

module.exports = {
    generateOTP,
    generateNumericOTP,
    generateAlphanumericOTP,
    generateAlphabeticOTP,
    generatePatternOTP,
    generateSecureOTP,
    generateOTPWithLogging,
    validateOTPFormat,
    getOTPConfig
};

// This utility includes:
// ✅ Multiple OTP types (numeric, alphanumeric, alphabetic)
// ✅ Crypto-secure generation using Node.js crypto module
// ✅ Pattern-based OTP (like NNN-NNN)
// ✅ Validation functions to check OTP format
// ✅ Secure generation with additional entropy
// ✅ Environment configuration support
// ✅ Logging capabilities for debugging