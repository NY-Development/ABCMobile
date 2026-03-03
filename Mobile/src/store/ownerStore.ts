import { create } from 'zustand';
import {
  submitOwnerAdditionalInfo,
  type OwnerAdditionalInfoPayload,
  type OwnerAdditionalInfoResponse,
} from '../services/ownerService';

type OwnerState = {
  loading: boolean;
  error: string | null;
  submitAdditionalInfo: (payload: OwnerAdditionalInfoPayload) => Promise<OwnerAdditionalInfoResponse>;
  clearError: () => void;
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response;
    if (response?.data?.message) return response.data.message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
};

export const useOwnerStore = create<OwnerState>((set) => ({
  loading: false,
  error: null,

  submitAdditionalInfo: async (payload) => {
    set({ loading: true, error: null });
    try {
      return await submitOwnerAdditionalInfo(payload);
    } catch (error) {
      const message = getErrorMessage(error, 'Unable to save additional info.');
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
