// frontend/src/utils/shopApi.js
// This file handles all API calls related to shop/products

import { getAuthToken } from './api';  // ✅ Import the correct getAuthToken function

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ===== PRODUCT ENDPOINTS (PUBLIC - No Auth Required) =====

/**
 * Fetch all products with optional filters
 * @param {Object} params - Query parameters (limit, page, category, etc.)
 * @returns {Promise} Product list with pagination info
 */
export const fetchAllProducts = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${API_BASE_URL}/products?${queryString}` : `${API_BASE_URL}/products`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetch limited products for home page
 * @param {Number} limit - Number of products to fetch (default: 4)
 * @returns {Promise} Limited product list
 */
export const fetchHomeProducts = async (limit = 4) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/home?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch home products');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error fetching home products:', error);
    throw error;
  }
};

/**
 * Fetch single product by ID
 * @param {String} productId - MongoDB product ID
 * @returns {Promise} Product details
 */
export const fetchProductById = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    throw error;
  }
};

/**
 * Fetch products by category
 * @param {String} category - Product category (apparel, accessories, flags, etc.)
 * @returns {Promise} Products in that category
 */
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products by category');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error fetching products by category:', error);
    throw error;
  }
};

/**
 * Search products by query
 * @param {String} query - Search term
 * @returns {Promise} Matching products
 */
export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error('Failed to search products');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error searching products:', error);
    throw error;
  }
};

/**
 * Fetch all products on sale
 * @returns {Promise} Products with discount > 0
 */
export const fetchSaleProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/sale/all`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch sale products');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error fetching sale products:', error);
    throw error;
  }
};

/**
 * Fetch all in-stock products
 * @returns {Promise} Products with inStock = true
 */
export const fetchInStockProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/stock/all`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch in-stock products');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error fetching in-stock products:', error);
    throw error;
  }
};

// ===== CART ENDPOINTS (PROTECTED - Auth Required) =====

/**
 * Get user's cart
 * @returns {Promise} Cart with items and totals
 */
export const getCart = async () => {
  try {
    const token = getAuthToken();  // ✅ Using imported function from api.js
    
    if (!token) {
      throw new Error('No authentication token');
    }
    
    const response = await fetch(`${API_BASE_URL}/cart`, {
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error fetching cart:', error);
    throw error;
  }
};

/**
 * Add item to cart
 * @param {String} productId - Product MongoDB ID
 * @param {Number} quantity - Quantity to add
 * @returns {Promise} Updated cart
 */
export const addToCart = async (productId, quantity) => {
  try {
    const token = getAuthToken();  // ✅ Using imported function from api.js
    
    if (!token) {
      throw new Error('No authentication token');
    }
    
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ productId, quantity })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add to cart');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error adding to cart:', error);
    throw error;
  }
};

/**
 * Update cart item quantity
 * @param {String} productId - Product MongoDB ID
 * @param {Number} quantity - New quantity
 * @returns {Promise} Updated cart
 */
export const updateCartItem = async (productId, quantity) => {
  try {
    const token = getAuthToken();  // ✅ Using imported function from api.js
    
    if (!token) {
      throw new Error('No authentication token');
    }
    
    const response = await fetch(`${API_BASE_URL}/cart/update`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ productId, quantity })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update cart');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error updating cart:', error);
    throw error;
  }
};

/**
 * Remove item from cart
 * @param {String} productId - Product MongoDB ID
 * @returns {Promise} Updated cart
 */
export const removeFromCart = async (productId) => {
  try {
    const token = getAuthToken();  // ✅ Using imported function from api.js
    
    if (!token) {
      throw new Error('No authentication token');
    }
    
    const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove from cart');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error removing from cart:', error);
    throw error;
  }
};

/**
 * Clear entire cart
 * @returns {Promise} Empty cart
 */
export const clearCart = async () => {
  try {
    const token = getAuthToken();  // ✅ Using imported function from api.js
    
    if (!token) {
      throw new Error('No authentication token');
    }
    
    const response = await fetch(`${API_BASE_URL}/cart/clear`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to clear cart');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error clearing cart:', error);
    throw error;
  }
};

// ===== WISHLIST ENDPOINTS (PROTECTED - Auth Required) =====

/**
 * Get user's wishlist
 * @returns {Promise} Wishlist with product details
 */
export const getWishlist = async () => {
  try {
    const token = getAuthToken();  // ✅ Using imported function from api.js
    
    if (!token) {
      throw new Error('No authentication token');
    }
    
    const response = await fetch(`${API_BASE_URL}/wishlist`, {
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch wishlist');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error fetching wishlist:', error);
    throw error;
  }
};

/**
 * Add product to wishlist
 * @param {String} productId - Product MongoDB ID
 * @returns {Promise} Updated wishlist
 */
export const addToWishlist = async (productId) => {
  try {
    const token = getAuthToken();  // ✅ Using imported function from api.js
    
    if (!token) {
      throw new Error('No authentication token');
    }
    
    const response = await fetch(`${API_BASE_URL}/wishlist/add`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ productId })
    });
    
    if (!response.ok) {
      throw new Error('Failed to add to wishlist');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error adding to wishlist:', error);
    throw error;
  }
};

/**
 * Remove product from wishlist
 * @param {String} productId - Product MongoDB ID
 * @returns {Promise} Updated wishlist
 */
export const removeFromWishlist = async (productId) => {
  try {
    const token = getAuthToken();  // ✅ Using imported function from api.js
    
    if (!token) {
      throw new Error('No authentication token');
    }
    
    const response = await fetch(`${API_BASE_URL}/wishlist/remove/${productId}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove from wishlist');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error removing from wishlist:', error);
    throw error;
  }
};

