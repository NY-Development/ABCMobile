import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Dimensions, Animated, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/src/features/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const PROGRESS_BAR_MAX_WIDTH = width * 0.7;

export default function SplashScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  
  // Local tracking counter to precisely match your HTML template's percentage text
  const [percent, setPercent] = useState(0);

  // Native Animation Values
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // 1. Core Entrance Layout Animations
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 800,
        delay: 400,
        useNativeDriver: true,
      }),
      Animated.timing(textTranslateY, {
        toValue: 0,
        duration: 800,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Simple Endless Glow Pulse Loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowOpacity, { toValue: 0.6, duration: 1500, useNativeDriver: true }),
        Animated.timing(glowOpacity, { toValue: 0.3, duration: 1500, useNativeDriver: true }),
      ])
    ).start();

    // 3. Smooth Progress Loading Bar Execution
    Animated.timing(progressWidth, {
      toValue: PROGRESS_BAR_MAX_WIDTH,
      duration: 2500,
      useNativeDriver: false, // Must be false for layout width animations
    }).start();

    // Increment numeric counter smoothly alongside the loading bar line
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 23);

    // 4. Clean Secure Session Auth Routing Setup
    const bootstrap = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');

        setTimeout(async () => {
          clearInterval(interval);
          setPercent(100);

          if (user || token) {
            const lastRoute = await AsyncStorage.getItem('lastRoute');
            if (lastRoute && !lastRoute.startsWith('/(global)/')) {
              await AsyncStorage.removeItem('lastRoute').catch(() => {});
              router.replace(lastRoute as any);
              return;
            }

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
        }, 3000); // 3 seconds screen time allowance

      } catch (error) {
        clearInterval(interval);
        console.error("Bootstrap execution failure: ", error);
        router.replace('/(global)/landing');
      }
    };

    bootstrap();

    return () => clearInterval(interval);
  }, [user]);

  return (
    <View className="flex-1 bg-[#ec5b13]">
      <LinearGradient
        colors={['#ec5b13', '#fb923c']}
        className="flex-1 items-center justify-center"
      >
        {/* Decorative Blurred Background Shapes */}
        <Animated.View 
          style={[styles.glowLeft, { opacity: glowOpacity }]}
          className="absolute rounded-full bg-white/20 blur-3xl" 
        />
        <Animated.View 
          style={[styles.glowRight, { opacity: glowOpacity }]}
          className="absolute rounded-full bg-black/10 blur-3xl" 
        />

        {/* Brand Display Content */}
        <View className="items-center gap-8">
          {/* Circular Logo Mask Container */}
          <Animated.View 
            style={{
              opacity: logoOpacity,
              transform: [{ scale: logoScale }]
            }}
            className="h-32 w-32 items-center justify-center rounded-full bg-white shadow-2xl"
          >
            <View className="absolute h-36 w-36 rounded-full border-2 border-white/20" />
            <Image 
              source={require('@/assets/images/icon.png')} 
              className="h-36 w-36 rounded-full"
              resizeMode="contain"
            />
          </Animated.View>

          {/* Typography Header Set */}
          <Animated.View 
            style={{
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }]
            }} 
            className="items-center gap-2"
          >
            <Text className="text-4xl font-bold tracking-tight text-white">
              Adama <Text className="font-light italic">Bakery & Cake</Text>
            </Text>
            <View className="h-1 w-12 rounded-full bg-white/40" />
            <Text className="mt-2 text-lg font-medium text-white/80">
              Freshly Baked Daily
            </Text>
          </Animated.View>
        </View>

        {/* Bottom Loading Progress Layout Component */}
        <View className="absolute bottom-16 w-full px-12 items-center">
          <View style={{ width: PROGRESS_BAR_MAX_WIDTH }} className="flex-row items-end justify-between mb-3">
            <Text className="text-sm font-medium text-white/90">Preparing your treats...</Text>
            <Text className="text-xs text-white/70 font-bold">{percent}%</Text>
          </View>
          
          {/* Tracking Progress Indicator Bar */}
          <View style={{ width: PROGRESS_BAR_MAX_WIDTH }} className="h-2 overflow-hidden rounded-full bg-white/20">
            <Animated.View 
              style={[styles.progressBarFill, { width: progressWidth }]} 
            />
          </View>
          
          <View className="mt-8 items-center">
            <Text className="text-[10px] font-black uppercase tracking-[3px] text-white/40">
              PREMIUM QUALITY EST. 2024
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  glowLeft: {
    position: 'absolute',
    left: '-10%',
    top: '-10%',
    width: 256,
    height: 256,
  },
  glowRight: {
    position: 'absolute',
    right: '-10%',
    bottom: '-10%',
    width: 320,
    height: 320,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
  }
});