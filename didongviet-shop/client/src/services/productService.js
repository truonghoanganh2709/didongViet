import api from '../config/axios';
import { API } from '../constants/apiEndpoints';

export const getProducts = (params) => api.get(API.PRODUCTS, { params });
export const getProductBySlug = (slug) => api.get(API.PRODUCT_BY_SLUG(slug));
export const getRelatedProducts = (slug) => api.get(API.PRODUCT_RELATED(slug));
export const getBrands = () => api.get(API.PRODUCT_BRANDS);
export const createProduct = (data) => api.post(API.PRODUCTS, data);
export const updateProduct = (id, data) => api.put(`${API.PRODUCTS}/${id}`, data);
export const deleteProduct = (id) => api.delete(`${API.PRODUCTS}/${id}`);
