import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { useThemeStore } from '@/src/features/theme';
import { useAuthStore } from '@/src/features/auth';

export default function SplashScreen() {
  const { isDark } = useThemeStore();
  const { user, initializeAuth } = useAuthStore();

  useEffect(() => {
    const bootstrap = async () => {
      await initializeAuth();

      // Navigate based on auth state
      setTimeout(() => {
        if (user) {
          if (user.role === 'owner') {
            router.replace('/(vendor)/dashboard');
          } else {
            router.replace('/(customer)/home');
          }
        } else {
          router.replace('/(global)/landing');
        }
      }, 1500);
    };

    bootstrap();
  }, [user]);

  return (
    <View className={`flex-1 items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <View className="items-center gap-4">
        <Text className="mb-4 text-6xl">🍰</Text>
        <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Adama Bakery
        </Text>
        <View className="mt-6 flex-row gap-1">
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              className={`h-2 w-2 rounded-full ${isDark ? 'bg-primary' : 'bg-primary'}`}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
