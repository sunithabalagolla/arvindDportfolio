// backend/controllers/cartController.js
const Cart = require('../models/Cart');
const Product = require('../models/Product');

/**
 * @desc Get user's cart
 * @route GET /api/cart
 * @access Private
 */
exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: 'Cart retrieved successfully',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message
    });
  }
};

/**
 * @desc Add item to cart
 * @route POST /api/cart/add
 * @access Private
 */
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Please provide product ID and quantity'
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be greater than 0'
      });
    }

    // Fetch product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if product is in stock
    if (!product.inStock) {
      return res.status(400).json({
        success: false,
        message: 'Product is out of stock'
      });
    }

    // Check stock quantity
    if (product.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.quantity} items available in stock`
      });
    }

    // Find or create cart for user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if product already in cart
    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice = existingItem.price * existingItem.quantity;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        discount: product.discount,
        totalPrice: product.price * quantity
      });
    }

    await cart.save();
    await cart.populate('items.productId');

    res.status(200).json({
      success: true,
      message: 'Product added to cart successfully',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to cart',
      error: error.message
    });
  }
};

/**
 * @desc Update cart item quantity
 * @route PUT /api/cart/update
 * @access Private
 */
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide product ID and quantity'
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be greater than 0'
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    // Check stock availability
    const product = await Product.findById(productId);
    if (product.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.quantity} items available in stock`
      });
    }

    item.quantity = quantity;
    item.totalPrice = item.price * quantity;

    await cart.save();
    await cart.populate('items.productId');

    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating cart',
      error: error.message
    });
  }
};

/**
 * @desc Remove item from cart
 * @route DELETE /api/cart/remove/:productId
 * @access Private
 */
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemExists = cart.items.find(item => item.productId.toString() === productId);
    if (!itemExists) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    await cart.save();
    await cart.populate('items.productId');

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing from cart',
      error: error.message
    });
  }
};

/**
 * @desc Clear entire cart
 * @route DELETE /api/cart/clear
 * @access Private
 */
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = [];
    cart.totalPrice = 0;
    cart.totalItems = 0;

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing cart',
      error: error.message
    });
  }
};