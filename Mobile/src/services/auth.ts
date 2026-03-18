import API from './axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  role: 'customer' | 'owner' | 'driver';
}

export interface OTPVerificationPayload {
  email: string;
  otp: string;
}

export interface ResendOTPPayload {
  email: string;
}

export interface PasswordResetPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    role: string;
    avatar?: string;
  };
}

export const authService = {
  register: async (data: RegisterPayload) => {
    const response = await API.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginPayload) => {
    const response = await API.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  verifyOTP: async (data: OTPVerificationPayload) => {
    const response = await API.post<AuthResponse>('/auth/verify-otp', data);
    return response.data;
  },

  resendOTP: async (data: ResendOTPPayload) => {
    const response = await API.post<{ message: string }>('/auth/resend-otp', data);
    return response.data;
  },

  requestPasswordReset: async (data: PasswordResetPayload) => {
    const response = await API.post<{ message: string }>('/auth/request-password-reset', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordPayload) => {
    const response = await API.post<AuthResponse>('/auth/reset-password', data);
    return response.data;
  },

  logout: async () => {
    const response = await API.post('/auth/logout');
    return response.data;
  },

  getProfile: async () => {
    const response = await API.get('/auth/profile');
    return response.data;
  },
};
