import React from 'react';
import { ShoppingCart } from 'lucide-react';
import image1 from '../../assets/images/shop/image1.jpg';
import image2 from '../../assets/images/shop/image2.jpg';
import image3 from '../../assets/images/shop/image3.jpg';
import image4 from '../../assets/images/shop/image4.jpg';
import image5 from '../../assets/images/shop/iamge5.jpg';
import { useNavigate } from 'react-router-dom';

const ShopSection = () => {
    const navigate = useNavigate();

    const products = [
        {
            id: 1,
            name: "Unisex BJP T-shirt Set of 1",
            image: image1,
            price: "₹499/-",
            category: "apparel",
            type: "orange-tshirt"
        },
        {
            id: 2,
            name: "BJP Logo Coffee Mug",
            image: image2,
            price: "₹499/-",
            category: "accessories",
            type: "mug"
        },
        {
            id: 3,
            name: "BJP Flags Set of 10",
            image: image3,
            price: "₹499/-",
            category: "flags",
            type: "flags"
        },
        {
            id: 4,
            name: "Unisex BJP T-shirt Set of 1",
            image: image4,
            price: "₹499/-",
            category: "apparel",
            type: "white-tshirt"
        }
    ];

    const handleAddToCart = (e, product) => {
        e.stopPropagation(); // Prevent navigation when clicking add to cart
        alert(`Added ${product.name} to cart!`);
    };

    const handleProductClick = (product) => {
        // Navigate to product detail page using product ID and type
        navigate(`/product/${product.id}/${product.type}`);
    };

    const handleViewAll = () => {
        navigate('/shop');
    };

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Shop
                    </h2>
                    <div className="">
                        <p className="text-black-700 text-base sm:text-base leading-relaxed mb-1">
                            Show your support for our vision and values with exclusive merchandise! From apparel to accessories,
                            every purchase helps fuel our movement for positive change.
                        </p>

                        <p className="text-black-700 text-base sm:text-base leading-tight">
                            Explore our collection and wear your commitment proudly.
                        </p>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:scale-105"
                            onClick={() => handleProductClick(product)}
                        >
                            {/* Product Image */}
                            <div className="relative h-75 bg-gray-100 overflow-hidden p-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=Product+Image';
                                    }}
                                />
                            </div>

                            {/* Product Details */}
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                                    {product.name}
                                </h3>

                                <div className="flex items-center justify-between">
                                    <div className="text-lg font-bold text-gray-900">
                                        MRP : {product.price}
                                    </div>

                                    <button
                                        onClick={(e) => handleAddToCart(e, product)}
                                        className="bg-gray-200 hover:bg-orange-500 hover:text-white text-gray-800 font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2 group-hover:shadow-md z-10 relative"
                                    >
                                        <span>Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-right">
                    <button
                        onClick={handleViewAll}
                        className="text-orange-500 underline hover:text-orange-600 font-semibold text-base sm:text-lg hover:underline transition-all duration-200"
                    >
                        View All
                    </button>
                </div>

            </div>
        </section>
    );
};

export default ShopSection;