// utils/shopApi.js
// This file handles all API calls related to shop/products

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Fetch all products
export const fetchAllProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Fetch products for home page (limited)
export const fetchHomeProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/home?limit=4`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch home products');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching home products:', error);
        throw error;
    }
};

// Fetch single product by ID
export const fetchProductById = async (productId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

// Filter products by category
export const fetchProductsByCategory = async (category) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/category/${category}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products by category');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
};

// Add product to cart
export const addToCart = async (productId, quantity = 1) => {
    try {
        const token = localStorage.getItem('authToken');

        const response = await fetch(`${API_BASE_URL}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                productId,
                quantity,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add product to cart');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};

// Add product to wishlist
export const addToWishlist = async (productId) => {
    try {
        const token = localStorage.getItem('authToken');

        const response = await fetch(`${API_BASE_URL}/wishlist/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ productId }),
        });

        if (!response.ok) {
            throw new Error('Failed to add to wishlist');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        throw error;
    }
};

// Get user's cart
export const getCart = async () => {
    try {
        const token = localStorage.getItem('authToken');

        const response = await fetch(`${API_BASE_URL}/cart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cart');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

// Remove product from cart
export const removeFromCart = async (productId) => {
    try {
        const token = localStorage.getItem('authToken');

        const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to remove product from cart');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
    }
};

// Update cart item quantity
export const updateCartQuantity = async (productId, quantity) => {
    try {
        const token = localStorage.getItem('authToken');

        const response = await fetch(`${API_BASE_URL}/cart/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ productId, quantity }),
        });

        if (!response.ok) {
            throw new Error('Failed to update cart quantity');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating cart:', error);
        throw error;
    }
};

// Get user's wishlist
export const getWishlist = async () => {
    try {
        const token = localStorage.getItem('authToken');

        const response = await fetch(`${API_BASE_URL}/wishlist`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch wishlist');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        throw error;
    }
};

// Remove product from wishlist
export const removeFromWishlist = async (productId) => {
    try {
        const token = localStorage.getItem('authToken');

        const response = await fetch(`${API_BASE_URL}/wishlist/remove/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to remove from wishlist');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        throw error;
    }
};

// Search products
export const searchProducts = async (query) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to search products');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
};

// Get product reviews
export const getProductReviews = async (productId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

// Add product review
export const addProductReview = async (productId, review) => {
    try {
        const token = localStorage.getItem('authToken');

        const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(review),
        });

        if (!response.ok) {
            throw new Error('Failed to add review');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding review:', error);
        throw error;
    }
};

// Includes:

// fetchAllProducts() - Get all products
// fetchHomeProducts() - Get limited products for home
// fetchProductById() - Get single product details
// fetchProductsByCategory() - Filter by category
// addToCart() - Add to shopping cart
// addToWishlist() - Add to wishlist
// searchProducts() - Search functionality
// And more...