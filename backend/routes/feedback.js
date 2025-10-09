const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const feedbackController = require('../controllers/feedbackController');
const { optionalAuth, authenticate, requireAdmin } = require('../middleware/auth');

// Validation middleware
const feedbackValidation = [
    body('message')
        .trim()
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ min: 10, max: 1000 })
        .withMessage('Message must be between 10 and 1000 characters'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Please provide a valid email address')
];

// Public routes (can be submitted by anyone)
// optionalAuth will attach user info if logged in, but won't require it
router.post(
    '/concern',
    optionalAuth,
    feedbackValidation,
    feedbackController.submitConcern
);

router.post(
    '/feedback',
    optionalAuth,
    feedbackValidation,
    feedbackController.submitFeedback
);

// Admin routes (require authentication and admin privileges)
router.get(
    '/all',
    authenticate,
    requireAdmin,
    feedbackController.getAllFeedback
);

router.patch(
    '/:id',   
  authenticate,
    requireAdmin,
    feedbackController.updateFeedbackStatus
);

router.delete(
    '/:id',
    authenticate,
    requireAdmin,
    feedbackController.deleteFeedback
);

module.exports = router;

// This router handles feedback submission for anyone and lets admins view, update, or delete feedback, with input validation and optional or required authentication.”