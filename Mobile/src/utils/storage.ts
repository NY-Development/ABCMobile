import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';
const THEME_KEY = 'theme_mode';
const PUSH_TOKEN_KEY = 'expo_push_token';

export const tokenStorage = {
  async get(): Promise<string | null> {
    return AsyncStorage.getItem(TOKEN_KEY);
  },
  async set(token: string): Promise<void> {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },
  async remove(): Promise<void> {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },
};

export const themeStorage = {
  async get(): Promise<string | null> {
    return AsyncStorage.getItem(THEME_KEY);
  },
  async set(mode: 'light' | 'dark'): Promise<void> {
    await AsyncStorage.setItem(THEME_KEY, mode);
  },
};

export const pushTokenStorage = {
  async get(): Promise<string | null> {
    return AsyncStorage.getItem(PUSH_TOKEN_KEY);
  },
  async set(token: string): Promise<void> {
    await AsyncStorage.setItem(PUSH_TOKEN_KEY, token);
  },
  async remove(): Promise<void> {
    await AsyncStorage.removeItem(PUSH_TOKEN_KEY);
  },
};
