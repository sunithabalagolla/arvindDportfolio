import { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { getCart } from '../../../../utils/shopApi';

function useCart() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const fetchCartCount = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await getCart();
          if (response.success && response.data) {
            setCartItemCount(response.data.totalItems || 0);
          }
        } catch (error) {
          console.error('Error fetching cart count:', error);
          setCartItemCount(0);
        }
      } else {
        setCartItemCount(0);
      }
    };

    fetchCartCount();

    // Listen for cart updates from shop page
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [isAuthenticated, user]);

  return cartItemCount;
}

export default useCart;