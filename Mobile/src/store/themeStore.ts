import { create } from 'zustand';
import { themeStorage } from '../utils/storage';

export type ThemeMode = 'light' | 'dark';

type ThemeState = {
  mode: ThemeMode;
  hydrated: boolean;
  initialize: () => Promise<void>;
  setMode: (mode: ThemeMode) => Promise<void>;
  toggle: () => Promise<void>;
};

const isThemeMode = (value: string | null): value is ThemeMode => {
  return value === 'light' || value === 'dark';
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'light',
  hydrated: false,

  initialize: async () => {
    const stored = themeStorage.getSync();
    if (isThemeMode(stored)) {
      set({ mode: stored });
    }
    set({ hydrated: true });
  },

  setMode: async (mode) => {
    set({ mode });
    themeStorage.setSync(mode);
  },

  toggle: async () => {
    const next = get().mode === 'light' ? 'dark' : 'light';
    set({ mode: next });
    themeStorage.setSync(next);
  },
}));
