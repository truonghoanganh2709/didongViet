/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

const normalizeCartItems = (items = []) =>
  items
    .filter((item) => item.product)
    .map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await cartService.getCart();
      setCartItems(normalizeCartItems(data.cartItems));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    queueMicrotask(() => {
      loadCart();
    });
  }, [loadCart]);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      throw new Error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
    }

    const data = await cartService.addToCart(productId, quantity);
    setCartItems(normalizeCartItems(data.cartItems));
  }, [isAuthenticated]);

  const updateQuantity = useCallback(async (productId, quantity) => {
    const data = await cartService.updateCartItem(productId, quantity);
    setCartItems(normalizeCartItems(data.cartItems));
  }, []);

  const removeFromCart = useCallback(async (productId) => {
    const data = await cartService.removeCartItem(productId);
    setCartItems(normalizeCartItems(data.cartItems));
  }, []);

  const clearCart = useCallback(async () => {
    const data = await cartService.clearCart();
    setCartItems(normalizeCartItems(data.cartItems));
  }, []);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const value = useMemo(
    () => ({
      cartItems,
      loading,
      error,
      totalQuantity,
      subtotal,
      loadCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [cartItems, loading, error, totalQuantity, subtotal, loadCart, addToCart, updateQuantity, removeFromCart, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
};
