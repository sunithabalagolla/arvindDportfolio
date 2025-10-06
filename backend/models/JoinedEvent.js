const mongoose = require('mongoose');

const joinedEventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: String,
        required: true
    },
    eventTitle: {
        type: String,
        required: true
    },
    eventDate: {
        type: String,
        required: true
    },
    eventTime: {
        type: String,
        required: true
    },
    eventLocation: {
        type: String,
        required: true
    },
    eventImage: {
        type: String
    },
    joinedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['joined', 'completed', 'cancelled'],
        default: 'joined'
    }
}, {
    timestamps: true
});

// Prevent duplicate joins
joinedEventSchema.index({ userId: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model('JoinedEvent', joinedEventSchema);


