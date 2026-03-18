import React from 'react';
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

const stats = [
  { label: 'Total Orders', value: '1,284', change: '+12.5%', icon: ShoppingCart },
  { label: 'Revenue', value: '$12,450', change: '+8.2%', icon: Wallet },
  { label: 'Sold', value: '3,420', change: '+5.4%', icon: Cake },
  { label: 'In Progress', value: '18', change: 'Active', icon: Timer },
];

export default function VendorDashboardScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-row items-center justify-between border-b border-border bg-card px-4 py-3">
          <View className="flex-1 flex-row items-center gap-3">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Cake size={18} color="#ec5b13" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-foreground">Adama Bakery</Text>
              <Text className="text-xs font-semibold text-muted-foreground">Owner Dashboard</Text>
            </View>
          </View>
          <Pressable className="h-10 w-10 items-center justify-center rounded-xl bg-muted">
            <Bell size={18} color="#ec5b13" />
          </Pressable>
        </View>

        <View className="px-4 pb-2 pt-6">
          <Text className="text-2xl font-bold text-foreground">Good morning, Adama</Text>
          <Text className="text-sm text-muted-foreground">
            Here's what is happening with your bakery today.
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-3 px-4 py-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <View
                key={item.label}
                className="w-[48%] rounded-xl border border-border bg-card p-4 shadow-sm">
                <View className="mb-2 flex-row items-center justify-between">
                  <Icon size={18} color="#ec5b13" />
                  <Text className="text-xs font-bold text-emerald-600">{item.change}</Text>
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
                  +15.3% than last week
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-xl font-bold text-foreground">$3,200</Text>
                <Text className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  7D
                </Text>
              </View>
            </View>

            <View className="h-40 items-center justify-center rounded-xl bg-muted">
              <Text className="text-sm font-semibold text-muted-foreground">
                Sales chart preview
              </Text>
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
              <PlusCircle size={18} color="#fff" />
              <Text className="font-bold text-white">New Order</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push('/(vendor)/menu/inventory')}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-4">
              <PackagePlus size={18} color="#ec5b13" />
              <Text className="font-bold text-foreground">Add Stock</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
