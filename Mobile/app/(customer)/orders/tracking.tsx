import React from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Image as RnImage } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ChevronLeft, 
  MapPin, 
  Package, 
  Clock, 
  CheckCircle2, 
  Timer, 
  Truck, 
  Home as HomeIcon,
  ShoppingBag,
  Navigation2,
  Flame,
  ClipboardList
} from 'lucide-react-native';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { useOrderByIdQuery } from '@/src/features/orders/orders.hooks';
import { Product } from '@/src/features/restaurants/restaurants.types';
import { Icon as UiIcon } from '@/components/ui/icon';

export default function TrackOrderScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const { orderId } = useLocalSearchParams();
  const { data: order, isLoading } = useOrderByIdQuery(orderId as string);

  const getOwnerName = (owner: any) => {
    if (typeof owner === 'string') return 'Bakery';
    return owner?.businessName || owner?.name || 'Bakery';
  };

  const statusMap = {
    'pending': { index: 0, label: 'Order Confirmed', icon: ClipboardList, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    'accepted': { index: 1, label: 'Preparing', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    'ready': { index: 2, label: 'Ready for Pickup', icon: ShoppingBag, color: 'text-primary', bg: 'bg-primary/10' },
    'on-the-way': { index: 3, label: 'Out for Delivery', icon: Truck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    'delivered': { index: 4, label: 'Delivered', icon: HomeIcon, color: 'text-green-500', bg: 'bg-green-500/10' },
    'cancelled': { index: -1, label: 'Cancelled', icon: Package, color: 'text-red-500', bg: 'bg-red-500/10' },
  };

  const currentStatus = statusMap[order?.status as keyof typeof statusMap] || statusMap.pending;
  const statusIdx = currentStatus.index;

  const steps = [
    { title: 'Order Confirmed', description: 'Your order has been received', icon: ClipboardList, active: statusIdx >= 0 },
    { title: 'Preparing', description: 'Chef is preparing your meal', icon: Flame, active: statusIdx >= 1 },
    { title: 'Ready', description: 'Order is packed and ready', icon: ShoppingBag, active: statusIdx >= 2 },
    { title: 'On the Way', description: 'Rider is heading to you', icon: Truck, active: statusIdx >= 3 },
    { title: 'Arrived', description: 'Enjoy your meal!', icon: CheckCircle2, active: statusIdx >= 4 },
  ];

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#f97015" />
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background p-6">
        <Text className="text-lg font-bold text-foreground">Order not found</Text>
        <Pressable onPress={() => router.back()} className="mt-4 bg-primary px-6 py-2.5 rounded-xl">
          <Text className="text-white font-bold">Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center border-b border-border bg-card px-4 py-4">
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-xl bg-muted">
          <UiIcon as={ChevronLeft} size={20} className="text-primary" />
        </Pressable>
        <View className="flex-1 px-4">
          <Text className="text-lg font-black text-foreground tracking-tight">Track Order</Text>
          <Text className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Order #{order._id.slice(-6).toUpperCase()}</Text>
        </View>
        <View className="h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <UiIcon as={Clock} size={18} className="text-primary" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Visual Map/Status Area */}
        <View className="h-48 relative overflow-hidden bg-primary/5">
          {/* Animated Background Decoration */}
          <View className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
          <View className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
          
          <View className="flex-1 items-center justify-center">
            <View className="relative">
              <View className="h-24 w-24 rounded-[32px] bg-primary items-center justify-center shadow-xl shadow-primary/40">
                <UiIcon as={currentStatus.icon} size={32} className="text-white" />
              </View>
              <View className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-background items-center justify-center border-2 border-white">
                <View className="h-5 w-5 rounded-full bg-green-500 animate-pulse" />
              </View>
            </View>
            <Text className="mt-4 text-2xl font-black text-foreground tracking-tight uppercase">
              {currentStatus.label}
            </Text>
          </View>
        </View>

        {/* Order Info Card */}
        <View className="px-6 -mt-6">
          <View className="bg-card rounded-3xl border border-border p-6 shadow-sm">
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center gap-3">
                <View className="h-12 w-12 rounded-2xl bg-muted items-center justify-center overflow-hidden">
                  {order.owner ? (
                    <RnImage source={{ uri: order.owner.image }} className="h-full w-full" />
                  ) : (
                    <UiIcon as={ShoppingBag} size={20} className="text-muted-foreground" />
                  )}
                </View>
                <View>
                  <Text className="text-sm font-black text-foreground">{getOwnerName(order.owner)}</Text>
                  <View className="flex-row items-center gap-1">
                     <UiIcon as={Navigation2} size={10} className="text-primary" />
                     <Text className="text-[10px] font-bold text-muted-foreground">Arriving in 25-30 mins</Text>
                  </View>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-xl font-black text-primary">ETB {order.totalPrice}</Text>
                <Text className="text-[10px] font-bold text-muted-foreground uppercase">{order.payment?.isPaid || 'Paid'}</Text>
              </View>
            </View>

            <View className="h-px bg-border w-full mb-6" />

            <View className="flex-row items-center gap-4">
              <View className="h-10 w-10 rounded-xl bg-primary/5 items-center justify-center">
                <UiIcon as={Package} size={20} className="text-primary" />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-bold text-muted-foreground">Package Content</Text>
                <Text className="text-sm font-black text-foreground">
                  {(order.product as Product)?.name || 'Order Item'} x {order.quantity}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Timeline */}
        <View className="px-6 py-8">
          <Text className="text-xs font-black text-muted-foreground uppercase tracking-[2px] mb-6 px-2">Delivery Timeline</Text>
          
          <View className="px-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <View key={step.title} className="flex-row gap-6 mb-2">
                  <View className="items-center">
                    <View className={`h-11 w-11 rounded-2xl border-4 border-background items-center justify-center z-10 ${
                      step.active ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-muted opacity-50'
                    }`}>
                      <UiIcon as={Icon} size={16} className={step.active ? 'text-white' : 'text-muted-foreground'} />
                    </View>
                    {index < steps.length - 1 && (
                      <View className={`w-0.5 h-16 -mt-2 -mb-2 ${
                        step.active && steps[index + 1].active ? 'bg-primary' : 'bg-muted'
                      }`} />
                    )}
                  </View>
                  <View className={`flex-1 justify-center pb-8 ${step.active ? '' : 'opacity-40'}`}>
                    <Text className={`font-black text-base ${step.active ? 'text-foreground' : 'text-muted-foreground'}`}>{step.title}</Text>
                    <Text className="text-xs font-bold text-muted-foreground mt-0.5">{step.description}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Address Card */}
        <View className="px-6 mb-32">
          <View className="bg-muted rounded-2xl p-4 flex-row items-center gap-4 border border-border/50">
            <View className="h-10 w-10 rounded-xl bg-background items-center justify-center">
              <UiIcon as={MapPin} size={20} className="text-primary" />
            </View>
            <View className="flex-1">
              <Text className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Delivery Address</Text>
              <Text className="text-xs font-bold text-foreground mt-0.5" numberOfLines={1}>
                {order.pickupLocation || 'Bole, Addis Ababa, Ethiopia'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
