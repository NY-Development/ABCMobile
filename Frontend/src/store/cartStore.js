import { create } from "zustand";
import {
  addToCart as apiAddToCart,
  getCart as apiGetCart,
  updateCartItem as apiUpdateCartItem,
  removeCartItem as apiRemoveCartItem,
  clearCart as apiClearCart,
} from "../services/cart";

export const useCartStore = create((set, get) => ({
  cart: null,
  items: [],
  loading: false,
  error: null,
  quant: 0,
  quantUpdater: (newQuant) => set({ quant: newQuant }),
  increment: () => set((state) => ({ quant: state.quant + 1 })),
  decrement: () => set((state) => ({ quant: state.quant - 1 })),

  /** ==================== LOAD CART ==================== */
  fetchCart: async () => {
    try {
      set({ loading: true });
      const res = await apiGetCart();
      console.log(res)

      if (res.cart) {
        set({
          cart: res.cart,
          items: res.cart.items || [],
          loading: false,
          error: null,
        });
      } else {
        set({ cart: null, items: [], loading: false });
      }
    } catch (error) {
      console.error("fetchCart error:", error);
      set({ loading: false, error: "Failed to load cart." });
    }
  },

  /** ==================== ADD TO CART ==================== */
  addToCart: async (productId, quantity) => {
    try {
      set({ loading: true });

      await apiAddToCart({ productId, quantity });

      // Refresh cart
      await get().fetchCart();
      set({ loading: false });
    } catch (error) {
      console.error("addToCart error:", error);
      set({ loading: false, error: "Failed to add item." });
    }
  },

  /** ==================== UPDATE QUANTITY ==================== */
  updateItem: async (productId, quantity) => {
    try {
      set({ loading: true });

      await apiUpdateCartItem({ productId, quantity });

      await get().fetchCart();
      set({ loading: false });
    } catch (error) {
      console.error("updateItem error:", error);
      set({ loading: false, error: "Failed to update quantity." });
    }
  },

  /** ==================== REMOVE ITEM ==================== */
  removeItem: async (productId) => {
    try {
      set({ loading: true });

      await apiRemoveCartItem(productId);

      await get().fetchCart();
      set({ loading: false });
    } catch (error) {
      console.error("removeItem error:", error);
      set({ loading: false, error: "Failed to remove item." });
    }
  },

  /** ==================== CLEAR CART ==================== */
  clearCart: async () => {
    try {
      set({ loading: true });

      await apiClearCart();

      set({ cart: null, items: [], loading: false });
    } catch (error) {
      console.error("clearCart error:", error);
      set({ loading: false, error: "Failed to clear cart." });
    }
  },
}));