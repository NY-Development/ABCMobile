import { router } from 'expo-router';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Image as RnImage } from 'react-native';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOrdersQuery } from '@/src/features/orders/orders.hooks';
import { Order } from '@/src/features/orders/orders.types';
import { 
  ChevronLeft, 
  Package, 
  PackageCheck, 
  PackageX, 
  Clock, 
  ChevronRight,
  ShoppingBag,
  History,
  Timer
} from 'lucide-react-native';
import { Icon as UiIcon } from '@/components/ui/icon';

export default function OrderHistoryScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');

  const { data: response, isLoading } = useOrdersQuery();
  const orders = response?.orders || [];

  const getOwnerName = (owner: string | any) => {
    if (typeof owner === 'string') return 'Bakery';
    return owner?.businessName || owner?.name || 'Bakery';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  const activeOrders = orders.filter((o: Order) => ['pending', 'in-progress', 'accepted', 'ready', 'on-the-way'].includes(o.status));
  const pastOrders = orders.filter((o: Order) => ['delivered', 'cancelled', 'rejected'].includes(o.status));

  const displayOrders = activeTab === 'active' ? activeOrders : pastOrders;

  const StatusBadge = ({ status }: { status: string }) => {
    const config = {
      pending: { color: 'text-amber-600', bg: 'bg-amber-50', icon: Clock },
      accepted: { color: 'text-orange-600', bg: 'bg-orange-50', icon: Timer },
      ready: { color: 'text-primary', bg: 'bg-primary/5', icon: ShoppingBag },
      'on-the-way': { color: 'text-blue-600', bg: 'bg-blue-50', icon: History },
      delivered: { color: 'text-green-600', bg: 'bg-green-50', icon: PackageCheck },
      cancelled: { color: 'text-red-600', bg: 'bg-red-50', icon: PackageX },
      rejected: { color: 'text-red-600', bg: 'bg-red-50', icon: PackageX },
    }[status] || { color: 'text-slate-600', bg: 'bg-slate-50', icon: Package };

    return (
      <View className={`flex-row items-center gap-1.5 rounded-full px-2.5 py-1 ${config.bg} border border-${config.color.split('-')[1]}-100`}>
        <UiIcon as={config.icon} size={10} className={config.color} />
        <Text className={`text-[10px] font-black uppercase tracking-widest ${config.color}`}>
          {status}
        </Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#f97015" />
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
        <Text className="flex-1 text-center text-lg font-black text-foreground tracking-tight">Order History</Text>
        <View className="h-10 w-10" />
      </View>

      {/* Modern Tabs */}
      <View className="flex-row gap-2 bg-card p-4 border-b border-border">
        <Pressable
          onPress={() => setActiveTab('active')}
          className={`flex-1 h-12 flex-row items-center justify-center gap-2 rounded-2xl ${
            activeTab === 'active' ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-muted/50 border border-border/50'
          }`}>
          <UiIcon as={ShoppingBag} size={16} className={activeTab === 'active' ? 'text-white' : 'text-muted-foreground'} />
          <Text className={`text-xs font-black uppercase tracking-widest ${activeTab === 'active' ? 'text-white' : 'text-muted-foreground'}`}>
            Active ({activeOrders.length})
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('past')}
          className={`flex-1 h-12 flex-row items-center justify-center gap-2 rounded-2xl ${
            activeTab === 'past' ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-muted/50 border border-border/50'
          }`}>
          <UiIcon as={History} size={16} className={activeTab === 'past' ? 'text-white' : 'text-muted-foreground'} />
          <Text className={`text-xs font-black uppercase tracking-widest ${activeTab === 'past' ? 'text-white' : 'text-muted-foreground'}`}>
            Past ({pastOrders.length})
          </Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="p-4 gap-4">
          {displayOrders.length === 0 ? (
            <View className="mt-20 items-center justify-center p-10 gap-4">
              <View className="h-20 w-20 rounded-[32px] bg-primary/5 items-center justify-center">
                <UiIcon as={Package} size={40} className="text-primary/20" />
              </View>
              <View className="items-center">
                <Text className="text-lg font-black text-foreground tracking-tight">No {activeTab} orders</Text>
                <Text className="text-xs font-bold text-muted-foreground text-center mt-1">
                  You haven't placed any orders that match this category yet.
                </Text>
              </View>
              <Pressable 
                onPress={() => router.push('/(customer)/restaurants')}
                className="mt-2 bg-primary px-6 py-3 rounded-2xl shadow-lg shadow-primary/20">
                <Text className="text-white font-black uppercase tracking-widest text-xs">Explore Menu</Text>
              </Pressable>
            </View>
          ) : (
            displayOrders.map((order) => (
              <Pressable
                key={order._id}
                onPress={() => router.push(`/(customer)/orders/tracking?orderId=${order._id}` as any)}
                className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm active:border-primary/50">
                <View className="p-5">
                  <View className="flex-row items-start justify-between mb-4">
                    <View className="flex-row items-center gap-3">
                      <View className="h-12 w-12 rounded-2xl bg-muted items-center justify-center overflow-hidden">
                        {order.owner?.image ? (
                          <RnImage source={{ uri: order.owner.image }} className="h-full w-full" />
                        ) : (
                          <UiIcon as={ShoppingBag} size={20} className="text-muted-foreground" />
                        )}
                      </View>
                      <View>
                        <Text className="text-sm font-black text-foreground truncate max-w-[150px]" numberOfLines={1}>
                          {getOwnerName(order.owner)}
                        </Text>
                        <Text className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          {formatDate(order.createdAt)} • Order #{order._id.slice(-6).toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <StatusBadge status={order.status} />
                  </View>

                  <View className="h-px bg-border/50 w-full mb-4" />

                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Amount Paid</Text>
                      <Text className="text-lg font-black text-primary tracking-tight">ETB {order.totalPrice}</Text>
                    </View>
                    <Pressable 
                      onPress={() => router.push(`/(customer)/orders/tracking?orderId=${order._id}` as any)}
                      className="h-10 flex-row items-center gap-2 bg-primary/10 px-4 rounded-xl active:bg-primary/20">
                      <Text className="text-xs font-black text-primary uppercase tracking-widest">Track</Text>
                      <UiIcon as={ChevronRight} size={14} className="text-primary" />
                    </Pressable>
                  </View>
                </View>
                
                {/* Progress Bar Mini */}
                {activeTab === 'active' && (
                  <View className="h-1 bg-muted">
                    <View className="h-full bg-primary" style={{ width: '40%' }} />
                  </View>
                )}
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
