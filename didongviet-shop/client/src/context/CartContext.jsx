import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as cartService from '../services/cartService';
import { useAuthContext } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const cartCount = useMemo(
    () => cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
    [cart]
  );

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const { data } = await cartService.getCart();
      setCart(data.data);
    } catch {
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItem = async (productId, quantity = 1) => {
    const { data } = await cartService.addToCart(productId, quantity);
    setCart(data.data);
    return data.data;
  };

  const updateItem = async (productId, quantity) => {
    const { data } = await cartService.updateCartItem(productId, quantity);
    setCart(data.data);
  };

  const removeItem = async (productId) => {
    const { data } = await cartService.removeFromCart(productId);
    setCart(data.data);
  };

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      loading,
      fetchCart,
      addItem,
      updateItem,
      removeItem,
    }),
    [cart, cartCount, loading, fetchCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used within CartProvider');
  return ctx;
};
