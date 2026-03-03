import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useAuth } from '../../context/AuthProvider';
import { useThemeStore } from '../../store/themeStore';
import { LogoutConfirmationModal } from '../../components/ui/LogoutConfirmationModal';

const CHART_POINTS = 'M0,70 C40,70 60,40 100,40 C140,40 180,80 220,80 C260,80 300,30 363,30';

export const HomeScreen = () => {
  const { user, logout } = useAuth();
  const { mode, toggle } = useThemeStore();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const isDark = mode === 'dark';
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(withTiming(1.06, { duration: 900 }), withTiming(1, { duration: 900 })),
      -1,
      false
    );
  }, [pulseScale]);

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = async () => {
    setLogoutModalVisible(false);
    await logout();
  };

  if (!user?.ownerInfo?.companyVerified) {
    return (
      <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top', 'bottom']}>
        <View className="flex-1 items-center justify-center px-4">
          <Animated.View entering={FadeInDown.duration(500)} className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-surface-dark">
            <View className="mb-4 items-center">
              <Animated.View style={badgeAnimatedStyle} className="mb-3 h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/15 animate-pulse">
                <MaterialCommunityIcons name="progress-clock" size={34} color="#ea580c" />
              </Animated.View>
            </View>

            <Text className="mb-3 text-center text-2xl font-bold text-orange-600">
              Verification in Progress
            </Text>

            <Text className="text-center text-base leading-6 text-gray-700 dark:text-gray-300">
              Your company's information is currently being reviewed by our admin team. Please wait for a
              notification through your email and phone. Thank you for your patience!
            </Text>

            <Animated.View entering={FadeInUp.delay(120).duration(500)} className="mt-6">
              <Pressable
                onPress={handleLogout}
                className="flex-row items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3"
              >
                <MaterialCommunityIcons name="logout" size={20} color="#ffffff" />
                <Text className="text-base font-bold text-white">Logout</Text>
              </Pressable>
            </Animated.View>
          </Animated.View>
        </View>

        <LogoutConfirmationModal
          visible={logoutModalVisible}
          onCancel={() => setLogoutModalVisible(false)}
          onConfirm={confirmLogout}
        />
      </SafeAreaView>
    );
  }

  const ownerName = user?.name ?? 'Golden Crust Bakery';

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top']}>
      <View className="flex-1">
        <View className="border-b border-black/[0.03] bg-background-light/90 px-6 py-5 dark:border-white/[0.05] dark:bg-background-dark/90">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <View className="relative">
                <View className="h-12 w-12 items-center justify-center rounded-full border-2 border-primary/20 bg-surface-light dark:bg-surface-dark">
                  <MaterialCommunityIcons
                    name="storefront-outline"
                    size={24}
                    color={isDark ? '#f3f0e7' : '#1b180d'}
                  />
                </View>
                <View className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 dark:border-background-dark" />
              </View>
              <View>
                <Text className="mb-0.5 text-[10px] font-bold uppercase tracking-[2px] text-primary">Premier Partner</Text>
                <Text className="text-2xl font-extrabold tracking-tight text-text-main dark:text-text-main-dark">{ownerName}</Text>
              </View>
            </View>

            <Pressable
              onPress={toggle}
              className="h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-surface-light shadow-sm active:scale-90 dark:border-white/5 dark:bg-surface-dark"
            >
              <MaterialCommunityIcons
                name={isDark ? 'white-balance-sunny' : 'weather-night'}
                size={22}
                color={isDark ? '#f3f0e7' : '#1b180d'}
              />
            </Pressable>
          </View>
        </View>

        <ScrollView
          className="flex-1 px-5 py-7"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="rounded-[36px] bg-primary p-7 shadow-xl">
            <View className="mb-5 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons name="chart-line" size={14} color="#ffffffcc" />
                <Text className="text-sm font-semibold text-white/80">Today's Revenue</Text>
              </View>
              <View className="flex-row items-center gap-1 rounded-full border border-white/30 bg-white/20 px-3 py-1">
                <MaterialCommunityIcons name="trending-up" size={14} color="#ffffff" />
                <Text className="text-xs font-bold text-white">+12.4%</Text>
              </View>
            </View>

            <View>
              <Text className="text-5xl font-extrabold tracking-tighter text-white">ETB 4,250.00</Text>
              <View className="mt-5 flex-row items-center justify-between border-t border-white/20 pt-4">
                <Text className="text-sm text-white/70">
                  Yesterday: <Text className="font-semibold text-white">ETB 3,794.00</Text>
                </Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#ffffff80" />
              </View>
            </View>
          </View>

          <View className="mt-6 flex-row gap-4">
            <Pressable className="flex-1 items-center gap-3 rounded-3xl border border-primary/20 bg-surface-light px-3 py-5 dark:bg-surface-dark">
              <View className="h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <MaterialCommunityIcons name="plus-circle-outline" size={32} color="#f97316" />
              </View>
              <Text className="text-sm font-bold text-text-main dark:text-text-main-dark">Add Product</Text>
            </Pressable>

            <Pressable className="flex-1 items-center gap-3 rounded-3xl border border-primary/20 bg-surface-light px-3 py-5 dark:bg-surface-dark">
              <View className="h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <MaterialCommunityIcons name="receipt-text-outline" size={32} color="#f97316" />
              </View>
              <Text className="text-sm font-bold text-text-main dark:text-text-main-dark">View Orders</Text>
            </Pressable>
          </View>

          <View className="mt-7">
            <View className="mb-4 flex-row items-center justify-between px-1">
              <View>
                <Text className="text-xl font-extrabold text-text-main dark:text-text-main-dark">Performance</Text>
                <Text className="mt-0.5 text-xs text-text-muted dark:text-text-sec-dark">Live sales activity</Text>
              </View>
              <View className="rounded-full border border-primary/10 bg-primary/10 px-4 py-2">
                <Text className="text-xs font-bold uppercase tracking-wider text-primary">Today</Text>
              </View>
            </View>

            <View className="rounded-[32px] border border-black/[0.02] bg-surface-light p-6 dark:border-white/[0.02] dark:bg-surface-dark">
              <View className="mb-6 flex-row items-center gap-3">
                <View className="rounded-lg bg-green-500/10 p-2">
                  <MaterialCommunityIcons name="cart-outline" size={20} color="#16a34a" />
                </View>
                <View className="flex-row items-end gap-1">
                  <Text className="text-3xl font-extrabold text-text-main dark:text-text-main-dark">24</Text>
                  <Text className="pb-1 text-xs font-bold uppercase tracking-wider text-text-muted dark:text-text-sec-dark">Orders Today</Text>
                </View>
              </View>

              <View className="h-40 justify-end">
                <View className="h-24 w-full rounded-2xl bg-primary/10" />
                <View className="absolute inset-0">
                  <View className="h-full w-full">
                    <Text className="hidden">{CHART_POINTS}</Text>
                  </View>
                </View>
                <View className="mt-4 flex-row justify-between px-1">
                  <Text className="text-[10px] font-bold uppercase tracking-widest text-text-muted/60 dark:text-text-sec-dark/50">06:00</Text>
                  <Text className="text-[10px] font-bold uppercase tracking-widest text-text-muted/60 dark:text-text-sec-dark/50">12:00</Text>
                  <Text className="text-[10px] font-bold uppercase tracking-widest text-text-muted/60 dark:text-text-sec-dark/50">18:00</Text>
                  <Text className="text-[10px] font-bold uppercase tracking-widest text-text-muted/60 dark:text-text-sec-dark/50">Now</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-7 gap-4">
            <View className="flex-row items-center justify-between px-1">
              <Text className="text-xl font-extrabold text-text-main dark:text-text-main-dark">Recent Orders</Text>
              <Pressable>
                <Text className="text-xs font-bold uppercase tracking-widest text-primary">View All</Text>
              </Pressable>
            </View>

            <View className="rounded-3xl border border-black/[0.03] bg-surface-light p-5 dark:border-white/[0.03] dark:bg-surface-dark">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-4">
                  <View className="h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-500/10">
                    <MaterialCommunityIcons name="bread-slice-outline" size={24} color="#ea580c" />
                  </View>
                  <View>
                    <Text className="text-[15px] font-bold tracking-tight text-text-main dark:text-text-main-dark">Artisan Sourdough</Text>
                    <Text className="mt-0.5 text-xs font-medium text-text-muted dark:text-text-sec-dark">Dawit G. • 4 mins ago</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-sm font-extrabold text-text-main dark:text-text-main-dark">+180</Text>
                  <Text className="text-[10px] font-bold uppercase tracking-tight text-green-500">Paid</Text>
                </View>
              </View>
            </View>

            <View className="rounded-3xl border border-black/[0.03] bg-surface-light p-5 dark:border-white/[0.03] dark:bg-surface-dark">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-4">
                  <View className="h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10">
                    <MaterialCommunityIcons name="cake-variant-outline" size={24} color="#2563eb" />
                  </View>
                  <View>
                    <Text className="text-[15px] font-bold tracking-tight text-text-main dark:text-text-main-dark">Honey Glazed Cake</Text>
                    <Text className="mt-0.5 text-xs font-medium text-text-muted dark:text-text-sec-dark">Martha K. • 22 mins ago</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-sm font-extrabold text-text-main dark:text-text-main-dark">+1,200</Text>
                  <Text className="text-[10px] font-bold uppercase tracking-tight text-green-500">Paid</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <LogoutConfirmationModal
        visible={logoutModalVisible}
        onCancel={() => setLogoutModalVisible(false)}
        onConfirm={confirmLogout}
      />
    </SafeAreaView>
  );
};
