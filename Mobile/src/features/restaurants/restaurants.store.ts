import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Step1FormData,
  Step2FormData,
  Step3FormData,
  Step4FormData,
  Step5FormData,
  VerificationState,
} from './restaurants.types';

interface VerificationStore extends VerificationState {
  // Actions to update each step
  setStep1: (data: Step1FormData) => void;
  setStep2: (data: Step2FormData) => void;
  setStep3: (data: Step3FormData) => void;
  setStep4: (data: Step4FormData) => void;
  setStep5: (data: Step5FormData) => void;

  // General actions
  setCurrentStep: (step: number) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setError: (error: string | null) => void;

  // Clear all verification data
  clearVerification: () => void;

  // Get complete data for submission
  getCompleteData: () => any;
}

export const useVerificationStore = create<VerificationStore>()(
  persist(
    (set, get) => ({
      step1: null,
      step2: null,
      step3: null,
      step4: null,
      step5: null,
      currentStep: 1,
      isSubmitting: false,
      error: null,

      setStep1: (data) => set({ step1: data, currentStep: 1 }),
      setStep2: (data) => set({ step2: data, currentStep: 2 }),
      setStep3: (data) => set({ step3: data, currentStep: 3 }),
      setStep4: (data) => set({ step4: data, currentStep: 4 }),
      setStep5: (data) => set({ step5: data, currentStep: 5 }),

      setCurrentStep: (step) => set({ currentStep: step }),
      setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
      setError: (error) => set({ error }),

      clearVerification: () =>
        set({
          step1: null,
          step2: null,
          step3: null,
          step4: null,
          step5: null,
          currentStep: 1,
          isSubmitting: false,
          error: null,
        }),

      getCompleteData: () => {
        const state = get();
        return {
          ...state.step1,
          ...state.step2,
          ...state.step3,
          ...state.step4,
          ...state.step5,
        };
      },
    }),
    {
      name: 'verification-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
