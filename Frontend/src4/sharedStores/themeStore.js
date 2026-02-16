import { create } from 'zustand';

export const useTheme = create((set) => ({
    isDark: false,
    toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}));