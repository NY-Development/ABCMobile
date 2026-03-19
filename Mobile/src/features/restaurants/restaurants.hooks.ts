import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { restaurantsAPI } from './restaurants.api';
import { CompleteVerificationData, VerificationResponse } from './restaurants.types';
import { useAuthStore } from '../auth/auth.store';
import { useVerificationStore } from './restaurants.store';

const RESTAURANTS_KEYS = {
  verificationStatus: ['restaurants', 'verificationStatus'] as const,
  ownerProfile: ['restaurants', 'ownerProfile'] as const,
};

/**
 * Hook to submit owner verification (all 5 steps)
 */
export const useSubmitVerificationMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { clearVerification } = useVerificationStore();

  return useMutation({
    mutationFn: (data: CompleteVerificationData) => restaurantsAPI.submitVerification(data),
    onSuccess: (data: VerificationResponse) => {
      if (data.success) {
        // Clear persisted verification data after successful submission
        clearVerification();

        // Invalidate and refetch verification status
        queryClient.invalidateQueries({
          queryKey: RESTAURANTS_KEYS.verificationStatus,
        });

        // Update auth user with new verification status if available
        if (data.owner && user) {
          useAuthStore.setState({
            user: {
              ...user,
              verificationStatus: data.owner.verificationStatus || 'pending',
            },
          });
        }
      }
    },
    onError: (error: any) => {
      console.error('Verification submission failed:', error);
    },
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
