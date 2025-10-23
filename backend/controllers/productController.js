// backend/controllers/productController.js
const Product = require('../models/Product');

/**
 * @desc Get all products with filtering and sorting
 * @route GET /api/products
 * @access Public
 */
exports.getAllProducts = async (req, res) => {
  try {
    const { category, sortBy, minPrice, maxPrice, search, limit = 10, page = 1 } = req.query;

    // Build filter object
    let filter = {};

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { type: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    let sortObj = {};
    if (sortBy === 'price-low') {
      sortObj.price = 1;
    } else if (sortBy === 'price-high') {
      sortObj.price = -1;
    } else if (sortBy === 'rating') {
      sortObj.rating = -1;
    } else if (sortBy === 'newest') {
      sortObj.createdAt = -1;
    } else {
      sortObj.createdAt = -1;
    }

    // Calculate pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Fetch products
    const products = await Product.find(filter)
      .sort(sortObj)
      .limit(limitNum)
      .skip(skip);

    // Get total count
    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

/**
 * @desc Get limited products for home page
 * @route GET /api/products/home
 * @access Public
 */
exports.getHomeProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4;

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching home products',
      error: error.message
    });
  }
};

/**
 * @desc Get single product by ID
 * @route GET /api/products/:id
 * @access Public
 */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

/**
 * @desc Get products by category
 * @route GET /api/products/category/:category
 * @access Public
 */
exports.getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const products = await Product.findByCategory(category);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

/**
 * @desc Search products
 * @route GET /api/products/search
 * @access Public
 */
exports.searchProducts = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search query'
      });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { type: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching products',
      error: error.message
    });
  }
};

/**
 * @desc Create a new product (Admin only)
 * @route POST /api/products
 * @access Private/Admin
 */
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

/**
 * @desc Update product (Admin only)
 * @route PUT /api/products/:id
 * @access Private/Admin
 */
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

/**
 * @desc Delete product (Admin only)
 * @route DELETE /api/products/:id
 * @access Private/Admin
 */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};

/**
 * @desc Get all products on sale
 * @route GET /api/products/sale/all
 * @access Public
 */
exports.getSaleProducts = async (req, res) => {
  try {
    const products = await Product.findOnSale();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sale products',
      error: error.message
    });
  }
};

/**
 * @desc Get all in-stock products
 * @route GET /api/products/stock/all
 * @access Public
 */
exports.getInStockProducts = async (req, res) => {
  try {
    const products = await Product.findInStock();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching in-stock products',
      error: error.message
    });
  }
};



// This file handles all product operations - getting, searching, filtering, creating, updating, and deleting products.
// What Each Function Does:
// 1. getAllProducts()

// Gets all products with filtering and sorting
// Filters: category, price range, search
// Sorts: price (low/high), rating, newest
// Supports pagination (page, limit)
// Returns: count, total, pages, data

// 2. getHomeProducts()

// Gets limited products for home page
// Default limit: 4
// Sorted by newest first
// Used by ShopSection component

// 3. getProductById()

// Gets single product by MongoDB ID
// Returns full product details
// Returns 404 if not found

// 4. getProductsByCategory()

// Gets all products in specific category
// Uses Product model static method
// Returns: count, data

// 5. searchProducts()

// Searches products by name, description, type, category
// Case-insensitive regex search
// Requires query parameter q
// Returns: count, data

// 6. createProduct() (Admin only)

// Creates new product
// Validates input with middleware
// Auto-calculates discount if needed
// Returns: created product

// 7. updateProduct() (Admin only)

// Updates existing product
// Runs validators on updated fields
// Returns: updated product
// Returns 404 if not found

// 8. deleteProduct() (Admin only)

// Deletes product by ID
// Returns 404 if not found
// Returns empty data on success

// 9. getSaleProducts()

// Gets all products with discount > 0
// Uses Product model static method
// Returns: count, data

// 10. getInStockProducts()

// Gets all in-stock products
// Uses Product model static method
// Returns: count, data