import API from '@/src/services/axios';
import {
  LoginFormData,
  RegisterFormData,
  OTPFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  AuthResponse,
} from './auth.types';

export const authAPI = {
  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    const response = await API.post<AuthResponse>('/auth/register', {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: data.role,
    });
    return response.data;
  },

  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await API.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  verifyOTP: async (email: string, otp: string): Promise<AuthResponse> => {
    const response = await API.post<AuthResponse>('/auth/verify-otp', {
      email,
      otp,
    });
    return response.data;
  },

  resendOTP: async (email: string): Promise<{ message: string }> => {
    const response = await API.post<{ message: string }>('/auth/resend-otp', {
      email,
    });
    return response.data;
  },

  requestPasswordReset: async (email: string): Promise<{ message: string }> => {
    const response = await API.post<{ message: string }>('/auth/request-password-reset', { email });
    return response.data;
  },

  resetPassword: async (token: string, password: string): Promise<AuthResponse> => {
    const response = await API.post<AuthResponse>('/auth/reset-password', {
      token,
      password,
    });
    return response.data;
  },

  logout: async (): Promise<{ message: string }> => {
    const response = await API.post<{ message: string }>('/auth/logout');
    return response.data;
  },

  getProfile: async (): Promise<AuthResponse> => {
    const response = await API.get<AuthResponse>('/auth/profile');
    return response.data;
  },
};
