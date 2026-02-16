import { create } from "zustand";
import { toast } from "react-hot-toast";
import {
  getOwnerProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/owner";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  fetchOwnerProducts: async (ownerId) => {
    set({ loading: true, error: null });
    try {
      const res = await getOwnerProducts(ownerId);
      set({ products: res.products, loading: false});
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      set({ error: msg, loading: false });
      toast.error(msg);
    }
  },

  addNewProduct: async (data) => {
    set({ loading: true });
    try {
      const res = await addProduct(data);
      set((state) => ({ products: [...state.products, res.product], loading: false }));
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      set({ loading: false });
      toast.error(msg);
    }
  },

  updateExistingProduct: async (id, data) => {
    set({ loading: true });
    try {
      const res = await updateProduct(id, data);
      set((state) => ({
        products: state.products.map((p) => (p._id === id ? res.product : p)),
        loading: false,
      }));
      toast.success("✅ Product updated!");
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      set({ loading: false });
      toast.error(msg);
    }
  },

  removeProduct: async (id) => {
    set({ loading: true });
    try {
      const res = await deleteProduct(id);
      console.log(res);
      if(res.status){
        set((state) => ({
          products: state.products.filter((p) => p._id !== id),
          loading: false,
        }));
      }
      toast(res.message, {duration: 3000, icon:'ℹ️'});
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      set({ loading: false });
      toast.error(msg);
    }
  },
}));