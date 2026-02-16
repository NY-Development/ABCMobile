import { create } from 'zustand';
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  requestPasswordReset,
  resendUserOtp,
  resetPassword,
  verifyUserOtp,
  type MessageResponse,
  type AuthResponse,
  type UserProfile,
} from '../services/authService';
import { tokenStorage } from '../utils/storage';

export type User = UserProfile;

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  initialize: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  register: (data: { name: string; email: string; password: string; phone?: string; role?: 'customer' | 'owner' }) => Promise<AuthResponse>;
  login: (data: { email: string; password: string }) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  verifyOtp: (data: { email: string; code: string }) => Promise<MessageResponse>;
  resendOtp: (data: { email: string }) => Promise<MessageResponse>;
  requestPasswordReset: (data: { email: string }) => Promise<MessageResponse>;
  resetPassword: (data: { email: string; code: string; newPassword: string }) => Promise<MessageResponse>;
  setTokenAndFetchUser: (token: string) => Promise<void>;
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response;
    if (response?.data?.message) return response.data.message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  initialized: false,

  initialize: async () => {
    const token = await tokenStorage.get();
    if (!token) {
      set({ initialized: true, user: null, token: null });
      return;
    }
    set({ token });
    await get().fetchProfile();
    set({ initialized: true });
  },

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const profile = await getUserProfile();
      set({ user: profile });
    } catch (error) {
      await tokenStorage.remove();
      set({ user: null, token: null, error: getErrorMessage(error, 'Session expired.') });
    } finally {
      set({ loading: false });
    }
  },

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const result = await registerUser(data);
      return result;
    } catch (error) {
      const message = getErrorMessage(error, 'Registration failed.');
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const result = await loginUser(data);
      if (result?.token) {
        await tokenStorage.set(result.token);
        set({ token: result.token, user: result.user ? result.user as UserProfile : null });
      }
      return result;
    } catch (error) {
      const message = getErrorMessage(error, 'Login failed.');
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await logoutUser();
    } catch (error) {
      const message = getErrorMessage(error, 'Logout failed.');
      set({ error: message });
    } finally {
      await tokenStorage.remove();
      set({ user: null, token: null, loading: false });
    }
  },

  verifyOtp: async (data) => {
    set({ loading: true, error: null });
    try {
      return await verifyUserOtp(data);
    } catch (error) {
      const message = getErrorMessage(error, 'OTP verification failed.');
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  resendOtp: async (data) => {
    set({ loading: true, error: null });
    try {
      return await resendUserOtp(data);
    } catch (error) {
      const message = getErrorMessage(error, 'OTP resend failed.');
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  requestPasswordReset: async (data) => {
    set({ loading: true, error: null });
    try {
      return await requestPasswordReset(data);
    } catch (error) {
      const message = getErrorMessage(error, 'Password reset request failed.');
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async (data) => {
    set({ loading: true, error: null });
    try {
      return await resetPassword(data);
    } catch (error) {
      const message = getErrorMessage(error, 'Password reset failed.');
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  setTokenAndFetchUser: async (token: string) => {
    await tokenStorage.set(token);
    set({ token });
    await get().fetchProfile();
  },
}));