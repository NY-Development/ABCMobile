import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { User } from './auth.types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setAuth: (user: User, token: string) => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      setAuth: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      setUser: (user) => {
        set({ user });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      clearAuth: async () => {
        try {
          await SecureStore.deleteItemAsync('token');
        } catch (error) {
          console.error('Error clearing secure store:', error);
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      initializeAuth: async () => {
        set({ isLoading: true });
        try {
          const token = await SecureStore.getItemAsync('token');
          if (token) {
            set({ token, isAuthenticated: true });
          }
        } catch (error) {
          console.error('Error initializing auth:', error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        getItem: async (name) => {
          try {
            const item = await SecureStore.getItemAsync(name);
            return item ? JSON.parse(item) : null;
          } catch {
            return null;
          }
        },
        setItem: async (name, value) => {
          try {
            await SecureStore.setItemAsync(name, JSON.stringify(value));
          } catch {}
        },
        removeItem: async (name) => {
          try {
            await SecureStore.deleteItemAsync(name);
          } catch {}
        },
      })),
    }
  )
);

