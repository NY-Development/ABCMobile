import API from './axios';

export const vendorAPI = {
  // Orders for the logged-in vendor/owner (backend filters by role)
  getMyOrders: async () => {
    const res = await API.get('/orders');
    return res.data as {
      total: number;
      orders: Array<any>;
    };
  },

  // Accept/decline an order (owner only)
  updateOrderStatus: async (orderId: string, status: 'in-progress' | 'rejected') => {
    const res = await API.put(`/orders/${orderId}/status`, { status });
    return res.data;
  },

  // Mark an accepted order as ready for pickup (owner only)
  markOrderAsReady: async (orderId: string, pickupLocation?: string, mapUrl?: string) => {
    const res = await API.put(`/orders/${orderId}/ready`, {
      pickupLocation,
      mapUrl,
    });
    return res.data;
  },

  // Product inventory for the logged-in vendor/owner
  getMyProducts: async (ownerId: string) => {
    const res = await API.get(`/owners/my/${ownerId}`);
    return res.data as Array<any>;
  },

  deleteProduct: async (productId: string) => {
    const res = await API.delete(`/owners/${productId}`);
    return res.data;
  },
};

