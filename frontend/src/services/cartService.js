import { request } from './api';

export const cartService = {
  getCart: () => request('/api/cart'),

  addToCart: (productId, quantity = 1) =>
    request('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    }),

  updateCartItem: (productId, quantity) =>
    request(`/api/cart/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    }),

  removeCartItem: (productId) =>
    request(`/api/cart/${productId}`, {
      method: 'DELETE',
    }),

  clearCart: () =>
    request('/api/cart', {
      method: 'DELETE',
    }),
};
