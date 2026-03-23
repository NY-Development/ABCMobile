import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useAuthStore } from '@/src/features/auth';
import { Icon } from '@/components/ui/icon';

export default function VendorSubscriptionScreen() {
  const router = useRouter();
  const { user } = useAuthStore();

  const subscription = (user as any)?.subscription;
  const isActive = Boolean(subscription?.isActive);
  const plan = subscription?.plan || 'monthly';

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center px-4 py-3">
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full"
          >
            <Icon as={ArrowLeft} size={20} className="text-primary" />
          </Pressable>
          <Text className="flex-1 text-center text-lg font-bold text-foreground">
            Subscription
          </Text>
          <View className="w-10" />
        </View>

        <View className="px-4 pt-5">
          <View className="overflow-hidden rounded-xl border border-border bg-card p-6">
            <Text className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Status
            </Text>
            <Text className="text-3xl font-black text-foreground">
              {isActive ? 'Active' : 'Inactive'}
            </Text>
            <Text className="mt-1 text-sm text-muted-foreground">
              Plan: {plan}
            </Text>
            <Text className="mt-1 text-sm text-muted-foreground">
              Start: {subscription?.startDate ? new Date(subscription.startDate).toDateString() : '—'}
            </Text>
            <Text className="mt-1 text-sm text-muted-foreground">
              End: {subscription?.endDate ? new Date(subscription.endDate).toDateString() : '—'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
