import API from "../../../lib/axios";

// ============================
// Update Owner Additional Info (after registration)
// ============================
export const updateOwnerAdditionalInfo = async (formData) => {
  try {
    const { data } = await API.post("/owners/additional-info", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, message: data.message, owner: data.owner };
  } catch (error) {
    console.error("updateOwnerAdditionalInfo error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to update owner information.",
    };
  }
};

// ============================
// Add a New Product (Owner Only)
// ============================
export const addProduct = async (productData) => {
  try {
    const  res = await API.post("/owners/add", productData);
    return { success: true, message: res.data.message, product: res.data.product };
  } catch (error) {
    console.error("addProduct error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to add product.",
    };
  }
};

// ============================
// Update Existing Product
// ============================
export const updateProduct = async (productId, updates) => {
  try {
    const { data } = await API.put(`/owners/update/${productId}`, updates);
    return { success: true, message: data.message, product: data.product };
  } catch (error) {
    console.error("updateProduct error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update product.",
    };
  }
};

// ============================
// Reduce Stock When Order Placed
// ============================
export const reduceStockOnOrder = async (productId, quantity) => {
  try {
    const { data } = await API.post("/owners/reduce-stock", {
      productId,
      quantity,
    });
    return { success: true, message: data.message, product: data.product };
  } catch (error) {
    console.error("reduceStockOnOrder error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update stock.",
    };
  }
};

// ============================
// Get All Active Products (Public)
// ============================
export const getAllProducts = async () => {
  try {
    const { data } = await API.get("/owners/all");
    return { success: true, products: data.products || data };
  } catch (error) {
    console.error("getAllProducts error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch products.",
    };
  }
};

// ============================
// Get All Products by Specific Owner
// ============================
export const getOwnerProducts = async (ownerId) => {
  try {
    const { data } = await API.get(`/owners/my/${ownerId}`);
    return { success: true, products: data.products || data };
  } catch (error) {
    console.error("getOwnerProducts error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to fetch owner's products.",
    };
  }
};

// ============================
// Delete Product (Owner Only)
// ============================
export const deleteProduct = async (productId) => {
  try {
    const res = await API.delete(`/owners/${productId}`);
    return { message: res?.message, productId: res?.data?.productId };
  } catch (error) {
    console.error("deleteProduct error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete product.",
    };
  }
};

// ============================
// Get Owner Info by ID
// (Useful for bakery details and public views)
// ============================
export const getSingleOwner = async(id) => {
  const res = await API.get(`/admin/owners/${id}`);
  return res.data;
};
