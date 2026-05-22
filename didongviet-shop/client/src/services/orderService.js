import api from '../config/axios';
import { API } from '../constants/apiEndpoints';

export const createOrder = (data) => api.post(API.ORDERS, data);
export const getOrders = () => api.get(API.ORDERS);
export const getOrderById = (id) => api.get(API.ORDER_BY_ID(id));
