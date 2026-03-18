import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';

export default function OwnerVerificationStep2Screen() {
  const router = useRouter();
  const [autoDetect, setAutoDetect] = useState(true);
  const [address, setAddress] = useState({
    street: '',
    building: '',
    postal: '',
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Top Navigation */}
        <View className="flex-row items-center justify-between border-b border-primary/10 p-4 pb-2">
          <Pressable
            onPress={() => router.back()}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-slate-900 hover:bg-primary/10 dark:text-white">
            <ArrowLeft size={20} color="#ec5b13" />
          </Pressable>
          <Text className="flex-1 text-center text-lg font-bold leading-tight text-slate-900 dark:text-white">
            Owner Verification
          </Text>
        </View>

        {/* Progress Section */}
        <View className="flex-col gap-3 p-4">
          <View className="flex-row items-center justify-between gap-6">
            <Text className="text-base font-semibold leading-normal text-slate-900 dark:text-white">
              Step 2: Location & Address
            </Text>
            <Text className="text-sm font-bold leading-normal text-primary">40% Complete</Text>
          </View>
          <View className="h-2 w-full overflow-hidden rounded-full bg-primary/20">
            <View className="h-full w-2/5 rounded-full bg-primary" />
          </View>
        </View>

        {/* Main Content */}
        <View className="mx-auto w-full max-w-2xl flex-1">
          <Text className="tracking-light px-4 pb-2 pt-5 text-left text-2xl font-bold leading-tight text-slate-900 dark:text-white">
            Bakery Location
          </Text>

          {/* Auto Detection Toggle */}
          <View className="p-4">
            <View className="flex-1 flex-col items-start justify-between gap-4 rounded-xl border border-primary/20 bg-white p-5 shadow-sm dark:bg-primary/5">
              <View className="flex-col gap-1">
                <View className="flex-row items-center gap-2">
                  <Text className="text-base font-bold leading-tight text-slate-900 dark:text-white">
                    Automatic Location Detection
                  </Text>
                  <Text className="animate-pulse text-sm text-primary">📍</Text>
                </View>
                <Text className="text-sm font-normal leading-normal text-slate-600 dark:text-primary/70">
                  Automatically find your bakery's coordinates for faster verification.
                </Text>
              </View>
              <Pressable
                onPress={() => setAutoDetect(!autoDetect)}
                className={`h-7 w-12 rounded-full border-none p-0.5 transition-all ${
                  autoDetect ? 'justify-end bg-primary' : 'bg-slate-300 dark:bg-primary/20'
                }`}>
                <View className="h-6 w-6 rounded-full bg-white shadow-md" />
              </Pressable>
            </View>
          </View>

          {/* Location Data Display */}
          <View className="px-4 py-2">
            <View className="space-y-4 rounded-xl border border-primary/10 bg-white p-4 dark:bg-primary/10">
              <View className="flex-row items-center gap-2 border-b border-primary/10 pb-2">
                <Text className="text-lg text-primary">📍</Text>
                <Text className="font-bold text-slate-900 dark:text-white">Location Data</Text>
              </View>
              <View className="grid grid-cols-1 gap-4">
                <View className="space-y-1">
                  <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-primary/60">
                    Latitude
                  </Text>
                  <Text className="dark:bg-background-dark rounded bg-slate-100 p-2 font-mono text-sm text-slate-900 dark:text-slate-100">
                    40.7128° N
                  </Text>
                </View>
                <View className="space-y-1">
                  <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-primary/60">
                    Longitude
                  </Text>
                  <Text className="dark:bg-background-dark rounded bg-slate-100 p-2 font-mono text-sm text-slate-900 dark:text-slate-100">
                    74.0060° W
                  </Text>
                </View>
                <View className="space-y-1">
                  <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-primary/60">
                    City
                  </Text>
                  <Text className="dark:bg-background-dark rounded bg-slate-100 p-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                    Addis Ababa
                  </Text>
                </View>
                <View className="space-y-1">
                  <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-primary/60">
                    Country
                  </Text>
                  <Text className="dark:bg-background-dark rounded bg-slate-100 p-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                    Ethiopia
                  </Text>
                </View>
              </View>
              <View className="space-y-1">
                <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-primary/60">
                  Formatted Address
                </Text>
                <Text className="dark:bg-background-dark rounded bg-slate-100 p-3 text-sm italic text-slate-900 dark:text-slate-100">
                  123 Meskel Square, Kirkos Sub-city, Addis Ababa, Ethiopia
                </Text>
              </View>
              <Pressable className="flex-row items-center gap-2 text-primary hover:underline">
                <Text className="text-lg">🗺️</Text>
                <Text className="text-sm font-medium text-primary">View on Google Maps</Text>
              </Pressable>
            </View>
          </View>

          {/* Manual Entry Section */}
          <View className="px-4 py-6">
            <View className="mb-4 flex-row items-center gap-2">
              <Text className="text-lg font-bold leading-tight text-slate-900 dark:text-white">
                Manual Address Fallback
              </Text>
              <View className="h-px flex-1 bg-primary/10" />
            </View>
            <View className="grid grid-cols-1 gap-4">
              <View className="flex-col gap-2">
                <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Street Address
                </Text>
                <TextInput
                  placeholder="e.g. Churchill Ave"
                  className="dark:bg-background-dark h-10 w-full rounded-lg border border-primary/20 bg-white px-3 text-slate-900 dark:text-slate-100"
                  placeholderTextColor="#999"
                />
              </View>
              <View className="flex-row gap-4">
                <View className="flex-1 flex-col gap-2">
                  <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Building / Floor
                  </Text>
                  <TextInput
                    placeholder="Optional"
                    className="dark:bg-background-dark h-10 w-full rounded-lg border border-primary/20 bg-white px-3 text-slate-900 dark:text-slate-100"
                    placeholderTextColor="#999"
                  />
                </View>
                <View className="flex-1 flex-col gap-2">
                  <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Postal Code
                  </Text>
                  <TextInput
                    placeholder="1000"
                    className="dark:bg-background-dark h-10 w-full rounded-lg border border-primary/20 bg-white px-3 text-slate-900 dark:text-slate-100"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Map Preview */}
          <View className="px-4 pb-10">
            <View className="group relative h-48 w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-primary/20">
              <View className="absolute inset-0 flex-row items-center justify-center bg-primary/5">
                <Text className="text-4xl opacity-40">🗺️</Text>
              </View>
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCogcc4KMRaE6sRB_egxtXKFliCmYhHccprxNUriyeBARd0LX8OlpfoKJ0UEuhmG6mjYWMd7Im7F9Lt2bTJpgy9C5bAErbZobvASxY4hZgkDuQV2Mgq0ZHCh4wRXnzy6szshy4tCnIlC15-QCKBFv37J3uCkIqR9QlmiV09SQmW0ZjOyEzx2OGCfYdg1Y-XlNyj5DXG286hncC9JX6frq7eobZ3087lXgWyQofEjqx4hcYSolbjb6gHasaIR37tVXCuGvJ22Yr6v0I',
                }}
                className="h-full w-full object-cover opacity-80"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View className="dark:bg-background-dark sticky bottom-0 border-t border-primary/10 bg-white p-4">
        <View className="mx-auto max-w-2xl flex-row gap-4">
          <Pressable
            onPress={() => router.back()}
            className="flex-1 rounded-xl border border-primary px-4 py-3 font-bold text-primary hover:bg-primary/5">
            <Text className="text-center font-bold text-primary">Back</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(vendor)/verification/step3')}
            className="flex-[2] flex-row items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-white shadow-lg hover:bg-primary/90">
            <Text className="font-bold text-white">Next Step</Text>
            <Text className="text-lg">→</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
