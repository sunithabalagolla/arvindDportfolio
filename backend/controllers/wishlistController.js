// backend/controllers/wishlistController.js
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// @desc Get user's wishlist
// @route GET /api/wishlist
// @access Private
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    let wishlist = await Wishlist.findOne({ userId }).populate('products');

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
      await wishlist.save();
    }

    res.status(200).json({
      success: true,
      message: 'Wishlist retrieved successfully',
      count: wishlist.products.length,
      data: wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching wishlist',
      error: error.message
    });
  }
};

// @desc Add product to wishlist
// @route POST /api/wishlist/add
// @access Private
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide product ID'
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
    }

    if (wishlist.products.includes(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Product already in wishlist'
      });
    }

    wishlist.products.push(productId);
    await wishlist.save();
    await wishlist.populate('products');

    res.status(200).json({
      success: true,
      message: 'Product added to wishlist successfully',
      count: wishlist.products.length,
      data: wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to wishlist',
      error: error.message
    });
  }
};

// @desc Remove product from wishlist
// @route DELETE /api/wishlist/remove/:productId
// @access Private
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }

    if (!wishlist.products.includes(productId)) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in wishlist'
      });
    }

    wishlist.products = wishlist.products.filter(id => id.toString() !== productId);
    await wishlist.save();
    await wishlist.populate('products');

    res.status(200).json({
      success: true,
      message: 'Product removed from wishlist',
      count: wishlist.products.length,
      data: wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing from wishlist',
      error: error.message
    });
  }
};

// @desc Check if product is in wishlist
// @route GET /api/wishlist/check/:productId
// @access Private
exports.checkWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(200).json({
        success: true,
        inWishlist: false,
        message: 'Product is not in wishlist'
      });
    }

    const inWishlist = wishlist.products.some(id => id.toString() === productId);

    res.status(200).json({
      success: true,
      inWishlist,
      message: inWishlist ? 'Product is in wishlist' : 'Product is not in wishlist'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking wishlist',
      error: error.message
    });
  }
};

// @desc Toggle product in wishlist
// @route POST /api/wishlist/toggle
// @access Private
exports.toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide product ID'
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
    }

    const index = wishlist.products.findIndex(id => id.toString() === productId);

    if (index > -1) {
      wishlist.products.splice(index, 1);
      await wishlist.save();
      await wishlist.populate('products');

      return res.status(200).json({
        success: true,
        message: 'Product removed from wishlist',
        added: false,
        count: wishlist.products.length,
        data: wishlist
      });
    } else {
      wishlist.products.push(productId);
      await wishlist.save();
      await wishlist.populate('products');

      return res.status(200).json({
        success: true,
        message: 'Product added to wishlist',
        added: true,
        count: wishlist.products.length,
        data: wishlist
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling wishlist',
      error: error.message
    });
  }
};

// @desc Clear entire wishlist
// @route DELETE /api/wishlist/clear
// @access Private
exports.clearWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }

    wishlist.products = [];
    await wishlist.save();

    res.status(200).json({
      success: true,
      message: 'Wishlist cleared successfully',
      count: 0,
      data: wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing wishlist',
      error: error.message
    });
  }
};