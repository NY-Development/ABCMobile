import { useMutation, useQuery } from '@tanstack/react-query';
import { restaurantsAPI } from './restaurants.api';
import { CompleteVerificationData, Product } from './restaurants.types';

const RESTAURANTS_KEYS = {
  verificationStatus: ['restaurants', 'verificationStatus'] as const,
  ownerProfile: ['restaurants', 'ownerProfile'] as const,
  allProducts: ['products', 'all'] as const,
  productDetail: (id: string) => ['products', 'detail', id] as const,
  ownerProducts: (id: string) => ['products', 'owner', id] as const,
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

// ===========================
// Customer Discovery Hooks
// ===========================

/**
 * Hook to fetch all products for customer discovery
 */
export const useAllProductsQuery = () => {
  return useQuery<Product[]>({
    queryKey: RESTAURANTS_KEYS.allProducts,
    queryFn: () => restaurantsAPI.getAllProducts(),
  });
};

/**
 * Hook to fetch a single product by ID
 */
export const useProductByIdQuery = (productId: string) => {
  return useQuery<Product>({
    queryKey: RESTAURANTS_KEYS.productDetail(productId),
    queryFn: async () => {
      // In a real app, we'd have a getProductById endpoint. 
      // For now, we fetch all and filter to keep it simple with existing backend.
      const all = await restaurantsAPI.getAllProducts();
      const found = all.find((p: Product) => p._id === productId);
      if (!found) throw new Error('Product not found');
      return found;
    },
    enabled: !!productId,
  });
};

/**
 * Hook to fetch all products for a specific bakery
 */
export const useOwnerProductsQuery = (ownerId: string) => {
  return useQuery<Product[]>({
    queryKey: RESTAURANTS_KEYS.ownerProducts(ownerId),
    queryFn: () => restaurantsAPI.getOwnerProducts(ownerId),
    enabled: !!ownerId,
  });
};

// Export all hooks
export const restaurantsHooks = {
  useSubmitVerificationMutation,
  useVerificationStatusQuery,
  useOwnerProfileQuery,
  useAllProductsQuery,
  useProductByIdQuery,
  useOwnerProductsQuery,
};
