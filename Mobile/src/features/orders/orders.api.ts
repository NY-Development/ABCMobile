import API from '@/src/services/axios';
import { Order } from './orders.types';

export const ordersAPI = {
  // Place a new order (single product)
  placeOrder: async (data: {
    productId: string;
    quantity: number;
    deliveryOption: 'pickup' | 'delivery';
  }) => {
    const response = await API.post('/orders/place', data);
    return response.data;
  },

  // Get orders for the logged-in user (customer or owner)
  getOrders: async () => {
    const response = await API.get('/orders');
    return response.data as { orders: Order[]; total: number };
  },

  // Cancel an order (customer only)
  cancelOrder: async (orderId: string) => {
    const response = await API.put(`/orders/cancel/${orderId}`);
    return response.data;
  },

  // Confirm customer agreement on prep time
  confirmAgreement: async (orderId: string, agreed: boolean) => {
    const response = await API.put(`/orders/${orderId}/confirm`, { agreed });
    return response.data;
  },

  // Wishlist toggle
  toggleWishlist: async (productId: string) => {
    const response = await API.post(`/orders/${productId}`);
    return response.data;
  },

  // Get wishlist
  getWishlist: async () => {
    const response = await API.get('/orders/wishlist');
    return response.data;
  },
  // Get a single order by ID
  getOrderById: async (orderId: string) => {
    const response = await API.get(`/orders/${orderId}`);
    return response.data as Order;
  },
};
