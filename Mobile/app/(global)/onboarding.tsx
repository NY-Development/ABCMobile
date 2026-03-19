import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useThemeStore } from '@/src/features/theme';
import PrimaryButton from '@/src/components/PrimaryButton';
import { Sun, Moon } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  description: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: 'Welcome to Adama Bakery',
    subtitle: 'Fresh Baked Goodness',
    emoji: '🍰',
    description: 'Artisan bakery storefront with warm lighting and fresh bread',
  },
  {
    id: 2,
    title: 'Modern App Experience',
    subtitle: 'Beautiful & Easy to Use',
    emoji: '📱',
    description: 'Shop our delicious products from your phone anytime, anywhere',
  },
  {
    id: 3,
    title: 'Fast Delivery',
    subtitle: 'Arriving Fresh',
    emoji: '🛵',
    description: 'Get your favorite treats delivered quickly and fresh',
  },
];

export default function OnboardingScreen() {
  const { isDark, toggleTheme } = useThemeStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Check if user has already been onboarded
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const hasOnboarded = await AsyncStorage.getItem('hasOnboarded');
        if (hasOnboarded === 'true') {
          router.replace('/(global)/landing');
        } else {
          setIsLoaded(true);
          // Animate in
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setIsLoaded(true);
      }
    };

    checkOnboardingStatus();
  }, []);

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('hasOnboarded', 'true');
      router.replace('/(global)/landing');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  const handleNext = async () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      scrollViewRef.current?.scrollTo({ x: width * (currentStep + 1), animated: true });
    } else {
      // Mark onboarding as complete
      try {
        await AsyncStorage.setItem('hasOnboarded', 'true');
        router.replace('/(global)/landing');
      } catch (error) {
        console.error('Error saving onboarding status:', error);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollViewRef.current?.scrollTo({ x: width * (currentStep - 1), animated: true });
    }
  };

  if (!isLoaded) {
    return (
      <SafeAreaView className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
        <View className="flex-1 items-center justify-center">
          <Text className={isDark ? 'text-card-foreground' : 'text-foreground'}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
      <Animated.View style={{ opacity: fadeAnim }} className="flex-1">
        {/* Header with Skip and Theme Toggle */}
        <View
          className={`flex-row items-center justify-between border-b px-6 py-4 ${
            isDark ? 'border-border' : 'border-border'
          }`}>
          {/* Skip Button */}
          <Pressable onPress={handleSkip} className="p-2 active:opacity-70">
            <Text className="text-sm font-semibold text-primary">Skip</Text>
          </Pressable>

          {/* Step Indicators */}
          <View className="flex-row items-center gap-1">
            {onboardingSteps.map((_, idx) => (
              <View
                key={idx}
                className={`h-1 rounded-full ${
                  idx === currentStep ? 'w-8 bg-primary' : 'w-2 bg-border'
                }`}
              />
            ))}
          </View>

          {/* Theme Toggle */}
          <Pressable onPress={toggleTheme} className="p-2 active:opacity-70">
            {isDark ? <Sun size={20} color="#fbb040" /> : <Moon size={20} color="#64748b" />}
          </Pressable>
        </View>

        {/* Content Section */}
        <View className="flex-1 items-center justify-center px-6">
          <View className="items-center gap-6">
            {/* Illustration - Emoji */}
            <View
              className={`h-40 w-40 items-center justify-center rounded-3xl ${
                isDark ? 'bg-card/10' : 'bg-secondary'
              }`}>
              <Text className="text-8xl">{onboardingSteps[currentStep].emoji}</Text>
            </View>

            {/* Text Content */}
            <View className="max-w-sm items-center gap-3">
              <Text
                className={`text-center text-3xl font-bold ${
                  isDark ? 'text-card-foreground' : 'text-foreground'
                }`}>
                {onboardingSteps[currentStep].title}
              </Text>

              <Text className="text-center text-lg font-semibold text-primary">
                {onboardingSteps[currentStep].subtitle}
              </Text>

              <Text
                className={`text-center text-sm leading-6 ${
                  isDark ? 'text-muted-foreground' : 'text-muted-foreground'
                }`}>
                {onboardingSteps[currentStep].description}
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Navigation */}
        <View className={`border-t px-6 py-6 ${isDark ? 'border-border' : 'border-border'}`}>
          {/* Buttons */}
          <View className="gap-3">
            <PrimaryButton
              label={currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
              onPress={handleNext}
            />

            {currentStep > 0 && (
              <Pressable
                onPress={handlePrevious}
                className={`items-center rounded-lg border p-3 active:opacity-70 ${
                  isDark ? 'border-border bg-card/5' : 'border-border bg-card'
                }`}>
                <Text
                  className={`font-semibold ${
                    isDark ? 'text-card-foreground' : 'text-foreground'
                  }`}>
                  Back
                </Text>
              </Pressable>
            )}
          </View>

          {/* Step Counter */}
          <Text
            className={`mt-4 text-center text-xs ${
              isDark ? 'text-muted-foreground' : 'text-muted-foreground'
            }`}>
            Step {currentStep + 1} of {onboardingSteps.length}
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
