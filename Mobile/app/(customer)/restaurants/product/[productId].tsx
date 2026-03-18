import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context'

export default function ProductDetailsScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const { productId, name, price } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);

  const productDetails = {
    id: productId || '1',
    name: (name as string) || 'Red Velvet Special',
    price: (price as string) || '$45.00',
    rating: 4.9,
    badge: 'Premium Selection',
    description:
      'A rich, velvety cocoa-infused cake layered with our signature Madagascar vanilla cream cheese frosting and topped with delicate red velvet crumbs. Handcrafted daily in our bakery using premium organic ingredients. Perfect for celebrations, anniversaries, or a truly decadent treat for your evening.',
    specs: [
      { icon: '⏱️', label: 'Prep Time', value: '2 Hours' },
      { icon: '🌿', label: 'Organic', value: '100% Nat.' },
      { icon: '🍰', label: 'Serves', value: '8-10 People' },
    ],
    image: require('@/assets/images/placeholder.png'),
  };

  return (
    <SafeAreaView
      className={`relative flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
      {/* Header */}
      <View
        className={`sticky top-0 z-50 flex-row items-center justify-between border-b ${isDark ? 'bg-background-dark border-primary/10' : 'bg-background-light border-primary/10'} p-4 pb-2`}>
        <Pressable
          className="flex size-12 items-center justify-center"
          onPress={() => router.back()}>
          <Text className="text-3xl text-primary">←</Text>
        </Pressable>
        <Text
          className={`flex-1 text-center text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
          Product Detail
        </Text>
        <Pressable className="flex size-12 items-center justify-center rounded-xl hover:bg-primary/10">
          <Text className="text-2xl text-primary">📤</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-32">
        {/* Product Image */}
        <View className="bg-primary/10">
          <Image source={productDetails.image} className="h-96 w-full bg-slate-200" />
        </View>

        {/* Product Info */}
        <View className="px-4 pt-6">
          {/* Badge and Title */}
          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              <View className="mb-2 inline-flex rounded bg-primary/20 px-2 py-1">
                <Text className="text-xs font-bold uppercase tracking-wider text-primary">
                  {productDetails.badge}
                </Text>
              </View>
              <Text
                className={`text-3xl font-bold leading-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {productDetails.name}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Text className="text-amber-500">⭐</Text>
              <Text className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {productDetails.rating}
              </Text>
            </View>
          </View>

          {/* Price and Quantity */}
          <View className="mt-4 flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-primary">{productDetails.price}</Text>
            <View className="flex-row items-center rounded-full border border-primary/20 bg-primary/10 p-1">
              <Pressable
                className="bg-background-light dark:bg-background-dark flex h-8 w-8 items-center justify-center rounded-full shadow-sm"
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}>
                <Text className="text-sm font-bold text-primary">−</Text>
              </Pressable>
              <Text
                className={`flex-1 px-4 text-center font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {quantity}
              </Text>
              <Pressable
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-sm"
                onPress={() => setQuantity(quantity + 1)}>
                <Text className="text-sm font-bold text-white">+</Text>
              </Pressable>
            </View>
          </View>

          {/* Description */}
          <View className="mt-8">
            <Text className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Description
            </Text>
            <Text
              className={`mt-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {productDetails.description}
            </Text>
          </View>

          {/* Specs Grid */}
          <View className="mt-8 flex-row gap-4">
            {productDetails.specs.map((spec, index) => (
              <View
                key={index}
                className={`flex-1 rounded-xl border p-3 ${isDark ? 'border-primary/10 bg-primary/5' : 'border-primary/10 bg-primary/5'}`}>
                <View className="mb-1 flex-row items-center gap-1">
                  <Text className="text-xl">{spec.icon}</Text>
                </View>
                <Text
                  className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {spec.label}
                </Text>
                <Text
                  className={`text-sm font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {spec.value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer Action Buttons */}
      <View
        className={`fixed bottom-0 left-0 right-0 flex-row gap-4 border-t ${isDark ? 'bg-background-dark/80 border-primary/10' : 'bg-background-light/80 border-primary/10'} p-4 backdrop-blur-md`}>
        <Pressable className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-primary/30 bg-transparent">
          <Text className="text-2xl text-primary">❤️</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/(customer)/cart')}
          className="flex-1 flex-row items-center justify-center gap-3 rounded-xl bg-primary shadow-lg shadow-primary/30">
          <Text className="text-2xl text-white">🛒</Text>
          <Text className="font-bold text-white">Add to Cart - {productDetails.price}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
