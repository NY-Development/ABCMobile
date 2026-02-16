// src/context/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useAuthStore, type User } from '../store/authStore';
import type { AuthResponse, MessageResponse } from '../services/authService';

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  register: (data: { name: string; email: string; password: string; phone?: string; role?: 'customer' | 'owner' }) => Promise<AuthResponse>;
  login: (data: { email: string; password: string }) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  verifyOtp: (data: { email: string; code: string }) => Promise<MessageResponse>;
  resendOtp: (data: { email: string }) => Promise<MessageResponse>;
  requestPasswordReset: (data: { email: string }) => Promise<MessageResponse>;
  resetPassword: (data: { email: string; code: string; newPassword: string }) => Promise<MessageResponse>;
  setTokenAndFetchUser: (token: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    user,
    token,
    loading,
    error,
    initialized,
    initialize,
    register,
    login,
    logout,
    verifyOtp,
    resendOtp,
    requestPasswordReset,
    resetPassword,
    setTokenAndFetchUser,
  } = useAuthStore();

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialize, initialized]);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      initialized,
      register,
      login,
      logout,
      verifyOtp,
      resendOtp,
      requestPasswordReset,
      resetPassword,
      setTokenAndFetchUser,
    }),
    [
      user,
      token,
      loading,
      error,
      initialized,
      register,
      login,
      logout,
      verifyOtp,
      resendOtp,
      requestPasswordReset,
      resetPassword,
      setTokenAndFetchUser,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};