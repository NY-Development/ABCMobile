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
import { useThemeStore } from '@/src/store/themeStore';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const router = useRouter();
  const { colorScheme, setColorScheme } = useColorScheme();
  const { initializeAuth, token } = useAuthStore();
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
    if (!token && isProtectedGroup) {
      AsyncStorage.setItem('lastRoute', pathname || '/(global)/landing').catch(() => {});
      router.replace('/(global)/login');
    }
  }, [authBootstrapped, token, isProtectedGroup, pathname, router]);

  // Persist last visited route (so splash can "resume" on reload).
  useEffect(() => {
    if (!authBootstrapped) return;
    if (!token) return;
    if (!pathname) return;
    if (!isProtectedGroup) return;
    AsyncStorage.setItem('lastRoute', pathname).catch(() => {});
  }, [authBootstrapped, token, pathname, isProtectedGroup]);

  useEffect(() => {
    (async () => {
      await initializeAuth();
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
