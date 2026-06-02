import { useMutation } from '@tanstack/react-query';
import { authAPI } from './feedback.api';
import {
  LoginFormData,
  RegisterFormData,
  OTPFormData,
} from './feedback.types';

export const AUTH_KEYS = {
  login: ['auth', 'login'] as const,
  register: ['auth', 'register'] as const,
  verifyOtp: ['auth', 'verifyOtp'] as const,
  resendOtp: ['auth', 'resendOtp'] as const,
  requestPasswordReset: ['auth', 'requestPasswordReset'] as const,
  resetPassword: ['auth', 'resetPassword'] as const,
  profile: ['auth', 'profile'] as const,
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: LoginFormData) => authAPI.login(data),
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterFormData) => authAPI.register(data),
  });
};

export const useVerifyOTPMutation = () => {
  return useMutation({
    mutationFn: (data: OTPFormData & { email: string }) => authAPI.verifyOTP(data.email, data.otp),
  });
};

export const useResendOTPMutation = () => {
  return useMutation({
    mutationFn: (email: string) => authAPI.resendOTP(email),
  });
};

export const useRequestPasswordResetMutation = () => {
  return useMutation({
    mutationFn: (email: string) => authAPI.requestPasswordReset(email),
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: { token: string; password: string }) =>
      authAPI.resetPassword(data.token, data.password),
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: () => authAPI.logout(),
  });
};
