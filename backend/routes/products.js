// backend/routes/products.js
const express = require('express');
const {
  getAllProducts,
  getHomeProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSaleProducts,
  getInStockProducts
} = require('../controllers/productController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/auth');
const { validateProductInput, validateProductQuery } = require('../middleware/validation');

const router = express.Router();

// PUBLIC ROUTES
router.get('/', validateProductQuery, getAllProducts);
router.get('/home', getHomeProducts);
router.get('/sale/all', getSaleProducts);
router.get('/stock/all', getInStockProducts);
router.get('/search', searchProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);

// ADMIN ROUTES
router.post('/', authenticate, authorize('admin'), validateProductInput, createProduct);
router.put('/:id', authenticate, authorize('admin'), validateProductInput, updateProduct);
router.delete('/:id', authenticate, authorize('admin'), deleteProduct);

module.exports = router;