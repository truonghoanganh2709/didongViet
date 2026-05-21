import { request } from './api';

export const orderService = {
  createOrder: (payload) =>
    request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  lookupOrder: ({ code, phone }) =>
    request(`/api/orders/lookup?code=${encodeURIComponent(code)}&phone=${encodeURIComponent(phone)}`),

  getMyOrders: () => request('/api/orders/my-orders'),
};
