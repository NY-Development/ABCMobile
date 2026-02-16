// store/orderStore.js
import { create } from "zustand";
import { toast } from "react-hot-toast";
import {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  confirmOrderStatus,
  markAsReady,
} from "../services/order";

export const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  /** 🟢 Place Order */
  placeOrder: async (orderData) => {
    set({ loading: true });
    try {
      const res = await createOrder(orderData);
      set({ loading: false });
      return res.order;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order.");
      set({ loading: false, error: error.message });
    }
  },

  /** 🟢 Fetch Orders for Customer */
  fetchCustomerOrders: async () => {
    set({ loading: true });
    try {
      const res = await getUserOrders();
      set({ orders: res.orders || [], loading: false });
    } catch (error) {
      toast.error("Failed to load your orders.");
      set({ loading: false, error: error.message });
    }
  },

  /** 🟢 Update Order Status (Owner) */
  updateOrderStatus: async (orderId, status, estimatedCompletionTime) => {
    set({ loading: true });
    try {
      const res = await updateOrderStatus(orderId, status, estimatedCompletionTime);
      toast.success(res.message || "Order status updated!");
      set({
        orders: get().orders.map((o) =>
          o._id === orderId ? { ...o, status } : o
        ),
        loading: false,
      });
    } catch (error) {
      toast.error("Failed to update order status.");
      set({ loading: false, error: error.message });
    }
  },

  /** 🟢 Confirm Agreement (Customer) */
  confirmAgreement: async (orderId, agreed) => {
    set({ loading: true });
    try {
      const res = await confirmOrderStatus(orderId, agreed);
      // toast.success(res.message);
      set({
        orders: get().orders.map((o) =>
          o._id === orderId ? { ...o, status: res.order.status } : o
        ),
        loading: false,
      });
    } catch (error) {
      toast.error("Failed to confirm agreement.");
      set({ loading: false, error: error.message });
    }
  },

  /** 🟢 Mark as Ready (Owner) */
  markAsReady: async (orderId, data) => {
    set({ loading: true });
    try {
      const res = await markAsReady(orderId, data);
      toast.success(res.message);
      set({
        orders: get().orders.map((o) =>
          o._id === orderId ? { ...o, status: "delivered" } : o
        ),
        loading: false,
      });
    } catch (error) {
      toast.error("Failed to mark order as ready.");
      set({ loading: false, error: error.message });
    }
  },
}));