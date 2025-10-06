const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const JoinedEvent = require('../models/JoinedEvent'); // Use your existing model

// POST - Join an event
router.post('/join-event/:eventId', authenticate, async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user.id;
        const { eventTitle, eventDate, eventTime, eventLocation, eventImage } = req.body;

        // Check if already joined
        const existingEvent = await JoinedEvent.findOne({
            userId: userId,
            eventId: eventId // Keep as string, matching your model
        });

        if (existingEvent) {
            return res.status(400).json({
                success: false,
                message: 'You have already joined this event'
            });
        }

        // Create new joined event
        const joinedEvent = new JoinedEvent({
            userId: userId,
            eventId: eventId,
            eventTitle,
            eventDate,
            eventTime,
            eventLocation,
            eventImage,
            status: 'joined'
        });

        await joinedEvent.save();

        res.status(201).json({
            success: true,
            message: 'Successfully joined the event',
            data: joinedEvent
        });

    } catch (error) {
        console.error('Join event error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to join event',
            error: error.message
        });
    }
});

// GET - Get user's joined events
router.get('/my-events', authenticate, async (req, res) => {
    try {
        const userId = req.user.id;

        const events = await JoinedEvent.find({ 
            userId: userId,
            status: 'joined' // Only get active joined events
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: events
        });

    } catch (error) {
        console.error('Get events error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch events',
            error: error.message
        });
    }
});

// DELETE - Leave an event
router.delete('/leave-event/:eventId', authenticate, async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user.id;

        // Find and delete the joined event
        const result = await JoinedEvent.findOneAndDelete({
            userId: userId,
            eventId: eventId // Keep as string
        });

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Event not found or you have not joined this event'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully left the event',
            data: result
        });

    } catch (error) {
        console.error('Leave event error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to leave event',
            error: error.message
        });
    }
});

module.exports = router;


// ✅ It allows authenticated users to join, view, and leave events using Express routes.

// 🧠 It uses the authenticate middleware to ensure only logged-in users can access these routes.

// 🗂️ It stores event participation details (like title, date, location, image, etc.) in the JoinedEvent MongoDB model.

// 🚀 The POST route lets users join an event, the GET route fetches all joined events, and the DELETE route lets them leave an event.

// 💾 It handles all operations safely with proper error handling and returns clear success or failure responses.