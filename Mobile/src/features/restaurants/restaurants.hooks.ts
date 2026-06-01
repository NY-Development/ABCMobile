import { useMutation, useQuery } from '@tanstack/react-query';
import { restaurantsAPI } from './restaurants.api';
import { CompleteVerificationData } from './restaurants.types';

const RESTAURANTS_KEYS = {
  verificationStatus: ['restaurants', 'verificationStatus'] as const,
  ownerProfile: ['restaurants', 'ownerProfile'] as const,
};

/**
 * Hook to submit owner verification (all 5 steps)
 */
export const useSubmitVerificationMutation = () => {
  return useMutation({
    mutationFn: (data: CompleteVerificationData) => restaurantsAPI.submitVerification(data),
  });
};

/**
 * Hook to get verification status
 */
export const useVerificationStatusQuery = (ownerId: string | null) => {
  return useQuery({
    queryKey: RESTAURANTS_KEYS.verificationStatus,
    queryFn: () => {
      if (!ownerId) return null;
      return restaurantsAPI.getVerificationStatus(ownerId);
    },
    enabled: !!ownerId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook to get owner profile
 */
export const useOwnerProfileQuery = (ownerId: string | null) => {
  return useQuery({
    queryKey: RESTAURANTS_KEYS.ownerProfile,
    queryFn: () => {
      if (!ownerId) return null;
      return restaurantsAPI.getOwnerProfile(ownerId);
    },
    enabled: !!ownerId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Export all hooks
export const restaurantsHooks = {
  useSubmitVerificationMutation,
  useVerificationStatusQuery,
  useOwnerProfileQuery,
};
