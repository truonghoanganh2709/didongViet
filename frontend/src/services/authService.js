import { request } from './api';

export const authService = {
  signup: (payload) =>
    request('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  login: (payload) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  logout: () =>
    request('/api/auth/logout', {
      method: 'POST',
    }),

  getProfile: () => request('/api/auth/profile'),

  refreshToken: () =>
    request('/api/auth/refresh-token', {
      method: 'POST',
    }),
};
