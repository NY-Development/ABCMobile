import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';
import { ROUTES } from '../../constants/routes';

const SETTINGS_ITEMS = [
  {
    title: 'About ABC',
    route: ROUTES.About,
    icon: 'storefront',
    iconBg: 'bg-orange-100',
    iconColor: '#ea580c',
    iconBgDark: 'dark:bg-orange-900/30',
    iconColorDark: '#fb923c',
  },
  {
    title: 'Contact Us',
    route: ROUTES.Contact,
    icon: 'email',
    iconBg: 'bg-blue-100',
    iconColor: '#2563eb',
    iconBgDark: 'dark:bg-blue-900/30',
    iconColorDark: '#60a5fa',
  },
  {
    title: 'Privacy Policy',
    route: ROUTES.PrivacyPolicy,
    icon: 'shield-lock',
    iconBg: 'bg-green-100',
    iconColor: '#16a34a',
    iconBgDark: 'dark:bg-green-900/30',
    iconColorDark: '#4ade80',
  },
  {
    title: 'Terms of Service',
    route: ROUTES.TermsOfService,
    icon: 'gavel',
    iconBg: 'bg-purple-100',
    iconColor: '#7c3aed',
    iconBgDark: 'dark:bg-purple-900/30',
    iconColorDark: '#c084fc',
  },
  {
    title: 'EULA',
    route: ROUTES.Eula,
    icon: 'file-document',
    iconBg: 'bg-gray-100',
    iconColor: '#6b7280',
    iconBgDark: 'dark:bg-gray-800',
    iconColorDark: '#9ca3af',
  },
];

export const SettingsScreen = () => {
  const navigation = useNavigation();
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';
  const toggleIconColor = isDark ? '#f5d67d' : '#374151';

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top', 'bottom']}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="flex-row items-center justify-between bg-background-light/95 px-5 py-4 dark:bg-background-dark/95">
        <Pressable
          onPress={() => navigation.goBack()}
          className="h-10 w-10 items-center justify-center rounded-full text-text-main dark:text-white"
        >
          <MaterialCommunityIcons name="arrow-left" size={22} color={toggleIconColor} />
        </Pressable>
        <Text className="text-xl font-bold tracking-tight text-text-main dark:text-white">Settings</Text>
        <Pressable
          onPress={toggle}
          className="h-10 w-10 items-center justify-center rounded-full bg-surface-light shadow-sm ring-1 ring-gray-200 dark:bg-surface-dark dark:ring-gray-700"
        >
          <MaterialCommunityIcons name={toggleIconName} size={20} color={toggleIconColor} />
        </Pressable>
      </View>

      <View className="px-5 pt-2">
        <View className="mb-8 mt-2 flex-row items-center gap-4 rounded-xl bg-surface-light p-4 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-primary/20">
            <MaterialCommunityIcons name="account" size={26} color="#f97316" />
          </View>
          <View>
            <Text className="text-lg font-bold text-text-main dark:text-white">Guest User</Text>
            <Text className="text-sm text-text-muted dark:text-gray-400">Sign in to save your preferences</Text>
          </View>
        </View>

        <Text className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-gray-500">
          App Info
        </Text>

        <View className="overflow-hidden rounded-xl bg-surface-light shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
          {SETTINGS_ITEMS.map((item, index) => (
            <Pressable
              key={item.title}
              onPress={() => navigation.navigate(item.route as never)}
              className={`flex-row items-center justify-between p-4 ${
                index < SETTINGS_ITEMS.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''
              }`}
            >
              <View className="flex-row items-center gap-3">
                <View className={`h-8 w-8 items-center justify-center rounded-lg ${item.iconBg} ${item.iconBgDark}`}>
                  <MaterialCommunityIcons
                    name={item.icon as never}
                    size={18}
                    color={isDark ? item.iconColorDark : item.iconColor}
                  />
                </View>
                <Text className="font-semibold text-text-main dark:text-white">{item.title}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color={isDark ? '#4b5563' : '#9ca3af'} />
            </Pressable>
          ))}
        </View>

        <View className="mt-8 items-center justify-center gap-2">
          <View className="h-10 w-10 overflow-hidden rounded-full bg-primary/20 p-2">
            <Image source={require('../../../assets/icon.png')} className="h-full w-full" resizeMode="contain" />
          </View>
          <Text className="text-xs font-medium text-text-muted dark:text-gray-500">Version 1.0.2 (Build 240)</Text>
          <Text className="text-[10px] text-gray-400 dark:text-gray-600">(c) 2024 ABC Bakery Marketplace</Text>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
