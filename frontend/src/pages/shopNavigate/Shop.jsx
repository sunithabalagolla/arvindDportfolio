import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Star, Filter, X, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchAllProducts, addToCart, toggleWishlist, getWishlist } from '../../utils/shopApi';
import { useAuth } from '../../context/AuthContext';

// ✅ Toast Notification Helper Function
const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
    
    toast.className = `fixed top-20 right-4 z-[9999] px-6 py-4 rounded-lg shadow-2xl text-white font-medium ${bgColor}`;
    toast.style.cssText = `
        animation: slideIn 0.3s ease-out;
        transition: all 0.3s ease-out;
    `;
    
    toast.innerHTML = `
        <div class="flex items-center gap-3">
            <span class="text-xl font-bold">${icon}</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 2500);
};

// Add keyframe animation
if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(400px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
}

const Shop = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth(); 
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [wishlist, setWishlist] = useState(new Set());

    // ✅ Load products from backend on component mount
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const response = await fetchAllProducts({ limit: 100, page: 1 });
                
                if (response.success && response.data) {
                    setAllProducts(response.data);
                    setFilteredProducts(response.data);
                    console.log('✅ Products loaded:', response.data.length);
                }
            } catch (error) {
                console.error('❌ Error loading products:', error);
                showToast('Failed to load products', 'error');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // ✅ Load wishlist from backend
    useEffect(() => {
        const loadWishlist = async () => {
            try {
                if (isAuthenticated && user) {
                    const response = await getWishlist();
                    
                    if (response.success && response.data) {
                        const productIds = response.data.products.map(p => 
                            typeof p === 'string' ? p : p._id
                        );
                        setWishlist(new Set(productIds));
                        console.log('✅ Wishlist loaded:', productIds.length, 'items');
                    }
                }
            } catch (error) {
                console.error('Error loading wishlist:', error);
            }
        };

        loadWishlist();
    }, [isAuthenticated, user]);

    // ✅ Filter and sort products whenever filters change
    useEffect(() => {
        let filtered = [...allProducts];

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'newest') {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setFilteredProducts(filtered);
    }, [selectedCategory, sortBy, priceRange, allProducts]);

    // ✅ Add to cart handler with toast notification
 // ✅ Fixed Add to cart handler with proper error handling
// ✅ Updated handleAddToCart with better visual feedback
const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    
    // ✅ Store button reference BEFORE async operation
    const btn = e.currentTarget;
    const originalBgColor = btn.style.backgroundColor;
    const originalText = btn.innerHTML;
    
    // ✅ Show loading state immediately
    btn.disabled = true;
    btn.innerHTML = '<div class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>';
    btn.classList.add('opacity-70', 'cursor-wait');
    
    try {
        if (!isAuthenticated || !user) {
            showToast('Please login to add items to cart', 'error');
            navigate('/login');
            return;
        }

        // ✅ Wait for the API response
        const response = await addToCart(product._id, 1);
        
        // ✅ Only show success if API call was successful
        if (response && response.success) {
            console.log('✅ Added to cart:', product.name);
            
            // Update cart badge
            window.dispatchEvent(new Event('cartUpdated'));
            
            // ✅ Show success state
            btn.style.backgroundColor = '#10b981';
            btn.innerHTML = `
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            `;
            
            // ✅ Show success toast
            showToast(`${product.name} added to cart!`, 'success');
            
            // ✅ Reset button after animation
            setTimeout(() => {
                if (btn) {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = originalBgColor;
                    btn.disabled = false;
                    btn.classList.remove('opacity-70', 'cursor-wait');
                }
            }, 1500);
        } else {
            // ✅ Handle unsuccessful response
            throw new Error(response?.message || 'Failed to add to cart');
        }
        
    } catch (error) {
        console.error('❌ Error adding to cart:', error);
        showToast(error.message || 'Failed to add to cart', 'error');
        
        // ✅ Reset button on error
        if (btn) {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = originalBgColor;
            btn.disabled = false;
            btn.classList.remove('opacity-70', 'cursor-wait');
        }
    }
};


    // ✅ Wishlist toggle handler with toast notification
    const handleWishlist = async (e, productId) => {
        e.stopPropagation();
        
        try {
            if (!isAuthenticated || !user) {
                showToast('Please login to manage wishlist', 'error');
                navigate('/login');
                return;
            }

            const response = await toggleWishlist(productId);
            
            if (response.success) {
                const newWishlist = new Set(wishlist);
                
                if (response.added) {
                    newWishlist.add(productId);
                    showToast('Added to wishlist ❤️', 'success');
                } else {
                    newWishlist.delete(productId);
                    showToast('Removed from wishlist', 'info');
                }
                
                setWishlist(newWishlist);
            }
        } catch (error) {
            console.error('❌ Error updating wishlist:', error);
            showToast('Failed to update wishlist', 'error');
        }
    };

    const categories = [
        { name: 'all', label: 'All Products' },
        { name: 'apparel', label: 'Apparel' },
        { name: 'accessories', label: 'Accessories' },
        { name: 'flags', label: 'Flags' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>

            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 py-12">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-orange-500" />
                        <span className="text-orange-600 font-semibold text-sm tracking-wider uppercase">Complete Collection</span>
                        <Sparkles className="w-5 h-5 text-orange-500" />
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">Our Shop</h1>
                    <p className="text-gray-700 mt-3 text-lg">Browse our complete collection of exclusive merchandise</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 py-10">
                <div className="flex gap-8">
                    
                    {/* Sidebar Filters - Desktop */}
                    <div className="hidden lg:block w-72 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-lg p-7 sticky top-4 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-8">Filters</h3>

                            {/* Category Filter */}
                            <div className="mb-8">
                                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-orange-500 rounded"></span>
                                    Category
                                </h4>
                                <div className="space-y-3">
                                    {categories.map(cat => (
                                        <label key={cat.name} className="flex items-center cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={cat.name}
                                                checked={selectedCategory === cat.name}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="w-4 h-4 text-orange-500 cursor-pointer"
                                            />
                                            <span className="ml-3 text-gray-700 group-hover:text-orange-600 transition-colors">{cat.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range Filter */}
                            <div className="mb-8 pb-8 border-b border-gray-200">
                                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-orange-500 rounded"></span>
                                    Price Range
                                </h4>
                                <div className="flex items-center gap-2 mb-4">
                                    <input
                                        type="number"
                                        min="0"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[1]), priceRange[1]])}
                                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-500"
                                    />
                                    <span className="text-gray-500">-</span>
                                    <input
                                        type="number"
                                        max="2000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0])])}
                                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                                <p className="text-sm text-gray-600 font-medium">₹{priceRange[0]} - ₹{priceRange[1]}</p>
                            </div>

                            {/* Clear Filters Button */}
                            <button
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setPriceRange([0, 2000]);
                                    showToast('Filters cleared', 'info');
                                }}
                                className="w-full px-4 py-2 bg-orange-100 text-orange-600 font-semibold rounded-lg hover:bg-orange-200 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Mobile Filter Button */}
                        <div className="lg:hidden mb-6">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 shadow-md"
                            >
                                <Filter size={20} />
                                Filters
                            </button>
                        </div>

                        {/* Mobile Filters Modal */}
                        {showFilters && (
                            <div className="lg:hidden mb-6 bg-white rounded-lg shadow-md p-6 border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">Filters</h3>
                                    <button onClick={() => setShowFilters(false)} className="hover:bg-gray-100 p-1 rounded">
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {categories.map(cat => (
                                        <label key={cat.name} className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category-mobile"
                                                value={cat.name}
                                                checked={selectedCategory === cat.name}
                                                onChange={(e) => {
                                                    setSelectedCategory(e.target.value);
                                                    setShowFilters(false);
                                                }}
                                                className="w-4 h-4 text-orange-500"
                                            />
                                            <span className="ml-3 text-gray-700">{cat.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sort and Results Info */}
                        <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
                            <p className="text-gray-700 font-semibold text-lg">
                                Showing <span className="text-orange-600 font-bold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
                            </p>
                            <div className="flex items-center gap-3">
                                <label htmlFor="sort" className="text-gray-700 font-semibold">Sort:</label>
                                <select
                                    id="sort"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer text-gray-700 hover:border-gray-400 focus:outline-none focus:border-orange-500 font-medium"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="newest">Newest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="relative w-16 h-16">
                                    <div className="absolute inset-0 bg-orange-500 rounded-full animate-pulse"></div>
                                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                                        <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                </div>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-gray-600 text-lg mb-4">No products found matching your filters.</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setPriceRange([0, 2000]);
                                        showToast('Filters cleared', 'info');
                                    }}
                                    className="mt-4 text-orange-500 hover:text-orange-600 font-semibold underline"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product._id}
                                        className="group relative"
                                        onMouseEnter={() => setHoveredProduct(product._id)}
                                        onMouseLeave={() => setHoveredProduct(null)}
                                    >
                                        <div
                                            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                                            onClick={() => navigate(`/product/${product._id}/${product.type}`)}
                                        >
                                            {/* Product Image Container */}
                                            <div className="relative h-80 bg-gray-100 overflow-hidden">
                                                {/* Stock Badge */}
                                                {!product.inStock && (
                                                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
                                                        <span className="text-white text-xl font-bold">Out of Stock</span>
                                                    </div>
                                                )}

                                                {/* Badge */}
                                                <div className="absolute top-3 left-3 bg-white text-orange-600 px-3 py-1 rounded-full text-xs font-bold z-10 shadow-md flex items-center gap-1">
                                                    <Star size={12} className="fill-orange-600" />
                                                    {product.badge}
                                                </div>

                                                {/* Discount Badge */}
                                                {product.discount && product.discount > 0 && (
                                                    <div className="absolute top-3 right-12 bg-orange-500 text-white px-2.5 py-1 rounded text-xs font-bold z-10 shadow-md">
                                                        {product.discount}% OFF
                                                    </div>
                                                )}

                                                {/* Wishlist Button */}
                                                <button
                                                    className={`absolute top-3 right-3 rounded-full p-2.5 shadow-md transition-all duration-300 z-20 ${
                                                        wishlist.has(product._id)
                                                            ? 'bg-orange-500 text-white'
                                                            : 'bg-white text-gray-400 hover:bg-orange-500 hover:text-white'
                                                    }`}
                                                    onClick={(e) => handleWishlist(e, product._id)}
                                                >
                                                    <Heart size={18} className={wishlist.has(product._id) ? 'fill-current' : ''} />
                                                </button>

                                                {/* Product Image */}
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/300x400/f3f4f6/9ca3af?text=Product';
                                                    }}
                                                />

                                                {/* Subtle gradient overlay */}
                                                {hoveredProduct === product._id && (
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent transition-all duration-300"></div>
                                                )}
                                            </div>

                                            {/* Product Details */}
                                            <div className="p-6">
                                                {/* Rating Section */}
                                                <div className="flex items-center mb-3">
                                                    <div className="flex items-center gap-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={13}
                                                                className={`${
                                                                    i < Math.floor(product.rating)
                                                                        ? 'fill-orange-500 text-orange-500'
                                                                        : 'text-gray-300'
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-xs text-gray-600 ml-2 font-medium">
                                                        {product.rating} ({product.reviews})
                                                    </span>
                                                </div>

                                                {/* Product Name */}
                                                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2 h-14">
                                                    {product.name}
                                                </h3>

                                                {/* Price and Button */}
                                                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                                    <div>
                                                        <div className="text-lg font-bold text-gray-900">
                                                            ₹{product.price}
                                                        </div>
                                                        {product.originalPrice > product.price && (
                                                            <div className="text-xs text-gray-500 line-through">
                                                                ₹{product.originalPrice}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <button
                                                        onClick={(e) => handleAddToCart(e, product)}
                                                        disabled={!product.inStock}
                                                        className={`${
                                                            product.inStock
                                                                ? 'bg-gray-200 hover:bg-orange-500 hover:text-white text-gray-800'
                                                                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                                        } font-medium py-2 px-3 rounded-lg transition-all duration-300 flex items-center shadow-md hover:shadow-lg hover:scale-105 z-10 relative`}
                                                    >
                                                        <ShoppingCart size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;