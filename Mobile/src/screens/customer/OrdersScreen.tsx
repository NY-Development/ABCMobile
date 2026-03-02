import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/themeStore';

export const OrdersScreen = () => {
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top']}>
      <View className="flex-row items-center justify-between px-5 py-4">
        <Text className="text-2xl font-bold text-text-main dark:text-gray-100">Orders</Text>
        <Pressable
          onPress={toggle}
          className="h-10 w-10 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark"
        >
          <MaterialCommunityIcons
            name={isDark ? 'white-balance-sunny' : 'weather-night'}
            size={20}
            color={isDark ? '#f97316' : '#9a864c'}
          />
        </Pressable>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        <MaterialCommunityIcons name="shopping-outline" size={56} color="#f97316" />
        <Text className="mt-3 text-center text-base text-text-muted dark:text-gray-400">
          Your order list will appear here.
        </Text>
      </View>
    </SafeAreaView>
  );
};
