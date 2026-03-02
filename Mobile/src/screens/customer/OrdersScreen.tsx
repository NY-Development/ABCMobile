import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/themeStore';

export const OrdersScreen = () => {
  const { mode, toggle } = useThemeStore();
  const insets = useSafeAreaInsets();
  const isDark = mode === 'dark';
  const [segment, setSegment] = useState<'Active' | 'Past'>('Active');

  const pastOrders = [
    {
      id: 'past-1',
      bakery: 'The Bake Shop',
      date: 'October 24, 2023',
      amount: '850 ETB',
      items: '2x Chocolate Croissants, 1x Sourdough Loaf',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBQSNcO8miyLWldgur1XYUhn9GhauV_tYMJAq4DyvsTKEu6nJMa7-WADYIrZY3lZjOfaFnxENFP2ofuAe7CYNCL1gb4aOeKfXeKVPfOzKLg0ybxNGPSzetXd1wtjehMNjUAszZKqAP4LsOCdCTlW7i9F4mDNgGPeeOHzxdZhOM8rCwTsdZbSZwtAPhPrZpASkRyIMqHNi6lGwS7ijOc5QLUrXDroQ3zp4gaY9SExLiDIBYs2dVaXSUHPfag0HWIShepUCZIp2hliINW',
    },
    {
      id: 'past-2',
      bakery: 'Crust & Crumb',
      date: 'October 18, 2023',
      amount: '1,200 ETB',
      items: '1x Celebration Cake (Vanilla), 6x Glazed Donuts',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCJBeepdeR5SBwKaHw3ntOn5X4gQqan4rJ5UXdeiiEr09lpqrxCwmX4O-V33uCrmw8PAxa8djA_FK5hGlLJTscIIGfqD80EvKqxRes0lyxH2q0iiScU2-S4yn43ZMo1Y5R2IVL0fJdC_uzHvY0DfcXvFT2CjYbjdvA974hzxcyYLlYzX9tTkJL8B-e5rHkyLhyHl8FWE9h6m6OcFCcLkLgFNPDrL2SKiNbw6WrlM_4Sa5rWkeZCL7KQjyyHSy8Re-jPDHDx1Rrxw0pI',
    },
    {
      id: 'past-3',
      bakery: 'Sweet Delights',
      date: 'October 12, 2023',
      amount: '450 ETB',
      items: '4x Cinnamon Rolls',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC6EJxo99UdR-KioDpVfYizP3EN8TENBD7-goKwNW3e8tpUtPvcVyOIe7J-P_tZTOAFgXk8uk_igfwig_AXFYXOd1ItvU6hop_TgwHoYWajdaOZRrD_HWhsfPlgipudc5THuKqntwIrZDJ9NdmHNm-7NMueFtzfuBLqr-AGw8q8l3anbXtfLDVMIm4Hsx6WAqDdZcpKNGLYkY-Ua1-WU-ofCexw58pGtlFT_XPZqUFRqtks3rPFt-wQCEjbLQpsUHwBPSNbxPIGzOi0',
    },
  ];

  const Step = ({
    label,
    state,
    isLast,
  }: {
    label: string;
    state: 'done' | 'active' | 'upcoming';
    isLast?: boolean;
  }) => (
    <View className="flex-1 items-center">
      {!isLast ? (
        <View
          className={state === 'done' ? 'absolute left-1/2 top-3 h-[2px] w-full bg-primary' : 'absolute left-1/2 top-3 h-[2px] w-full bg-border-light dark:bg-border-dark'}
        />
      ) : null}

      <View
        className={
          state === 'done'
            ? 'z-10 h-6 w-6 items-center justify-center rounded-full border-4 border-background-light bg-primary dark:border-background-dark'
            : state === 'active'
              ? 'z-10 h-6 w-6 items-center justify-center rounded-full border-4 border-background-light bg-primary ring-4 ring-primary/20 dark:border-background-dark'
              : 'z-10 h-6 w-6 items-center justify-center rounded-full border-4 border-background-light bg-border-light dark:border-background-dark dark:bg-border-dark'
        }
      >
        {state === 'done' ? (
          <MaterialCommunityIcons name="check" size={12} color="#ffffff" />
        ) : state === 'active' ? (
          <View className="h-1.5 w-1.5 rounded-full bg-white" />
        ) : null}
      </View>

      <Text
        className={
          state === 'active'
            ? 'mt-2 text-[10px] font-bold text-primary'
            : state === 'done'
              ? 'mt-2 text-[10px] font-semibold text-text-main dark:text-gray-100'
              : 'mt-2 text-[10px] font-medium text-text-muted dark:text-gray-400'
        }
      >
        {label}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top', 'bottom']}>
      <View className="flex-1">
        <View className="bg-background-light/95 px-6 pb-4 pt-2 dark:bg-background-dark/95">
          <View className="mb-6 flex-row items-center justify-between">
            <Text className="text-2xl font-extrabold tracking-tight text-text-main dark:text-gray-100">
              {segment === 'Past' ? 'Your Past Orders' : 'Your Orders'}
            </Text>
            <Pressable
              onPress={toggle}
              className="h-10 w-10 items-center justify-center rounded-full bg-surface-light ring-1 ring-border-light dark:bg-surface-dark dark:ring-border-dark"
            >
              <MaterialCommunityIcons
                name={isDark ? 'white-balance-sunny' : 'weather-night'}
                size={20}
                color={isDark ? '#ecb613' : '#9a864c'}
              />
            </Pressable>
          </View>

          <View className="rounded-xl bg-border-light p-1 dark:bg-surface-dark">
            <View className="flex-row">
              <Pressable
                onPress={() => setSegment('Active')}
                className={
                  segment === 'Active'
                    ? 'flex-1 rounded-lg bg-surface-light py-2.5 shadow-sm dark:bg-primary'
                    : 'flex-1 rounded-lg py-2.5'
                }
              >
                <Text
                  className={
                    segment === 'Active'
                      ? 'text-center text-sm font-bold text-text-main dark:text-background-dark'
                      : 'text-center text-sm font-semibold text-text-muted dark:text-gray-400'
                  }
                >
                  Active
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setSegment('Past')}
                className={
                  segment === 'Past'
                    ? 'flex-1 rounded-lg bg-surface-light py-2.5 shadow-sm dark:bg-primary'
                    : 'flex-1 rounded-lg py-2.5'
                }
              >
                <Text
                  className={
                    segment === 'Past'
                      ? 'text-center text-sm font-bold text-text-main dark:text-background-dark'
                      : 'text-center text-sm font-semibold text-text-muted dark:text-gray-400'
                  }
                >
                  Past
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 110, 132) }}
        >
          <View className="gap-6 px-6 pt-2">
            {segment === 'Active' ? (
              <>
                <View className="rounded-3xl bg-surface-light p-5 shadow-sm ring-1 ring-border-light dark:bg-surface-dark dark:ring-border-dark">
                  <View className="mb-5 flex-row items-start justify-between">
                    <View className="flex-row gap-4">
                      <View className="h-14 w-14 overflow-hidden rounded-2xl bg-border-light dark:bg-border-dark">
                        <Image
                          source={{
                            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJBeepdeR5SBwKaHw3ntOn5X4gQqan4rJ5UXdeiiEr09lpqrxCwmX4O-V33uCrmw8PAxa8djA_FK5hGlLJTscIIGfqD80EvKqxRes0lyxH2q0iiScU2-S4yn43ZMo1Y5R2IVL0fJdC_uzHvY0DfcXvFT2CjYbjdvA974hzxcyYLlYzX9tTkJL8B-e5rHkyLhyHl8FWE9h6m6OcFCcLkLgFNPDrL2SKiNbw6WrlM_4Sa5rWkeZCL7KQjyyHSy8Re-jPDHDx1Rrxw0pI',
                          }}
                          className="h-full w-full"
                          resizeMode="cover"
                        />
                      </View>
                      <View>
                        <Text className="font-bold text-text-main dark:text-gray-100">Golden Crumb Bakery</Text>
                        <Text className="mt-0.5 text-xs text-text-muted dark:text-gray-400">Order #AD-8291 • 3 items</Text>
                      </View>
                    </View>
                    <View className="rounded-full bg-amber-100 px-3 py-1 dark:bg-amber-900/30">
                      <Text className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Baking</Text>
                    </View>
                  </View>

                  <View className="mb-5 mt-2 flex-row justify-between">
                    <Step label="Placed" state="done" />
                    <Step label="Baking" state="active" />
                    <Step label="Delivery" state="upcoming" />
                    <Step label="Arrived" state="upcoming" isLast />
                  </View>

                  <View className="flex-row gap-3 pt-2">
                    <Pressable className="flex-1 rounded-xl bg-primary py-3 shadow-lg shadow-primary/20">
                      <Text className="text-center text-sm font-bold text-white dark:text-background-dark">Track Order</Text>
                    </Pressable>
                    <Pressable className="h-12 w-12 items-center justify-center rounded-xl bg-surface-light ring-1 ring-border-light dark:bg-surface-dark dark:ring-border-dark">
                      <MaterialCommunityIcons name="phone" size={20} color={isDark ? '#d4c59a' : '#9a864c'} />
                    </Pressable>
                  </View>
                </View>

                <View className="rounded-3xl bg-surface-light p-5 shadow-sm ring-1 ring-border-light dark:bg-surface-dark dark:ring-border-dark">
                  <View className="mb-5 flex-row items-start justify-between">
                    <View className="flex-row gap-4">
                      <View className="h-14 w-14 overflow-hidden rounded-2xl bg-border-light dark:bg-border-dark">
                        <Image
                          source={{
                            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6EJxo99UdR-KioDpVfYizP3EN8TENBD7-goKwNW3e8tpUtPvcVyOIe7J-P_tZTOAFgXk8uk_igfwig_AXFYXOd1ItvU6hop_TgwHoYWajdaOZRrD_HWhsfPlgipudc5THuKqntwIrZDJ9NdmHNm-7NMueFtzfuBLqr-AGw8q8l3anbXtfLDVMIm4Hsx6WAqDdZcpKNGLYkY-Ua1-WU-ofCexw58pGtlFT_XPZqUFRqtks3rPFt-wQCEjbLQpsUHwBPSNbxPIGzOi0',
                          }}
                          className="h-full w-full"
                          resizeMode="cover"
                        />
                      </View>
                      <View>
                        <Text className="font-bold text-text-main dark:text-gray-100">Sweet Delights</Text>
                        <Text className="mt-0.5 text-xs text-text-muted dark:text-gray-400">Order #AD-7712 • 1 item</Text>
                      </View>
                    </View>
                    <View className="rounded-full bg-blue-100 px-3 py-1 dark:bg-blue-900/30">
                      <Text className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Out for Delivery</Text>
                    </View>
                  </View>

                  <View className="mb-4 flex-row items-center gap-3 rounded-2xl bg-background-light p-3 dark:bg-background-dark">
                    <MaterialCommunityIcons name="map-marker-distance" size={20} color="#ecb613" />
                    <View>
                      <Text className="text-[10px] font-medium uppercase tracking-tight text-text-muted dark:text-gray-400">Est. Delivery</Text>
                      <Text className="text-sm font-bold text-text-main dark:text-gray-100">Arriving in 8-12 mins</Text>
                    </View>
                  </View>

                  <Pressable className="rounded-xl bg-primary py-3 shadow-lg shadow-primary/20">
                    <Text className="text-center text-sm font-bold text-white dark:text-background-dark">Track Real-time</Text>
                  </Pressable>
                </View>

                <View className="flex-row items-center gap-4 py-2">
                  <Text className="text-xs font-bold uppercase tracking-widest text-text-muted dark:text-gray-400">Recent Past Orders</Text>
                  <View className="h-px flex-1 bg-border-light dark:bg-border-dark" />
                </View>

                <View className="flex-row items-center justify-between rounded-2xl bg-surface-light p-4 opacity-90 ring-1 ring-border-light dark:bg-surface-dark dark:ring-border-dark">
                  <View className="flex-row gap-3">
                    <View className="h-12 w-12 overflow-hidden rounded-xl bg-border-light dark:bg-border-dark">
                      <Image
                        source={{
                          uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQSNcO8miyLWldgur1XYUhn9GhauV_tYMJAq4DyvsTKEu6nJMa7-WADYIrZY3lZjOfaFnxENFP2ofuAe7CYNCL1gb4aOeKfXeKVPfOzKLg0ybxNGPSzetXd1wtjehMNjUAszZKqAP4LsOCdCTlW7i9F4mDNgGPeeOHzxdZhOM8rCwTsdZbSZwtAPhPrZpASkRyIMqHNi6lGwS7ijOc5QLUrXDroQ3zp4gaY9SExLiDIBYs2dVaXSUHPfag0HWIShepUCZIp2hliINW',
                        }}
                        className="h-full w-full"
                        resizeMode="cover"
                      />
                    </View>
                    <View>
                      <Text className="text-sm font-bold text-text-main dark:text-gray-100">The Bake Shop</Text>
                      <Text className="text-[11px] text-text-muted dark:text-gray-400">Oct 24 • 850 ETB</Text>
                    </View>
                  </View>
                  <Pressable className="rounded-full bg-surface-light px-4 py-2 ring-1 ring-border-light dark:bg-surface-dark dark:ring-border-dark">
                    <Text className="text-xs font-bold text-primary">Reorder</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                {pastOrders.map((order) => (
                  <View key={order.id} className="rounded-3xl bg-surface-light p-5 shadow-sm ring-1 ring-border-light dark:bg-surface-dark dark:ring-border-dark">
                    <View className="mb-4 flex-row items-start justify-between">
                      <View className="flex-row gap-4">
                        <View className="h-14 w-14 overflow-hidden rounded-full border-2 border-white bg-border-light shadow-sm dark:border-surface-dark dark:bg-border-dark">
                          <Image source={{ uri: order.image }} className="h-full w-full" resizeMode="cover" />
                        </View>
                        <View>
                          <Text className="text-lg font-bold text-text-main dark:text-gray-100">{order.bakery}</Text>
                          <Text className="text-[13px] font-medium text-text-muted dark:text-gray-400">{order.date}</Text>
                        </View>
                      </View>
                      <Text className="text-lg font-bold text-primary">{order.amount}</Text>
                    </View>

                    <View className="mb-4 rounded-2xl bg-background-light/50 p-3 dark:bg-background-dark/50">
                      <Text className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-gray-400">Items</Text>
                      <Text className="text-sm leading-relaxed text-text-main dark:text-gray-100">{order.items}</Text>
                    </View>

                    <View className="flex-row gap-3">
                      <Pressable className="flex-1 rounded-xl bg-primary py-3 shadow-lg shadow-primary/20">
                        <Text className="text-center text-sm font-bold text-white dark:text-background-dark">Reorder</Text>
                      </Pressable>
                      <Pressable className="flex-1 rounded-xl bg-surface-light py-3 ring-1 ring-border-light dark:bg-surface-dark dark:ring-border-dark">
                        <Text className="text-center text-sm font-bold text-text-main dark:text-gray-100">Review</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
