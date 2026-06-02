import API from '@/src/services/axios';
import { CartItem } from './cart.types';

export const cartAPI = {
  addToCart: async (productId: string, quantity: number) => {
    const response = await API.post('/carts/add', { productId, quantity });
    return response.data;
  },

  removeFromCart: async (productId: string, quantity?: number) => {
    const response = await API.post('/carts/remove', { productId, quantity });
    return response.data;
  },

  updateCartItem: async (productId: string, quantity: number) => {
    const response = await API.put('/carts/update', { productId, quantity });
    return response.data;
  },

  getCart: async () => {
    const response = await API.get('/carts/my');
    return response.data;
  },

  clearCart: async () => {
    const response = await API.delete('/carts/clear');
    return response.data;
  },
};
