import API from '@/src/services/axios';
import { CartItem } from './cart.types';

export const cartAPI = {
  addToCart: async (productId: string, quantity: number) => {
    const response = await API.post('/cart', { productId, quantity });
    return response.data;
  },

  removeFromCart: async (productId: string) => {
    const response = await API.delete(`/cart/${productId}`);
    return response.data;
  },

  updateCartItem: async (productId: string, quantity: number) => {
    const response = await API.put(`/cart/${productId}`, { quantity });
    return response.data;
  },

  getCart: async () => {
    const response = await API.get('/cart');
    return response.data;
  },

  clearCart: async () => {
    const response = await API.delete('/cart');
    return response.data;
  },
};
