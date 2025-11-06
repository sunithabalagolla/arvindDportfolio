const HeroSlide = require('../../models/content/HeroSlide');
const { uploadToCloudinary, deleteFromCloudinary } = require('../../utils/helpers/cloudinaryHelper');
const { 
  successResponse, 
  errorResponse, 
  createdResponse, 
  notFoundResponse,
  validationErrorResponse 
} = require('../../utils/helpers/responseFormatter');

/**
 * Admin Controller for Hero Slides Management
 * All operations require admin authentication
 */

/**
 * Create New Hero Slide
 * POST /admin/hero-slides
 */
const createSlide = async (req, res) => {
  try {
     // ✅ ADD THESE 5 LINES:
    console.log('🟢 CREATE SLIDE - REQUEST RECEIVED');
    console.log('📦 Request body:', req.body);
    console.log('🖼️ Request file:', req.file);
    console.log('🔍 All request keys:', Object.keys(req));
    
    // Check if body parser is working
    if (!req.body || Object.keys(req.body).length === 0) {
      console.log('❌ REQ.BODY IS EMPTY - Body parser issue!');
    }
    const { heading, paragraph, buttonText, buttonLink, alignment, order, isActive } = req.body;

    // Validate required fields
    if (!heading || !paragraph) {
      return validationErrorResponse(
        res,
        'Missing required fields',
        [
          { field: 'heading', message: 'Heading is required' },
          { field: 'paragraph', message: 'Description is required' }
        ]
      );
    }

    // Check if image was uploaded
    if (!req.file) {
      return validationErrorResponse(
        res,
        'Image is required',
        [{ field: 'image', message: 'Please upload an image' }]
      );
    }

    // Upload image to Cloudinary
    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      'hero-slides',
      `slide-${Date.now()}`
    );

    // Create new slide
    const newSlide = new HeroSlide({
      heading,
      paragraph,
      imageUrl: uploadResult.url,
      cloudinaryId: uploadResult.publicId,
      buttonText: buttonText || 'Know More',
      buttonLink: buttonLink || '#',
      alignment: alignment || 'left',
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
      createdBy: req.user.id
    });

    await newSlide.save();

    // Populate creator info
    await newSlide.populate('createdBy', 'name email');

    console.log(`✅ Slide created: ${newSlide.heading} by ${req.user.email}`);

    return createdResponse(
      res,
      'Hero slide created successfully',
      newSlide
    );

  } catch (error) {
    console.error('❌ Create slide error:', error);
    return errorResponse(
      res,
      500,
      'Failed to create hero slide',
      error
    );
  }
};

/**
 * Get All Slides (Admin - includes inactive)
 * GET /admin/hero-slides
 */
const getAllSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.find()
      .sort({ order: 1, createdAt: -1 })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    return successResponse(
      res,
      200,
      'Slides retrieved successfully',
      {
        slides,
        total: slides.length
      }
    );

  } catch (error) {
    console.error('❌ Get all slides error:', error);
    return errorResponse(res, 500, 'Failed to retrieve slides', error);
  }
};

/**
 * Get Single Slide by ID
 * GET /admin/hero-slides/:id
 */
const getSlideById = async (req, res) => {
  try {
    const slide = await HeroSlide.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!slide) {
      return notFoundResponse(res, 'Slide not found');
    }

    return successResponse(
      res,
      200,
      'Slide retrieved successfully',
      slide
    );

  } catch (error) {
    console.error('❌ Get slide error:', error);
    return errorResponse(res, 500, 'Failed to retrieve slide', error);
  }
};

/**
 * Update Hero Slide
 * PUT /admin/hero-slides/:id
 */
