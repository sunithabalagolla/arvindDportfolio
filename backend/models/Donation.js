// backend/models/Donation.js

const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    // User Information
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // For faster queries
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },

    // Donation Details
    amount: {
        type: Number,
        required: [true, 'Donation amount is required'],
        min: [100, 'Minimum donation amount is ₹100'],
        max: [500000, 'Maximum donation amount is ₹5,00,000']
    },
    fundType: {
        type: String,
        required: [true, 'Fund type is required'],
        enum: [
            'PM Cares Fund',
            'BJP Relief Fund',
            'Education Fund',
            'Healthcare Fund',
            'Disaster Relief Fund'
        ]
    },

    // Receipt & Verification
    status: {
        type: String,
        enum: ['pending', 'receipt_uploaded', 'verified', 'rejected'],
        default: 'pending',
        index: true // For filtering donations by status
    },
    receiptImage: {
        type: String, // Cloudinary URL or file path
        default: null
    },
    transactionId: {
        type: String,
        default: null,
        trim: true
    },

    // Verification Details
    verifiedAt: {
        type: Date,
        default: null
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Admin who verified
        default: null
    },
    rejectionReason: {
        type: String,
        default: null
    },

    // Metadata
    notes: {
        type: String,
        default: null
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Indexes for better query performance
donationSchema.index({ userId: 1, createdAt: -1 }); // Get user donations sorted by date
donationSchema.index({ status: 1, createdAt: -1 }); // Get donations by status
donationSchema.index({ email: 1 }); // Search by email

// Virtual for formatted amount
donationSchema.virtual('formattedAmount').get(function() {
    return `₹${this.amount.toLocaleString('en-IN')}`;
});

// Method to check if receipt can be uploaded
donationSchema.methods.canUploadReceipt = function() {
    return this.status === 'pending' || this.status === 'receipt_uploaded';
};

// Method to check if donation can be verified
donationSchema.methods.canBeVerified = function() {
    return this.status === 'receipt_uploaded';
};

// Static method to get user donation stats
donationSchema.statics.getUserStats = async function(userId) {
    const stats = await this.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$amount' },
                totalDonations: { $sum: 1 },
                pendingCount: {
                    $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
                },
                uploadedCount: {
                    $sum: { $cond: [{ $eq: ['$status', 'receipt_uploaded'] }, 1, 0] }
                },
                verifiedCount: {
                    $sum: { $cond: [{ $eq: ['$status', 'verified'] }, 1, 0] }
                }
            }
        }
    ]);

    return stats[0] || {
        totalAmount: 0,
        totalDonations: 0,
        pendingCount: 0,
        uploadedCount: 0,
        verifiedCount: 0
    };
};

// Pre-save middleware to validate status transitions
donationSchema.pre('save', function(next) {
    // If status is changing to verified, set verifiedAt
    if (this.isModified('status') && this.status === 'verified' && !this.verifiedAt) {
        this.verifiedAt = new Date();
    }
    next();
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;