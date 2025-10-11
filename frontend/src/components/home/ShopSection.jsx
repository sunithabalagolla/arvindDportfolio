import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Star, Sparkles } from 'lucide-react';
import image1 from '../../assets/images/shop/image1.jpg';
import image2 from '../../assets/images/shop/image2.jpg';
import image3 from '../../assets/images/shop/image3.jpg';
import image4 from '../../assets/images/shop/image4.jpg';
import image5 from '../../assets/images/shop/iamge5.jpg';
import { useNavigate } from 'react-router-dom';

const ShopSection = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [wishlist, setWishlist] = useState(new Set());

    // Sample products data - In production, fetch from backend
    const initialProducts = [
        {
            id: 1,
            name: "Unisex BJP T-shirt Set of 1",
            image: image1,
            price: "₹499/-",
            category: "apparel",
            type: "orange-tshirt",
            rating: 4.5,
            reviews: 128,
            discount: 20,
            badge: "Best Seller"
        },
        {
            id: 2,
            name: "BJP Logo Coffee Mug",
            image: image2,
            price: "₹499/-",
            category: "accessories",
            type: "mug",
            rating: 4.8,
            reviews: 95,
            discount: 15,
            badge: "Top Rated"
        },
        {
            id: 3,
            name: "BJP Flags Set of 10",
            image: image3,
            price: "₹499/-",
            category: "flags",
            type: "flags",
            rating: 4.6,
            reviews: 142,
            discount: 10,
            badge: "Popular"
        },
        {
            id: 4,
            name: "Unisex BJP T-shirt Set of 1",
            image: image4,
            price: "₹499/-",
            category: "apparel",
            type: "white-tshirt",
            rating: 4.7,
            reviews: 110,
            discount: 25,
            badge: "Best Value"
        }
    ];

    useEffect(() => {
        // Simulate API call to fetch products
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // In production, replace with actual API call:
                // const response = await fetch('/api/products/home');
                // const data = await response.json();
                // setProducts(data);
                
                // For now, use mock data
                setTimeout(() => {
                    setProducts(initialProducts);
                    setLoading(false);
                }, 500);
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts(initialProducts);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        
        // Add to cart logic (integrate with your cart context/state)
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingProduct = existingCart.find(item => item.id === product.id);
        
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            existingCart.push({ ...product, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(existingCart));
        
        // Show success notification
        const btn = e.currentTarget;
        const originalContent = btn.innerHTML;
        btn.innerHTML = '✓ Added!';
        btn.style.backgroundColor = '#10b981';
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.backgroundColor = '';
        }, 2000);
    };

    const handleWishlist = (e, productId) => {
        e.stopPropagation();
        const newWishlist = new Set(wishlist);
        if (newWishlist.has(productId)) {
            newWishlist.delete(productId);
        } else {
            newWishlist.add(productId);
        }
        setWishlist(newWishlist);
    };

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}/${product.type}`);
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
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="group relative"
                                onMouseEnter={() => setHoveredProduct(product.id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                <div
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                                    onClick={() => handleProductClick(product)}
                                >
                                    {/* Product Image Container */}
                                    <div className="relative h-72 bg-gray-100 overflow-hidden">
                                        {/* Badge */}
                                        <div className="absolute top-3 left-3 bg-white text-orange-600 px-3 py-1 rounded-full text-xs font-bold z-10 shadow-md flex items-center gap-1">
                                            <Star size={12} className="fill-orange-600" />
                                            {product.badge}
                                        </div>

                                        {/* Discount Badge */}
                                        {product.discount && (
                                            <div className="absolute top-3 right-12 bg-orange-500 text-white px-2.5 py-1 rounded text-xs font-bold z-10 shadow-md">
                                                {product.discount}% OFF
                                            </div>
                                        )}

                                        {/* Wishlist Button */}
                                        <button
                                            className={`absolute top-3 right-3 rounded-full p-2.5 shadow-md transition-all duration-300 z-20 ${
                                                wishlist.has(product.id)
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-white text-gray-400 hover:bg-orange-500 hover:text-white'
                                            }`}
                                            onClick={(e) => handleWishlist(e, product.id)}
                                        >
                                            <Heart size={18} className={wishlist.has(product.id) ? 'fill-current' : ''} />
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
                                        {hoveredProduct === product.id && (
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
                                                MRP : {product.price}
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