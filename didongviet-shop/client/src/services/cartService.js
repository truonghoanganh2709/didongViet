import api from '../config/axios';
import { API } from '../constants/apiEndpoints';

export const getCart = () => api.get(API.CART);
export const addToCart = (productId, quantity = 1) =>
  api.post(API.CART_ITEMS, { productId, quantity });
export const updateCartItem = (productId, quantity) =>
  api.patch(API.CART_ITEM(productId), { quantity });
export const removeFromCart = (productId) => api.delete(API.CART_ITEM(productId));
