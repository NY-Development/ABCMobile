import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TrackOrderScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const { orderId } = useLocalSearchParams();

  const steps = [
    { title: 'Order Received', time: '14:35 Today', icon: '✓', active: true },
    { title: 'In the Oven', time: '14:42 Today', icon: '🔥', active: true },
    { title: 'Ready & Picked Up', time: '15:05 Today', icon: '✓', active: true },
    { title: 'On the Way', time: 'Est. 15:20', icon: '🏍️', active: true },
    { title: 'Delivered', time: 'Est. 15:30', icon: '🏠', active: false },
  ];

  const driver = {
    name: 'Dawit Kebede',
    rating: 4.9,
    reviews: '230+',
    image: require('@/assets/images/placeholder.png'),
    vehicle: 'Red Honda - LK2024',
  };

  return (
    <SafeAreaView
      className={`max-w-md flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
      {/* Header */}
      <View
        className={`border-b ${isDark ? 'border-slate-800' : 'border-slate-200'} bg-background-light dark:bg-background-dark flex-row items-center gap-3 px-4 py-4`}>
        <Pressable onPress={() => router.back()}>
          <Text className="text-2xl">←</Text>
        </Pressable>
        <View className="flex-1">
          <Text className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            Order #{orderId || '2026-1043'}
          </Text>
          <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Track delivery status
          </Text>
        </View>
        <Pressable className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800">
          <Text className="text-xl">📞</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-24">
        {/* Map Area Placeholder */}
        <View className={`relative h-64 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
          <View className="absolute inset-0 flex items-center justify-center">
            <Text className="text-6xl">🗺️</Text>
          </View>
          <View
            className={`absolute inset-x-0 bottom-0 flex-row items-center justify-between rounded-t-2xl px-4 py-3 ${isDark ? 'bg-slate-900/80' : 'bg-white/80'} backdrop-blur-md`}>
            <View>
              <Text className="text-sm font-bold text-primary">Estimated Delivery</Text>
              <Text
                className={`text-2xl font-black ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                15:20 - 15:30
              </Text>
            </View>
            <Pressable className="flex-row items-center gap-2 rounded-lg bg-primary px-3 py-2">
              <Text className="text-white">📍</Text>
              <Text className="text-sm font-bold text-white">View Map</Text>
            </Pressable>
          </View>
        </View>

        {/* Order Summary Mini Card */}
        <View className="px-4 pb-4 pt-6">
          <View
            className={`flex-row gap-4 rounded-xl border p-3 shadow-sm ${isDark ? 'border-slate-800 bg-slate-800/50' : 'border-slate-100 bg-white'}`}>
            <Image source={driver.image} className="size-16 rounded-lg bg-slate-200" />
            <View className="flex-1 justify-between">
              <View>
                <Text className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  Your Order
                </Text>
                <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Chocolate Cake x1, Croissants x2
                </Text>
              </View>
              <Text className="font-bold text-primary">$28.50</Text>
            </View>
          </View>
        </View>

        {/* Delivery Timeline */}
        <View className="px-4 py-4">
          <Text
            className={`mb-4 text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            Delivery Progress
          </Text>
          <View className="gap-0">
            {steps.map((step, index) => (
              <View key={step.title} className="flex-row gap-4">
                {/* Timeline Line and Dot */}
                <View className="flex-col items-center gap-1">
                  <View
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      step.active ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'
                    } shadow-sm`}>
                    <Text className={`text-lg ${step.active ? 'text-white' : 'text-slate-600'}`}>
                      {step.icon}
                    </Text>
                  </View>
                  {index < steps.length - 1 && (
                    <View
                      className={`h-12 w-0.5 ${
                        step.active ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                  )}
                </View>
                {/* Step Content */}
                <View className="flex-1 justify-center pb-2">
                  <Text
                    className={`font-bold ${step.active ? 'text-primary' : isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {step.title}
                  </Text>
                  <Text
                    className={`text-sm ${
                      step.active ? 'text-primary' : isDark ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                    {step.time}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Driver Info Card */}
        <View className="px-4 py-4">
          <Text
            className={`mb-3 text-base font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            Delivery Partner
          </Text>
          <View
            className={`flex-col gap-4 rounded-2xl border p-4 shadow-sm ${isDark ? 'border-slate-800 bg-slate-800/50' : 'border-slate-100 bg-white'}`}>
            {/* Driver Header */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Image
                  source={driver.image}
                  className="size-14 rounded-full border-2 border-primary"
                />
                <View className="flex-1">
                  <Text className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {driver.name}
                  </Text>
                  <View className="mt-1 flex-row items-center gap-1">
                    <Text className="text-amber-500">⭐</Text>
                    <Text
                      className={`text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {driver.rating} • {driver.reviews} deliveries
                    </Text>
                  </View>
                </View>
              </View>
              <Pressable className="flex size-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 hover:bg-primary/20">
                <Text className="text-xl">⭐</Text>
              </Pressable>
            </View>

            {/* Vehicle Info */}
            <View
              className={`rounded-lg border-t ${isDark ? 'border-slate-700 pt-4' : 'border-slate-200 pt-4'}`}>
              <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Vehicle
              </Text>
              <Text
                className={`mt-1 font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {driver.vehicle}
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3 pt-2">
              <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 py-2.5 hover:bg-primary/10">
                <Text className="text-lg">📞</Text>
                <Text className="text-sm font-bold text-primary">Call</Text>
              </Pressable>
              <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 py-2.5 hover:bg-primary/10">
                <Text className="text-lg">💬</Text>
                <Text className="text-sm font-bold text-primary">Chat</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View
        className={`fixed bottom-0 left-0 right-0 mx-auto max-w-md border-t ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'} px-4 pb-6 pt-2`}>
        <View className="flex-row items-center justify-around">
          <Pressable
            onPress={() => router.push('/(customer)/home')}
            className="flex-col items-center gap-1">
            <Text className="text-2xl">🏠</Text>
            <Text className="text-xs font-medium uppercase tracking-tighter text-primary">
              Home
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(customer)/restaurants/products')}
            className="flex-col items-center gap-1">
            <Text className="text-2xl">📋</Text>
            <Text
              className={`text-xs font-medium uppercase tracking-tighter ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Menu
            </Text>
          </Pressable>
          <Pressable className="flex-col items-center gap-1">
            <Text className="text-2xl">📦</Text>
            <Text
              className={`text-xs font-medium uppercase tracking-tighter ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Track
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(customer)/profile')}
            className="flex-col items-center gap-1">
            <Text className="text-2xl">👤</Text>
            <Text
              className={`text-xs font-medium uppercase tracking-tighter ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Profile
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
