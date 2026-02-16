// services/order.js
import API from "./axios";

// ✅ Create a new order (Customer → Owner)
export const createOrder = async (orderData) => {
  const res = await API.post("/orders/place", orderData);
  return res.data;
};

// ✅ Get all orders for the logged-in customer
export const getUserOrders = async () => {
  const res = await API.get("/orders");
  return res.data;
};

// ✅ Update order status (owner side)
export const updateOrderStatus = async (orderId, status, time) => {
  const res = await API.put(`/orders/${orderId}/status`, { status, time });
  return res.data;
};

// ✅ Customer confirms they received or accepted order
export const confirmOrderStatus = async (orderId, confirmed = true) => {
  const res = await API.put(`/orders/${orderId}/confirm`, { confirmed });
  return res.data;
};

// ✅ Owner marks order as ready (pickup/delivery)
export const markAsReady = async (orderId) => {
  const res = await API.put(`/orders/${orderId}/ready`, { ready: true });
  return res.data;
};
