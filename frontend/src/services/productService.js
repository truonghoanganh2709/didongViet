import { request } from './api';

const buildQuery = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && value !== 'Tất cả') {
      searchParams.set(key, value);
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
};

export const productService = {
  getProducts: (params) => request(`/api/products${buildQuery(params)}`),
  getProductById: (id) => request(`/api/products/${id}`),
};
