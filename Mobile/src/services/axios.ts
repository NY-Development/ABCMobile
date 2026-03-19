import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useAuthStore } from '@/src/features/auth';

const API: AxiosInstance = axios.create({
  baseURL: 'https://abc-mobile-indol.vercel.app/api',
  // baseURL: 'http://192.168.1.12:5000/api',
  withCredentials: true,
  timeout: 30000,
});

// Flag to track unauthorized toast
let hasShownUnauthorizedToast = false;

// Attach token automatically
API.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('Error getting token from secure store:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors globally
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (!hasShownUnauthorizedToast) {
        hasShownUnauthorizedToast = true;
        // Clear auth store on unauthorized
        const { clearAuth } = useAuthStore.getState?.() || {};
        if (clearAuth) {
          await clearAuth();
        }
        // Navigate to login
        console.log('Unauthorized - should navigate to login');
      }
      return Promise.reject(error);
    }

    // Reset flag for other errors
    if (error.response?.status !== 401) {
      hasShownUnauthorizedToast = false;
    }

    return Promise.reject(error);
  }
);

export default API;
