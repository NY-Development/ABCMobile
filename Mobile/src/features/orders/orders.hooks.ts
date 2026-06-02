import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ordersAPI } from './orders.api';
import { Order } from './orders.types';

export const ORDER_KEYS = {
  all: ['orders'] as const,
  list: ['orders', 'list'] as const,
  wishlist: ['orders', 'wishlist'] as const,
};

export const useOrdersQuery = () => {
  return useQuery({
    queryKey: ORDER_KEYS.list,
    queryFn: ordersAPI.getOrders,
  });
};

export const usePlaceOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { productId: string; quantity: number; deliveryOption: 'pickup' | 'delivery' }) =>
      ordersAPI.placeOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_KEYS.all });
    },
  });
};

export const useCancelOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) => ordersAPI.cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_KEYS.all });
    },
  });
};

export const useConfirmAgreementMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { orderId: string; agreed: boolean }) =>
      ordersAPI.confirmAgreement(data.orderId, data.agreed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_KEYS.all });
    },
  });
};

export const useWishlistQuery = () => {
  return useQuery({
    queryKey: ORDER_KEYS.wishlist,
    queryFn: ordersAPI.getWishlist,
  });
};

export const useToggleWishlistMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => ordersAPI.toggleWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_KEYS.wishlist });
    },
  });
};
export const useOrderByIdQuery = (orderId: string) => {
  return useQuery<Order>({
    queryKey: [...ORDER_KEYS.all, orderId],
    queryFn: () => ordersAPI.getOrderById(orderId),
    enabled: !!orderId,
  });
};
