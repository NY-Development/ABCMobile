import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OwnerVerificationSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <View className="relative mx-auto w-full max-w-md flex-1 overflow-x-hidden bg-background shadow-2xl">
        {/* Top App Bar */}
        <View className="flex-row items-center justify-between border-b border-primary/10 bg-background p-4 pb-2">
          <Pressable
            onPress={() => router.back()}
            className="flex h-12 w-12 shrink-0 items-center justify-start text-slate-900 dark:text-slate-100">
            <Text className="text-2xl">←</Text>
          </Pressable>
          <Text className="flex-1 pr-12 text-center text-lg font-bold leading-tight text-slate-900 dark:text-slate-100">
            Verification
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Main Content Section */}
          <View className="flex-1 flex-col items-center px-6 pb-8 pt-10 text-center">
            {/* Hero Success Graphic */}
            <View className="relative mb-8">
              <View className="flex h-32 w-32 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                <View className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 dark:bg-primary/30">
                  <View className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg">
                    <Text className="text-4xl font-bold text-white">✓</Text>
                  </View>
                </View>
              </View>
              {/* Floating Decorative Elements */}
              <View className="absolute -right-2 -top-2 text-primary opacity-50">
                <Text className="text-3xl">🍰</Text>
              </View>
              <View className="absolute -bottom-2 -left-2 text-primary opacity-50">
                <Text className="text-3xl">🎂</Text>
              </View>
            </View>

            {/* Headers */}
            <Text className="pb-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
              Verification Application Submitted!
            </Text>
            <Text className="pb-8 text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
              Thank you for applying to join Adama Bakery & Cake. Our team will review your business
              information and documents within{' '}
              <Text className="font-bold text-primary">24-48 hours</Text>.
            </Text>

            {/* Status Card */}
            <View className="w-full">
              <View className="flex-row items-stretch justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <View className="flex-1 flex-col gap-2">
                  <View className="flex-row items-center gap-2">
                    <View className="h-2 w-2 rounded-full bg-amber-500" />
                    <Text className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Status: Pending Review
                    </Text>
                  </View>
                  <Text className="text-lg font-bold leading-tight text-slate-900 dark:text-slate-100">
                    Bakery Profile Verification
                  </Text>
                  <Text className="text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">
                    Step 5 of 5 Complete
                  </Text>
                </View>
                <View className="h-24 w-24 shrink-0 rounded-xl bg-cover bg-center bg-no-repeat" />
              </View>
            </View>

            {/* Progress Indicator Mini */}
            <View className="mt-4 h-1.5 w-full flex-row gap-1 px-1">
              <View className="flex-1 rounded-full bg-primary" />
              <View className="flex-1 rounded-full bg-primary" />
              <View className="flex-1 rounded-full bg-primary" />
              <View className="flex-1 rounded-full bg-primary" />
              <View className="flex-1 rounded-full bg-primary" />
            </View>
          </View>
        </ScrollView>

        {/* Footer Actions */}
        <View className="space-y-4 bg-background p-6">
          <Pressable
            onPress={() => router.push('/(vendor)/dashboard')}
            className="w-full flex-row items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white shadow-lg transition-all hover:bg-primary/90">
            <Text className="font-bold text-white">Go to Dashboard</Text>
            <Text className="text-lg">→</Text>
          </Pressable>
          <Pressable
            onPress={() => {}}
            className="w-full rounded-xl border-2 border-transparent bg-transparent py-2 font-semibold text-primary transition-all hover:bg-primary/5">
            <Text className="text-center font-semibold text-primary">View Application Status</Text>
          </Pressable>
        </View>

        {/* Decorative Bottom Texture */}
        <View className="h-2 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10" />
      </View>
    </SafeAreaView>
  );
}
