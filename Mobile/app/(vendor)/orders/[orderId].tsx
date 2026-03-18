import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  EllipsisVertical,
  Phone,
  MessageCircle,
  Package,
  MapPin,
  Printer,
  CircleCheck,
} from 'lucide-react-native';

const items = [
  { id: '1', name: 'Dark Forest Chocolate Cake', meta: 'Size: 8 inch', qty: 1, price: '$32.00' },
  { id: '2', name: 'Vanilla Glaze Cupcakes', meta: 'Pack of 6', qty: 1, price: '$18.00' },
  {
    id: '3',
    name: 'Artisan Sourdough Loaf',
    meta: 'Freshly Baked • Sliced',
    qty: 2,
    price: '$14.00',
  },
];

export default function VendorOrderDetailScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [status, setStatus] = useState<'Received' | 'Preparing' | 'Ready'>('Preparing');

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-row items-center justify-between border-b border-border px-4 py-3">
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full">
            <ArrowLeft size={20} color="#ec5b13" />
          </Pressable>
          <View className="items-center">
            <Text className="text-lg font-bold text-foreground">Order #{orderId || '8429'}</Text>
            <Text className="text-xs font-semibold uppercase text-primary">
              Scheduled for 4:30 PM
            </Text>
          </View>
          <Pressable className="h-10 w-10 items-center justify-center rounded-full">
            <EllipsisVertical size={20} color="#6b7280" />
          </Pressable>
        </View>

        <View className="p-4">
          <Text className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Customer Information
          </Text>
          <View className="flex-row items-center gap-3 rounded-xl border border-border bg-card p-4">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Text className="text-base font-bold text-primary">SJ</Text>
            </View>
            <View className="flex-1">
              <Text className="font-bold text-foreground">Sarah Jenkins</Text>
              <Text className="text-sm text-muted-foreground">+1 (555) 012-3456</Text>
            </View>
            <Pressable className="h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Phone size={16} color="#ec5b13" />
            </Pressable>
            <Pressable className="h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <MessageCircle size={16} color="#ec5b13" />
            </Pressable>
          </View>
        </View>

        <View className="px-4">
          <Text className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Order Status
          </Text>
          <View className="flex-row rounded-xl bg-muted p-1">
            {(['Received', 'Preparing', 'Ready'] as const).map((s) => (
              <Pressable
                key={s}
                onPress={() => setStatus(s)}
                className={`flex-1 items-center rounded-lg py-2 ${status === s ? 'bg-primary' : ''}`}>
                <Text
                  className={`text-sm font-bold ${status === s ? 'text-white' : 'text-muted-foreground'}`}>
                  {s}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="px-4 py-6">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Order Items (3)
            </Text>
            <Text className="rounded bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
              Paid
            </Text>
          </View>

          {items.map((item) => (
            <View key={item.id} className="mb-3 rounded-xl border border-border bg-card p-3">
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pr-3">
                  <Text className="font-bold text-foreground">{item.name}</Text>
                  <Text className="mt-1 text-xs text-muted-foreground">{item.meta}</Text>
                  <View className="mt-2 flex-row items-center gap-1">
                    <Package size={14} color="#ec5b13" />
                    <Text className="text-xs font-bold text-primary">{item.qty} unit</Text>
                  </View>
                </View>
                <Text className="font-bold text-foreground">{item.price}</Text>
              </View>
            </View>
          ))}
        </View>

        <View className="rounded-t-3xl border-t border-border bg-muted p-4">
          <View className="mb-5 gap-2">
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">Subtotal</Text>
              <Text className="text-sm font-semibold text-foreground">$64.00</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">Delivery Fee</Text>
              <Text className="text-sm font-semibold text-foreground">$5.50</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">Tax</Text>
              <Text className="text-sm font-semibold text-foreground">$2.50</Text>
            </View>
            <View className="mt-1 flex-row justify-between border-t border-border pt-2">
              <Text className="font-bold text-foreground">Total Price</Text>
              <Text className="text-lg font-black text-primary">$72.00</Text>
            </View>
          </View>

          <Text className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Delivery Address
          </Text>
          <View className="mb-4 flex-row items-start gap-2 rounded-xl border border-border bg-card p-3">
            <MapPin size={16} color="#ec5b13" style={{ marginTop: 2 }} />
            <View>
              <Text className="text-sm font-bold text-foreground">Home Office</Text>
              <Text className="text-xs text-muted-foreground">
                452 Baker Street, Apt 4B, London, UK
              </Text>
            </View>
          </View>

          <View className="flex-row gap-3 pb-8">
            <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-card py-3">
              <Printer size={16} color="#6b7280" />
              <Text className="font-semibold text-foreground">Print</Text>
            </Pressable>
            <Pressable className="flex-[1.5] flex-row items-center justify-center gap-2 rounded-xl bg-primary py-3">
              <CircleCheck size={16} color="#fff" />
              <Text className="font-bold text-white">Confirm Picked Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
