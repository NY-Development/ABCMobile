import { router } from 'expo-router';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderHistoryScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const [activeTab, setActiveTab] = useState('active');

  const activeOrders = [
    {
      id: '2026-1325',
      bakery: 'Adama Bakery & Cake',
      date: 'Today • 14:30',
      amount: '$45.00',
      status: 'On the Way',
      items: 'Chocolate Cake x1, Croissants x3',
    },
  ];

  const pastOrders = [
    {
      id: '2026-1043',
      bakery: 'Sweet Dreams Patisserie',
      date: 'Mar 8, 2026',
      amount: '$32.50',
      status: 'Delivered',
    },
    {
      id: '2026-0982',
      bakery: 'Adama Bakery & Cake',
      date: 'Mar 2, 2026',
      amount: '$18.75',
      status: 'Delivered',
    },
    {
      id: '2026-0915',
      bakery: 'Artisan Bakers',
      date: 'Feb 24, 2026',
      amount: '$28.00',
      status: 'Cancelled',
    },
  ];

  return (
    <SafeAreaView
      className={`max-w-md flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
      {/* Header */}
      <View
        className={`flex-row items-center justify-between border-b ${isDark ? 'bg-background-dark border-slate-800' : 'bg-background-light border-slate-200'} px-4 py-4`}>
        <Pressable
          className="flex size-10 items-center justify-center"
          onPress={() => router.back()}>
          <Text className="text-2xl">←</Text>
        </Pressable>
        <Text
          className={`flex-1 text-center text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
          Order History
        </Text>
        <View className="size-10" />
      </View>

      {/* Tab Navigation */}
      <View
        className={`flex-row border-b ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
        <Pressable
          onPress={() => setActiveTab('active')}
          className={`flex-1 border-b-4 py-3 transition-colors ${
            activeTab === 'active'
              ? 'border-primary'
              : isDark
                ? 'border-transparent'
                : 'border-transparent'
          }`}>
          <Text
            className={`text-center text-sm font-bold uppercase tracking-wider ${
              activeTab === 'active' ? 'text-primary' : isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
            Active
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('past')}
          className={`flex-1 border-b-4 py-3 transition-colors ${
            activeTab === 'past'
              ? 'border-primary'
              : isDark
                ? 'border-transparent'
                : 'border-transparent'
          }`}>
          <Text
            className={`text-center text-sm font-bold uppercase tracking-wider ${
              activeTab === 'past' ? 'text-primary' : isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
            Past
          </Text>
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-24">
        {activeTab === 'active' ? (
          <View className="space-y-4 p-4">
            {activeOrders.map((order) => (
              <Pressable
                key={order.id}
                onPress={() => router.push(`/(customer)/orders/tracking?orderId=${order.id}`)}
                className={`flex-col gap-4 rounded-2xl border p-4 shadow-sm ${
                  isDark ? 'border-slate-800 bg-slate-800/50' : 'border-slate-100 bg-white'
                }`}>
                <View className="flex-row items-start justify-between">
                  <View className="flex-1">
                    <Text className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                      {order.bakery}
                    </Text>
                    <Text
                      className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {order.date}
                    </Text>
                  </View>
                  <View className="inline-flex flex-row items-center gap-1 rounded-full bg-blue-100 px-2 py-1 dark:bg-blue-900/30">
                    <Text className="text-sm font-bold text-blue-700 dark:text-blue-400">
                      {order.status}
                    </Text>
                  </View>
                </View>
                <View className="border-t border-slate-800/20 pt-3 dark:border-slate-700">
                  <Text className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {order.items}
                  </Text>
                  <View className="mt-3 flex-row items-center justify-between">
                    <Text className="font-bold text-primary">{order.amount}</Text>
                    <Pressable className="flex-row items-center gap-1 rounded-lg bg-primary/10 px-3 py-1.5 hover:bg-primary/20">
                      <Text className="text-sm font-bold text-primary">Track Order</Text>
                      <Text className="text-primary">→</Text>
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          <View className="space-y-3 p-4">
            {pastOrders.map((order) => (
              <Pressable
                key={order.id}
                className={`flex-col gap-3 rounded-xl border p-4 shadow-sm ${
                  isDark ? 'border-slate-800 bg-slate-800/50' : 'border-slate-100 bg-white'
                }`}>
                <View className="flex-row items-start justify-between">
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2">
                      <Text
                        className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                        Order #{order.id}
                      </Text>
                      {order.status === 'Delivered' && (
                        <View className="inline-flex rounded-full bg-green-100 px-2 py-0.5 dark:bg-green-900/30">
                          <Text className="text-[10px] font-bold uppercase tracking-wider text-green-700 dark:text-green-400">
                            ✓ Delivered
                          </Text>
                        </View>
                      )}
                      {order.status === 'Cancelled' && (
                        <View className="inline-flex rounded-full bg-red-100 px-2 py-0.5 dark:bg-red-900/30">
                          <Text className="text-[10px] font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
                            Cancelled
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text
                      className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {order.bakery} • {order.date}
                    </Text>
                  </View>
                  <Text className="font-bold text-primary">{order.amount}</Text>
                </View>
                <View className="flex-row gap-2">
                  <Pressable className="flex-1 rounded-lg border border-primary/30 py-2 hover:bg-primary/5">
                    <Text className="text-center text-sm font-bold text-primary">Reorder</Text>
                  </Pressable>
                  <Pressable className="flex-1 rounded-lg border border-slate-300 py-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                    <Text
                      className={`text-center text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Details
                    </Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View
        className={`fixed bottom-0 left-0 right-0 mx-auto max-w-md border-t ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'} px-4 pb-6 pt-2`}>
        <View className="flex-row items-center justify-around">
          <Pressable
            onPress={() => router.push('/(customer)/home')}
            className="flex-col items-center gap-1">
            <Text className="text-2xl">🏠</Text>
            <Text className="text-xs font-medium uppercase tracking-tighter text-primary">
              Home
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(customer)/restaurants/products')}
            className="flex-col items-center gap-1">
            <Text className="text-2xl">📋</Text>
            <Text
              className={`text-xs font-medium uppercase tracking-tighter ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Menu
            </Text>
          </Pressable>
          <Pressable className="flex-col items-center gap-1">
            <Text className="text-2xl">📦</Text>
            <Text
              className={`text-xs font-medium uppercase tracking-tighter ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Orders
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(customer)/profile')}
            className="flex-col items-center gap-1">
            <Text className="text-2xl">👤</Text>
            <Text
              className={`text-xs font-medium uppercase tracking-tighter ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Profile
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
