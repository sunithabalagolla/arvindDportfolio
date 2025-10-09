const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticate } = require('../middleware/auth');

// Debug -
console.log('Event Controller:', eventController);
console.log('getAllEvents:', typeof eventController.getAllEvents);
console.log('getEventById:', typeof eventController.getEventById);
console.log('setEventNotification:', typeof eventController.setEventNotification);
console.log('getMyNotifications:', typeof eventController.getMyNotifications);
console.log('cancelNotification:', typeof eventController.cancelNotification);

// Public routes
router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getEventById);

// Protected routes (require authentication)
router.post('/notifications/set', authenticate, eventController.setEventNotification);  // ✅ CHANGED
router.get('/notifications/my-notifications', authenticate, eventController.getMyNotifications);  // ✅ CHANGED
router.delete('/notifications/:notificationId', authenticate, eventController.cancelNotification);  // ✅ CHANGED


module.exports = router;