const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fullDescription: String,
    date: {
        type: Date,
        required: true
    },
    time: String,
    location: {
        type: String,
        required: true
    },
    image: String,
    capacity: {
        type: Number,
        default: 100
    },
    registeredCount: {
        type: Number,
        default: 0
    },
    instructor: String,
    whyAttend: {
        intro: String,
        points: [String]
    },
    highlights: [{
        title: String,
        description: String
    }],
    tags: [String],
    color: String,
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);