/**
 * Check if product is in wishlist
 * @param {String} productId - Product MongoDB ID
 * @returns {Promise} { inWishlist: boolean }
 */
export const checkWishlist = async (productId) => {
  try {
    const token = getAuthToken();  // ✅ Using imported function from api.js
    
    if (!token) {
      throw new Error('No authentication token');
    }
    
    const response = await fetch(`${API_BASE_URL}/wishlist/check/${productId}`, {
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to check wishlist');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error checking wishlist:', error);
    throw error;
  }
};

/**
 * Toggle product in wishlist (add if not present, remove if present)
 * @param {String} productId - Product MongoDB ID
 * @returns {Promise} { added: boolean, wishlist }
 */
export const toggleWishlist = async (productId) => {
  try {
    const token = getAuthToken();  // ✅ Using imported function from api.js
    
    if (!token) {
      throw new Error('No authentication token');
    }
    
    const response = await fetch(`${API_BASE_URL}/wishlist/toggle`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ productId })
    });
    
    if (!response.ok) {
      throw new Error('Failed to toggle wishlist');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error toggling wishlist:', error);
    throw error;
  }
};

/**
 * Clear entire wishlist
 * @returns {Promise} Empty wishlist
 */
export const clearWishlist = async () => {
  try {
    const token = getAuthToken();  // ✅ Using imported function from api.js
    
    if (!token) {
      throw new Error('No authentication token');
    }
    
    const response = await fetch(`${API_BASE_URL}/wishlist/clear`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to clear wishlist');
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Error clearing wishlist:', error);
    throw error;
  }
};

// ===== EXPORT SUMMARY =====
/**
 * Available Functions:
 * 
 * PRODUCTS (Public):
 * - fetchAllProducts(params) - Get all products with filters
 * - fetchHomeProducts(limit) - Get limited products for home page
 * - fetchProductById(productId) - Get single product details
 * - fetchProductsByCategory(category) - Get products by category
 * - searchProducts(query) - Search products
 * - fetchSaleProducts() - Get all sale products
 * - fetchInStockProducts() - Get all in-stock products
 * 
 * CART (Protected):
 * - getCart() - Get user's cart
 * - addToCart(productId, quantity) - Add item to cart
 * - updateCartItem(productId, quantity) - Update cart item quantity
 * - removeFromCart(productId) - Remove item from cart
 * - clearCart() - Clear entire cart
 * 
 * WISHLIST (Protected):
 * - getWishlist() - Get user's wishlist
 * - addToWishlist(productId) - Add product to wishlist
 * - removeFromWishlist(productId) - Remove product from wishlist
 * - checkWishlist(productId) - Check if product is in wishlist
 * - toggleWishlist(productId) - Toggle product in wishlist
 * - clearWishlist() - Clear entire wishlist
 */