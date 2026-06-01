import { useMutation, useQuery } from '@tanstack/react-query';
import { cartAPI } from './cart.api';

export const CART_KEYS = {
  all: ['cart'] as const,
  items: ['cart', 'items'] as const,
};

export const useAddToCartMutation = () => {
  return useMutation({
    mutationFn: (data: { productId: string; quantity: number }) =>
      cartAPI.addToCart(data.productId, data.quantity),
  });
};

export const useRemoveFromCartMutation = () => {
  return useMutation({
    mutationFn: (productId: string) => cartAPI.removeFromCart(productId),
  });
};

export const useUpdateCartMutation = () => {
  return useMutation({
    mutationFn: (data: { productId: string; quantity: number }) =>
      cartAPI.updateCartItem(data.productId, data.quantity),
  });
};

export const useClearCartMutation = () => {
  return useMutation({
    mutationFn: () => cartAPI.clearCart(),
  });
};

export const useGetCartQuery = () => {
  return useQuery({
    queryKey: CART_KEYS.all,
    queryFn: cartAPI.getCart,
  });
};
