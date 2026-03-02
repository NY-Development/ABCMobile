import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useThemeStore } from '../../store/themeStore';
import { ROUTES } from '../../constants/routes';
import type { OwnerStackParamList } from '../../types/navigation';

type OrderStatus = 'New' | 'Baking' | 'Ready';

type OrderItem = {
  name: string;
  description: string;
  price: string;
  qty: number;
  image: string;
};

type Order = {
  id: string;
  time: string;
  customer: string;
  status: OrderStatus;
  items: OrderItem[];
};

const FILTERS: Array<'All' | OrderStatus> = ['All', 'New', 'Baking', 'Ready'];

const ORDERS: Order[] = [
  {
    id: '#ORD-4092',
    time: '10:42 AM',
    customer: 'Abebe Kebede',
    status: 'New',
    items: [
      {
        name: 'Birthday Cake (Vanilla)',
        description: 'Custom Message',
        price: '$45.00',
        qty: 1,
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBMwP1czxHtmTAofSwFTLa-d8rhtthvbL0KPturPfA-aCMdA3JxlffagV-5j4s-ljrBt3RfqcD9LJ6x3z04DDAeQCN37vX8qye69Y9xitpEtISILUj8AJwzF_-eLMTMLOUAn9-GTXqFRDk-r-tK_T4b3sO3vTedFQduPOqcTj1v4yigiRYCkcTd3rZGflHcSGtGDCsNzzijCCuSON5mNhMSLu0HmfAGbnqUQsIutpBXZir-2n-aidrc8vf5rsSuc8iTgsZ-MRJl5bNP',
      },
      {
        name: 'Assorted Cupcakes',
        description: 'Box of variety',
        price: '$14.00',
        qty: 12,
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCOigubHvMyK2fq52ds9OVuJvjIftoMD12vpzCm6jZ2Ts58bYFATniYEhqvbATYrZHnxJLBl7OXBseVnfQ-Fw3UbQaynt7jmOMODA-XyS8quyux1ePZPgZ-BWobBLYmH066YAGvGZUMaEdB7sbsnT4Z91YQFhiP30WQNXTBvztLZ9H1CgxNbpFgMnAKzpHi18ySqh4Ja6BHfxdl7_Ofh8xBeU5kBE3K66-3IiaKv3vjQPmS6DrY4LBpDGSuqITStHuPXJcacSflSLFs',
      },
    ],
  },
  {
    id: '#ORD-4090',
    time: '09:15 AM',
    customer: 'Sara Tadesse',
    status: 'Baking',
    items: [
      {
        name: 'French Baguettes',
        description: 'Freshly baked',
        price: '$6.00',
        qty: 4,
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDU87ANgUYnJPyi3RobEMl9Js2EkSDf49c49T43g3aFb5KCSq0N2TcoM1C3I1uPmMXJ-s578rMWML2peeeJxgE0WIfIBHhIWyfwFgly_3Kys9huaP6waW1ZwnSGD6KM_rAnnBqu7Luwmccu8Lz8IEV4LQiairxwXvxWW1das_B611frqiRlgfwHuYamXT3SoGmY8ecJKW47r-9BWAgS4x_j7xZg9m2WXU_Mm6gNtk1QepRcLW0BuWICjTo5GW5on6bZfoTlSd1BL8Wv',
      },
    ],
  },
  {
    id: '#ORD-4088',
    time: '08:30 AM',
    customer: 'Dawit Mekonnen',
    status: 'Ready',
    items: [
      {
        name: 'Mixed Pastry Box',
        description: 'Large Assortment',
        price: '$8.94',
        qty: 1,
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBBNwTux3NfbCVSSAxXBKwvzfjnVsKcPXsliXGOaAikbKI6gQpkKL9hDjak9NJtalFrPh5PuYSXIeX5CNrglR_gWs67sQG8FCgi-c_XmhLLq_zJ4MDDjchpkpRfUr07b2lSWBKaX4sZybONH0JrFd9mP8aylXHcsEE2zcPaDiGMP7uRUyLYUURG-PgrYxWX1DHuGtdTHg_DX0hD38lbja1OHbeJk4_-B-Cs2rx6s74ak4_l4aKzN3FBAO6hKZuYmuaVN2fSUxk8mWhV',
      },
    ],
  },
];

