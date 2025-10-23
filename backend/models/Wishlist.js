// backend/models/Wishlist.js
const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: true
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
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
    timestamps: true
  }
);

// Index for faster queries
wishlistSchema.index({ userId: 1 }); // For finding wishlist by user

// Pre-save middleware: Update updatedAt timestamp
wishlistSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Instance method: Add product to wishlist
wishlistSchema.methods.addProduct = function(productId) {
  // Check if product already exists
  if (this.products.includes(productId)) {
    throw new Error('Product already in wishlist');
  }

  this.products.push(productId);
  return this.save();
};

// Instance method: Remove product from wishlist
wishlistSchema.methods.removeProduct = function(productId) {
  this.products = this.products.filter(
    id => id.toString() !== productId.toString()
  );
  return this.save();
};

// Instance method: Check if product is in wishlist
wishlistSchema.methods.hasProduct = function(productId) {
  return this.products.some(
    id => id.toString() === productId.toString()
  );
};

// Instance method: Toggle product (add if not present, remove if present)
wishlistSchema.methods.toggleProduct = function(productId) {
  if (this.hasProduct(productId)) {
    return this.removeProduct(productId);
  } else {
    return this.addProduct(productId);
  }
};

// Instance method: Clear entire wishlist
wishlistSchema.methods.clearWishlist = function() {
  this.products = [];
  return this.save();
};

// Instance method: Get product count
wishlistSchema.methods.getProductCount = function() {
  return this.products.length;
};

// Instance method: Get all products
wishlistSchema.methods.getProducts = function() {
  return this.populate('products');
};

// Static method: Find wishlist by user ID
wishlistSchema.statics.findByUserId = function(userId) {
  return this.findOne({ userId }).populate('products');
};

// Static method: Create or get wishlist for user
wishlistSchema.statics.findOrCreateWishlist = async function(userId) {
  let wishlist = await this.findOne({ userId });
  
  if (!wishlist) {
    wishlist = new this({ userId, products: [] });
    await wishlist.save();
  }
  
  return wishlist;
};

// Static method: Check if product is in user's wishlist
wishlistSchema.statics.isProductInWishlist = async function(userId, productId) {
  const wishlist = await this.findOne({ userId });
  
  if (!wishlist) {
    return false;
  }
  
  return wishlist.hasProduct(productId);
};

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;


// Explanation: Wishlist Model
// This file defines the MongoDB schema for wishlists - stores products users save for later.
// Schema Structure:
// Main Fields:

// userId - Reference to the user who owns the wishlist (unique - one wishlist per user)
// products - Array of product IDs user saved
// createdAt - When wishlist was created
// updatedAt - When wishlist was last modified

// Simple Structure:
// Unlike Cart, Wishlist only stores product references (IDs), not quantity or prices. Just a list of favorite products.