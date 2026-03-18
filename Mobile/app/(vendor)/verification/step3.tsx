import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';

export default function OwnerVerificationStep3Screen() {
  const router = useRouter();
  const [imageUploaded, setImageUploaded] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Top Navigation */}
        <View className="flex-row items-center justify-between p-4 pb-2">
          <Pressable
            onPress={() => router.back()}
            className="flex h-12 w-12 shrink-0 items-center text-slate-900 dark:text-slate-100">
            <ArrowLeft size={20} color="#ec5b13" />
          </Pressable>
          <Text className="flex-1 text-lg font-bold leading-tight text-slate-900 dark:text-slate-100">
            Owner Verification
          </Text>
        </View>

        {/* Progress Section */}
        <View className="flex-col gap-3 p-4">
          <View className="flex-row items-end justify-between gap-6">
            <View>
              <Text className="text-sm font-bold uppercase tracking-wider text-primary">
                Step 3 of 5
              </Text>
              <Text className="text-base font-medium leading-normal text-slate-900 dark:text-slate-100">
                Business Branding & Identity
              </Text>
            </View>
            <Text className="text-sm font-normal leading-normal text-slate-600 dark:text-slate-400">
              60%
            </Text>
          </View>
          <View className="h-2 w-full overflow-hidden rounded-full bg-primary/20">
            <View className="h-full w-3/5 rounded-full bg-primary" />
          </View>
        </View>

        {/* Main Content */}
        <View className="flex-1 px-4 py-6">
          <Text className="pb-2 text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
            Business Branding & Identity
          </Text>
          <Text className="pb-6 text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
            Please upload your company logo or a photo of your storefront. This helps customers
            recognize Adama Bakery.
          </Text>

          <View className="space-y-6">
            {/* Upload Section */}
            <View>
              <Text className="pb-4 text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
                Company Image
              </Text>

              {/* Upload Dropzone */}
              <Pressable className="flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 hover:bg-primary/10">
                <View className="mb-4 items-center justify-center rounded-full bg-primary/20 p-4 text-primary">
                  <Text className="text-4xl">☁️</Text>
                </View>
                <Text className="font-semibold text-slate-900 dark:text-slate-100">
                  Upload an image
                </Text>
                <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  PNG, JPG or WEBP up to 10MB
                </Text>
              </Pressable>
            </View>

            {/* Preview Section */}
            {imageUploaded && (
              <View className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800/50">
                <View className="mb-3 flex-row items-center justify-between">
                  <Text className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Preview
                  </Text>
                  <Pressable className="flex-row items-center gap-1 text-sm font-semibold text-primary">
                    <Text className="text-lg">✏️</Text>
                    <Text>Change</Text>
                  </Pressable>
                </View>
                <View className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700">
                  <Image
                    source={{
                      uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9frYBvxjDYo6szYEp6odvjOa752Jsi-L3O0W0vwWh0HLeHbFa1tERb-t6oU_Xy9wBfdMMPAKL2IKjj-VgqTtDB9Be6QPHdVtGzqI1_tkEJpswQ0mWUBzh4oUqDlcAEKhY7iVzYBRir3vNo-AIULVuIx6tHV7_2lHRISfAZGJ3px2Tv40ADTmmH7SaoihZNsG9f13OJvA0yTH-GnVdyRJC7Uj4C7d82FVXB2SoZLXBwZQNhnY8IgmRYXS0uWaBLVJVLUxflySj20I',
                    }}
                    className="h-full w-full object-cover"
                  />
                </View>
                <View className="mt-3 flex-row items-center gap-3">
                  <View className="flex items-center justify-center rounded bg-primary/20 p-2 text-primary">
                    <Text className="text-base">🖼️</Text>
                  </View>
                  <View className="min-w-0 flex-1">
                    <Text className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                      adama_bakery_facade.jpg
                    </Text>
                    <Text className="text-xs uppercase text-slate-500 dark:text-slate-400">
                      image/jpeg • 2.4 MB
                    </Text>
                  </View>
                  <Pressable className="text-slate-400 hover:text-red-500">
                    <Text className="text-lg">🗑️</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View className="sticky bottom-0 border-t border-slate-200 bg-background p-4 dark:border-slate-800">
        <View className="flex-row gap-3">
          <Pressable
            onPress={() => router.back()}
            className="flex-1 rounded-xl border border-primary px-4 py-3 font-bold text-primary hover:bg-primary/5">
            <Text className="text-center font-bold text-primary">Back</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(vendor)/verification/step4')}
            className="flex-[2] flex-row items-center justify-center rounded-xl bg-primary px-4 py-3 font-bold text-white shadow-lg">
            <Text className="font-bold text-white">Next Step</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
