const Feedback = require('../models/Feedback');
const { validationResult } = require('express-validator');

// Submit a concern
exports.submitConcern = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { message } = req.body;
        const userId = req.user ? req.user.id : null;
        const email = req.user ? req.user.email : req.body.email;
        const ipAddress = req.ip || req.connection.remoteAddress;

        // Create new concern
        const concern = new Feedback({
            type: 'concern',
            message,
            userId,
            email,
            ipAddress,
            priority: 'high' // Concerns are typically higher priority
        });

        await concern.save();

        res.status(201).json({
            success: true,
            message: 'Thank you for reporting your concerns. We will review them shortly.',
            data: {
                id: concern._id,
                type: concern.type,
                createdAt: concern.createdAt
            }
        });

    } catch (error) {
        console.error('Error submitting concern:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit concern. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Submit general feedback
exports.submitFeedback = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        const { message } = req.body;
        const userId = req.user ? req.user.id : null;
        const email = req.user ? req.user.email : req.body.email;
        const ipAddress = req.ip || req.connection.remoteAddress;

        // Create new feedback
        const feedback = new Feedback({
            type: 'feedback',
            message,
            userId,
            email,
            ipAddress,
            priority: 'medium'
        });

        await feedback.save();

        res.status(201).json({
            success: true,
            message: 'Thank you for your feedback! We appreciate your input.',
            data: {
                id: feedback._id,
                type: feedback.type,
                createdAt: feedback.createdAt
            }
        });

    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit feedback. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get all feedback (Admin only)
exports.getAllFeedback = async (req, res) => {
    try {
        const { type, status, page = 1, limit = 20 } = req.query;
        
        const query = {};
        if (type) query.type = type;
        if (status) query.status = status;

        const skip = (page - 1) * limit;

        const feedbacks = await Feedback.find(query)
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Feedback.countDocuments(query);

        res.status(200).json({
            success: true,
            data: feedbacks,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch feedback',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Update feedback status (Admin only)
exports.updateFeedbackStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, priority, adminNotes } = req.body;

        const feedback = await Feedback.findById(id);
        
        if (!feedback) {
            return res.status(404).json({
                success: false,
                message: 'Feedback not found'
            });
        }

        if (status) feedback.status = status;
        if (priority) feedback.priority = priority;
        if (adminNotes) feedback.adminNotes = adminNotes;

        await feedback.save();

        res.status(200).json({
            success: true,
            message: 'Feedback updated successfully',
            data: feedback
        });

    } catch (error) {
        console.error('Error updating feedback:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update feedback',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Delete feedback (Admin only)
exports.deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;

        const feedback = await Feedback.findByIdAndDelete(id);
        
        if (!feedback) {
            return res.status(404).json({
                success: false,
                message: 'Feedback not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Feedback deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete feedback',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// This controller handles submitting user feedback or concerns, and lets admins manage, update, or delete them.”