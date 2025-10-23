// backend/routes/events.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticate } = require('../middleware/auth'); // ✅ FIXED: Use 'authenticate'

// ===== PUBLIC ROUTES =====

// Get all active/upcoming events
router.get('/', eventController.getAllEvents);

// Get past events (last 6 months)
router.get('/past', eventController.getPastEvents);

// Get events by month (for calendar filtering)
router.get('/month/:month/:year', eventController.getEventsByMonth);

// Get single event by ID
router.get('/:id', eventController.getEventById);

// ===== PROTECTED ROUTES (Require Login) =====

// Set event notification
router.post('/notify', authenticate, eventController.setEventNotification); // ✅ FIXED

// Get my notifications
router.get('/notifications/my', authenticate, eventController.getMyNotifications); // ✅ FIXED

// Cancel notification
router.delete('/notifications/:notificationId', authenticate, eventController.cancelNotification); // ✅ FIXED

// ===== ADMIN ROUTES (For future admin panel) =====
// Note: Add admin middleware when you create admin panel

// Get all events (including drafts, archived) - ADMIN ONLY
// router.get('/admin/all', authenticate, eventController.getAllEventsAdmin);

// Update event status - ADMIN ONLY
// router.patch('/admin/:id/status', authenticate, eventController.updateEventStatus);

// Archive/Unarchive event - ADMIN ONLY
// router.patch('/admin/:id/archive', authenticate, eventController.toggleArchiveEvent);

// Get event statistics - ADMIN ONLY
// router.get('/admin/stats', authenticate, eventController.getEventStats);

module.exports = router;