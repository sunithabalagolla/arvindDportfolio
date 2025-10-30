const express = require('express');
const router = express.Router();

// Middleware Imports
const { isAdmin } = require('../../middleware/admin/adminAuth');
const { 
  uploadSingleImage, 
  handleUploadError, 
  validateImageUpload 
} = require('../../middleware/admin/upload/imageUpload');

// Controller Imports
const {
  createSlide,
  getAllSlides,
  getSlideById,
  updateSlide,
  deleteSlide,
  toggleSlideStatus,
  reorderSlides
} = require('../../controllers/admin/heroSlideController');

// ==============================================
// ROUTE DEFINITIONS
// ==============================================

/**
 * 🚀 ADMIN HERO SLIDE ROUTES
 * All routes protected with admin authentication
 */

// POST /admin/hero-slides - Create new slide with image upload
router.post(
  '/',
  isAdmin,
  uploadSingleImage,
  handleUploadError,
  validateImageUpload,
  createSlide
);

// GET /admin/hero-slides - Get all slides (including inactive)
router.get(
  '/',
  isAdmin,
  getAllSlides
);

// GET /admin/hero-slides/:id - Get single slide by ID
router.get(
  '/:id',
  isAdmin,
  getSlideById
);

// PUT /admin/hero-slides/:id - Update slide (image optional)
router.put(
  '/:id',
  isAdmin,
  uploadSingleImage, // Image upload is optional for updates
  handleUploadError,
  updateSlide
);

// DELETE /admin/hero-slides/:id - Delete slide permanently
router.delete(
  '/:id',
  isAdmin,
  deleteSlide
);

// PATCH /admin/hero-slides/:id/toggle - Toggle active status
router.patch(
  '/:id/toggle',
  isAdmin,
  toggleSlideStatus
);

// PUT /admin/hero-slides/reorder - Bulk reorder slides
router.put(
  '/reorder',
  isAdmin,
  reorderSlides
);

module.exports = router;