export const OrdersScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<OwnerStackParamList>>();
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>('All');

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'All') return ORDERS;
    return ORDERS.filter((order) => order.status === activeFilter);
  }, [activeFilter]);

  const statusStyles: Record<OrderStatus, { badge: string; text: string }> = {
    New: {
      badge: 'bg-blue-100',
      text: 'text-blue-700',
    },
    Baking: {
      badge: 'bg-orange-100',
      text: 'text-orange-700',
    },
    Ready: {
      badge: 'bg-green-100',
      text: 'text-green-700',
    },
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top']}>
      <View className="flex-1">
        <View className="border-b border-gray-100 bg-surface-light px-6 pb-6 pt-4 shadow-sm dark:border-white/10 dark:bg-surface-dark">
          <View className="mb-6 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="h-12 w-12 items-center justify-center rounded-full border-2 border-neutral-light bg-background-light dark:border-neutral-dark dark:bg-background-dark">
                <MaterialCommunityIcons
                  name="storefront-outline"
                  size={22}
                  color={isDark ? '#fcfbf8' : '#1A1A1A'}
                />
              </View>
              <View>
                <Text className="text-2xl font-bold tracking-tight text-text-main dark:text-text-main-dark">Orders</Text>
                <Text className="text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-text-sub-dark">
                  Sweet Delights Bakery
                </Text>
              </View>
            </View>

            <View className="flex-row gap-2">
              <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-background-light dark:bg-background-dark">
                <MaterialCommunityIcons
                  name="magnify"
                  size={22}
                  color={isDark ? '#fcfbf8' : '#1A1A1A'}
                />
              </Pressable>
              <Pressable
                onPress={toggle}
                className="h-10 w-10 items-center justify-center rounded-full bg-background-light dark:bg-background-dark"
              >
                <MaterialCommunityIcons
                  name={isDark ? 'white-balance-sunny' : 'weather-night'}
                  size={20}
                  color={isDark ? '#fcfbf8' : '#1A1A1A'}
                />
              </Pressable>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2">
              {FILTERS.map((filter) => {
                const active = filter === activeFilter;
                return (
                  <Pressable
                    key={filter}
                    onPress={() => setActiveFilter(filter)}
                    className={active ? 'h-10 rounded-full bg-blue-500 px-6' : 'h-10 rounded-full bg-background-light px-6 dark:bg-background-dark'}
                  >
                    <View className="flex-1 items-center justify-center">
                      <Text className={active ? 'text-sm font-semibold text-white' : 'text-sm font-semibold text-text-muted dark:text-text-sub-dark'}>
                        {filter}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <ScrollView
          className="flex-1 px-6 py-6"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-4 flex-row items-center gap-4">
            <Text className="text-[11px] font-bold uppercase tracking-[3px] text-gray-400">Today&apos;s Orders</Text>
            <View className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
          </View>

          <View className="gap-6">
            {filteredOrders.map((order) => {
              const statusStyle = statusStyles[order.status];

              const subtotalValue = order.items.reduce((sum, item) => {
                const parsed = Number(item.price.replace('$', '')) || 0;
                return sum + parsed;
              }, 0);
              const feesValue = subtotalValue * 0.08;
              const totalValue = subtotalValue + feesValue;

              const detailStatus =
                order.status === 'New'
                  ? 'Confirmed'
                  : order.status === 'Baking'
                  ? 'Baking'
                  : 'Ready';

              return (
                <Pressable
                  key={order.id}
                  onPress={() =>
                    navigation.navigate(ROUTES.OwnerOrderDetail, {
                      orderId: order.id,
                      placedAt: `Placed Today at ${order.time}`,
                      customerName: order.customer,
                      customerAddress: '123 Maple Avenue, Apt 4B',
                      customerRating: '4.8 (12 orders)',
                      status: detailStatus,
                      items: order.items,
                      subtotal: `$${subtotalValue.toFixed(2)}`,
                      taxesFees: `$${feesValue.toFixed(2)}`,
                      totalRevenue: `$${totalValue.toFixed(2)}`,
                    })
                  }
                  className="overflow-hidden rounded-3xl border border-gray-100 bg-surface-light shadow-sm dark:border-white/10 dark:bg-surface-dark"
                >
                  <View className="p-6">
                    <View className="mb-5 flex-row items-start justify-between">
                      <View>
                        <Text className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          {order.id} • {order.time}
                        </Text>
                        <Text className="text-lg font-bold text-text-main dark:text-text-main-dark">
                          {order.customer}
                        </Text>
                      </View>
                      <View className={`rounded-full px-3 py-1 ${statusStyle.badge}`}>
                        <Text className={`text-[10px] font-bold uppercase tracking-wider ${statusStyle.text}`}>
                          {order.status}
                        </Text>
                      </View>
                    </View>

                    <View className="mb-6 gap-4">
                      {order.items.map((item, index) => (
                        <View key={`${order.id}-${index}`} className="flex-row items-center gap-4">
                          <View className="h-12 w-12 overflow-hidden rounded-2xl border border-gray-50 bg-background-light dark:border-white/10 dark:bg-background-dark">
                            <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />
                          </View>
                          <View className="flex-1">
                            <Text className="text-sm font-semibold text-text-main dark:text-text-main-dark">{item.name}</Text>
                            <Text className="text-xs text-gray-500 dark:text-text-sub-dark">x{item.qty} • {item.description}</Text>
                          </View>
                        </View>
                      ))}
                    </View>

                    {order.status === 'New' ? (
                      <View className="flex-row gap-3">
                        <Pressable className="h-12 flex-1 items-center justify-center rounded-2xl border-2 border-neutral-light dark:border-neutral-dark">
                          <Text className="text-sm font-bold text-gray-500 dark:text-text-sub-dark">Decline</Text>
                        </Pressable>
                        <Pressable className="h-12 flex-1 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
                          <Text className="text-sm font-bold text-white">Accept Order</Text>
                        </Pressable>
                      </View>
                    ) : order.status === 'Baking' ? (
                      <View>
                        <View className="mb-4 flex-row items-center justify-between pt-2">
                          <View className="flex-row items-center gap-2">
                            <MaterialCommunityIcons name="clock-outline" size={18} color="#ea580c" />
                            <Text className="text-xs font-bold uppercase tracking-wider text-orange-600">Ready in 15m</Text>
                          </View>
                          <Pressable className="flex-row items-center gap-1">
                            <Text className="text-sm font-bold text-primary">Manage</Text>
                            <MaterialCommunityIcons name="chevron-right" size={18} color="#f97316" />
                          </Pressable>
                        </View>
                        <View className="h-1.5 w-full rounded-full bg-neutral-light dark:bg-neutral-dark">
                          <View className="h-full w-3/4 rounded-r-full bg-orange-400" />
                        </View>
                      </View>
                    ) : (
                      <Pressable className="h-12 w-full flex-row items-center justify-center gap-2 rounded-2xl border border-green-100 bg-green-50 dark:border-green-500/30 dark:bg-green-500/10">
                        <MaterialCommunityIcons name="check-circle-outline" size={20} color="#15803d" />
                        <Text className="text-sm font-bold text-green-700">Handover to Courier</Text>
                      </Pressable>
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
