// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      minlength: [3, 'Product name must be at least 3 characters'],
      maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    price: {
      type: Number,
      required: [true, 'Please provide a product price'],
      min: [0, 'Price cannot be negative']
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price cannot be negative'],
      default: null
    },
    category: {
      type: String,
      enum: {
        values: ['apparel', 'accessories', 'flags', 'others'],
        message: 'Category must be one of: apparel, accessories, flags, others'
      },
      required: [true, 'Please select a category']
    },
    type: {
      type: String,
      required: [true, 'Please provide product type'],
      trim: true,
      minlength: [2, 'Type must be at least 2 characters'],
      maxlength: [50, 'Type cannot exceed 50 characters']
    },
    image: {
      type: String,
      required: [true, 'Please provide a product image URL']
    },
    images: {
      type: [String],
      default: []
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot exceed 100%']
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5']
    },
    reviews: {
      type: Number,
      default: 0,
      min: [0, 'Reviews count cannot be negative']
    },
    badge: {
      type: String,
      enum: {
        values: [
          'Best Seller',
          'Top Rated',
          'Popular',
          'Best Value',
          'New',
          'Limited',
          'Exclusive',
          'Bundle'
        ],
        message: 'Please select a valid badge'
      },
      default: 'Popular'
    },
    inStock: {
      type: Boolean,
      default: true
    },
    quantity: {
      type: Number,
      default: 0,
      min: [0, 'Quantity cannot be negative']
    },
    specifications: {
      size: String,
      color: String,
      material: String,
      weight: String,
      dimensions: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for faster queries
productSchema.index({ name: 'text', description: 'text' }); // For text search
productSchema.index({ category: 1 }); // For filtering by category
productSchema.index({ price: 1 }); // For sorting by price
productSchema.index({ rating: -1 }); // For sorting by rating
productSchema.index({ createdAt: -1 }); // For sorting by newest

// Pre-save middleware: Calculate discount if not provided
productSchema.pre('save', function(next) {
  if (this.originalPrice && this.price && !this.discount) {
    const calculatedDiscount = ((this.originalPrice - this.price) / this.originalPrice) * 100;
    this.discount = Math.round(calculatedDiscount);
  }
  next();
});

// Pre-save middleware: Update stock status based on quantity
productSchema.pre('save', function(next) {
  if (this.quantity <= 0) {
    this.inStock = false;
  } else {
    this.inStock = true;
  }
  next();
});

// Pre-save middleware: Update the updatedAt timestamp
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual field: Calculate savings amount
productSchema.virtual('savings').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return this.originalPrice - this.price;
  }
  return 0;
});

// Virtual field: Check if product is on sale
productSchema.virtual('onSale').get(function() {
  return this.discount > 0;
});

// Instance method: Check if enough stock available
productSchema.methods.hasStock = function(requestedQuantity) {
  return this.inStock && this.quantity >= requestedQuantity;
};

// Instance method: Reduce stock after purchase
productSchema.methods.reduceStock = function(quantity) {
  if (this.quantity >= quantity) {
    this.quantity -= quantity;
    if (this.quantity === 0) {
      this.inStock = false;
    }
    return this.save();
  } else {
    throw new Error('Insufficient stock');
  }
};

// Instance method: Increase stock
productSchema.methods.addStock = function(quantity) {
  this.quantity += quantity;
  if (this.quantity > 0) {
    this.inStock = true;
  }
  return this.save();
};

// Static method: Find products in stock
productSchema.statics.findInStock = function() {
  return this.find({ inStock: true });
};

// Static method: Find products by category
productSchema.statics.findByCategory = function(category) {
  return this.find({ category });
};

// Static method: Find products on sale
productSchema.statics.findOnSale = function() {
  return this.find({ discount: { $gt: 0 } });
};

// Static method: Search products using text index
productSchema.statics.searchProducts = function(query) {
  return this.find(
    { $text: { $search: query } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;