const updateSlide = async (req, res) => {
  try {
    const { heading, paragraph, buttonText, buttonLink, alignment, order, isActive } = req.body;
    
    const slide = await HeroSlide.findById(req.params.id);
    
    if (!slide) {
      return notFoundResponse(res, 'Slide not found');
    }

    let cloudinaryUpdate = {};
    
    // If new image uploaded, update Cloudinary
    if (req.file) {
      // Delete old image from Cloudinary
      await deleteFromCloudinary(slide.cloudinaryId);
      
      // Upload new image
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        'hero-slides',
        `slide-${Date.now()}`
      );
      
      cloudinaryUpdate = {
        imageUrl: uploadResult.url,
        cloudinaryId: uploadResult.publicId
      };
    }

    // Update slide data
    const updateData = {
      heading: heading || slide.heading,
      paragraph: paragraph || slide.paragraph,
      buttonText: buttonText || slide.buttonText,
      buttonLink: buttonLink || slide.buttonLink,
      alignment: alignment || slide.alignment,
      order: order !== undefined ? order : slide.order,
      isActive: isActive !== undefined ? isActive : slide.isActive,
      updatedBy: req.user.id,
      ...cloudinaryUpdate
    };

    const updatedSlide = await HeroSlide.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email')
     .populate('updatedBy', 'name email');

    console.log(`✅ Slide updated: ${updatedSlide.heading} by ${req.user.email}`);

    return successResponse(
      res,
      200,
      'Slide updated successfully',
      updatedSlide
    );

  } catch (error) {
    console.error('❌ Update slide error:', error);
    return errorResponse(res, 500, 'Failed to update slide', error);
  }
};

/**
 * Delete Hero Slide
 * DELETE /admin/hero-slides/:id
 */
const deleteSlide = async (req, res) => {
  try {
    const slide = await HeroSlide.findById(req.params.id);
    
    if (!slide) {
      return notFoundResponse(res, 'Slide not found');
    }

    // Delete image from Cloudinary
    await deleteFromCloudinary(slide.cloudinaryId);

    // Delete from database
    await HeroSlide.findByIdAndDelete(req.params.id);

    console.log(`✅ Slide deleted: ${slide.heading} by ${req.user.email}`);

    return successResponse(
      res,
      200,
      'Slide deleted successfully',
      { deletedId: req.params.id }
    );

  } catch (error) {
    console.error('❌ Delete slide error:', error);
    return errorResponse(res, 500, 'Failed to delete slide', error);
  }
};

/**
 * Toggle Slide Active Status
 * PATCH /admin/hero-slides/:id/toggle
 */
const toggleSlideStatus = async (req, res) => {
  try {
    const slide = await HeroSlide.findById(req.params.id);
    
    if (!slide) {
      return notFoundResponse(res, 'Slide not found');
    }

    slide.isActive = !slide.isActive;
    slide.updatedBy = req.user.id;
    
    await slide.save();

    await slide.populate('updatedBy', 'name email');

    console.log(`✅ Slide status toggled: ${slide.heading} - ${slide.isActive ? 'Active' : 'Inactive'}`);

    return successResponse(
      res,
      200,
      `Slide ${slide.isActive ? 'activated' : 'deactivated'} successfully`,
      slide
    );

  } catch (error) {
    console.error('❌ Toggle slide status error:', error);
    return errorResponse(res, 500, 'Failed to toggle slide status', error);
  }
};

/**
 * Reorder Slides
 * PUT /admin/hero-slides/reorder
 */
const reorderSlides = async (req, res) => {
  try {
    const { slidesOrder } = req.body; // Array of { id, order }

    if (!slidesOrder || !Array.isArray(slidesOrder)) {
      return validationErrorResponse(
        res,
        'Invalid order data',
        [{ field: 'slidesOrder', message: 'slidesOrder must be an array' }]
      );
    }

    const updatePromises = slidesOrder.map(({ id, order }) =>
      HeroSlide.findByIdAndUpdate(id, { order, updatedBy: req.user.id }, { new: true })
    );

    await Promise.all(updatePromises);

    console.log(`✅ Slides reordered by ${req.user.email}`);

    return successResponse(
      res,
      200,
      'Slides reordered successfully',
      { updatedCount: slidesOrder.length }
    );

  } catch (error) {
    console.error('❌ Reorder slides error:', error);
    return errorResponse(res, 500, 'Failed to reorder slides', error);
  }
};

module.exports = {
  createSlide,
  getAllSlides,
  getSlideById,
  updateSlide,
  deleteSlide,
  toggleSlideStatus,
  reorderSlides
};