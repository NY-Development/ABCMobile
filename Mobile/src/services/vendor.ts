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

  addProduct: async (payload: {
    name: string;
    description?: string;
    category: string;
    price: number;
    availableQuantity: number;
    size?: string;
    color?: string;
    shape?: string;
    image?: { uri: string; name: string; type: string };
  }) => {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('category', payload.category);
    formData.append('price', String(payload.price));
    formData.append('availableQuantity', String(payload.availableQuantity));
    if (payload.description) formData.append('description', payload.description);
    if (payload.size) formData.append('size', payload.size);
    if (payload.color) formData.append('color', payload.color);
    if (payload.shape) formData.append('shape', payload.shape);
    if (payload.image?.uri) {
      formData.append('image', payload.image as any);
    }

    const res = await API.post('/owners/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  updateProduct: async (
    productId: string,
    payload: {
      name?: string;
      description?: string;
      category?: string;
      price?: number;
      availableQuantity?: number;
      size?: string;
      color?: string;
      shape?: string;
      image?: { uri: string; name: string; type: string };
    }
  ) => {
    const formData = new FormData();
    if (payload.name) formData.append('name', payload.name);
    if (payload.category) formData.append('category', payload.category);
    if (payload.price !== undefined) formData.append('price', String(payload.price));
    if (payload.availableQuantity !== undefined) {
      formData.append('availableQuantity', String(payload.availableQuantity));
    }
    if (payload.description) formData.append('description', payload.description);
    if (payload.size) formData.append('size', payload.size);
    if (payload.color) formData.append('color', payload.color);
    if (payload.shape) formData.append('shape', payload.shape);
    if (payload.image?.uri) {
      // Backend currently checks `if (image) product.image = imageUrl`.
      formData.append('image', payload.image as any);
      formData.append('imageFlag', '1');
    }

    const res = await API.put(`/owners/update/${productId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  updateOwnerAdditionalInfo: async (payload: {
    companyName?: string;
    location?: string;
    address?: string;
    accountNumber?: string;
    mapLink?: string;
    companyImage?: { uri: string; name: string; type: string };
  }) => {
    const formData = new FormData();
    if (payload.companyName) formData.append('companyName', payload.companyName);
    if (payload.location) formData.append('location', payload.location);
    if (payload.address) formData.append('address', payload.address);
    if (payload.accountNumber) formData.append('accountNumber', payload.accountNumber);
    if (payload.mapLink) formData.append('mapLink', payload.mapLink);
    if (payload.companyImage?.uri) {
      formData.append('companyImage', payload.companyImage as any);
    }

    const res = await API.post('/owners/additional-info', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};

