import React, { useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { vendorAPI } from '@/src/services/vendor';
import { Icon } from '@/components/ui/icon';
import { Wallet, TrendingUp } from 'lucide-react-native';

export default function VendorEarningsScreen() {
  const { data } = useQuery({
    queryKey: ['vendor', 'orders', 'my'],
    queryFn: () => vendorAPI.getMyOrders(),
    staleTime: 1000 * 60,
  });

  const orders = data?.orders ?? [];

  const deliveredRevenue = useMemo(() => {
    const delivered = orders.filter((o: any) => o?.status === 'delivered');
    return delivered.reduce((sum: number, o: any) => sum + (Number(o.totalPrice) || 0), 0);
  }, [orders]);

  const revenueBars = useMemo(() => {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const buckets = new Array(7).fill(0);

    for (const o of orders) {
      if (o?.status !== 'delivered') continue;
      const createdAt = new Date(o.createdAt ?? o.updatedAt ?? now).getTime();
      const idx = Math.floor((now - createdAt) / dayMs);
      if (idx >= 0 && idx < 7) buckets[6 - idx] += Number(o.totalPrice) || 0;
    }

    const max = Math.max(...buckets, 1);
    return buckets.map((v) => Math.max(8, Math.round((v / max) * 100)));
  }, [orders]);

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <View className="px-4 py-4">
        <View className="mb-4 rounded-xl border border-border bg-card p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Icon as={Wallet} size={18} className="text-primary" />
              </View>
              <View>
                <Text className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Delivered Revenue
                </Text>
                <Text className="mt-1 text-2xl font-bold text-foreground">
                  ETB {deliveredRevenue.toLocaleString()}
                </Text>
              </View>
            </View>
            <View className="rounded-full bg-primary/10 px-3 py-2">
              <View className="flex-row items-center gap-2">
                <Icon as={TrendingUp} size={16} className="text-primary" />
                <Text className="text-xs font-bold text-primary">7D</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="rounded-xl border border-border bg-card p-4">
          <Text className="mb-3 text-sm font-bold text-foreground">Revenue (Last 7 Days)</Text>
          <View className="h-40 flex-row items-end justify-between gap-2 rounded-xl bg-muted px-4 py-3">
            {revenueBars.map((height, idx) => (
              <View key={idx} className="flex-1 rounded-t bg-primary" style={{ height: `${height}%` }} />
            ))}
          </View>
          <View className="mt-3 flex-row justify-between px-1">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
              <Text key={d} className="text-[10px] font-bold uppercase text-muted-foreground">
                {d}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
