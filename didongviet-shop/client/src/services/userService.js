import api from '../config/axios';
import { API } from '../constants/apiEndpoints';

export const updateUser = (id, data) => api.put(API.USER_BY_ID(id), data);
export const deleteUser = (id) => api.delete(API.USER_BY_ID(id));
