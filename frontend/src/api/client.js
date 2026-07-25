import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '');

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  if (!apiBaseUrl) {
    return Promise.reject(new Error('The API service URL is not configured. Set VITE_API_URL and redeploy.'));
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') error.userMessage = 'The API request timed out. Please try again.';
    else if (!error.response) error.userMessage = 'The PaperAI API is unavailable. Please try again shortly.';
    else error.userMessage = error.response.data?.detail || 'The request could not be completed. Please try again.';
    return Promise.reject(error);
  },
);

export const getApiErrorMessage = (error) => error?.userMessage || error?.message || 'Something went wrong. Please try again.';
