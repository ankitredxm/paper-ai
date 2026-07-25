import { apiClient } from '../api/client';
export const getHealth = () => apiClient.get('/health');
export const createPrediction = (payload) => apiClient.post('/predict', payload);
