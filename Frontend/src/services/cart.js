import API from "./axios";

// Add item to cart
export const addToCart = async (formData) => {
  const res = await API.post("/carts/add", formData);
  return res.data;
};

// Get cart (GET request)
export const getCart = async () => {
  const res = await API.get("/carts/my");
  return res.data;
};

// Update cart item quantity (PUT)
export const updateCartItem = async (formData) => {
  const res = await API.put("/carts/update", formData);
  return res.data;
};

// Remove specific item (DELETE)
export const removeCartItem = async (productId) => {
  const res = await API.delete(`/carts/remove/${productId}`);
  return res.data;
};

// Clear the entire cart (DELETE)
export const clearCart = async () => {
  const res = await API.delete("/carts/clear");
  return res.data;
};