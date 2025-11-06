const express = require('express');
const router = express.Router();

// Middleware Imports
const { adminAuthFull } = require('../../middleware/admin/adminAuth');
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
 * 
 * ⚠️ CRITICAL: Specific routes MUST come before parameterized routes!
 * Order matters: /reorder must come BEFORE /:id
 */

// ==============================================
// COLLECTION ROUTES (no ID parameter)
// ==============================================

// GET /admin/hero-slides - Get all slides (including inactive)
router.get(
  '/',
  adminAuthFull,
  getAllSlides
);

// POST /admin/hero-slides - Create new slide with image upload
router.post(
  '/',
  adminAuthFull,
  uploadSingleImage,
  handleUploadError,
  validateImageUpload,
  createSlide
);

// PUT /admin/hero-slides/reorder - Bulk reorder slides
// ⚠️ MUST come before /:id route!
router.put(
  '/reorder',
  adminAuthFull,
  reorderSlides
);

// ==============================================
// SINGLE ITEM ROUTES (with ID parameter)
// ==============================================

// GET /admin/hero-slides/:id - Get single slide by ID
router.get(
  '/:id',
  adminAuthFull,
  getSlideById
);

// PUT /admin/hero-slides/:id - Update slide (image optional)
router.put(
  '/:id',
  adminAuthFull,
  uploadSingleImage,
  handleUploadError,
  updateSlide
);

// DELETE /admin/hero-slides/:id - Delete slide permanently
router.delete(
  '/:id',
  adminAuthFull,
  deleteSlide
);

// PATCH /admin/hero-slides/:id/toggle - Toggle active status
router.patch(
  '/:id/toggle',
  adminAuthFull,
  toggleSlideStatus
);

// ==============================================
// ROUTE SUMMARY
// ==============================================
console.log('✅ Hero Slide Admin Routes Loaded:');
console.log('   GET    /admin/hero-slides          → Get all slides');
console.log('   POST   /admin/hero-slides          → Create slide');
console.log('   PUT    /admin/hero-slides/reorder  → Reorder slides');
console.log('   GET    /admin/hero-slides/:id      → Get single slide');
console.log('   PUT    /admin/hero-slides/:id      → Update slide');
console.log('   DELETE /admin/hero-slides/:id      → Delete slide');
console.log('   PATCH  /admin/hero-slides/:id/toggle → Toggle status');

module.exports = router;