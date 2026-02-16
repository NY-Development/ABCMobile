import { create } from 'zustand';
import { updateOwnerAdditionalInfo, getOwnerProducts } from '../services/owner';

export const useOwnerStore = create((set) => ({
  owner: null,
  loading: false,
  error: null,

  fetchOwnerProfile: async (ownerId) => {
    set({ loading: true });
    try {
      const data = await getOwnerProducts(ownerId);
      set({ owner: data?.owner || null });
      return data;
    } catch (err) {
      console.error(err);
      set({ error: err.message || "Failed to fetch owner profile" });
      return { success: false, message: err.message };
    } finally {
      set({ loading: false });
    }
  },

  submitAdditionalInfo: async (formData) => {
    set({ loading: true, error: null });
    try {
      const data = await updateOwnerAdditionalInfo(formData);
      if (data.success) set({ owner: data.owner });
      return data;
    } catch (err) {
      console.error(err);
      set({ error: err.message || "Failed to update owner info" });
      return { success: false, message: err.message || "Failed to update owner info" };
    } finally {
      set({ loading: false });
    }
  }
}));