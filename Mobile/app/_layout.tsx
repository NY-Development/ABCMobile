import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack, usePathname, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { queryClient } from '@/src/config/queryClient';
import { useAuthStore } from '@/src/features/auth';
import * as SecureStore from 'expo-secure-store';
import { useThemeStore } from '@/src/store/themeStore';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const router = useRouter();
  const { colorScheme, setColorScheme } = useColorScheme();
  const { isAuthenticated } = useAuthStore();
  const { isDark } = useThemeStore();
  const pathname = usePathname();
  const segments = useSegments();
  const [authBootstrapped, setAuthBootstrapped] = useState(false);

  const currentGroup = (segments?.[0] as string) || '';
  const isProtectedGroup =
    currentGroup === '(customer)' ||
    currentGroup === '(vendor)' ||
    currentGroup === '(admin)' ||
    currentGroup === '(driver)';

  // Protected route guard: if no token, send user to login (except public routes).
  useEffect(() => {
    if (!authBootstrapped) return;
    if (!isAuthenticated && isProtectedGroup) {
    // if(true){
      AsyncStorage.setItem('lastRoute', pathname || '/(global)/landing').catch(() => {});
      router.replace('/(global)/login');
    }
  }, [authBootstrapped, isAuthenticated, isProtectedGroup, pathname, router]);

  // Persist last visited route (so splash can "resume" on reload).
  useEffect(() => {
    if (!authBootstrapped) return;
    if (!isAuthenticated) return;
    if (!pathname) return;
    if (!isProtectedGroup) return;
    AsyncStorage.setItem('lastRoute', pathname).catch(() => {});
  }, [authBootstrapped, isAuthenticated, pathname, isProtectedGroup]);

  useEffect(() => {
    (async () => {
      // Rehydrate logic check could go here if needed.
      // But since Zustand uses Async/Secure Store, it automatically hydrates.
      // We just ensure we render after initial checks.
      const hasToken = await SecureStore.getItemAsync('token');
      setAuthBootstrapped(true);
    })();
  }, []);

  useEffect(() => {
    setColorScheme(isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
        <PortalHost />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
