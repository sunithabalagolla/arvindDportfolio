// // ===== BACKEND FILES =====

// // 1. models/Product.js
// import mongoose from 'mongoose';

// const ProductSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     originalPrice: {
//         type: Number
//     },
//     category: {
//         type: String,
//         enum: ['apparel', 'accessories', 'flags', 'others'],
//         required: true
//     },
//     type: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     images: [String], // Multiple images
//     discount: {
//         type: Number,
//         default: 0
//     },
//     rating: {
//         type: Number,
//         default: 0,
//         min: 0,
//         max: 5
//     },
//     reviews: {
//         type: Number,
//         default: 0
//     },
//     inStock: {
//         type: Boolean,
//         default: true
//     },
//     quantity: {
//         type: Number,
//         default: 0
//     },
//     specifications: mongoose.Schema.Types.Mixed,
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// export default mongoose.model('Product', ProductSchema);


// // 2. models/Cart.js
// import mongoose from 'mongoose';

// const CartSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     items: [{
//         productId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Product',
//             required: true
//         },
//         quantity: {
//             type: Number,
//             required: true,
//             default: 1
//         },
//         price: {
//             type: Number,
//             required: true
//         }
//     }],
//     totalPrice: {
//         type: Number,
//         default: 0
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// export default mongoose.model('Cart', CartSchema);


// // 3. models/Wishlist.js
// import mongoose from 'mongoose';

// const WishlistSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     products: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product'
//     }],
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// export default mongoose.model('Wishlist', WishlistSchema);


// // 4. controllers/productController.js
// import Product from '../models/Product.js';

// // Get all products
// export const getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.status(200).json({
//             success: true,
//             count: products.length,
//             data: products
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching products',
//             error: error.message
//         });
//     }
// };

// // Get home products (limited)
// export const getHomeProducts = async (req, res) => {
//     try {
//         const limit = req.query.limit || 4;
//         const products = await Product.find().limit(parseInt(limit));
//         res.status(200).json({
//             success: true,
//             data: products
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching home products',
//             error: error.message
//         });
//     }
// };

// // Get product by ID
// export const getProductById = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Product not found'
//             });
//         }
//         res.status(200).json({
//             success: true,
//             data: product
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching product',
//             error: error.message
//         });
//     }
// };

// // Get products by category
// export const getProductsByCategory = async (req, res) => {
//     try {
//         const category = req.params.category;
//         const products = await Product.find({ category });
//         res.status(200).json({
//             success: true,
//             count: products.length,
//             data: products
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching products',
//             error: error.message
//         });
//     }
// };

// // Search products
// export const searchProducts = async (req, res) => {
//     try {
//         const query = req.query.q;
//         const products = await Product.find({
//             $or: [
//                 { name: { $regex: query, $options: 'i' } },
//                 { description: { $regex: query, $options: 'i' } }
//             ]
//         });
//         res.status(200).json({
//             success: true,
//             count: products.length,
//             data: products
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error searching products',
//             error: error.message
//         });
//     }
// };

// // Create product (Admin)
// export const createProduct = async (req, res) => {
//     try {
//         const product = new Product(req.body);
//         await product.save();
//         res.status(201).json({
//             success: true,
//             message: 'Product created successfully',
//             data: product
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: 'Error creating product',
//             error: error.message
//         });
//     }
// };

// // Update product (Admin)
// export const updateProduct = async (req, res) => {
//     try {
//         const product = await Product.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true, runValidators: true }
//         );
//         res.status(200).json({
//             success: true,
//             message: 'Product updated successfully',
//             data: product
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: 'Error updating product',
//             error: error.message
//         });
//     }
// };

// // Delete product (Admin)
// export const deleteProduct = async (req, res) => {
//     try {
//         await Product.findByIdAndDelete(req.params.id);
//         res.status(200).json({
//             success: true,
//             message: 'Product deleted successfully'
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error deleting product',
//             error: error.message
//         });
//     }
// };


// // 5. routes/products.js
// import express from 'express';
// import {
//     getAllProducts,
//     getHomeProducts,
//     getProductById,
//     getProductsByCategory,
//     searchProducts,
//     createProduct,
//     updateProduct,
//     deleteProduct
// } from '../controllers/productController.js';
// import { authenticate, authorize } from '../middleware/auth.js';

// const router = express.Router();

// // Public routes
// router.get('/', getAllProducts);
// router.get('/home', getHomeProducts);
// router.get('/search', searchProducts);
// router.get('/category/:category', getProductsByCategory);
// router.get('/:id', getProductById);

// // Admin routes
// router.post('/', authenticate, authorize('admin'), createProduct);
// router.put('/:id', authenticate, authorize('admin'), updateProduct);
// router.delete('/:id', authenticate, authorize('admin'), deleteProduct);

// export default router;