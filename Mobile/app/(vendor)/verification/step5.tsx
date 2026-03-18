import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OwnerVerificationStep5Screen() {
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* TopAppBar */}
        <View className="flex-row items-center justify-between p-4 pb-2">
          <Pressable
            onPress={() => router.back()}
            className="flex h-12 w-12 shrink-0 items-center justify-start text-slate-900 dark:text-slate-100">
            <Text className="text-2xl">←</Text>
          </Pressable>
          <Text className="flex-1 text-lg font-bold leading-tight text-slate-900 dark:text-slate-100">
            Owner Verification
          </Text>
        </View>

        {/* Progress Section */}
        <View className="flex-col gap-3 p-4">
          <View className="flex-row items-center justify-between gap-6">
            <Text className="text-base font-medium leading-normal text-slate-700 dark:text-slate-300">
              Step 5 of 5
            </Text>
            <Text className="text-sm font-bold leading-normal text-primary">100%</Text>
          </View>
          <View className="h-2 w-full rounded-full bg-primary/20">
            <View className="h-2 rounded-full bg-primary" />
          </View>
        </View>

        <Text className="px-4 pb-2 pt-5 text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
          Review & Submit
        </Text>
        <Text className="mb-6 px-4 text-sm text-slate-600 dark:text-slate-400">
          Please verify all information before submitting your application.
        </Text>

        {/* Information Summary Sections */}
        <View className="flex-col gap-1 px-4">
          {/* Bakery Info */}
          <View className="mb-4 rounded-xl border border-primary/10 bg-white p-4 dark:bg-slate-800/40">
            <View className="mb-3 flex-row items-center gap-2">
              <Text className="text-xl text-primary">🏪</Text>
              <Text className="text-base font-bold leading-tight text-slate-900 dark:text-slate-100">
                Bakery Information
              </Text>
            </View>
            <View className="space-y-3">
              <View className="flex-row justify-between gap-x-6 border-b border-primary/5 pb-2">
                <Text className="text-sm font-normal text-slate-500 dark:text-slate-400">
                  Bakery Name
                </Text>
                <Text className="text-right text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Adama Bakery
                </Text>
              </View>
              <View className="flex-row justify-between gap-x-6 border-b border-primary/5 pb-2">
                <Text className="text-sm font-normal text-slate-500 dark:text-slate-400">
                  Owner Name
                </Text>
                <Text className="text-right text-sm font-semibold text-slate-900 dark:text-slate-100">
                  John Doe
                </Text>
              </View>
              <View className="flex-row justify-between gap-x-6">
                <Text className="text-sm font-normal text-slate-500 dark:text-slate-400">
                  Address
                </Text>
                <Text className="text-right text-sm font-semibold text-slate-900 dark:text-slate-100">
                  123 Wheat St, Addis Ababa
                </Text>
              </View>
            </View>
          </View>

          {/* Documents */}
          <View className="mb-4 rounded-xl border border-primary/10 bg-white p-4 dark:bg-slate-800/40">
            <View className="mb-3 flex-row items-center gap-2">
              <Text className="text-xl text-primary">📄</Text>
              <Text className="text-base font-bold leading-tight text-slate-900 dark:text-slate-100">
                Uploaded Documents
              </Text>
            </View>
            <View className="space-y-3">
              <View className="flex-row items-center justify-between rounded-lg bg-background p-2 dark:bg-background/50">
                <View className="flex-row items-center gap-3">
                  <Text className="text-lg">🖼️</Text>
                  <Text className="text-sm text-slate-700 dark:text-slate-300">
                    bakery_facade.jpg
                  </Text>
                </View>
                <Text className="text-lg">✅</Text>
              </View>
              <View className="flex-row items-center justify-between rounded-lg bg-background p-2 dark:bg-background/50">
                <View className="flex-row items-center gap-3">
                  <Text className="text-lg">📋</Text>
                  <Text className="text-sm text-slate-700 dark:text-slate-300">
                    business_license_2024.pdf
                  </Text>
                </View>
                <Text className="text-lg">✅</Text>
              </View>
            </View>
          </View>

          {/* Location Preview */}
          <View className="mb-6">
            <View className="mb-3 flex-row items-center gap-2">
              <Text className="text-xl text-primary">📍</Text>
              <Text className="text-base font-bold leading-tight text-slate-900 dark:text-slate-100">
                Mapped Location
              </Text>
            </View>
            <View className="relative h-32 w-full overflow-hidden rounded-xl border border-primary/20">
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOa6l46U5bEO-o3D3gBg7ChQOBV4JxdRn1c8-zal-fhpTxOEA5L5nWznHpMIKMr-EOwOnboSIpkFEMoTJDiyE1pQ0_q3UcLuuZ5YSXbgWtrB0sJ62PXELG6qQV2y9kyQeiWA1nF3piVHmQDEs5HYzxxEaWQwwlm9h7whfZZ9RZ3m6nco4RSZWjraKhsraxnave-cJgZCFLaaPYmZxgpPOGjCV3VBxWsgLdzUHJ6bc22U2RnjtTCl_N6cX5TlfmoVETPxubKkXvEYc',
                }}
                className="h-full w-full object-cover"
              />
            </View>
          </View>

          {/* T&C Section */}
          <View className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <View className="cursor-pointer flex-row items-start gap-3">
              <Pressable
                onPress={() => setTermsAccepted(!termsAccepted)}
                className={`mt-1 h-5 w-5 items-center justify-center rounded border ${termsAccepted ? 'border-primary bg-primary' : 'border-primary bg-transparent'}`}>
                {termsAccepted && <Text className="text-white">✓</Text>}
              </Pressable>
              <Text className="flex-1 text-sm leading-tight text-slate-700 dark:text-slate-300">
                I confirm that all information provided is accurate and I agree to the{' '}
                <Text className="font-medium text-primary underline">Terms and Conditions</Text> of
                the verification process.
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-col gap-3 px-4 pb-10">
          <Pressable
            onPress={() => router.push('/(vendor)/verification/success')}
            className="w-full rounded-xl bg-primary py-4 font-bold text-white shadow-lg transition-colors hover:bg-primary/90">
            <Text className="text-center font-bold text-white">Submit Application</Text>
          </Pressable>
          <Pressable
            onPress={() => router.back()}
            className="w-full rounded-xl border border-primary/30 bg-transparent py-4 font-semibold text-primary transition-colors hover:bg-primary/5">
            <Text className="text-center font-semibold text-primary">Back to Edit</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
