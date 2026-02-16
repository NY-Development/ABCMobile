import API from './axios';

// Register a new user
export const registerUser = async (userData) => {
  const res = await API.post('/auth/register', userData);
  return res.data;
};

// Login a user
export const loginUser = async (loginData) => {
  const res = await API.post('/auth/login', loginData);
  return res.data;
};

// Verify user's OTP
export const verifyUserOtp = async (verificationData) => {
  const res = await API.post('/auth/verify-otp', verificationData);
  return res.data;
};

// Resend OTP
export const resendUserOtp = async (emailData) => {
  const res = await API.post('/auth/resend-otp', emailData);
  return res.data;
};

// Get user profile
export const getUserProfile = async () => {
  const res = await API.get('/auth/profile');
  return res.data;
};

// Get user profile
export const getAllUserProfile = async () => {
  const res = await API.get('/auth');
  return res.data;
};

// Request password reset
export const requestPasswordReset = async (emailData) => {
  const res = await API.post('/auth/request-password-reset', emailData);
  return res.data;
};

// Reset password
export const resetPassword = async (resetData) => {
  const res = await API.post('/auth/reset-password', resetData);
  return res.data;
};

export const logoutUser = async () => {
  const res = await API.post('/auth/logout');
  localStorage.removeItem('token');
  return res.data;
};

export const uploadProfileImage = async (formData) => {
  const res = await API.put("/auth/update-profile", formData);
  return res.data;
}