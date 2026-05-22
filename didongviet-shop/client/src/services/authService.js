import api from '../config/axios';
import { API } from '../constants/apiEndpoints';

export const register = (data) => api.post(API.AUTH_REGISTER, data);
export const login = (data) => api.post(API.AUTH_LOGIN, data);
export const getMe = () => api.get(API.AUTH_ME);
export const forgotPassword = (email) => api.post(API.AUTH_FORGOT, { email });
export const resetPassword = (data) => api.post(API.AUTH_RESET, data);
export const changePassword = (data) => api.put(API.AUTH_CHANGE_PASSWORD, data);
