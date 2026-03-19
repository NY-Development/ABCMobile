import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { View, Pressable } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';

import { queryClient } from '@/src/config/queryClient';
import { useAuthStore } from '@/src/features/auth';
import { useThemeStore } from '@/src/store/themeStore';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { initializeAuth } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();
  const pathname = usePathname();

  // Determine if we should show theme toggle header (hide on login/signup screens)
  const shouldShowThemeHeader =
    !pathname.includes('/(global)/login') && !pathname.includes('/(global)/signup');

  useEffect(() => {
    initializeAuth();
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
