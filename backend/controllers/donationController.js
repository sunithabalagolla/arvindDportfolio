// backend/controllers/donationController.js

const Donation = require('../models/Donation');
const User = require('../models/User');

// @desc    Create donation intent
// @route   POST /api/donations/create
// @access  Private
const createDonation = async (req, res) => {
    try {
        const { name, email, phone, amount, fundType } = req.body;
        const userId = req.user._id;

        if (!name || !email || !phone || !amount || !fundType) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        if (amount < 100 || amount > 500000) {
            return res.status(400).json({
                success: false,
                message: 'Donation amount must be between ₹100 and ₹5,00,000'
            });
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid 10-digit phone number'
            });
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        const donation = await Donation.create({
            userId,
            name,
            email,
            phone,
            amount,
            fundType,
            status: 'pending'
        });

        res.status(201).json({
            success: true,
            message: 'Donation intent created successfully',
            data: {
                donationId: donation._id,
                amount: donation.amount,
                fundType: donation.fundType,
                status: donation.status
            }
        });

    } catch (error) {
        console.error('Create donation error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create donation intent'
        });
    }
};

// @desc    Get user's donations
// @route   GET /api/donations/my-donations
// @access  Private
const getMyDonations = async (req, res) => {
    try {
        const userId = req.user._id;

        const donations = await Donation.find({ userId })
            .sort({ createdAt: -1 })
            .select('-__v');

        const stats = await Donation.getUserStats(userId);

        res.status(200).json({
            success: true,
            count: donations.length,
            stats,
            donations
        });

    } catch (error) {
        console.error('Get donations error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch donations'
        });
    }
};

// @desc    Get single donation
// @route   GET /api/donations/:donationId
// @access  Private
const getDonation = async (req, res) => {
    try {
        const { donationId } = req.params;
        const userId = req.user._id;

        const donation = await Donation.findOne({
            _id: donationId,
            userId
        });

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }

        res.status(200).json({
            success: true,
            donation
        });

    } catch (error) {
        console.error('Get donation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch donation'
        });
    }
};

// @desc    Upload receipt
// @route   POST /api/donations/upload-receipt/:donationId
// @access  Private
const uploadReceipt = async (req, res) => {
    try {
        const { donationId } = req.params;
        const { transactionId } = req.body;
        const userId = req.user._id;

        const donation = await Donation.findOne({
            _id: donationId,
            userId
        });

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }

        if (!donation.canUploadReceipt()) {
            return res.status(400).json({
                success: false,
                message: 'Receipt cannot be uploaded for this donation'
            });
        }

        let receiptImageUrl = null;
        if (req.file) {
            if (req.file.path) {
                receiptImageUrl = req.file.path;
            } else {
                receiptImageUrl = `/uploads/receipts/${req.file.filename}`;
            }
        }

        donation.receiptImage = receiptImageUrl || donation.receiptImage;
        donation.transactionId = transactionId || donation.transactionId;
        donation.status = 'receipt_uploaded';
        await donation.save();

        res.status(200).json({
            success: true,
            message: 'Receipt uploaded successfully',
            data: {
                donationId: donation._id,
                status: donation.status,
                receiptImage: donation.receiptImage,
                transactionId: donation.transactionId
            }
        });

    } catch (error) {
        console.error('Upload receipt error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to upload receipt'
        });
    }
};

// @desc    Update donation
// @route   PATCH /api/donations/:donationId
// @access  Private
const updateDonation = async (req, res) => {
    try {
        const { donationId } = req.params;
        const { transactionId, notes } = req.body;
        const userId = req.user._id;

        const donation = await Donation.findOne({
            _id: donationId,
            userId
        });

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }

        if (transactionId) donation.transactionId = transactionId;
        if (notes) donation.notes = notes;

        await donation.save();

        res.status(200).json({
            success: true,
            message: 'Donation updated successfully',
            donation
        });

    } catch (error) {
        console.error('Update donation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update donation'
        });
    }
};

// @desc    Delete donation
// @route   DELETE /api/donations/:donationId
// @access  Private
const deleteDonation = async (req, res) => {
    try {
        const { donationId } = req.params;
        const userId = req.user._id;

        const donation = await Donation.findOne({
            _id: donationId,
            userId
        });

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }

        if (donation.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete donation after receipt is uploaded'
            });
        }

        await donation.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Donation deleted successfully'
        });

    } catch (error) {
        console.error('Delete donation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete donation'
        });
    }
};

// @desc    Get donation statistics
// @route   GET /api/donations/stats
// @access  Private
const getDonationStats = async (req, res) => {
    try {
        const userId = req.user._id;

        const stats = await Donation.getUserStats(userId);

        const recentDonations = await Donation.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('amount fundType status createdAt');

        res.status(200).json({
            success: true,
            stats,
            recentDonations
        });

    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch donation statistics'
        });
    }
};

// @desc    Get all donations (Admin)
// @route   GET /api/donations/admin/all
// @access  Private/Admin
const getAllDonations = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;

        const query = {};
        if (status) query.status = status;

        const donations = await Donation.find(query)
            .populate('userId', 'firstName email')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Donation.countDocuments(query);

        res.status(200).json({
            success: true,
            count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            donations
        });

    } catch (error) {
        console.error('Get all donations error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch donations'
        });
    }
};

// @desc    Verify donation (Admin)
// @route   PATCH /api/donations/admin/verify/:donationId
// @access  Private/Admin
const verifyDonation = async (req, res) => {
    try {
        const { donationId } = req.params;
        const { status, rejectionReason } = req.body;
        const adminId = req.user._id;

        const donation = await Donation.findById(donationId);

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }

        if (!donation.canBeVerified()) {
            return res.status(400).json({
                success: false,
                message: 'Donation cannot be verified. Receipt must be uploaded first.'
            });
        }

        if (status === 'verified') {
            donation.status = 'verified';
            donation.verifiedAt = new Date();
            donation.verifiedBy = adminId;
        } else if (status === 'rejected') {
            donation.status = 'rejected';
            donation.rejectionReason = rejectionReason || 'No reason provided';
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be "verified" or "rejected"'
            });
        }

        await donation.save();

        res.status(200).json({
            success: true,
            message: `Donation ${status} successfully`,
            donation
        });

    } catch (error) {
        console.error('Verify donation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to verify donation'
        });
    }
};

// @desc    Get donation statistics (Admin)
// @route   GET /api/donations/admin/statistics
// @access  Private/Admin
const getAdminStatistics = async (req, res) => {
    try {
        const totalStats = await Donation.aggregate([
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
                    },
                    rejectedCount: {
                        $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] }
                    }
                }
            }
        ]);

        const byFundType = await Donation.aggregate([
            {
                $group: {
                    _id: '$fundType',
                    totalAmount: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { totalAmount: -1 } }
        ]);

        res.status(200).json({
            success: true,
            stats: totalStats[0] || {},
            byFundType
        });

    } catch (error) {
        console.error('Get admin statistics error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics'
        });
    }
};

module.exports = {
    createDonation,
    getMyDonations,
    getDonation,
    uploadReceipt,
    updateDonation,
    deleteDonation,
    getDonationStats,
    getAllDonations,
    verifyDonation,
    getAdminStatistics
};