import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart } from '../../utils/shopApi';

const CartDropdown = ({ isOpen, onClose, scrolled }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      if (isOpen) {
        try {
          setLoading(true);
          const response = await getCart();
          if (response.success && response.data) {
            setCart(response.data);
          }
        } catch (error) {
          console.error('Error fetching cart:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCart();
  }, [isOpen]);

  // Update quantity
  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdating(productId);
    try {
      const response = await updateCartItem(productId, newQuantity);
      if (response.success && response.data) {
        setCart(response.data);
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setUpdating(null);
    }
  };

  // Remove item
  const handleRemoveItem = async (productId) => {
    setUpdating(productId);
    try {
      const response = await removeFromCart(productId);
      if (response.success && response.data) {
        setCart(response.data);
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setUpdating(null);
    }
  };

  // Navigate to checkout
  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  // Navigate to cart page
  const handleViewCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />

          {/* Cart Dropdown */}
          <motion.div
            initial={{ opacity: 0, x: 300, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-4 top-20 w-[380px] max-h-[600px] bg-white rounded-2xl shadow-2xl z-[70] overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-white w-5 h-5" />
                <h3 className="text-white font-bold text-lg">
                  Shopping Cart {cart && `(${cart.totalItems})`}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="overflow-y-auto max-h-[400px] p-4">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : !cart || cart.items?.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Your cart is empty</p>
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/shop');
                    }}
                    className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <motion.div
                      key={item.productId}
                      layout
                      className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-200 transition-colors"
                    >
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80x80/f3f4f6/9ca3af?text=Product';
                        }}
                      />

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                          {item.name}
                        </h4>
                        <p className="text-orange-600 font-bold text-sm mb-2">
                          ₹{item.price}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                            disabled={updating === item.productId || item.quantity <= 1}
                            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          <span className="w-8 text-center font-semibold text-sm">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                            disabled={updating === item.productId}
                            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => handleRemoveItem(item.productId)}
                            disabled={updating === item.productId}
                            className="ml-auto text-red-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart && cart.items?.length > 0 && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700 font-semibold">Subtotal:</span>
                  <span className="text-xl font-bold text-gray-900">
                    ₹{cart.totalPrice?.toFixed(2) || '0.00'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={handleViewCart}
                    className="w-full px-4 py-2.5 bg-white border-2 border-orange-500 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
                  >
                    View Cart
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={handleCheckout}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDropdown;