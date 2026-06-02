import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartAPI } from './cart.api';
import { CartResponse } from './cart.types';

export const CART_KEYS = {
  all: ['cart'] as const,
};

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { productId: string; quantity: number }) =>
      cartAPI.addToCart(data.productId, data.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEYS.all });
    },
  });
};

export const useRemoveFromCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { productId: string; quantity: number }) => 
      cartAPI.removeFromCart(data.productId, data.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEYS.all });
    },
  });
};

export const useUpdateCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { productId: string; quantity: number }) =>
      cartAPI.updateCartItem(data.productId, data.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEYS.all });
    },
  });
};

export const useClearCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => cartAPI.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEYS.all });
    },
  });
};

export const useGetCartQuery = () => {
  return useQuery<CartResponse>({
    queryKey: CART_KEYS.all,
    queryFn: cartAPI.getCart,
  });
};
