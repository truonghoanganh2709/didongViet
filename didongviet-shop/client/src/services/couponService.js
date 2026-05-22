import api from '../config/axios';
import { API } from '../constants/apiEndpoints';

export const validateCoupon = (code, subtotal) =>
  api.post(API.COUPON_VALIDATE, { code, subtotal });

export const getCoupons = () => api.get(API.COUPONS);
export const createCoupon = (data) => api.post(API.COUPONS, data);
export const updateCoupon = (id, data) => api.put(API.COUPON_BY_ID(id), data);
export const deleteCoupon = (id) => api.delete(API.COUPON_BY_ID(id));
