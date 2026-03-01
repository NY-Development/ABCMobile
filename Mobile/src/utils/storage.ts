import { createMMKV } from 'react-native-mmkv';

export const appStorage = createMMKV({
  id: 'abc-mobile-storage',
});

const TOKEN_KEY = 'auth_token';
const THEME_KEY = 'theme_mode';
const PUSH_TOKEN_KEY = 'expo_push_token';

export const tokenStorage = {
  getSync(): string | null {
    return appStorage.getString(TOKEN_KEY) ?? null;
  },
  async get(): Promise<string | null> {
    return this.getSync();
  },
  setSync(token: string): void {
    appStorage.set(TOKEN_KEY, token);
  },
  async set(token: string): Promise<void> {
    this.setSync(token);
  },
  removeSync(): void {
    appStorage.remove(TOKEN_KEY);
  },
  async remove(): Promise<void> {
    this.removeSync();
  },
};

export const themeStorage = {
  getSync(): string | null {
    return appStorage.getString(THEME_KEY) ?? null;
  },
  setSync(mode: 'light' | 'dark'): void {
    appStorage.set(THEME_KEY, mode);
  },
};

export const pushTokenStorage = {
  getSync(): string | null {
    return appStorage.getString(PUSH_TOKEN_KEY) ?? null;
  },
  setSync(token: string): void {
    appStorage.set(PUSH_TOKEN_KEY, token);
  },
  removeSync(): void {
    appStorage.remove(PUSH_TOKEN_KEY);
  },
};
