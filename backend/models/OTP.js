const mongoose = require('mongoose');
const crypto = require('crypto');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required for OTP'],
        lowercase: true,
        trim: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please provide a valid email address'
        ]
    },
    otpCode: {
        type: String,
        required: [true, 'OTP code is required'],
        minlength: [4, 'OTP must be at least 4 digits'],
        maxlength: [8, 'OTP cannot exceed 8 digits']
    },
    purpose: {
        type: String,
        required: [true, 'OTP purpose is required'],
        enum: ['signup', 'login', 'password-reset', 'email-change'],
        default: 'signup'
    },
    attempts: {
        type: Number,
        default: 0,
        max: [5, 'Maximum 5 OTP attempts allowed']
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expireAfterSeconds: 0 } // MongoDB TTL - auto delete when expired
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastAttemptAt: {
        type: Date,
        default: null
    },
    ipAddress: {
        type: String,
        default: null
    },
    userAgent: {
        type: String,
        default: null
    }
}, {
    versionKey: false // Remove __v field
});

// Compound indexes for better performance
otpSchema.index({ email: 1, purpose: 1 });
otpSchema.index({ otpCode: 1, email: 1 });
otpSchema.index({ expiresAt: 1 }); // TTL index
otpSchema.index({ createdAt: -1 });

// Virtual to check if OTP is expired
otpSchema.virtual('isExpired').get(function() {
    return this.expiresAt < new Date();
});

// Virtual to check if max attempts reached
otpSchema.virtual('isMaxAttemptsReached').get(function() {
    const maxAttempts = parseInt(process.env.OTP_MAX_ATTEMPTS) || 3;
    return this.attempts >= maxAttempts;
});

// Virtual to get remaining attempts
otpSchema.virtual('remainingAttempts').get(function() {
    const maxAttempts = parseInt(process.env.OTP_MAX_ATTEMPTS) || 3;
    return Math.max(0, maxAttempts - this.attempts);
});

// Virtual to get time remaining until expiry
otpSchema.virtual('timeRemaining').get(function() {
    if (this.isExpired) return 0;
    return Math.max(0, Math.ceil((this.expiresAt - new Date()) / 1000 / 60)); // in minutes
});

