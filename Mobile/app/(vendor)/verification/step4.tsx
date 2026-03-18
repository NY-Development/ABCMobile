import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';

export default function OwnerVerificationStep4Screen() {
  const router = useRouter();
  const [fileSelected, setFileSelected] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Top Navigation */}
        <View className="flex-row items-center justify-between p-4 pb-2">
          <Pressable
            onPress={() => router.back()}
            className="flex h-12 w-12 shrink-0 items-center justify-start text-slate-900 dark:text-slate-100">
            <ArrowLeft size={20} color="#ec5b13" />
          </Pressable>
          <Text className="flex-1 text-lg font-bold leading-tight text-slate-900 dark:text-slate-100">
            Owner Verification
          </Text>
        </View>

        {/* Progress Section */}
        <View className="flex-col gap-3 p-4">
          <View className="flex-row items-end justify-between gap-6">
            <Text className="text-base font-medium leading-normal text-slate-700 dark:text-slate-300">
              Step 4 of 5
            </Text>
            <Text className="text-sm font-bold leading-normal text-primary">80%</Text>
          </View>
          <View className="h-2.5 w-full rounded-full bg-primary/20">
            <View className="h-2.5 w-4/5 rounded-full bg-primary" />
          </View>
        </View>

        {/* Header Content */}
        <View className="px-4 pb-2 pt-5">
          <Text className="text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
            Official Documentation
          </Text>
          <Text className="mt-2 text-base font-normal leading-normal text-slate-600 dark:text-slate-400">
            Please upload your Adama Bakery trading license to verify your business status.
          </Text>
        </View>

        {/* Upload Section */}
        <View className="space-y-6 p-4">
          <View className="flex-row items-stretch justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
            <View className="flex-[2] flex-col gap-4">
              <View className="flex-col gap-1">
                <Text className="text-lg font-bold leading-tight text-slate-900 dark:text-slate-100">
                  Trading License
                </Text>
                <Text className="text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">
                  Supported formats: PDF, PNG, JPG (Max 5MB)
                </Text>
              </View>
              <View className="flex-row flex-wrap gap-3">
                <Pressable
                  onPress={() => setFileSelected(true)}
                  className="flex h-10 min-w-[120px] flex-row items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-4 text-white">
                  <Text className="text-lg">📤</Text>
                  <Text className="truncate text-sm font-medium text-white">Upload License</Text>
                </Pressable>
              </View>
              {!fileSelected && (
                <View className="flex-row items-center gap-2 text-xs italic text-slate-500 dark:text-slate-400">
                  <Text className="text-sm">ℹ️</Text>
                  <Text>No file selected</Text>
                </View>
              )}
            </View>
            <View className="aspect-video w-full flex-row items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-100 dark:border-slate-600 dark:bg-slate-800">
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbQigdM_NbBzopoGl3RPA3phhZZBIV7r9cx2PaYpy4vshWhus1mML7eQVNS--OT4ni4YmpW_qMnxElW4veHbJG2BiPz2QwW644Rsf8s08x8u3silj4MV_UQJoo5WAAAoLdIukpIKe5UV01ejpK2fi571vIRHLqzW34kIEiQ1kDdZX9n0utQIUsSQm35rzlqL4ggSyhQFKLvM-6BUcGmZmRxHnjYvaLTK3SjIZfvzhaaCw0qlX9JyVI9FqHZCkOjR8j5iM4mEg2rmc',
                }}
                className="h-full w-full object-cover"
              />
            </View>
          </View>

          {/* PDF Toggle */}
          <View className="flex-row items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-4">
            <View className="flex-col">
              <Text className="font-semibold text-slate-900 dark:text-slate-100">
                Format Confirmation
              </Text>
              <Text className="text-sm text-slate-500 dark:text-slate-400">
                Is this document a PDF file?
              </Text>
            </View>
            <Pressable className="relative h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-slate-700">
              <View className="h-6 w-6 rounded-full bg-slate-200" />
            </Pressable>
          </View>

          {/* Additional Instructions */}
          <View className="rounded-xl border-l-4 border-primary bg-slate-100 p-4 dark:bg-slate-800/80">
            <Text className="mb-1 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Instructions
            </Text>
            <View className="ml-4 space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <Text>• Ensure all four corners of the license are visible.</Text>
              <Text>• Text must be clear and legible.</Text>
              <Text>• Expiration dates must be current.</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="sticky bottom-0 flex-row gap-4 border-t border-slate-200 bg-background p-4 dark:border-slate-800">
        <Pressable
          onPress={() => router.back()}
          className="h-12 flex-1 flex-row items-center justify-center rounded-xl border-2 border-primary font-bold text-primary hover:bg-primary/5">
          <Text className="font-bold text-primary">Back</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/(vendor)/verification/step5')}
          className="h-12 flex-[2] flex-row items-center justify-center rounded-xl bg-primary font-bold text-white shadow-lg hover:opacity-90">
          <Text className="font-bold text-white">Next Step</Text>
        </Pressable>
      </View>
      <View className="h-6" />
    </SafeAreaView>
  );
}
