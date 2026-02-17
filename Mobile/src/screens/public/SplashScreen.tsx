import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const LOGO_SOURCE = require('../../../assets/icon.png');

type SplashScreenProps = {
  shouldExit: boolean;
  onFinish: () => void;
};

export const SplashScreen = ({ shouldExit, onFinish }: SplashScreenProps) => {
  const insets = useSafeAreaInsets();
  const [canExit, setCanExit] = useState(false);

  const intro = useSharedValue(0);
  const shimmer = useSharedValue(0);
  const outro = useSharedValue(0);

  useEffect(() => {
    intro.value = withTiming(1, { duration: 3000, easing: Easing.out(Easing.cubic) });
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.linear }),
      -1,
      false
    );

    const timer = setTimeout(() => setCanExit(true), 650);
    return () => clearTimeout(timer);
  }, [intro, shimmer]);

  useEffect(() => {
    if (!shouldExit || !canExit) return;
    outro.value = withTiming(1, { duration: 2000, easing: Easing.in(Easing.cubic) }, (finished) => {
      if (finished) {
        runOnJS(onFinish)();
      }
    });
  }, [shouldExit, canExit, onFinish, outro]);

  const logoStyle = useAnimatedStyle(() => {
    const scale = interpolate(intro.value, [0, 1], [0.9, 1]);
    const rotate = interpolate(intro.value, [0, 1], [-4, 0]);
    return {
      transform: [{ scale }, { rotate: `${rotate}deg` }],
      opacity: intro.value,
    };
  });

  const textStyle = useAnimatedStyle(() => ({
    opacity: interpolate(intro.value, [0, 1], [0, 1]),
    transform: [{ translateY: interpolate(intro.value, [0, 1], [6, 0]) }],
  }));

  const screenStyle = useAnimatedStyle(() => ({
    opacity: interpolate(outro.value, [0, 1], [1, 0]),
    transform: [{ scale: interpolate(outro.value, [0, 1], [1, 0.98]) }],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(shimmer.value, [0, 1], [-140, 140]) }],
  }));

  return (
    <Animated.View
      className="flex-1 bg-background-light dark:bg-background-dark"
      style={screenStyle}
    >
      <View className="absolute inset-0">
        <View className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <View className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      </View>

      <View className="flex-1 items-center justify-center px-6">
        <Animated.View
          className="mb-8 h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-background-light shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:bg-background-dark"
          style={logoStyle}
        >
          <Image source={LOGO_SOURCE} className="h-20 w-20 rounded-full" resizeMode="cover" />
        </Animated.View>

        <Animated.View className="items-center" style={textStyle}>
          <Text className="text-5xl font-semibold tracking-tight text-text-main dark:text-gray-100">
            ABC
          </Text>
          <Text className="mt-2 text-sm font-medium uppercase tracking-[4px] text-text-muted dark:text-gray-400">
            Adama Bakery & Cake
          </Text>
        </Animated.View>
      </View>

      <View
        className="absolute left-0 right-0 items-center"
        style={{ bottom: Math.max(insets.bottom, 24) + 12 }}
      >
        <View className="w-48 overflow-hidden rounded-full bg-neutral-light dark:bg-neutral-dark">
          <View className="h-1 bg-primary/40" />
          <Animated.View
            className="absolute inset-y-0 left-0 h-1 w-16 rounded-full bg-primary"
            style={shimmerStyle}
          />
        </View>
        <Text className="mt-3 text-xs tracking-wide text-text-muted dark:text-gray-500">
          Loading Bakery Delights...
        </Text>
      </View>
    </Animated.View>
  );
};
