import api from '../config/axios';
import { API } from '../constants/apiEndpoints';

export const getWishlist = () => api.get(API.WISHLIST);
export const toggleWishlist = (productId) => api.post(API.WISHLIST_TOGGLE, { productId });
