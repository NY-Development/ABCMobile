import React, { useMemo } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Phone, MessageCircle, Package, MapPin, CircleCheck } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import { vendorAPI } from '@/src/services/vendor';
import { Icon } from '@/components/ui/icon';

export default function VendorOrderDetailScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const { data: ordersData, isLoading, error, refetch } = useQuery({
    queryKey: ['vendor', 'orders', 'my'],
    queryFn: () => vendorAPI.getMyOrders(),
    staleTime: 1000 * 20,
  });

  const order = useMemo(() => {
    const orders = ordersData?.orders ?? [];
    return orders.find((o: any) => String(o?._id) === String(orderId));
  }, [ordersData, orderId]);

  const statusLabel = (s: string | undefined) => {
    switch (s) {
      case 'pending':
        return 'Incoming';
      case 'in-progress':
        return 'Preparing';
      case 'delivered':
        return 'Ready';
      case 'cancelled':
        return 'Cancelled';
      default:
        return s || 'Unknown';
    }
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-row items-center justify-between border-b border-border px-4 py-3">
          <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full">
            <Icon as={ArrowLeft} size={20} className="text-primary" />
          </Pressable>
          <View className="items-center">
            <Text className="text-lg font-bold text-foreground">
              Order #{orderId || ''}
            </Text>
            <Text className="text-xs font-semibold uppercase text-muted-foreground">
              {statusLabel(order?.status)}
            </Text>
          </View>
          <View className="h-10 w-10" />
        </View>

        {isLoading ? (
          <View className="py-10 items-center justify-center">
            <ActivityIndicator size="large" />
          </View>
        ) : error ? (
          <View className="py-10 items-center justify-center">
            <Text className="text-destructive">Error loading order</Text>
          </View>
        ) : !order ? (
          <View className="py-10 items-center justify-center">
            <Text className="text-muted-foreground">Order not found</Text>
          </View>
        ) : (
          <>
            <View className="p-4">
              <Text className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Customer Information
              </Text>
              <View className="flex-row items-center gap-3 rounded-xl border border-border bg-card p-4">
                <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Text className="text-sm font-bold text-primary">
                    {(order.customer?.name || order.customer?.email || '?').slice(0, 2).toUpperCase()}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-foreground">{order.customer?.name || 'Customer'}</Text>
                  <Text className="text-sm text-muted-foreground">
                    {order.customer?.phone || order.customer?.email || 'N/A'}
                  </Text>
                </View>
                <Pressable className="h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Icon as={Phone} size={16} className="text-primary" />
                </Pressable>
                <Pressable className="h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Icon as={MessageCircle} size={16} className="text-primary" />
                </Pressable>
              </View>
            </View>

            <View className="px-4 py-2">
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Order Item
                </Text>
                <Text className="rounded bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                  ETB {Number(order.totalPrice || 0).toLocaleString()}
                </Text>
              </View>

              <View className="mb-3 rounded-xl border border-border bg-card p-3">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 pr-3">
                    <Text className="font-bold text-foreground">{order.product?.name || 'Item'}</Text>
                    {order.product?.description ? (
                      <Text className="mt-1 text-xs text-muted-foreground" numberOfLines={1}>
                        {order.product.description}
                      </Text>
                    ) : null}
                    <View className="mt-2 flex-row items-center gap-1">
                      <Icon as={Package} size={14} className="text-primary" />
                      <Text className="text-xs font-bold text-primary">{order.quantity} unit</Text>
                    </View>
                  </View>
                  <Text className="font-bold text-foreground">
                    ETB {Number(order.totalPrice || 0).toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>

            <View className="rounded-t-3xl border-t border-border bg-muted p-4">
              <View className="mb-5 gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-muted-foreground">Total Price</Text>
                  <Text className="text-lg font-black text-primary">
                    ETB {Number(order.totalPrice || 0).toLocaleString()}
                  </Text>
                </View>
              </View>

              <Text className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Pickup Location
              </Text>
              <View className="mb-4 flex-row items-start gap-2 rounded-xl border border-border bg-card p-3">
                <Icon as={MapPin} size={16} className="text-primary" />
                <View className="flex-1">
                  <Text className="text-sm font-bold text-foreground">{order.pickupLocation || 'Not specified'}</Text>
                  <Text className="text-xs text-muted-foreground" numberOfLines={1}>
                    {order.mapUrl || '—'}
                  </Text>
                </View>
              </View>

              <View className="flex-row gap-3 pb-8">
                {order.status === 'pending' ? (
                  <>
                    <Pressable
                      className="flex-1 items-center rounded-xl border border-border bg-card py-3"
                      onPress={async () => {
                        await vendorAPI.updateOrderStatus(order._id, 'rejected');
                        await refetch();
                      }}
                    >
                      <Text className="font-semibold text-foreground">Decline</Text>
                    </Pressable>
                    <Pressable
                      className="flex-[1.5] items-center rounded-xl bg-primary py-3"
                      onPress={async () => {
                        await vendorAPI.updateOrderStatus(order._id, 'in-progress');
                        await refetch();
                      }}
                    >
                      <Text className="font-bold text-primary-foreground">Accept</Text>
                    </Pressable>
                  </>
                ) : order.status === 'in-progress' ? (
                  <Pressable
                    className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-primary py-3"
                    onPress={async () => {
                      await vendorAPI.markOrderAsReady(order._id);
                      await refetch();
                    }}
                  >
                    <Icon as={CircleCheck} size={16} className="text-primary-foreground" />
                    <Text className="font-bold text-primary-foreground">Confirm Picked Up</Text>
                  </Pressable>
                ) : (
                  <View className="flex-1 items-center justify-center py-6">
                    <Text className="text-sm font-semibold text-muted-foreground">
                      No actions available for this status.
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
