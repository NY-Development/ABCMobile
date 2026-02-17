import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark';

type ThemeState = {
  mode: ThemeMode;
  hydrated: boolean;
  initialize: () => Promise<void>;
  setMode: (mode: ThemeMode) => Promise<void>;
  toggle: () => Promise<void>;
};

const THEME_KEY = 'theme_mode';

const isThemeMode = (value: string | null): value is ThemeMode => {
  return value === 'light' || value === 'dark';
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'light',
  hydrated: false,

  initialize: async () => {
    const stored = await AsyncStorage.getItem(THEME_KEY);
    if (isThemeMode(stored)) {
      set({ mode: stored });
    }
    set({ hydrated: true });
  },

  setMode: async (mode) => {
    set({ mode });
    await AsyncStorage.setItem(THEME_KEY, mode);
  },

  toggle: async () => {
    const next = get().mode === 'light' ? 'dark' : 'light';
    set({ mode: next });
    await AsyncStorage.setItem(THEME_KEY, next);
  },
}));
