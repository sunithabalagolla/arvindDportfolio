const Event = require('../models/Event');
const EventNotification = require('../models/EventNotification');
const { sendNotificationEmail } = require('../utils/sendEmail');

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({ isActive: true })
            .sort({ date: 1 });
        
        res.json({
            success: true,
            data: events
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch events'
        });
    }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }
        
        res.json({
            success: true,
            data: event
        });
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch event'
        });
    }
};

// Set event notification
exports.setEventNotification = async (req, res) => {
    try {
        const { eventId, reminderDays } = req.body;
        const userId = req.user._id;
        
        // Get event details
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }
        
        // Check if notification already exists
        const existingNotification = await EventNotification.findOne({
            user: userId,
            event: eventId,
            reminderDays: reminderDays
        });
        
        if (existingNotification) {
            return res.status(400).json({
                success: false,
                message: 'Notification already set for this event'
            });
        }
        
        // Calculate reminder date
        const eventDate = new Date(event.date);
        const reminderDate = new Date(eventDate);
        reminderDate.setDate(eventDate.getDate() - reminderDays);
        reminderDate.setHours(9, 0, 0, 0);
        
        // Create notification
        const notification = new EventNotification({
            user: userId,
            event: eventId,
            userEmail: req.user.email,
            userName: req.user.name,
            eventTitle: event.title,
            eventDate: event.date,
            reminderDate: reminderDate,
            reminderDays: reminderDays,
            notificationMethod: 'email'
        });
        
        await notification.save();
        
        // Send confirmation email
        await sendNotificationEmail({
            to: req.user.email,
            subject: '✓ Event Reminder Set',
            type: 'confirmation',
            data: {
                userName: req.user.name,
                eventTitle: event.title,
                eventDate: event.date,
                reminderDate: reminderDate
            }
        });
        
        res.json({
            success: true,
            message: 'Notification set successfully',
            data: notification
        });
    } catch (error) {
        console.error('Error setting notification:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to set notification'
        });
    }
};

// Get user's notifications
exports.getMyNotifications = async (req, res) => {
    try {
        const notifications = await EventNotification.find({
            user: req.user._id
        })
        .populate('event')
        .sort({ reminderDate: 1 });
        
        res.json({
            success: true,
            data: notifications
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch notifications'
        });
    }
};

// Cancel notification
exports.cancelNotification = async (req, res) => {
    try {
        const notification = await EventNotification.findOneAndDelete({
            _id: req.params.notificationId,
            user: req.user._id
        });
        
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Notification cancelled successfully'
        });
    } catch (error) {
        console.error('Error cancelling notification:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to cancel notification'
        });
    }
};