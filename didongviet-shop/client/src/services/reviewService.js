import api from '../config/axios';
import { API } from '../constants/apiEndpoints';

export const getReviews = (slug) => api.get(API.REVIEWS_BY_PRODUCT(slug));
export const createReview = (slug, data) => api.post(API.REVIEW_CREATE(slug), data);
