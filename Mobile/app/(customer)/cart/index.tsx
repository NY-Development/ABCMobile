import { router } from 'expo-router';
import { View, Text, ScrollView, Pressable, Image, TextInput } from 'react-native';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ShoppingCartScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const [promoCode, setPromoCode] = useState('');

  const cartItems = [
    {
      id: '1',
      name: 'Chocolate Truffle Cake',
      price: '$25.00',
      quantity: 1,
      image: require('@/assets/images/placeholder.png'),
    },
    {
      id: '2',
      name: 'Butter Croissant (Pack of 4)',
      price: '$12.00',
      quantity: 2,
      image: require('@/assets/images/placeholder.png'),
    },
    {
      id: '3',
      name: 'Red Velvet Cupcake',
      price: '$9.00',
      quantity: 3,
      image: require('@/assets/images/placeholder.png'),
    },
  ];

  const subtotal = 46.0;
  const deliveryFee = 5.0;
  const total = 51.0;

  return (
    <SafeAreaView
      className={`max-w-md flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
      {/* Top App Bar */}
      <View
        className={`sticky top-0 z-10 flex-row items-center justify-between border-b ${isDark ? 'dark:bg-background-dark/80 border-slate-800 bg-white/80' : 'border-slate-200 bg-white/80'} px-4 py-4 backdrop-blur-md`}>
        <Pressable
          className="flex items-center justify-center rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          onPress={() => router.back()}>
          <Text className="text-xl">←</Text>
        </Pressable>
        <Text
          className={`flex-1 text-center text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
          My Cart
        </Text>
        <Pressable className="flex items-center justify-center rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
          <Text className="text-xl">🗑️</Text>
        </Pressable>
      </View>

      {/* Cart Items List */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 space-y-6 px-4 py-6">
        {cartItems.map((item) => (
          <View
            key={item.id}
            className={`flex-row items-center gap-4 rounded-xl border p-3 shadow-sm ${isDark ? 'border-slate-800 bg-slate-900/40' : 'border-slate-100 bg-white'}`}>
            <Image source={item.image} className="size-20 rounded-lg bg-slate-200" />
            <View className="flex-1 justify-between">
              <View>
                <Text
                  className={`line-clamp-1 text-base font-bold leading-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {item.name}
                </Text>
                <Text className="mt-1 text-sm font-semibold text-primary">{item.price}</Text>
              </View>
              <View className="flex-row items-center gap-3 rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-800">
                <Pressable className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-primary/10">
                  <Text className="text-sm text-primary">−</Text>
                </Pressable>
                <Text className="w-4 text-center text-sm font-bold">{item.quantity}</Text>
                <Pressable className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-primary/10">
                  <Text className="text-sm text-primary">+</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}

        {/* Promo Code Section */}
        <View className="pt-4">
          <View className="flex-row gap-2">
            <TextInput
              className={`flex-1 rounded-lg border px-4 py-3 text-sm ${isDark ? 'border-slate-800 bg-slate-800 text-slate-100' : 'border-slate-200 bg-slate-100 text-slate-900'}`}
              placeholder="Promo Code"
              placeholderTextColor={isDark ? '#94a3b8' : '#cbd5e1'}
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <Pressable className="rounded-lg bg-slate-900 px-6 py-3 dark:bg-slate-700">
              <Text className="text-sm font-bold text-white">Apply</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Order Summary & Checkout */}
      <View
        className={`border-t ${isDark ? 'bg-background-dark border-slate-800' : 'border-slate-200 bg-white'} space-y-4 p-6`}>
        <View className="space-y-2">
          <View className="flex-row items-center justify-between">
            <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Subtotal
            </Text>
            <Text className={`text-sm font-medium ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              ${subtotal.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Delivery Fee
            </Text>
            <Text className={`text-sm font-medium ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              ${deliveryFee.toFixed(2)}
            </Text>
          </View>
          <View
            className={`mt-2 flex-row items-center justify-between border-t pt-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <Text className="text-base font-bold">Total</Text>
            <Text className="text-xl font-bold text-primary">${total.toFixed(2)}</Text>
          </View>
        </View>
        <Pressable
          onPress={() => router.push('/(customer)/checkout')}
          className="flex-row items-center justify-center gap-2 rounded-xl bg-primary py-4 shadow-lg shadow-primary/20 active:scale-95">
          <Text className="font-bold text-white">Proceed to Checkout</Text>
          <Text className="text-white">→</Text>
        </Pressable>
        <Text
          className={`text-center text-xs font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          Free delivery on orders above $60.00
        </Text>
      </View>
    </SafeAreaView>
  );
}
