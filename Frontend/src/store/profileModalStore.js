import { create } from 'zustand';

export const useProfileModalStore = create((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }), // Corrected to set to the provided value
  toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));