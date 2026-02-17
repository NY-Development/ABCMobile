import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthProvider';
import { useThemeStore } from '../../store/themeStore';
import type { CustomerStackParamList } from '../../types/navigation';

import type { ComponentProps } from 'react';
import type { MaterialCommunityIcons as MCI } from '@expo/vector-icons';

type IconName = ComponentProps<typeof MCI>['name'];

const MENU_GROUPS: {
  label: string;
  icon: IconName;
}[][] = [
  [
    { label: 'My Orders', icon: 'receipt' },
    { label: 'Wishlist', icon: 'heart-outline' },
  ],
  [
    { label: 'Payment Methods', icon: 'credit-card-outline' },
    { label: 'Security', icon: 'lock-outline' },
    { label: 'Settings', icon: 'cog-outline' },
  ],
];

export const CustomerProfileScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<CustomerStackParamList, 'CustomerProfile'>>();
  const { logout, loading } = useAuth();
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between px-6 py-5">
          <Text className="text-2xl font-bold tracking-tight text-text-main dark:text-gray-100">
            Profile
          </Text>
          <Pressable
            onPress={toggle}
            className="h-10 w-10 items-center justify-center rounded-full bg-surface-light shadow-sm ring-1 ring-border-light dark:bg-surface-dark dark:ring-border-dark"
          >
            <MaterialCommunityIcons name={toggleIconName} size={20} color={isDark ? '#f3f0e7' : '#1b180d'} />
          </Pressable>
        </View>

        <View className="px-6 pb-6">
          <View className="items-center rounded-2xl border border-border-light bg-surface-light p-6 shadow-sm dark:border-border-dark dark:bg-surface-dark">
            <View className="relative mb-4">
              <View className="h-24 w-24 overflow-hidden rounded-full ring-4 ring-background-light shadow-md dark:ring-background-dark">
                <Image
                  source={{
                    uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgBX6BSkwandRKnCRZma0_lArpinySXEZ_PlTOJwftO89ZPxcCjRxbfpQt5lC2MiZ_mkAtU2TjI-n5jA9kXu3eKRjLFLtyBAAol--Vt9J-GLTCz6rF7onxux_MXUtoqmPc8uYvXU-QFIJA-AjNwydMkFP4jOeEGEO4zH94PzEmXwSSawPmzo4sCElQnl-fn2cgF5hALXDr5LKiheaI27GVzapRc3YEFgZN0AVP9dzS2A4qvqfVWT55_OywvaRKF-Hhdcfumktqdv9v',
                  }}
                  className="h-full w-full"
                  resizeMode="cover"
                />
              </View>
              <Pressable className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg">
                <MaterialCommunityIcons name="pencil" size={14} color="#ffffff" />
              </Pressable>
            </View>
            <Text className="text-xl font-bold text-text-main dark:text-gray-100">Hana Kebede</Text>
            <Text className="mt-1 text-sm font-medium text-text-muted dark:text-gray-400">
              hana.k@example.com
            </Text>
          </View>
        </View>

        <View className="gap-4 px-6 pb-28">
          {MENU_GROUPS.map((group, index) => (
            <View
              key={`group-${index}`}
              className="overflow-hidden rounded-2xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark"
            >
              {group.map((item, itemIndex) => (
                <Pressable
                  key={item.label}
                  className={`flex-row items-center gap-4 p-4 ${
                    itemIndex < group.length - 1
                      ? 'border-b border-border-light dark:border-border-dark'
                      : ''
                  }`}
                >
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <MaterialCommunityIcons name={item.icon} size={18} color="#f97316" />
                  </View>
                  <Text className="flex-1 text-sm font-semibold text-text-main dark:text-gray-100">
                    {item.label}
                  </Text>
                  <MaterialCommunityIcons name="chevron-right" size={20} color={isDark ? '#9a864c' : '#9a864c'} />
                </Pressable>
              ))}
            </View>
          ))}

          <Pressable
            onPress={handleLogout}
            disabled={loading}
            className="flex-row items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 opacity-100 dark:border-red-900/40 dark:bg-red-900/10"
          >
            <MaterialCommunityIcons name="logout" size={18} color={isDark ? '#fca5a5' : '#dc2626'} />
            <Text className="text-sm font-bold text-red-600 dark:text-red-400">
              {loading ? 'Logging out...' : 'Log Out'}
            </Text>
          </Pressable>

          <Text className="text-center text-xs text-text-muted dark:text-gray-500">App Version 2.4.0</Text>
        </View>
      </ScrollView>

      <SafeAreaView
        edges={['bottom']}
        className="absolute bottom-0 left-0 right-0 border-t border-border-light bg-background-light/90 px-6 pb-6 pt-3 dark:border-border-dark dark:bg-background-dark/90"
      >
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => navigation.navigate(ROUTES.CustomerStorefront as never)}
            className="items-center"
          >
            <View className="h-10 w-12 items-center justify-center rounded-full">
              <MaterialCommunityIcons
                name="home"
                size={24}
                color={isDark ? '#d4c59a' : '#9a864c'}
              />
            </View>
            <Text className="mt-1 text-[10px] font-medium text-text-muted dark:text-gray-400">
              Home
            </Text>
          </Pressable>

          <Pressable className="items-center">
            <View className="h-10 w-12 items-center justify-center rounded-full">
              <MaterialCommunityIcons
                name="magnify"
                size={24}
                color={isDark ? '#d4c59a' : '#9a864c'}
              />
            </View>
            <Text className="mt-1 text-[10px] font-medium text-text-muted dark:text-gray-400">
              Explore
            </Text>
          </Pressable>

          <Pressable className="items-center">
            <View className="h-10 w-12 items-center justify-center rounded-full">
              <MaterialCommunityIcons
                name="shopping"
                size={24}
                color={isDark ? '#d4c59a' : '#9a864c'}
              />
            </View>
            <Text className="mt-1 text-[10px] font-medium text-text-muted dark:text-gray-400">
              Orders
            </Text>
          </Pressable>

          <Pressable className="items-center">
            <View className="h-10 w-12 items-center justify-center rounded-full bg-primary/10">
              <MaterialCommunityIcons name="account" size={24} color="#f97316" />
            </View>
            <Text className="mt-1 text-[10px] font-bold text-primary">Profile</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};
