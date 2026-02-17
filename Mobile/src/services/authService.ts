import API from './api';

export type MessageResponse = {
  message: string;
};

export type AuthResponse = {
  token: string;
  user: Record<string, unknown> | null;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  image?: string;
  // Add other fields as needed
};

// Register user
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'customer' | 'owner';
}): Promise<AuthResponse> => {
  const res = await API.post('/auth/register', userData);
  return res.data;
};

// Login user
export const loginUser = async (loginData: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const res = await API.post('/auth/login', loginData);
  return res.data;
};

// Verify OTP
export const verifyUserOtp = async (verificationData: {
  email: string;
  code: string;
}): Promise<MessageResponse> => {
  const res = await API.post('/auth/verify-otp', verificationData);
  return res.data;
};

// Resend OTP
export const resendUserOtp = async (emailData: { email: string }): Promise<MessageResponse> => {
  const res = await API.post('/auth/resend-otp', emailData);
  return res.data;
};

// Get current user profile
export const getUserProfile = async (): Promise<UserProfile> => {
  const res = await API.get('/auth/profile');
  return res.data;
};

// Request password reset
export const requestPasswordReset = async (emailData: { email: string }): Promise<MessageResponse> => {
  const res = await API.post('/auth/request-password-reset', emailData);
  return res.data;
};

// Reset password
export const resetPassword = async (resetData: { email: string; code: string; newPassword: string }): Promise<MessageResponse> => {
  const res = await API.post('/auth/reset-password', resetData);
  return res.data;
};

// Logout
export const logoutUser = async (): Promise<MessageResponse> => {
  const res = await API.post('/auth/logout');
  return res.data;
};