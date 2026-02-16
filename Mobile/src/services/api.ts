import axios from 'axios';
import { tokenStorage } from '../utils/storage';

const baseURL =
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  'https://bakerybackend-nine.vercel.app/api';

const API = axios.create({
  baseURL,
  withCredentials: true,
});

API.interceptors.request.use(
  async (config) => {
    const token = await tokenStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      await tokenStorage.remove();
    }
    return Promise.reject(error);
  }
);

export default API;
