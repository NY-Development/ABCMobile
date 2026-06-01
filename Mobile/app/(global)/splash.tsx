import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/src/store/themeStore'; // Adjusted to match your store tree path
import { useAuthStore } from '@/src/features/auth';
import { UtensilsCrossed } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export default function SplashScreen() {
  const router = useRouter();
  const { isDark } = useThemeStore();
  const { user } = useAuthStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      if (!isMounted) return;
      setProgress((prev) => {
        const next = prev + Math.random() * 30;
        return next > 80 ? 80 : next;
      });
    }, 150); // Speed up progress intervals slightly for seamless UX

    const bootstrap = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');

        if (!isMounted) return;
        clearInterval(progressInterval);
        setProgress(100);

        // Allow layout animation to settle before pushing routes
        setTimeout(async () => {
          if (!isMounted) return;

          if (user || token) {
            const lastRoute = await AsyncStorage.getItem('lastRoute');
            if (lastRoute && !lastRoute.startsWith('/(global)/')) {
              await AsyncStorage.removeItem('lastRoute').catch(() => {});
              router.replace(lastRoute as any);
              return;
            }

            // Role-based landing fallbacks
            if (user) {
              if (user.role === 'owner') {
                router.replace('/(vendor)/dashboard');
              } else if (user.role === 'admin') {
                router.replace('/(admin)/dashboard');
              } else {
                router.replace('/(customer)/home');
              }
              return;
            }

            router.replace('/(global)/landing');
          } else {
            router.replace('/(global)/landing');
          }
        }, 500);

      } catch (error) {
        console.error("Bootstrap error: ", error);
        if (isMounted) router.replace('/(global)/landing');
      }
    };

    bootstrap();

    return () => {
      isMounted = false;
      clearInterval(progressInterval);
    };
  }, [user]);

  return (
    <View className="relative flex-1 items-center justify-center overflow-hidden bg-gradient-to-b from-primary to-primary/80">
      {/* Decorative background elements */}
      <View className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <View className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

      {/* Main content */}
      <View className="z-10 items-center gap-8">
        {/* Logo Circle */}
        <View className="h-32 w-32 items-center justify-center rounded-full bg-card shadow-2xl shadow-black/30">
          <UtensilsCrossed size={56} color="#ec5b13" strokeWidth={1.5} />
        </View>

        {/* App Name */}
        <View className="items-center gap-2">
          <Text className="text-4xl font-bold tracking-tight text-card">Adama Bakery</Text>
          <View className="h-1 w-12 rounded-full bg-card/40" />
          <Text className="mt-2 text-lg font-medium text-card/80">Fresh Baked Goodness</Text>
        </View>
      </View>

      {/* Loading Section - Bottom */}
      <View className="absolute bottom-12 w-full items-center gap-4 px-8">
        <Text className="text-sm font-medium text-card/90">Preparing your treats...</Text>

        {/* Progress Bar */}
        <View className="h-2 w-full overflow-hidden rounded-full bg-card/20">
          <View className="h-full rounded-full bg-card" style={{ width: `${progress}%` }} />
        </View>

        {/* Progress Percentage */}
        <Text className="text-xs text-card/70">{Math.round(progress)}%</Text>

        {/* Brand Footer */}
        <Text className="mt-4 text-[10px] font-bold uppercase tracking-widest text-card/40">
          Premium Quality Est. 2024
        </Text>
      </View>
    </View>
  );
}