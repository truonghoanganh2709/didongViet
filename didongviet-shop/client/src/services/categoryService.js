import api from '../config/axios';
import { API } from '../constants/apiEndpoints';

export const getCategories = () => api.get(API.CATEGORIES);
export const getCategoryBySlug = (slug) => api.get(API.CATEGORY_BY_SLUG(slug));
export const createCategory = (data) => api.post(API.CATEGORIES, data);
export const updateCategory = (id, data) => api.put(`${API.CATEGORIES}/${id}`, data);
export const deleteCategory = (id) => api.delete(`${API.CATEGORIES}/${id}`);
