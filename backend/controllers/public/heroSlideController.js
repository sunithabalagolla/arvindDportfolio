const HeroSlide = require('../../models/content/HeroSlide');
const { 
  successResponse, 
  errorResponse, 
  notFoundResponse 
} = require('../../utils/helpers/responseFormatter');

/**
 * Public Controller for Hero Slides
 * Read-only operations for frontend display
 */

/**
 * Get All Active Hero Slides
 * GET /api/hero-slides
 */
const getActiveSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.getActiveSlides();

    return successResponse(
      res,
      200,
      'Hero slides retrieved successfully',
      {
        slides,
        total: slides.length,
        timestamp: new Date().toISOString()
      }
    );

  } catch (error) {
    console.error('❌ Get active slides error:', error);
    return errorResponse(
      res,
      500,
      'Failed to retrieve hero slides',
      error
    );
  }
};

/**
 * Get Single Active Slide by ID
 * GET /api/hero-slides/:id
 */
const getActiveSlideById = async (req, res) => {
  try {
    const slide = await HeroSlide.findOne({
      _id: req.params.id,
      isActive: true
    }).select('-cloudinaryId -__v');

    if (!slide) {
      return notFoundResponse(res, 'Slide not found or inactive');
    }

    return successResponse(
      res,
      200,
      'Slide retrieved successfully',
      slide
    );

  } catch (error) {
    console.error('❌ Get active slide error:', error);
    return errorResponse(res, 500, 'Failed to retrieve slide', error);
  }
};

/**
 * Get Slides Count
 * GET /api/hero-slides/count
 */
const getSlidesCount = async (req, res) => {
  try {
    const totalSlides = await HeroSlide.countDocuments();
    const activeSlides = await HeroSlide.countDocuments({ isActive: true });

    return successResponse(
      res,
      200,
      'Slides count retrieved successfully',
      {
        total: totalSlides,
        active: activeSlides,
        inactive: totalSlides - activeSlides
      }
    );

  } catch (error) {
    console.error('❌ Get slides count error:', error);
    return errorResponse(res, 500, 'Failed to retrieve slides count', error);
  }
};

/**
 * Get Featured Slides (First 3 active slides)
 * GET /api/hero-slides/featured
 */
const getFeaturedSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.find({ isActive: true })
      .sort({ order: 1 })
      .limit(3)
      .select('-cloudinaryId -__v');

    return successResponse(
      res,
      200,
      'Featured slides retrieved successfully',
      {
        slides,
        count: slides.length
      }
    );

  } catch (error) {
    console.error('❌ Get featured slides error:', error);
    return errorResponse(res, 500, 'Failed to retrieve featured slides', error);
  }
};

/**
 * Health Check for Hero Slides
 * GET /api/hero-slides/health
 */
const getHealthStatus = async (req, res) => {
  try {
    const totalSlides = await HeroSlide.countDocuments();
    const activeSlides = await HeroSlide.countDocuments({ isActive: true });
    
    const latestSlide = await HeroSlide.findOne({ isActive: true })
      .sort({ createdAt: -1 })
      .select('heading createdAt');

    return successResponse(
      res,
      200,
      'Hero slides service is healthy',
      {
        status: 'healthy',
        database: 'connected',
        statistics: {
          totalSlides,
          activeSlides,
          inactiveSlides: totalSlides - activeSlides
        },
        latestSlide: latestSlide ? {
          heading: latestSlide.heading,
          created: latestSlide.formattedDate
        } : null,
        timestamp: new Date().toISOString()
      }
    );

  } catch (error) {
    console.error('❌ Health check error:', error);
    return errorResponse(
      res,
      503,
      'Hero slides service unavailable',
      { status: 'unhealthy', error: error.message }
    );
  }
};

module.exports = {
  getActiveSlides,
  getActiveSlideById,
  getSlidesCount,
  getFeaturedSlides,
  getHealthStatus
};