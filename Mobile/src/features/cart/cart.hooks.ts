import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartAPI } from './cart.api';
import { useCartStore } from './cart.store';

const CART_KEYS = {
  all: ['cart'] as const,
  items: ['cart', 'items'] as const,
};

export const useAddToCartMutation = () => {
  const { addItem } = useCartStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { productId: string; quantity: number }) =>
      cartAPI.addToCart(data.productId, data.quantity),
    onError: (error: any) => {
      console.error('Add to cart failed:', error);
    },
  });
};

export const useRemoveFromCartMutation = () => {
  const { removeItem } = useCartStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => cartAPI.removeFromCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEYS.all });
    },
    onError: (error: any) => {
      console.error('Remove from cart failed:', error);
    },
  });
};

export const useUpdateCartMutation = () => {
  const { updateQuantity } = useCartStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { productId: string; quantity: number }) =>
      cartAPI.updateCartItem(data.productId, data.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEYS.all });
    },
    onError: (error: any) => {
      console.error('Update cart failed:', error);
    },
  });
};

export const useClearCartMutation = () => {
  const { clearCart } = useCartStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartAPI.clearCart(),
    onSuccess: () => {
      clearCart();
      queryClient.invalidateQueries({ queryKey: CART_KEYS.all });
    },
    onError: (error: any) => {
      console.error('Clear cart failed:', error);
    },
  });
};

export const useGetCartQuery = () => {
  return useQuery({
    queryKey: CART_KEYS.all,
    queryFn: cartAPI.getCart,
  });
};
