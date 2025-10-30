const mongoose = require('mongoose');

/**
 * Hero Slide Schema
 * Stores carousel slide data for homepage hero section
 */
const heroSlideSchema = new mongoose.Schema(
  {
    // Slide content
    heading: {
      type: String,
      required: [true, 'Heading is required'],
      trim: true,
      maxlength: [100, 'Heading cannot exceed 100 characters']
    },
    
    paragraph: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },

    // Image details
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      validate: {
        validator: function(url) {
          return url.startsWith('https://res.cloudinary.com/');
        },
        message: 'Image URL must be a valid Cloudinary URL'
      }
    },

    cloudinaryId: {
      type: String,
      required: [true, 'Cloudinary ID is required']
    },

    // Layout settings
    alignment: {
      type: String,
      enum: ['left', 'center', 'right'],
      default: 'left'
    },

    // Call-to-action button
    buttonText: {
      type: String,
      default: 'Know More',
      trim: true,
      maxlength: [30, 'Button text cannot exceed 30 characters']
    },

    buttonLink: {
      type: String,
      default: '#',
      trim: true,
      validate: {
        validator: function(link) {
          return link === '#' || link.startsWith('http');
        },
        message: 'Button link must be "#" or a valid URL'
      }
    },

    // Display order and visibility
    order: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Order cannot be negative']
    },

    isActive: {
      type: Boolean,
      default: true
    },

    // Metadata
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    toJSON: { 
      virtuals: true,
      transform: function(doc, ret) {
        // Remove internal fields from API response
        delete ret.cloudinaryId;
        delete ret.__v;
        return ret;
      }
    },
    toObject: { virtuals: true }
  }
);

// Indexes for better query performance
heroSlideSchema.index({ order: 1 });
heroSlideSchema.index({ isActive: 1 });
heroSlideSchema.index({ createdAt: -1 });

// Pre-save hook: Auto-increment order if not provided
heroSlideSchema.pre('save', async function(next) {
  if (this.isNew && (!this.order || this.order === 0)) {
    try {
      const maxOrder = await this.constructor.findOne().sort('-order').select('order');
      this.order = maxOrder ? maxOrder.order + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Virtual for formatted creation date
heroSlideSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-IN');
});

// Static method: Get all active slides in order
heroSlideSchema.statics.getActiveSlides = async function() {
  return this.find({ isActive: true })
    .sort({ order: 1 })
    .populate('createdBy', 'name email')
    .select('-cloudinaryId -__v');
};

// Static method: Get slide by ID with creator info
heroSlideSchema.statics.getSlideById = async function(id) {
  return this.findById(id)
    .populate('createdBy', 'name email')
    .populate('updatedBy', 'name email');
};

// Instance method: Toggle active status
heroSlideSchema.methods.toggleActive = async function() {
  this.isActive = !this.isActive;
  return this.save();
};

// Instance method: Update order with validation
heroSlideSchema.methods.updateOrder = async function(newOrder) {
  if (newOrder < 0) {
    throw new Error('Order cannot be negative');
  }
  this.order = newOrder;
  return this.save();
};

const HeroSlide = mongoose.model('HeroSlide', heroSlideSchema);

module.exports = HeroSlide;