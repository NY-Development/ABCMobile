import React, { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';
import { useInAppNotifications } from '../../providers/AppRuntimeProvider';

export const NotificationScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const { notifications, markAllAsRead } = useInAppNotifications();

  const grouped = useMemo(() => {
    const today = notifications.filter((item) => item.timeLabel.includes('m') || item.timeLabel.includes('h'));
    const yesterday = notifications.filter((item) => item.timeLabel.includes('d'));
    return { today, yesterday };
  }, [notifications]);

  const NotificationCard = ({ item }: { item: (typeof notifications)[number] }) => (
    <Pressable className="rounded-[20px] border border-primary/5 bg-card-light p-4 shadow-sm active:scale-[0.98] dark:bg-card-dark">
      <View className="flex-row gap-4">
        <View className="relative h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
          <MaterialCommunityIcons name={item.icon} size={28} color={item.iconColor ?? '#ecb613'} />
          {item.unread ? (
            <View className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-primary dark:border-card-dark" />
          ) : null}
        </View>

        <View className="flex-1">
          <View className="mb-0.5 flex-row items-start justify-between">
            <Text className="pr-2 text-[15px] font-bold leading-tight text-slate-900 dark:text-slate-100">{item.title}</Text>
            <Text className="ml-2 text-[11px] text-slate-400">{item.timeLabel}</Text>
          </View>
          <Text className="text-[13px] leading-snug text-slate-600 dark:text-slate-400">{item.description}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-bakery-cream dark:bg-background-dark" edges={['top', 'bottom']}>
      <View className="flex-1">
        {/* Header Section */}
        <View className="flex-row items-center justify-between bg-bakery-cream/80 px-6 pb-4 pt-2 dark:bg-background-dark/80">
          <View className="flex-row items-center gap-2">
            <Pressable onPress={() => navigation.goBack()} className="mr-1">
              <MaterialCommunityIcons 
                name="chevron-left" 
                size={32} 
                color={isDark ? '#fcfbf8' : '#0f172a'} 
              />
            </Pressable>
            <Text className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Notifications</Text>
          </View>
          
          <View className="flex-row items-center gap-4">
            <Pressable onPress={toggle}>
              <MaterialCommunityIcons name={isDark ? 'white-balance-sunny' : 'theme-light-dark'} size={22} color={isDark ? '#ecb613' : '#475569'} />
            </Pressable>
            <Pressable onPress={markAllAsRead}>
              <Text className="text-sm font-semibold text-primary">Mark all as read</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 120, 140) }} showsVerticalScrollIndicator={false}>
          <View className="space-y-8 gap-8">
            <View className="gap-4">
              <Text className="px-1 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Today</Text>
              <View className="gap-3">
                {grouped.today.map((item) => (
                  <NotificationCard key={item.id} item={item} />
                ))}
              </View>
            </View>

            <View className="h-px w-full bg-primary/20" />

            <View className="gap-4">
              <Text className="px-1 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Yesterday</Text>
              <View className="gap-3">
                {grouped.yesterday.map((item) => (
                  <NotificationCard key={item.id} item={item} />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Floating Bottom Nav */}
        <View className="absolute bottom-8 left-1/2 w-[90%] max-w-[380px] -translate-x-1/2 rounded-[28px] border border-white/20 bg-white/70 px-6 py-4 shadow-2xl dark:border-white/10 dark:bg-black/60">
          <View className="flex-row items-center justify-between">
            <Pressable onPress={() => navigation.goBack()} className="items-center">
              <MaterialCommunityIcons name="home-outline" size={26} color={isDark ? '#64748b' : '#94a3b8'} />
            </Pressable>
            <Pressable onPress={() => navigation.goBack()} className="items-center">
              <MaterialCommunityIcons name="compass-outline" size={26} color={isDark ? '#64748b' : '#94a3b8'} />
            </Pressable>
            <View className="relative items-center">
              <MaterialCommunityIcons name="bell" size={28} color="#ecb613" />
              <View className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary" />
            </View>
            <Pressable onPress={() => navigation.goBack()} className="items-center">
              <MaterialCommunityIcons name="basket-outline" size={26} color={isDark ? '#64748b' : '#94a3b8'} />
            </Pressable>
            <Pressable onPress={() => navigation.goBack()} className="items-center">
              <MaterialCommunityIcons name="account-outline" size={26} color={isDark ? '#64748b' : '#94a3b8'} />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};