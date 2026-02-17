import React from 'react';
import { ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';
import { ROUTES } from '@/constants/routes';

const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBtG1Kf96HosOaM8d3jbiAORWsOzZts1VXb5iQe3IKIaqYhdBEONhJbl55mQPFSn86zOdCGi1c5-ObeJTXKDTNNbOk3_Pi-5yP0YYsCvPDbYaDBSE94AoZe6pt4xesOduE3uS8Zx8ZfQ175TRq_BOBHL84y-aZVrHUtv9_XRWeUJlt2pSD-WIbiy_uXqWBsGjGgq0rgp1yVC7JZsg9Yl9bwr2ovahFumQKvhlRdtF-bNU9HEVAtGLzMkiQNCLsSV4ge1NZwtuGvmodG';

const VALUES = [
  {
    icon: 'leaf',
    title: 'Fresh & Local',
    description: 'We prioritize ingredients sourced from local farms around Adama.',
  },
  {
    icon: 'handshake',
    title: 'Community First',
    description: 'Supporting small business owners is at the core of our platform.',
  },
  {
    icon: 'check-decagram',
    title: 'Quality Guarantee',
    description: 'Every bakery is vetted for hygiene and taste excellence.',
  },
];

export const AboutScreen = () => {
  const navigation = useNavigation();
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';
  const toggleIconColor = isDark ? '#f5d67d' : '#374151';

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top', 'bottom']}>
      <ScrollView className="flex-1">
      <View className="z-30 flex-row items-center justify-between border-b border-gray-100 bg-background-light/90 px-5 py-3 dark:border-white/10 dark:bg-background-dark/90">
        <Pressable
          onPress={() => navigation.goBack()}
          className="h-10 w-10 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark"
        >
          <MaterialCommunityIcons name="arrow-left" size={20} color={toggleIconColor} />
        </Pressable>
        <Text className="text-lg font-bold tracking-tight text-text-main dark:text-gray-100">
          About Us
        </Text>
        <Pressable
          onPress={toggle}
          className="h-10 w-10 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark"
        >
          <MaterialCommunityIcons name={toggleIconName} size={20} color={toggleIconColor} />
        </Pressable>
      </View>

      <View className="px-4 pt-4">
        <View className="overflow-hidden rounded-2xl" style={{ aspectRatio: 4 / 3 }}>
          <ImageBackground source={{ uri: HERO_IMAGE }} className="h-full w-full">
            <View className="absolute inset-0 bg-black/40" />
            <View className="absolute bottom-6 left-6 right-6">
              <View className="mb-2 self-start rounded-full bg-primary px-3 py-1">
                <Text className="text-xs font-bold uppercase tracking-wider text-background-dark">
                  Since 2018
                </Text>
              </View>
              <Text className="text-3xl font-bold leading-tight text-white">
                Crafting Memories in Adama
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>

      <View className="px-6 pt-8">
        <View className="relative pl-6">
          <View className="absolute left-0 top-2 h-12 w-1 rounded-full bg-primary" />
          <Text className="text-2xl font-bold text-text-main dark:text-gray-100">
            Our Mission
          </Text>
          <Text className="mt-2 text-lg italic leading-relaxed text-text-muted dark:text-gray-300">
            "To bring the warm, freshly baked happiness of Adama's finest kitchens directly to your doorstep."
          </Text>
        </View>

        <View className="mt-6 gap-4">
          <Text className="text-base leading-7 text-gray-600 dark:text-gray-400">
            ABC Bakery began as a small passion project in the heart of Adama. We realized that
            while our city is teeming with incredible baking talent, finding them all in one place
            was impossible.
          </Text>
          <Text className="text-base leading-7 text-gray-600 dark:text-gray-400">
            We built this marketplace to bridge that gap. We are a community connecting discerning
            customers with the passionate artisans who wake up before dawn to knead, proof, and bake.
          </Text>
        </View>
      </View>

      <View className="mt-8 px-4">
        <View className="flex-row gap-4">
          <View className="flex-1 items-center justify-center rounded-2xl bg-surface-light p-6 shadow-sm dark:bg-surface-dark">
            <View className="mb-3 h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <MaterialCommunityIcons name="storefront" size={24} color="#f97316" />
            </View>
            <Text className="text-2xl font-bold text-text-main dark:text-gray-100">50+</Text>
            <Text className="text-sm text-text-muted">Local Partners</Text>
          </View>
          <View className="flex-1 items-center justify-center rounded-2xl bg-surface-light p-6 shadow-sm dark:bg-surface-dark">
            <View className="mb-3 h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <MaterialCommunityIcons name="account-group" size={24} color="#f97316" />
            </View>
            <Text className="text-2xl font-bold text-text-main dark:text-gray-100">10k+</Text>
            <Text className="text-sm text-text-muted">Happy Eaters</Text>
          </View>
        </View>
      </View>

      <View className="mt-10 px-6">
        <Text className="mb-4 text-xl font-bold text-text-main dark:text-gray-100">
          The Values We Knead
        </Text>
        <View className="gap-4">
          {VALUES.map((value) => (
            <View key={value.title} className="flex-row items-start gap-4">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-surface-light shadow-sm dark:bg-surface-dark">
                <MaterialCommunityIcons name={value.icon as never} size={20} color="#f97316" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-text-main dark:text-gray-100">{value.title}</Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                  {value.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className="mx-4 mt-8 rounded-2xl bg-surface-light p-6 text-center shadow-lg dark:bg-surface-dark">
        <Text className="text-lg font-bold text-text-main dark:text-gray-100">
          Want to join our network?
        </Text>
        <Text className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Are you a baker in Adama? Let's grow together.
        </Text>
        <Pressable 
        onPress={() => navigation.navigate(ROUTES.Register as never)}
        className="mt-6 rounded-xl bg-primary py-3">
          <Text className="text-center text-base font-bold text-background-dark">
            Become a Partner
          </Text>
        </Pressable>
      </View>

      <View className="mt-8 items-center pb-8">
        <Text className="text-xs text-gray-400 dark:text-gray-600">
          (c) 2024 ABC Bakery Marketplace. Made in Adama.
        </Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};
