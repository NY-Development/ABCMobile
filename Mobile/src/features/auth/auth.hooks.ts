import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { authAPI } from './auth.api';
import {
  LoginFormData,
  RegisterFormData,
  OTPFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
} from './auth.types';
import { useAuthStore } from './auth.store';

const AUTH_KEYS = {
  login: ['auth', 'login'] as const,
  register: ['auth', 'register'] as const,
  verifyOtp: ['auth', 'verifyOtp'] as const,
  resendOtp: ['auth', 'resendOtp'] as const,
  requestPasswordReset: ['auth', 'requestPasswordReset'] as const,
  resetPassword: ['auth', 'resetPassword'] as const,
  profile: ['auth', 'profile'] as const,
};

export const useLoginMutation = () => {
  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginFormData) => authAPI.login(data),
    onSuccess: async (data) => {
      // Ensure token is a string before saving
      const tokenString = typeof data.token === 'string' ? data.token : JSON.stringify(data.token);
      await SecureStore.setItemAsync('token', tokenString);
      setAuth(data.user, tokenString);
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.profile });
    },
    onError: (error: any) => {
      console.error('Login failed:', error);
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterFormData) => authAPI.register(data),
    onSuccess: (data) => {
      // Registration successful - user will verify OTP next
      // Token is not saved here, only after OTP verification
      console.log('Registration successful, user should verify OTP');
    },
    onError: (error: any) => {
      console.error('Registration failed:', error);
    },
  });
};

export const useVerifyOTPMutation = () => {
  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OTPFormData & { email: string }) => authAPI.verifyOTP(data.email, data.otp),
    onSuccess: async (data) => {
      // Ensure token is a string before saving
      const tokenString = typeof data.token === 'string' ? data.token : JSON.stringify(data.token);
      await SecureStore.setItemAsync('token', tokenString);
      setAuth(data.user, tokenString);
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.profile });
    },
    onError: (error: any) => {
      console.error('OTP verification failed:', error);
    },
  });
};

export const useResendOTPMutation = () => {
  return useMutation({
    mutationFn: (email: string) => authAPI.resendOTP(email),
    onError: (error: any) => {
      console.error('Resend OTP failed:', error);
    },
  });
};

export const useRequestPasswordResetMutation = () => {
  return useMutation({
    mutationFn: (email: string) => authAPI.requestPasswordReset(email),
    onError: (error: any) => {
      console.error('Request password reset failed:', error);
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: { token: string; password: string }) =>
      authAPI.resetPassword(data.token, data.password),
    onError: (error: any) => {
      console.error('Reset password failed:', error);
    },
  });
};

export const useLogoutMutation = () => {
  const { clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authAPI.logout(),
    onSuccess: async () => {
      await SecureStore.deleteItemAsync('token');
      clearAuth();
      queryClient.clear();
    },
    onError: (error: any) => {
      console.error('Logout failed:', error);
    },
  });
};
