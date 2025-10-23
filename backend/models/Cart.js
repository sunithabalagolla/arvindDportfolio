// backend/models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: true
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'Product ID is required']
        },
        name: {
          type: String,
          required: [true, 'Product name is required']
        },
        price: {
          type: Number,
          required: [true, 'Product price is required'],
          min: [0, 'Price cannot be negative']
        },
        image: {
          type: String,
          required: [true, 'Product image is required']
        },
        quantity: {
          type: Number,
          required: [true, 'Quantity is required'],
          min: [1, 'Quantity must be at least 1'],
          max: [1000, 'Quantity cannot exceed 1000']
        },
        discount: {
          type: Number,
          default: 0,
          min: [0, 'Discount cannot be negative'],
          max: [100, 'Discount cannot exceed 100%']
        },
        totalPrice: {
          type: Number,
          required: [true, 'Total price is required']
        },
        addedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    totalPrice: {
      type: Number,
      default: 0,
      min: [0, 'Total price cannot be negative']
    },
    totalItems: {
      type: Number,
      default: 0,
      min: [0, 'Total items cannot be negative']
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
    timestamps: true
  }
);

// Index for faster queries
cartSchema.index({ userId: 1 });

// Pre-save middleware: Calculate totals before saving
cartSchema.pre('save', function(next) {
  this.totalPrice = this.items.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);

  this.totalItems = this.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  this.totalPrice = Math.round(this.totalPrice * 100) / 100;
  next();
});

// Pre-save middleware: Update updatedAt timestamp
cartSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;