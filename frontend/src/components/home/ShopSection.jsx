import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Star, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchHomeProducts, addToCart, toggleWishlist, getWishlist } from '../../utils/shopApi';
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

const ShopSection = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();  
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [wishlist, setWishlist] = useState(new Set());

    // ✅ Load products
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const response = await fetchHomeProducts(4);
                
                if (response.success && response.data) {
                    setProducts(response.data);
                }
            } catch (error) {
                console.error('Error loading products:', error);
                showToast('Failed to load products', 'error');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // ✅ Load wishlist
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
                    }
                }
            } catch (error) {
                console.error('Error loading wishlist:', error);
            }
        };

        loadWishlist();
    }, [isAuthenticated, user]);

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

    const handleProductClick = (product) => {
        navigate(`/product/${product._id}/${product.type}`);
    };

    const handleViewAll = () => {
        navigate('/shop');
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>

            <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">

                {/* Header Section */}
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-6 h-6 text-orange-500" />
                        <span className="text-orange-600 font-semibold text-sm tracking-wider uppercase">Exclusive Merchandise</span>
                        <Sparkles className="w-6 h-6 text-orange-500" />
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Shop
                    </h2>
                    
                    <div className="max-w-3xl mx-auto">
                        <p className="text-gray-700 text-base sm:text-base leading-relaxed mb-2">
                            Show your support for our vision and values with exclusive merchandise! From apparel to accessories,
                            every purchase helps fuel our movement for positive change.
                        </p>

                        <p className="text-gray-700 text-base sm:text-base leading-tight">
                            Explore our collection and wear your commitment proudly.
                        </p>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 bg-orange-500 rounded-full animate-pulse"></div>
                            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                                <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        </div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-600 text-lg">No products available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="group relative"
                                onMouseEnter={() => setHoveredProduct(product._id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                <div
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                                    onClick={() => handleProductClick(product)}
                                >
                                    {/* Product Image Container */}
                                    <div className="relative h-72 bg-gray-100 overflow-hidden">
                                        {/* Badge */}
                                        {product.badge && (
                                            <div className="absolute top-3 left-3 bg-white text-orange-600 px-3 py-1 rounded-full text-xs font-bold z-10 shadow-md flex items-center gap-1">
                                                <Star size={12} className="fill-orange-600" />
                                                {product.badge}
                                            </div>
                                        )}

                                        {/* Discount Badge */}
                                        {product.discount > 0 && (
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
                                                e.target.src = 'https://via.placeholder.com/300x400/f3f4f6/9ca3af?text=Product+Image';
                                            }}
                                        />

                                        {/* Subtle gradient overlay */}
                                        {hoveredProduct === product._id && (
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent transition-all duration-300"></div>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-5">
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
                                                {product.rating} ({product.reviews} reviews)
                                            </span>
                                        </div>

                                        {/* Product Name */}
                                        <h3 className="text-sm font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2 h-10">
                                            {product.name}
                                        </h3>

                                        {/* Price and Button */}
                                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                            <div className="text-base font-bold text-gray-900">
                                                MRP : ₹{product.price}/-
                                            </div>

                                            <button
                                                onClick={(e) => handleAddToCart(e, product)}
                                                className="bg-gray-200 hover:bg-orange-500 hover:text-white text-gray-800 font-medium py-2 px-3 rounded-lg transition-all duration-300 flex items-center space-x-1 group-hover:shadow-md hover:scale-105 z-10 relative"
                                            >
                                                <ShoppingCart size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* View All Button */}
                <div className="text-right pb-4">
                    <button
                        onClick={handleViewAll}
                        className="text-orange-500 underline hover:text-orange-600 font-semibold text-base sm:text-lg hover:underline transition-all duration-200 inline-flex items-center gap-2 group"
                    >
                        <span>View All</span>
                        <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>

            </div>
        </section>
    );
};

export default ShopSection;