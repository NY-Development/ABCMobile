import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { OwnerStackParamList } from '../../types/navigation';
import { useThemeStore } from '../../store/themeStore';

type StatusStep = 'Confirmed' | 'Baking' | 'Ready' | 'Delivered';

const STATUS_STEPS: StatusStep[] = ['Confirmed', 'Baking', 'Ready', 'Delivered'];

export const OrderDetailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<OwnerStackParamList>>();
  const route = useRoute<RouteProp<OwnerStackParamList, 'OwnerOrderDetail'>>();
  const { mode, toggle } = useThemeStore();
  const insets = useSafeAreaInsets();
  const isDark = mode === 'dark';

  const {
    orderId,
    placedAt,
    customerName,
    customerAddress,
    customerRating,
    status,
    items,
    subtotal,
    taxesFees,
    totalRevenue,
  } = route.params;

  const [currentStatus, setCurrentStatus] = useState<StatusStep>(status);

  const statusLabel = useMemo(() => {
    if (currentStatus === 'Baking') return 'In Progress';
    return currentStatus;
  }, [currentStatus]);

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top', 'bottom']}>
      <View className="flex-1">
        <View className="flex-row items-center justify-between bg-background-light/80 px-4 pb-3 pt-2 dark:bg-background-dark/80">
          <Pressable
            onPress={() => navigation.goBack()}
            className="h-10 w-10 items-center justify-center rounded-full"
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color={isDark ? '#fcfbf8' : '#1b180d'}
            />
          </Pressable>

          <View className="items-center">
            <Text className="text-lg font-bold text-text-main dark:text-text-main-dark">Order {orderId}</Text>
            <Text className="text-xs font-medium text-text-muted dark:text-text-secondary-dark">{placedAt}</Text>
          </View>

          <Pressable onPress={toggle} className="h-10 w-10 items-center justify-center rounded-full">
            <MaterialCommunityIcons
              name={isDark ? 'white-balance-sunny' : 'weather-night'}
              size={20}
              color={isDark ? '#fcfbf8' : '#1b180d'}
            />
          </Pressable>
        </View>

        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 130 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mt-2 rounded-2xl border border-primary/10 bg-surface-light p-5 dark:border-primary/5 dark:bg-surface-dark">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-text-main dark:text-text-main-dark">Order Status</Text>
              <View className="rounded-full bg-primary/20 px-3 py-1">
                <Text className="text-xs font-bold uppercase tracking-wider text-primary">{statusLabel}</Text>
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 8 }}>
              <View className="flex-row gap-2">
                {STATUS_STEPS.map((step) => {
                  const active = step === currentStatus;
                  const reached = STATUS_STEPS.indexOf(step) < STATUS_STEPS.indexOf(currentStatus);

                  return (
                    <Pressable
                      key={step}
                      onPress={() => setCurrentStatus(step)}
                      className={
                        active
                          ? 'rounded-full bg-primary px-5 py-2.5'
                          : reached
                          ? 'rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5'
                          : 'rounded-full border border-gray-200 bg-surface-light px-5 py-2.5 dark:border-gray-700 dark:bg-surface-dark'
                      }
                    >
                      <Text
                        className={
                          active
                            ? 'text-sm font-bold text-text-main'
                            : reached
                            ? 'text-sm font-semibold text-primary'
                            : 'text-sm font-semibold text-text-muted dark:text-text-secondary-dark'
                        }
                      >
                        {step}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>

            <Text className="mt-3 text-sm text-text-muted dark:text-text-secondary-dark">
              Expected completion by <Text className="font-bold text-text-main dark:text-text-main-dark">11:30 AM</Text>
            </Text>
          </View>

          <View className="mt-6 rounded-2xl border border-primary/10 bg-surface-light p-5 dark:border-primary/5 dark:bg-surface-dark">
            <Text className="mb-4 text-lg font-bold text-text-main dark:text-text-main-dark">Customer</Text>
            <View className="flex-row items-start gap-4">
              <View className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                <Image
                  source={{
                    uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFIJw_c5hSAzrGcvfGUMxPEXKnWKD1Z9j1Y9cCTM618dVCGIGHG4ER7NuqwKrp0PqS7crZ_LOR95Csoqz4A0mmrwxkr-0yA-wR-NitbPVHMGETYSoK9aDyLWgzvDseXKjbJ2R8EwyKjwVDPsZdIGXMbDStAXTVJLYrhO-k-86PKCynNuDOyRKQbqrpr-PyfHDiI9v5dVSAOXox2qkb2JQFquuF60THvPOi-ETyNiMdmhO8Zx4L5OtpagpgzBk06RZza0uD-UKsSCa4',
                  }}
                  className="h-full w-full"
                  resizeMode="cover"
                />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-text-main dark:text-text-main-dark">{customerName}</Text>
                <View className="mt-0.5 flex-row items-center gap-1">
                  <MaterialCommunityIcons name="map-marker" size={16} color={isDark ? '#d4c59a' : '#9a864c'} />
                  <Text className="flex-1 text-sm text-text-muted dark:text-text-secondary-dark">{customerAddress}</Text>
                </View>
                <View className="mt-0.5 flex-row items-center gap-1">
                  <MaterialCommunityIcons name="star" size={16} color={isDark ? '#d4c59a' : '#9a864c'} />
                  <Text className="text-sm text-text-muted dark:text-text-secondary-dark">{customerRating}</Text>
                </View>
              </View>
              <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-background-light dark:bg-background-dark">
                <MaterialCommunityIcons name="chat-outline" size={20} color="#f97316" />
              </Pressable>
              <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-primary">
                <MaterialCommunityIcons name="phone" size={18} color="#1b180d" />
              </Pressable>
            </View>
          </View>

          <View className="mt-6 gap-4">
            <Text className="px-1 text-lg font-bold text-text-main dark:text-text-main-dark">Items ({items.length})</Text>

            {items.map((item, index) => (
              <View
                key={`${item.name}-${index}`}
                className="flex-row items-center gap-4 rounded-2xl border border-primary/10 bg-surface-light p-3 dark:border-primary/5 dark:bg-surface-dark"
              >
                <View className="h-16 w-16 overflow-hidden rounded-xl bg-gray-100">
                  <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />
                </View>
                <View className="min-w-0 flex-1">
                  <View className="flex-row items-start justify-between">
                    <Text className="flex-1 pr-3 font-bold text-text-main dark:text-text-main-dark" numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text className="text-sm font-semibold text-text-main dark:text-text-main-dark">{item.price}</Text>
                  </View>
                  <Text className="mt-1 text-xs text-text-muted dark:text-text-secondary-dark">{item.description}</Text>
                  <View className="mt-2 flex-row items-center gap-2">
                    <View className="rounded bg-background-light px-2 py-0.5 dark:bg-background-dark">
                      <Text className="text-xs font-bold text-text-main dark:text-text-main-dark">Qty: {item.qty}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View className="mb-20 mt-4 rounded-2xl border border-primary/10 bg-surface-light p-5 dark:border-primary/5 dark:bg-surface-dark">
            <View className="mb-2 flex-row items-center justify-between">
              <Text className="text-sm text-text-muted dark:text-text-secondary-dark">Subtotal</Text>
              <Text className="text-sm text-text-muted dark:text-text-secondary-dark">{subtotal}</Text>
            </View>
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-sm text-text-muted dark:text-text-secondary-dark">Taxes & Fees</Text>
              <Text className="text-sm text-text-muted dark:text-text-secondary-dark">{taxesFees}</Text>
            </View>
            <View className="mb-4 h-px w-full bg-gray-100 dark:bg-gray-800" />
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold text-text-main dark:text-text-main-dark">Total Revenue</Text>
              <Text className="text-lg font-bold text-primary">{totalRevenue}</Text>
            </View>
          </View>
        </ScrollView>

        <View className="absolute left-0 w-full items-center bg-gradient-to-t from-background-light via-background-light p-4 dark:from-background-dark dark:via-background-dark" style={{ bottom: Math.max(insets.bottom, 0) }}>
          <Pressable className="h-14 w-full max-w-sm flex-row items-center justify-center gap-2 rounded-full bg-primary shadow-lg shadow-primary/30">
            <MaterialCommunityIcons name="printer-outline" size={20} color="#1b180d" />
            <Text className="font-bold text-text-main">Print Order Details</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
