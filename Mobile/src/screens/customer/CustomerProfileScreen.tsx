import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthProvider';
import { useThemeStore } from '../../store/themeStore';
import { LogoutConfirmationModal } from '../../components/ui/LogoutConfirmationModal';

import type { ComponentProps } from 'react';
type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

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
  const { user, logout, loading } = useAuth();
  const { mode, toggle } = useThemeStore();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';

  const displayName = user?.name ?? 'Hana Kebede';
  const displayEmail = user?.email ?? 'hana.k@example.com';
  const displayImage =
    user?.image ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAgBX6BSkwandRKnCRZma0_lArpinySXEZ_PlTOJwftO89ZPxcCjRxbfpQt5lC2MiZ_mkAtU2TjI-n5jA9kXu3eKRjLFLtyBAAol--Vt9J-GLTCz6rF7onxux_MXUtoqmPc8uYvXU-QFIJA-AjNwydMkFP4jOeEGEO4zH94PzEmXwSSawPmzo4sCElQnl-fn2cgF5hALXDr5LKiheaI27GVzapRc3YEFgZN0AVP9dzS2A4qvqfVWT55_OywvaRKF-Hhdcfumktqdv9v';

  const handleLogout = async () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = async () => {
    await logout();
    setLogoutModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 92, 120) }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between px-6 py-5">
          <Text className="text-2xl font-bold tracking-tight text-slate-900 dark:text-gray-50">
            Profile
          </Text>
          <Pressable
            onPress={toggle}
            className="h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm dark:border dark:border-white/10 dark:bg-charcoal-medium"
          >
            <MaterialCommunityIcons name={toggleIconName} size={20} color={isDark ? '#ecb613' : '#0f172a'} />
          </Pressable>
        </View>

        <View className="px-6 pb-6">
          <View className="items-center rounded-3xl border border-slate-100 bg-white p-7 shadow-sm dark:border-gold-accent/20 dark:bg-charcoal-medium">
            <View className="relative mb-4">
              <View className="h-28 w-28 overflow-hidden rounded-full bg-slate-200 shadow-md ring-4 ring-background-light dark:bg-charcoal-dark dark:ring-gold-accent/30">
                <Image
                  source={{
                    uri: displayImage,
                  }}
                  className="h-full w-full"
                  resizeMode="cover"
                />
              </View>
              <Pressable className="absolute bottom-0 right-0 h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-primary shadow-lg dark:border-charcoal-medium">
                <MaterialCommunityIcons name="pencil" size={14} color="#121212" />
              </Pressable>
            </View>
            <Text className="mb-1 text-2xl font-bold text-slate-900 dark:text-gray-50">{displayName}</Text>
            <Text className="text-sm font-medium text-slate-500 dark:text-white/50">
              {displayEmail}
            </Text>
          </View>
        </View>

        <View className="flex-1 gap-4 px-6">
          {MENU_GROUPS.map((group, index) => (
            <View
              key={`group-${index}`}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-white/5 dark:bg-charcoal-medium"
            >
              {group.map((item, itemIndex) => (
                <Pressable
                  key={item.label}
                  className={`flex-row items-center gap-4 p-4 ${
                    itemIndex < group.length - 1
                      ? 'border-b border-slate-100 dark:border-white/5'
                      : ''
                  }`}
                >
                  <View className="h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                    <MaterialCommunityIcons name={item.icon} size={18} color="#ecb613" />
                  </View>
                  <Text className="flex-1 text-base font-semibold text-slate-900 dark:text-gray-50">
                    {item.label}
                  </Text>
                  <MaterialCommunityIcons name="chevron-right" size={20} color={isDark ? '#ffffff33' : '#9ca3af'} />
                </Pressable>
              ))}
            </View>
          ))}

          <Pressable
            onPress={handleLogout}
            disabled={Boolean(loading)}
            className="mt-2 flex-row items-center justify-center gap-2 rounded-2xl border border-primary/40 bg-transparent p-4"
          >
            <MaterialCommunityIcons name="logout" size={18} color={isDark ? '#ecb613' : '#dc2626'} />
            <Text className="text-sm font-bold text-red-600 dark:text-gold-accent">
              {loading ? 'Logging out...' : 'Log Out'}
            </Text>
          </Pressable>

          <Text className="pb-6 pt-2 text-center text-xs tracking-widest text-slate-400 dark:text-white/20">App Version 2.4.0 • Adama Premium</Text>
        </View>
      </ScrollView>
      <LogoutConfirmationModal
        visible={logoutModalVisible}
        onCancel={() => setLogoutModalVisible(false)}
        onConfirm={confirmLogout}
        loading={Boolean(loading)}
      />
    </SafeAreaView>
  );
};
