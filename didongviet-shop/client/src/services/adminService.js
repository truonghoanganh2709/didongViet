import api from '../config/axios';
import { API } from '../constants/apiEndpoints';

export const getAdminStats = () => api.get(API.ADMIN_STATS);
export const getAdminOrders = (params) => api.get(API.ADMIN_ORDERS, { params });
export const getAdminUsers = () => api.get(API.ADMIN_USERS);
export const updateOrderStatus = (id, status) => api.patch(API.ORDER_STATUS(id), { status });
