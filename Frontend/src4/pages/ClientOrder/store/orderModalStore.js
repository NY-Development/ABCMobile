import { create } from "zustand";

const useOrderModalStore = create((set) => ({
  selectedProduct: null,
  isModalOpen: false,

  openModal: (product) => set({ selectedProduct: product, isModalOpen: true }),
  closeModal: () => set({ selectedProduct: null, isModalOpen: false }),
}));

export default useOrderModalStore;