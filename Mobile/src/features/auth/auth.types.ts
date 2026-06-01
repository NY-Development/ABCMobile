import { z } from 'zod';

export interface User {
  id: string;
  _id?: string;
  email: string;
  name?: string;
  firstname?: string;
  lastname?: string;
  phone: string;
  role: 'customer' | 'owner' | 'admin' | 'driver';
  avatar?: string;
  image?: string;
  firstLogin?: boolean;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
  ownerInfo?: Record<string, any>;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Validation Schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().regex(/^\+?[0-9]{9,}$/, 'Phone number must be at least 9 digits'),
  role: z.enum(['customer', 'owner', 'driver']),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^[0-9]{6}$/, 'OTP must contain only digits'),
});

export type OTPFormData = z.infer<typeof otpSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
