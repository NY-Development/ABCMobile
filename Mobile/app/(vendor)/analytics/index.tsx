import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { vendorAPI } from '@/src/services/vendor';
import { Icon } from '@/components/ui/icon';
import { Wallet, ClipboardList } from 'lucide-react-native';

export default function VendorAnalyticsScreen() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['vendor', 'orders', 'my'],
    queryFn: () => vendorAPI.getMyOrders(),
    staleTime: 1000 * 60,
  });

  const orders = data?.orders ?? [];
  const deliveredRevenue = orders
    .filter((o: any) => o?.status === 'delivered')
    .reduce((sum: number, o: any) => sum + (Number(o.totalPrice) || 0), 0);

  return (
    <View className="flex-1 bg-background">
      <View className="px-4 py-4">
        <Text className="mb-2 text-2xl font-bold text-foreground">Analytics</Text>
        <Text className="mb-6 text-sm text-muted-foreground">Quick insights from your orders.</Text>

        <View className="flex-row gap-3">
          <View className="flex-1 rounded-xl border border-border bg-card p-4">
            <View className="flex-row items-center justify-between">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Icon as={ClipboardList} size={18} className="text-primary" />
              </View>
              <Text className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Orders</Text>
            </View>
            <Text className="mt-2 text-3xl font-bold text-foreground">{orders.length}</Text>
          </View>
          <View className="flex-1 rounded-xl border border-border bg-card p-4">
            <View className="flex-row items-center justify-between">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Icon as={Wallet} size={18} className="text-primary" />
              </View>
              <Text className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Revenue</Text>
            </View>
            <Text className="mt-2 text-3xl font-bold text-foreground">ETB {deliveredRevenue.toLocaleString()}</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push('/(vendor)/analytics/earnings')}
          className="mt-6 rounded-xl bg-primary px-5 py-4"
        >
          <Text className="text-center text-sm font-bold uppercase tracking-widest text-primary-foreground">
            View Earnings
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
