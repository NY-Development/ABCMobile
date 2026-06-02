import { z } from 'zod';

// ===========================
// Verify Owner Steps Schemas
// ===========================

// Step 1: Basic Business Information
export const step1Schema = z.object({
  bakeryName: z.string().min(2, 'Bakery name must be at least 2 characters'),
  businessEmail: z.string().email('Invalid email address'),
  businessPhone: z.string().regex(/^[0-9]{9,}$/, 'Phone number must be at least 9 digits'),
});

export type Step1FormData = z.infer<typeof step1Schema>;

// Step 2: Location & Address
export const step2Schema = z.object({
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  formattedAddress: z.string().min(5, 'Please provide a complete address'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
  street: z.string().optional(),
  building: z.string().optional(),
  postalCode: z.string().optional(),
});

export type Step2FormData = z.infer<typeof step2Schema>;

// Step 3: Business Branding & Identity
export const step3Schema = z.object({
  companyImage: z.object({
    uri: z.string(),
    fileName: z.string().optional(),
    fileSize: z.number().optional(),
  }),
});

export type Step3FormData = z.infer<typeof step3Schema>;

// Step 4: Official Documentation (Trading License)
export const step4Schema = z.object({
  tradingLicense: z.object({
    uri: z.string(),
    fileName: z.string().optional(),
    fileSize: z.number().optional(),
  }),
  isPDF: z.boolean().optional(),
});

export type Step4FormData = z.infer<typeof step4Schema>;

// Step 5: Review & Submit
export const step5Schema = z.object({
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export type Step5FormData = z.infer<typeof step5Schema>;

// Complete Verification Data (all steps combined)
export interface CompleteVerificationData {
  bakeryName: string;
  businessEmail: string;
  businessPhone: string;
  formattedAddress: string;
  city: string;
  country: string;
  latitude: number | undefined;
  longitude: number | undefined;
  street?: string;
  building?: string;
  postalCode?: string;
  companyImage:
    | FormData
    | string
    | {
        uri: string;
        fileName?: string;
        fileSize?: number;
      };
  tradingLicense:
    | FormData
    | string
    | {
        uri: string;
        fileName?: string;
        fileSize?: number;
      };
  termsAccepted: boolean;
}

// API Response Types
export interface VerificationResponse {
  success: boolean;
  message: string;
  owner?: {
    id: string;
    name: string;
    email: string;
    status: string;
    verificationStatus: 'pending' | 'verified' | 'rejected';
  };
}

export interface VerificationState {
  step1: Step1FormData | null;
  step2: Step2FormData | null;
  step3: Step3FormData | null;
  step4: Step4FormData | null;
  step5: Step5FormData | null;
  currentStep: number;
  isSubmitting: boolean;
  error: string | null;
}

// ===========================
// Product & Owner Types
// ===========================

export interface Owner {
  _id: string;
  name: string;
  email: string;
  companyName?: string;
  companyImage?: string;
  location?: string;
  companyVerified?: boolean;
}

export interface Product {
  _id: string;
  owner: Owner | string;
  name: string;
  image: string;
  category: 'Cookies' | 'Waffles' | 'Macarons' | 'Snacks' | 'Beverages' | 'Cake';
  size?: string;
  color?: string;
  shape?: string;
  availableQuantity: number;
  price: number;
  description?: string;
  isActive: boolean;
  createdAt: string;
}
