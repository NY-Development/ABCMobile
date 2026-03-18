import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Sparkles, MessageCircle, BarChart3 } from 'lucide-react-native';

export default function VendorSubscriptionScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center px-4 py-3">
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full">
            <ArrowLeft size={20} color="#ec5b13" />
          </Pressable>
          <Text className="flex-1 text-center text-lg font-bold text-foreground">Become Pro</Text>
          <View className="w-10" />
        </View>

        <View className="px-4">
          <View className="overflow-hidden rounded-xl bg-primary/10 p-6">
            <Text className="mb-2 w-20 rounded-full bg-primary px-3 py-1 text-center text-xs font-bold text-white">
              EXCLUSIVE
            </Text>
            <Text className="text-3xl font-black text-foreground">Adama Bakery Pro</Text>
          </View>
        </View>

        <View className="px-4 pt-5">
          <Text className="text-center text-2xl font-black text-foreground">
            Boost Your Bakery Reach
          </Text>
          <Text className="mt-2 text-center text-sm text-muted-foreground">
            Unlock professional tools to grow your business and reach more cake lovers.
          </Text>
        </View>

        <View className="px-6 py-5">
          {['Featured on landing page', 'Priority search listing', 'Promoted products'].map((b) => (
            <View key={b} className="flex-row items-center border-b border-border py-3">
              <View className="mr-3 h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                <Check size={14} color="#ec5b13" />
              </View>
              <Text className="font-medium text-foreground">{b}</Text>
            </View>
          ))}
        </View>

        <View className="px-4 pb-6">
          <View className="rounded-2xl border-2 border-primary bg-card p-6">
            <View className="mb-4 flex-row items-start justify-between">
              <View>
                <Text className="text-xs font-black uppercase tracking-widest text-primary">
                  Best Value
                </Text>
                <Text className="text-xl font-bold text-foreground">Pro Plan</Text>
              </View>
              <View className="items-end">
                <Text className="text-4xl font-black text-foreground">$19.99</Text>
                <Text className="text-sm font-bold text-muted-foreground">/mo</Text>
              </View>
            </View>

            <View className="mb-5 gap-3">
              <View className="flex-row items-center gap-2">
                <Sparkles size={18} color="#ec5b13" />
                <Text className="text-sm text-foreground">Unlimited listings and galleries</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <MessageCircle size={18} color="#ec5b13" />
                <Text className="text-sm text-foreground">Direct customer messaging</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <BarChart3 size={18} color="#ec5b13" />
                <Text className="text-sm text-foreground">Advanced sales analytics</Text>
              </View>
            </View>

            <Pressable className="rounded-xl bg-primary py-4">
              <Text className="text-center text-lg font-black text-white">Subscribe Now</Text>
            </Pressable>
            <Text className="mt-3 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
              Secure checkout powered by Stripe
            </Text>
          </View>
        </View>

        <Pressable className="pb-10">
          <Text className="text-center text-sm font-semibold text-muted-foreground underline">
            Restore Purchases
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
