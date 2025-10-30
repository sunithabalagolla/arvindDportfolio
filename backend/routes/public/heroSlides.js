const express = require('express');
const router = express.Router();

// Controllers
const {
  getActiveSlides,
  getActiveSlideById,
  getSlidesCount,
  getFeaturedSlides,
  getHealthStatus
} = require('../../controllers/public/heroSlideController');

/**
 * PUBLIC HERO SLIDE ROUTES
 * No authentication required - for frontend display
 */

// Health check endpoint - MUST BE FIRST!
router.get('/health', getHealthStatus);

// Get all active slides for carousel
router.get('/', getActiveSlides);

// Get slides statistics
router.get('/count', getSlidesCount);

// Get featured slides (first 3)
router.get('/featured', getFeaturedSlides);

// Get single active slide - MUST BE LAST!
router.get('/:id', getActiveSlideById);

module.exports = router;