import React, { useMemo } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Bell,
  ShoppingCart,
  Wallet,
  Cake,
  Timer,
  PlusCircle,
  PackagePlus,
} from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/src/features/auth';
import * as adminService from '@/src/services/admin';
import { vendorAPI } from '@/src/services/vendor';
import { Icon } from '@/components/ui/icon';

export default function VendorDashboardScreen() {
  const router = useRouter();

  const { user } = useAuthStore();
  const ownerId = (user as any)?._id ?? (user as any)?.id;

  const { data: owner } = useQuery({
    queryKey: ['admin', 'owner', ownerId],
    enabled: !!ownerId,
    queryFn: () => adminService.getOwnerById(ownerId),
    staleTime: 1000 * 60,
  });

  const { data: ordersData } = useQuery({
    queryKey: ['vendor', 'orders', 'my'],
    queryFn: () => vendorAPI.getMyOrders(),
    staleTime: 1000 * 60,
  });

  const orders = ordersData?.orders ?? [];

  const deliveredOrders = useMemo(() => {
    return orders.filter((o: any) => o.status === 'delivered');
  }, [orders]);

  const inProgressOrders = useMemo(() => {
    return orders.filter((o: any) => o.status === 'in-progress' || o.status === 'pending');
  }, [orders]);

  const deliveredRevenue = useMemo(() => {
    return deliveredOrders.reduce((sum: number, o: any) => sum + (Number(o.totalPrice) || 0), 0);
  }, [deliveredOrders]);

  const stats = useMemo(() => {
    const sold = deliveredOrders.reduce((sum: number, o: any) => sum + (Number(o.quantity) || 0), 0);

    return [
      { label: 'Total Orders', value: String(orders.length), hint: `Delivered: ${deliveredOrders.length}`, icon: ShoppingCart },
      { label: 'Revenue', value: `ETB ${deliveredRevenue.toLocaleString()}`, hint: 'From delivered orders', icon: Wallet },
      { label: 'Sold', value: String(sold), hint: 'Delivered quantity', icon: Cake },
      { label: 'In Progress', value: String(inProgressOrders.length), hint: 'Pending/Accepted', icon: Timer },
    ];
  }, [orders.length, deliveredOrders.length, deliveredOrders, deliveredRevenue, inProgressOrders.length]);

  const revenueBars = useMemo(() => {
    // Very simple "last 7 days" preview; avoids needing a dedicated backend aggregation endpoint.
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const buckets = new Array(7).fill(0);

    for (const o of orders) {
      if (o?.status !== 'delivered') continue;
      const createdAt = new Date(o.createdAt ?? o.updatedAt ?? now).getTime();
      const idx = Math.floor((now - createdAt) / dayMs);
      if (idx >= 0 && idx < 7) {
        buckets[6 - idx] += Number(o.totalPrice) || 0;
      }
    }

    const max = Math.max(...buckets, 1);
    return buckets.map((v) => Math.max(8, Math.round((v / max) * 100)));
  }, [orders]);

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-row items-center justify-between border-b border-border bg-card px-4 py-3">
          <View className="flex-1 flex-row items-center gap-3">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Icon as={Cake} size={18} className="text-primary" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-foreground">{owner?.companyName || 'Bakery'}</Text>
              <Text className="text-xs font-semibold text-muted-foreground">Owner Dashboard</Text>
            </View>
          </View>
          <Pressable className="h-10 w-10 items-center justify-center rounded-xl bg-muted">
            <Icon as={Bell} size={18} className="text-primary" />
          </Pressable>
        </View>

        <View className="px-4 pb-2 pt-6">
          <Text className="text-2xl font-bold text-foreground">
            Good morning, {owner?.companyName || 'Bakery'}
          </Text>
          <Text className="text-sm text-muted-foreground">
            Here's what is happening with your bakery today.
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-3 px-4 py-4">
          {stats.map((item) => {
            return (
              <View
                key={item.label}
                className="w-[48%] rounded-xl border border-border bg-card p-4 shadow-sm">
                <View className="mb-2 flex-row items-center justify-between">
                  <Icon as={item.icon} size={18} className="text-primary" />
                  <Text className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {item.hint}
                  </Text>
                </View>
                <Text className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </Text>
                <Text className="mt-1 text-2xl font-bold text-foreground">{item.value}</Text>
              </View>
            );
          })}
        </View>

        <View className="px-4 py-2">
          <View className="rounded-xl border border-border bg-card p-5">
            <View className="mb-4 flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-bold text-foreground">Sales Trends</Text>
                  <Text className="text-xs font-semibold text-muted-foreground">
                    Delivered revenue (last 7 days)
                  </Text>
              </View>
              <View className="items-end">
                  <Text className="text-xl font-bold text-foreground">
                    ETB {deliveredRevenue.toLocaleString()}
                  </Text>
                <Text className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  7D
                </Text>
              </View>
            </View>

              <View className="h-40 flex-row items-end justify-between gap-2 rounded-xl bg-muted px-4 py-3">
                {revenueBars.map((height, idx) => (
                  <View
                    // eslint-disable-next-line react/no-array-index-key
                    key={idx}
                    className="flex-1 rounded-t bg-primary"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </View>

            <View className="mt-4 flex-row justify-between">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                <Text key={d} className="text-[11px] font-bold uppercase text-muted-foreground">
                  {d}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <View className="px-4 pb-8 pt-4">
            <Text className="mb-3 text-lg font-bold text-foreground">Quick Actions</Text>
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => router.push('/(vendor)/orders')}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4">
              <Icon as={PlusCircle} size={18} className="text-primary-foreground" />
              <Text className="font-bold text-primary-foreground">New Order</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push('/(vendor)/menu/inventory')}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-4">
              <Icon as={PackagePlus} size={18} className="text-primary" />
              <Text className="font-bold text-foreground">Add Stock</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
