// backend/routes/cart.js
const express = require('express');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const { authenticate } = require('../middleware/auth');
const { validateCartInput } = require('../middleware/validation');

const router = express.Router();

// All cart routes require authentication
router.use(authenticate);

router.get('/', getCart);
router.post('/add', validateCartInput, addToCart);
router.put('/update', validateCartInput, updateCartItem);
router.delete('/remove/:productId', removeFromCart);
router.delete('/clear', clearCart);

module.exports = router;