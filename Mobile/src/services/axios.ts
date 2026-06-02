import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useAuthStore } from '@/src/features/auth/auth.store';

// const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://abc-mobile-indol.vercel.app/api';
// Use 10.0.2.2 for Android emulator if localhost is used
const DEFAULT_URL = 'http://localhost:5000/api';
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || DEFAULT_URL;

const API: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
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
        // Import store only when needed to avoid circular dependency
        const { useAuthStore } = require('@/src/features/auth/auth.store');
        const { clearAuth } = useAuthStore.getState?.() || {};
        if (clearAuth) {
          await clearAuth();
        }
        console.log('Unauthorized - cleared auth state');
      }
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      hasShownUnauthorizedToast = false;
    }

    return Promise.reject(error);
  }
);

export default API;
