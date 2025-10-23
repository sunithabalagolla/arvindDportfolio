// backend/routes/wishlist.js
const express = require('express');
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
  toggleWishlist,
  clearWishlist
} = require('../controllers/wishlistController');
const { authenticate } = require('../middleware/auth');
const { validateWishlistInput } = require('../middleware/validation');

const router = express.Router();

// All wishlist routes require authentication
router.use(authenticate);

router.get('/', getWishlist);
router.post('/add', validateWishlistInput, addToWishlist);
router.delete('/remove/:productId', removeFromWishlist);
router.get('/check/:productId', checkWishlist);
router.post('/toggle', validateWishlistInput, toggleWishlist);
router.delete('/clear', clearWishlist);

module.exports = router;