// Static method to generate OTP
otpSchema.statics.generateOTP = function() {
    const otpLength = parseInt(process.env.OTP_LENGTH) || 6;
    const min = Math.pow(10, otpLength - 1);
    const max = Math.pow(10, otpLength) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Static method to create new OTP
otpSchema.statics.createOTP = async function(email, purpose = 'signup', ipAddress = null, userAgent = null) {
    try {
        // Delete any existing OTPs for this email and purpose
        await this.deleteMany({ email, purpose });
        
        // Generate new OTP
        const otpCode = this.generateOTP().toString();
        
        // Set expiration time
        const expiresInMinutes = parseInt(process.env.OTP_EXPIRES_IN) || 10;
        const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
        
        // Create new OTP document
        const otp = new this({
            email,
            otpCode,
            purpose,
            expiresAt,
            ipAddress,
            userAgent
        });
        
        await otp.save();
        
        console.log(`✅ OTP created for ${email} (${purpose}): ${otpCode} - Expires: ${expiresAt.toISOString()}`);
        
        return otp;
        
    } catch (error) {
        console.error('❌ Error creating OTP:', error);
        throw new Error('Failed to create OTP');
    }
};

// Static method to verify OTP
otpSchema.statics.verifyOTP = async function(email, otpCode, purpose = 'signup', ipAddress = null) {
    try {
        // Find the OTP
        const otp = await this.findOne({ 
            email, 
            purpose,
            isUsed: false 
        }).sort({ createdAt: -1 }); // Get the latest OTP
        
        if (!otp) {
            throw new Error('OTP not found or already used');
        }
        
        // Check if expired
        if (otp.isExpired) {
            await otp.deleteOne(); // Clean up expired OTP
            throw new Error('OTP has expired. Please request a new one.');
        }
        
        // Check if max attempts reached
        if (otp.isMaxAttemptsReached) {
            await otp.deleteOne(); // Clean up after max attempts
            throw new Error('Maximum OTP attempts reached. Please request a new one.');
        }
        
        // Increment attempt count
        otp.attempts += 1;
        otp.lastAttemptAt = new Date();
        
        // Check if OTP matches
        if (otp.otpCode !== otpCode.toString()) {
            await otp.save(); // Save attempt count
            const remaining = otp.remainingAttempts;
            throw new Error(`Invalid OTP. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`);
        }
        
        // OTP is valid - mark as used
        otp.isUsed = true;
        await otp.save();
        
        console.log(`✅ OTP verified successfully for ${email} (${purpose})`);
        
        // Clean up - delete the used OTP
        await otp.deleteOne();
        
        return {
            success: true,
            message: 'OTP verified successfully',
            email,
            purpose
        };
        
    } catch (error) {
        console.error('❌ Error verifying OTP:', error);
        throw error;
    }
};

// Static method to check if user can request new OTP (rate limiting)
otpSchema.statics.canRequestNewOTP = async function(email, purpose = 'signup') {
    const cooldownMinutes = parseInt(process.env.OTP_RESEND_COOLDOWN) || 60; // 1 minute default
    const cooldownTime = new Date(Date.now() - cooldownMinutes * 1000);
    
    const recentOTP = await this.findOne({
        email,
        purpose,
        createdAt: { $gte: cooldownTime }
    });
    
    if (recentOTP) {
        const waitTime = Math.ceil((recentOTP.createdAt.getTime() + cooldownMinutes * 1000 - Date.now()) / 1000);
        return {
            canRequest: false,
            waitTime: waitTime,
            message: `Please wait ${waitTime} seconds before requesting a new OTP`
        };
    }
    
    return {
        canRequest: true,
        waitTime: 0,
        message: 'You can request a new OTP'
    };
};

// Static method to clean up expired/used OTPs (maintenance)
otpSchema.statics.cleanup = async function() {
    try {
        // Delete expired OTPs
        const expiredResult = await this.deleteMany({
            expiresAt: { $lt: new Date() }
        });
        
        // Delete used OTPs older than 1 hour
        const usedResult = await this.deleteMany({
            isUsed: true,
            createdAt: { $lt: new Date(Date.now() - 60 * 60 * 1000) }
        });
        
        console.log(`🧹 OTP Cleanup: Deleted ${expiredResult.deletedCount} expired and ${usedResult.deletedCount} used OTPs`);
        
        return {
            expired: expiredResult.deletedCount,
            used: usedResult.deletedCount,
            total: expiredResult.deletedCount + usedResult.deletedCount
        };
        
    } catch (error) {
        console.error('❌ Error during OTP cleanup:', error);
        throw error;
    }
};

// Instance method to extend expiry (if needed)
otpSchema.methods.extendExpiry = function(additionalMinutes = 5) {
    this.expiresAt = new Date(this.expiresAt.getTime() + additionalMinutes * 60 * 1000);
    return this.save();
};

// Transform JSON output
otpSchema.methods.toJSON = function() {
    const otp = this.toObject();
    
    // Remove sensitive information
    delete otp.otpCode; // Never expose OTP in JSON
    
    return {
        email: otp.email,
        purpose: otp.purpose,
        expiresAt: otp.expiresAt,
        attempts: otp.attempts,
        remainingAttempts: this.remainingAttempts,
        timeRemaining: this.timeRemaining,
        createdAt: otp.createdAt
    };
};

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;

// This OTP model includes:
// ✅ Auto-expiration with MongoDB TTL
// ✅ Rate limiting for OTP requests
// ✅ Attempt tracking with max limits
// ✅ Multiple purposes (signup, login, password-reset)
// ✅ Security features (IP tracking, cleanup)
// ✅ Helper methods for generation and verification