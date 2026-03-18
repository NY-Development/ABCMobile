import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import {
  authService,
  LoginPayload,
  RegisterPayload,
  OTPVerificationPayload,
  ResendOTPPayload,
  PasswordResetPayload,
  ResetPasswordPayload,
} from '../services/auth';
import { useAuthStore } from '@/src/features/auth';

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
    mutationFn: (data: LoginPayload) => authService.login(data),
    onSuccess: async (data) => {
      await SecureStore.setItemAsync('token', data.token);
      setAuth(data.user, data.token);
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.profile });
    },
    onError: (error: any) => {
      console.error('Login failed:', error);
    },
  });
};

export const useRegisterMutation = () => {
  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterPayload) => authService.register(data),
    onSuccess: async (data) => {
      await SecureStore.setItemAsync('token', data.token);
      setAuth(data.user, data.token);
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.profile });
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
    mutationFn: (data: OTPVerificationPayload) => authService.verifyOTP(data),
    onSuccess: async (data) => {
      await SecureStore.setItemAsync('token', data.token);
      setAuth(data.user, data.token);
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.profile });
    },
    onError: (error: any) => {
      console.error('OTP verification failed:', error);
    },
  });
};

export const useResendOTPMutation = () => {
  return useMutation({
    mutationFn: (data: ResendOTPPayload) => authService.resendOTP(data),
    onError: (error: any) => {
      console.error('Resend OTP failed:', error);
    },
  });
};

export const useRequestPasswordResetMutation = () => {
  return useMutation({
    mutationFn: (data: PasswordResetPayload) => authService.requestPasswordReset(data),
    onError: (error: any) => {
      console.error('Request password reset failed:', error);
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordPayload) => authService.resetPassword(data),
    onError: (error: any) => {
      console.error('Reset password failed:', error);
    },
  });
};

export const useLogoutMutation = () => {
  const { clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
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
