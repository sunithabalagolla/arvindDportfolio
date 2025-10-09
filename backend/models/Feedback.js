const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['concern', 'feedback'],
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null  // Allow anonymous feedback
    },
    email: {
        type: String,
        trim: true,
        default: null
    },
    status: {
        type: String,
        enum: ['pending', 'reviewing', 'resolved', 'closed'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    adminNotes: {
        type: String,
        default: ''
    },
    ipAddress: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
feedbackSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Index for faster queries
feedbackSchema.index({ type: 1, status: 1, createdAt: -1 });

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;


// Stores feedback: It keeps messages, whether concerns or general feedback.

// Tracks users: It can link feedback to a user or allow anonymous submissions.

// Manages status & priority: You can see if feedback is pending, being reviewed, resolved, or closed, and how urgent it is.

// Keeps timestamps: Records when feedback was created and last updated.

// Helps admins: Allows notes from admins and makes searching/filtering feedback faster.