import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, ClipboardList, UtensilsCrossed } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import { vendorAPI } from '@/src/services/vendor';
import { Icon } from '@/components/ui/icon';

type TabId = 'incoming' | 'preparing' | 'completed';

const tabMeta: Array<{ id: TabId; label: string; match: (o: any) => boolean }> = [
  { id: 'incoming', label: 'Incoming', match: (o) => o?.status === 'pending' },
  { id: 'preparing', label: 'Preparing', match: (o) => o?.status === 'in-progress' },
  { id: 'completed', label: 'Completed', match: (o) => o?.status === 'delivered' },
];

export default function VendorOrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('incoming');

  const { data: ordersData, isLoading, error, refetch } = useQuery({
    queryKey: ['vendor', 'orders', 'my'],
    queryFn: () => vendorAPI.getMyOrders(),
    staleTime: 1000 * 20,
  });

  const orders = ordersData?.orders ?? [];

  const incomingCount = useMemo(() => orders.filter((o: any) => o?.status === 'pending').length, [orders]);
  const filteredOrders = useMemo(() => {
    const tab = tabMeta.find((t) => t.id === activeTab);
    if (!tab) return [];
    return orders.filter(tab.match);
  }, [orders, activeTab]);

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex-row items-center justify-between border-b border-border px-4 py-3">
            <View className="h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon as={ClipboardList} size={18} className="text-primary" />
            </View>
            <View className="flex-1 items-center">
              <Text className="text-lg font-bold text-foreground">Order Management</Text>
              <Text className="text-xs font-semibold text-primary">Order Management</Text>
            </View>
            <Pressable className="relative h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Icon as={Bell} size={18} className="text-muted-foreground" />
              <View className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="border-b border-border px-4">
            <View className="flex-row gap-6">
              {tabMeta.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <Pressable
                    key={tab.id}
                    onPress={() => setActiveTab(tab.id)}
                    className={`border-b-2 pb-3 pt-4 ${isActive ? 'border-primary' : 'border-transparent'}`}>
                    <Text
                      className={`text-sm font-bold uppercase ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                      {tab.id === 'incoming' ? `${tab.label} (${incomingCount})` : tab.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>

          <View className="px-4 py-4 pb-8">
            {isLoading ? (
              <View className="py-8 items-center justify-center">
                <Text className="text-muted-foreground">Loading orders...</Text>
              </View>
            ) : error ? (
              <View className="py-8 items-center justify-center">
                <Text className="text-destructive">Error loading orders</Text>
              </View>
            ) : filteredOrders.length ? (
              filteredOrders.map((order: any) => (
                <Pressable
                  key={order._id}
                  onPress={() => router.push(`/(vendor)/orders/${order._id}`)}
                  className="mb-4 rounded-xl border border-border bg-card p-4"
                >
                  <View className="mb-3 flex-row items-center gap-3">
                    <View className="h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                      <Icon as={UtensilsCrossed} size={20} className="text-primary" />
                    </View>
                    <View className="flex-1">
                      <View className="flex-row items-start justify-between">
                        <Text className="text-base font-bold text-foreground">
                          {order.customer?.name || order.customer?.email || 'Customer'}
                        </Text>
                        <Text className="rounded bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
                          {order._id?.slice?.(-6) ? `#${order._id.slice(-6)}` : `#${order._id}`}
                        </Text>
                      </View>
                      <Text className="mt-1 text-sm text-muted-foreground">
                        Total:{' '}
                        <Text className="font-bold text-primary">
                          ETB {(Number(order.totalPrice) || 0).toLocaleString()}
                        </Text>
                      </Text>
                    </View>
                  </View>

                  <View className="rounded-lg bg-muted p-3">
                    <Text className="text-sm text-foreground">
                      <Text className="font-semibold">Order: </Text>
                      {order.product?.name ? `${order.quantity}x ${order.product.name}` : 'Item'}
                    </Text>
                  </View>

                  <View className="mt-3 flex-row gap-2">
                    <Pressable
                      disabled={order.status !== 'pending'}
                      onPress={async () => {
                        if (!order._id) return;
                        await vendorAPI.updateOrderStatus(order._id, 'in-progress');
                        await refetch();
                      }}
                      className="flex-1 items-center rounded-xl bg-primary py-3"
                    >
                      <Text className="text-sm font-bold text-primary-foreground">Accept Order</Text>
                    </Pressable>
                    <Pressable
                      disabled={order.status !== 'pending'}
                      onPress={async () => {
                        if (!order._id) return;
                        await vendorAPI.updateOrderStatus(order._id, 'rejected');
                        await refetch();
                      }}
                      className="flex-1 items-center rounded-xl border border-border py-3"
                    >
                      <Text className="text-sm font-bold text-primary">Decline</Text>
                    </Pressable>
                  </View>
                </Pressable>
              ))
            ) : (
              <View className="items-center justify-center py-8">
                <Text className="text-muted-foreground">No orders in this tab</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
