import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, ClipboardList, UtensilsCrossed } from 'lucide-react-native';

const tabs = ['Incoming (4)', 'Preparing', 'Completed'];

const orders = [
  {
    id: '1',
    customer: 'Abebe Kebede',
    orderNo: '#ORD-2849',
    summary: '2x Chocolate Cake, 1x Butter Croissant',
    total: '$45.00',
  },
  {
    id: '2',
    customer: 'Sara Tadesse',
    orderNo: '#ORD-2850',
    summary: '1x Red Velvet Special Cake',
    total: '$22.50',
  },
  {
    id: '3',
    customer: 'Dawit Belay',
    orderNo: '#ORD-2851',
    summary: '4x Glazed Donuts, 1x Black Coffee',
    total: '$18.25',
  },
];

export default function VendorOrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex-row items-center justify-between border-b border-border px-4 py-3">
            <View className="h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ClipboardList size={18} color="#ec5b13" />
            </View>
            <View className="flex-1 items-center">
              <Text className="text-lg font-bold text-foreground">Adama Bakery</Text>
              <Text className="text-xs font-semibold text-primary">Order Management</Text>
            </View>
            <Pressable className="relative h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Bell size={18} color="#6b7280" />
              <View className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="border-b border-border px-4">
            <View className="flex-row gap-6">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <Pressable
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    className={`border-b-2 pb-3 pt-4 ${isActive ? 'border-primary' : 'border-transparent'}`}>
                    <Text
                      className={`text-sm font-bold uppercase ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                      {tab}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>

          <View className="px-4 py-4 pb-8">
            {orders.map((order) => (
              <Pressable
                key={order.id}
                onPress={() => router.push(`/(vendor)/orders/${order.id}`)}
                className="mb-4 rounded-xl border border-border bg-card p-4">
                <View className="mb-3 flex-row items-center gap-3">
                  <View className="h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                    <UtensilsCrossed size={20} color="#ec5b13" />
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-start justify-between">
                      <Text className="text-base font-bold text-foreground">{order.customer}</Text>
                      <Text className="rounded bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
                        {order.orderNo}
                      </Text>
                    </View>
                    <Text className="mt-1 text-sm text-muted-foreground">
                      Total: <Text className="font-bold text-primary">{order.total}</Text>
                    </Text>
                  </View>
                </View>

                <View className="rounded-lg bg-muted p-3">
                  <Text className="text-sm text-foreground">
                    <Text className="font-semibold">Order: </Text>
                    {order.summary}
                  </Text>
                </View>

                <View className="mt-3 flex-row gap-2">
                  <Pressable className="flex-1 items-center rounded-xl bg-primary py-3">
                    <Text className="text-sm font-bold text-white">Accept Order</Text>
                  </Pressable>
                  <Pressable className="flex-1 items-center rounded-xl border border-primary py-3">
                    <Text className="text-sm font-bold text-primary">Decline</Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
