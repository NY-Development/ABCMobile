import API from '@/src/services/axios';
import { CompleteVerificationData, VerificationResponse } from './restaurants.types';

export const restaurantsAPI = {
  // Submit complete verification data (all 5 steps)
  submitVerification: async (data: CompleteVerificationData): Promise<VerificationResponse> => {
    const formData = new FormData();

    // Step 1: Basic Info
    formData.append('companyName', data.bakeryName);
    formData.append('businessEmail', data.businessEmail);
    formData.append('businessPhone', data.businessPhone);

    // Step 2: Address
    formData.append('address', data.formattedAddress);
    formData.append('city', data.city);
    formData.append('country', data.country);
    formData.append('street', data.street || '');
    formData.append('building', data.building || '');
    formData.append('postalCode', data.postalCode || '');

    // Location coordinates (if available)
    if (data.latitude !== undefined) {
      formData.append('latitude', String(data.latitude));
    }
    if (data.longitude !== undefined) {
      formData.append('longitude', String(data.longitude));
    }

    // Step 3: Company Image
    if (data.companyImage instanceof FormData) {
      formData.append('companyImage', data.companyImage);
    } else if (typeof data.companyImage === 'string') {
      formData.append('companyImage', data.companyImage);
    }

    // Step 4: Trading License
    if (data.tradingLicense instanceof FormData) {
      formData.append('tradingLicense', data.tradingLicense);
    } else if (typeof data.tradingLicense === 'string') {
      formData.append('tradingLicense', data.tradingLicense);
    }

    const response = await API.post<VerificationResponse>('/owners/additional-info', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get verification status
  getVerificationStatus: async (ownerId: string): Promise<any> => {
    const response = await API.get(`/owners/${ownerId}/verification-status`);
    return response.data;
  },

  // Get owner profile
  getOwnerProfile: async (ownerId: string): Promise<any> => {
    const response = await API.get(`/owners/${ownerId}`);
    return response.data;
  },
};
