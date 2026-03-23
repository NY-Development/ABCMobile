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
    const appendFile = (fieldName: string, file: any) => {
      // React Native: FormData needs { uri, name, type } for uploads.
      if (!file) return;

      if (file instanceof FormData) {
        // TS typing for RN FormData is often too strict; we only use this for file uploads.
        formData.append(fieldName, file as any);
        return;
      }

      if (typeof file === 'string') {
        const uri = file;
        const ext = uri.split('.').pop()?.toLowerCase();
        const name = uri.split('/').pop() || `upload.${ext || 'jpg'}`;
        const isPdf = ext === 'pdf';
        const type = isPdf ? 'application/pdf' : 'image/jpeg';
        formData.append(fieldName, { uri, name, type } as any);
        return;
      }

      if (typeof file === 'object' && typeof file.uri === 'string') {
        const uri = file.uri;
        const ext = file.fileName?.split('.').pop()?.toLowerCase() || uri.split('.').pop()?.toLowerCase();
        const isPdf = ext === 'pdf';
        const name = file.fileName || uri.split('/').pop() || `upload.${ext || (isPdf ? 'pdf' : 'jpg')}`;
        const type = isPdf ? 'application/pdf' : 'image/jpeg';
        formData.append(fieldName, { uri, name, type } as any);
      }
    };

    appendFile('companyImage', data.companyImage);

    // Step 4: Trading License
    appendFile('tradingLicense', data.tradingLicense);

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
