import { apiClient } from '../api/client';
export const getHistory = () => apiClient.get('/history');
