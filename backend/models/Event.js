const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    fullDescription: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: '#FB8B35'
    },
    capacity: {
        type: Number,
        default: 100
    },
    registeredCount: {
        type: Number,
        default: 0
    },
    instructor: {
        type: String
    },
    tags: [{
        type: String
    }],
    whyAttend: {
        intro: String,
        points: [String]
    },
    highlights: [{
        title: String,
        description: String
    }],
    
    // ===== NEW STATUS FIELDS =====
    status: {
        type: String,
        enum: ['draft', 'published', 'completed', 'cancelled'],
        default: 'published',
        index: true  // Index for faster queries
    },
    isArchived: {
        type: Boolean,
        default: false,
        index: true  // Index for faster queries
    },
    archivedAt: {
        type: Date
    },
    // ===== END NEW FIELDS =====
    
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt
});

// ===== INDEXES FOR PERFORMANCE =====
eventSchema.index({ date: 1, status: 1 });
eventSchema.index({ status: 1, isArchived: 1 });

// ===== VIRTUAL FIELDS =====
// Check if event is upcoming
eventSchema.virtual('isUpcoming').get(function() {
    return this.date > new Date() && this.status === 'published';
});

// Check if event is past
eventSchema.virtual('isPast').get(function() {
    return this.date < new Date();
});  

// Check if event is today
eventSchema.virtual('isToday').get(function() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(this.date);
    eventDate.setHours(0, 0, 0, 0);  
    return eventDate.getTime() === today.getTime();
});

// ===== STATIC METHODS =====
// Get all upcoming events
eventSchema.statics.getUpcoming = function() {
    const now = new Date();
    return this.find({
        status: 'published',
        date: { $gte: now },
        isArchived: false
    }).sort({ date: 1 });
};

// Get all past events (not archived)
eventSchema.statics.getPast = function() {
    const now = new Date();
    return this.find({
        status: 'completed',
        date: { $lt: now },
        isArchived: false
    }).sort({ date: -1 });
};

// Get all active events (for public display)
eventSchema.statics.getActive = function() {
    const now = new Date();
    return this.find({
        status: 'published',
        date: { $gte: now },
        isArchived: false,
        isActive: true
    }).sort({ date: 1 });
};

// Archive old events
eventSchema.statics.archiveOldEvents = async function(monthsOld = 6) {
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - monthsOld);
    
    const result = await this.updateMany(
        {
            date: { $lt: cutoffDate },
            status: 'completed',
            isArchived: false
        },
        {
            $set: {
                isArchived: true,
                archivedAt: new Date()
            }
        }
    );
    
    return result;
};

// Mark events as completed
eventSchema.statics.markAsCompleted = async function() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(23, 59, 59, 999);
    
    const result = await this.updateMany(
        {
            date: { $lt: yesterday },
            status: 'published'
        },
        {
            $set: { status: 'completed' }
        }
    );
    
    return result;
};

// ===== INSTANCE METHODS =====
// Archive this event
eventSchema.methods.archive = function() {
    this.isArchived = true;
    this.archivedAt = new Date();
    return this.save();
};

// Unarchive this event
eventSchema.methods.unarchive = function() {
    this.isArchived = false;
    this.archivedAt = null;
    return this.save();
};

// Mark as completed
eventSchema.methods.markCompleted = function() {
    this.status = 'completed';
    return this.save();
};

// Cancel event
eventSchema.methods.cancel = function() {
    this.status = 'cancelled';
    return this.save();
};

// Publish event
eventSchema.methods.publish = function() {
    this.status = 'published';
    return this.save();
};

// ===== PRE-SAVE HOOK =====
// Auto-mark as completed if date has passed
eventSchema.pre('save', function(next) {
    if (this.isModified('date') || this.isNew) {
        const now = new Date();
        if (this.date < now && this.status === 'published') {
            this.status = 'completed';
        }
    }
    next();
});

module.exports = mongoose.model('Event', eventSchema);


// The file should now include:

// ✅ status field (draft, published, completed, cancelled)
// ✅ isArchived field
// ✅ archivedAt field
// ✅ Helper methods (.getUpcoming(), .getPast(), etc.)
// ✅ Virtual fields (.isUpcoming, .isPast, .isToday)
// ✅ Auto-complete hook