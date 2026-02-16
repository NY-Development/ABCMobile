import { create } from 'zustand';
import { registerUser, loginUser, getUserProfile, logoutUser } from '../services/auth';

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  initialized: false, // Track if auth state has been checked

  // ------------------------
  // Register
  // ------------------------
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const res = await registerUser(userData);
      return { success: true, message: res.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      set({ error: message });
      return { success: false, message };
    } finally {
      set({ loading: false });
    }
  },

  // ------------------------
  // Login
  // ------------------------
  login: async ({ email, password }) => {
    set({ loading: true, error: null });
    try {
      const data = await loginUser({ email, password });
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        set({ user: data.user });
      }
      return data.user;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      set({ error: message });
      return { success: false, message };
    } finally {
      set({ loading: false });
    }
  },

  // ------------------------
  // Logout
  // ------------------------
  logout: async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      localStorage.removeItem('token');
      set({ user: null });
    }
  },

  // ------------------------
  // Fetch profile from token
  // ------------------------
  fetchProfile: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ user: null, loading: false, initialized: true });
      return;
    }

    set({ loading: true });
    try {
      const profile = await getUserProfile(); // API call
      set({ user: profile });
    } catch (error) {
      console.error('Token invalid or expired', error);
      localStorage.removeItem('token');
      set({ user: null });
    } finally {
      set({ loading: false, initialized: true });
    }
  }
}));