// backend/controllers/eventController.js

const Event = require('../models/Event');
const EventNotification = require('../models/EventNotification');
const { sendNotificationEmail } = require('../utils/sendEmail');

// ===== PUBLIC ENDPOINTS =====

/**
 * Get all ACTIVE events (for public display)
 * Only returns: published, upcoming, not archived events
 * GET /api/events
 */
exports.getAllEvents = async (req, res) => {
    try {
        const now = new Date();
        
        // Only show published, upcoming, non-archived events
        const events = await Event.find({
            status: 'published',
            date: { $gte: now },
            isArchived: false,
            isActive: true
        }).sort({ date: 1 });
        
        console.log(`📅 Found ${events.length} upcoming events`);
        
        res.json({
            success: true,
            count: events.length,
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

/**
 * Get PAST events (completed, not archived)
 * For "Past Events" section
 * GET /api/events/past
 */
exports.getPastEvents = async (req, res) => {
    try {
        const now = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        
        // Show completed events from last 6 months
        const events = await Event.find({
            status: 'completed',
            date: { 
                $lt: now,
                $gte: sixMonthsAgo  // Last 6 months only
            },
            isArchived: false
        }).sort({ date: -1 });  // Most recent first
        
        console.log(`✅ Found ${events.length} past events`);
        
        res.json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        console.error('Error fetching past events:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch past events'
        });
    }
};

/**
 * Get single event by ID (public access)
 * GET /api/events/:id
 */
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }
        
        // Don't show draft or archived events to public
        if (event.status === 'draft' || event.isArchived) {
            return res.status(404).json({
                success: false,
                message: 'Event not available'
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

/**
 * Get events by month (for calendar filtering)
 * GET /api/events/month/:month/:year
 */
exports.getEventsByMonth = async (req, res) => {
    try {
        const { month, year } = req.params;
        
        // Create date range for the month
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);
        
        const events = await Event.find({
            status: 'published',
            date: { $gte: startDate, $lte: endDate },
            isArchived: false,
            isActive: true
        }).sort({ date: 1 });
        
        res.json({
            success: true,
            month: `${month}/${year}`,
            count: events.length,
            data: events
        });
    } catch (error) {
        console.error('Error fetching events by month:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch events'
        });
    }
};

// ===== ADMIN ENDPOINTS (for future admin panel) =====

/**
 * Get ALL events (admin only)
 * Includes drafts, archived, cancelled
 * GET /api/admin/events
 */
exports.getAllEventsAdmin = async (req, res) => {
    try {
        const { status, archived } = req.query;
        
        let filter = {};
        
        // Filter by status if provided
        if (status) {
            filter.status = status;
        }
        
        // Filter by archived status if provided
        if (archived !== undefined) {
            filter.isArchived = archived === 'true';
        }
        
        const events = await Event.find(filter).sort({ date: -1 });
        
        console.log(`📊 Admin: Found ${events.length} events`);
        
        res.json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        console.error('Error fetching admin events:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch events'
        });
    }
};

/**
 * Update event status (admin only)
 * PATCH /api/admin/events/:id/status
 */
exports.updateEventStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['draft', 'published', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }
        
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }
        
        console.log(`✏️ Updated event "${event.title}" to status: ${status}`);
        
        res.json({
            success: true,
            message: 'Event status updated',
            data: event
        });
    } catch (error) {
        console.error('Error updating event status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update event status'
        });
    }
};

/**
 * Archive/Unarchive event (admin only)
 * PATCH /api/admin/events/:id/archive
 */
exports.toggleArchiveEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }
        
        // Toggle archive status
        event.isArchived = !event.isArchived;
        event.archivedAt = event.isArchived ? new Date() : null;
        
        await event.save();
        
        console.log(`📦 ${event.isArchived ? 'Archived' : 'Unarchived'} event: ${event.title}`);
        
        res.json({
            success: true,
            message: `Event ${event.isArchived ? 'archived' : 'unarchived'} successfully`,
            data: event
        });
    } catch (error) {
        console.error('Error toggling archive:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update event'
        });
    }
};

/**
 * Get event statistics (admin only)
 * GET /api/admin/events/stats
 */
exports.getEventStats = async (req, res) => {
    try {
        const now = new Date();
        
        const stats = {
            total: await Event.countDocuments(),
            published: await Event.countDocuments({ status: 'published', date: { $gte: now } }),
            completed: await Event.countDocuments({ status: 'completed' }),
            draft: await Event.countDocuments({ status: 'draft' }),
            cancelled: await Event.countDocuments({ status: 'cancelled' }),
            archived: await Event.countDocuments({ isArchived: true }),
            upcoming: await Event.countDocuments({ 
                status: 'published', 
                date: { $gte: now },
                isArchived: false
            })
        };
        
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics'
        });
    }
};

// ===== NOTIFICATION ENDPOINTS (existing, kept as is) =====

/**
 * Set event notification
 * POST /api/events/notify
 */
exports.setEventNotification = async (req, res) => {
    try {
        const { eventId, reminderDays } = req.body;
        const userId = req.user._id;
        
        console.log('📧 User data check:');
        console.log('User object:', req.user);
        console.log('User firstName:', req.user.firstName);
        
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
        
        // Use firstName with fallback
        const userName = req.user.firstName || req.user.name || 'User';
        
        // Create notification
        const notification = new EventNotification({
            user: userId,
            event: eventId,
            userEmail: req.user.email,
            userName: userName,
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
                userName: userName,
                eventTitle: event.title,
                eventDate: event.date,
                reminderDate: reminderDate
            }
        });
        
        console.log(`✅ Notification created with userName: ${userName}`);
        
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

/**
 * Get user's notifications
 * GET /api/events/notifications
 */
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

/**
 * Cancel notification
 * DELETE /api/events/notifications/:notificationId
 */
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

// module.exports = exports; 