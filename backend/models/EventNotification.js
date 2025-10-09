const mongoose = require('mongoose');

const eventNotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    userEmail: { type: String, required: true },
    userName: String,
    eventTitle: String,
    eventDate: Date,
    reminderDate: { type: Date, required: true },
    reminderDays: { type: Number, required: true },
    notificationMethod: { type: String, enum: ['email', 'sms', 'whatsapp'], default: 'email' },
    isSent: { type: Boolean, default: false },
    sentAt: Date,
    status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' }
}, { timestamps: true });

eventNotificationSchema.index({ user: 1, event: 1 });
eventNotificationSchema.index({ reminderDate: 1, isSent: 1 });

module.exports = mongoose.model('EventNotification', eventNotificationSchema);