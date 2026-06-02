import { router } from 'expo-router';
import { View, Text, ScrollView, Pressable, Image, ActivityIndicator } from 'react-native';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetCartQuery } from '@/src/features/cart/cart.hooks';
import { usePlaceOrderMutation } from '@/src/features/orders/orders.hooks';

export default function CheckoutScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const [deliveryMethod, setDeliveryMethod] = useState('Delivery');
  const [selectedProvider, setSelectedProvider] = useState('swift');

  const { data: cart, isLoading: isCartLoading } = useGetCartQuery();
  const { mutate: placeOrder, isPending: isPlacingOrder } = usePlaceOrderMutation();

  const providers = [
    {
      id: 'swift',
      name: 'Swift Express',
      fee: 100,
      rating: 4.9,
      reviews: '120+',
      time: 'Fastest • 15-20 mins',
    },
    {
      id: 'eco',
      name: 'Eco-Cyclists',
      fee: 50,
      rating: 4.7,
      reviews: '80+',
      time: 'Eco Friendly • 25-35 mins',
    },
  ];

  const subtotal = cart?.totalPrice || 0;
  const deliveryFee = deliveryMethod === 'Delivery' ? (providers.find(p => p.id === selectedProvider)?.fee || 0) : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    if (!cart || cart.items.length === 0) return;
    const firstItem = cart.items[0];
    placeOrder({
      productId: firstItem.product._id,
      quantity: firstItem.quantity,
      deliveryOption: deliveryMethod.toLowerCase() as 'pickup' | 'delivery',
    });
  };

  if (isCartLoading) {
    return (
      <SafeAreaView className={`flex-1 items-center justify-center ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
        <ActivityIndicator size="large" color="#f97015" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className={`max-w-md flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
      {/* Top App Bar */}
      <View
        className={`sticky top-0 z-10 flex-row items-center justify-between border-b ${isDark ? 'border-slate-800' : 'border-slate-200'} bg-background-light/80 dark:bg-background-dark/80 p-4 backdrop-blur-md`}>
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => router.back()}>
            <Text className={`text-xl ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>←</Text>
          </Pressable>
          <Text className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            Checkout
          </Text>
        </View>
        <View
          className={`flex size-8 items-center justify-center rounded-full ${isDark ? 'bg-primary/10' : 'bg-primary/10'}`}>
          <Text className="text-primary">🛒</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-32">
        {/* Delivery Address Section */}
        <View className="p-4">
          <View className="mb-3 flex-row items-center gap-2">
            <Text className="text-2xl">📍</Text>
            <Text className="text-base font-bold">Delivery Address</Text>
          </View>
          <View
            className={`flex-row items-center gap-4 rounded-xl border p-4 shadow-sm ${isDark ? 'border-slate-800 bg-slate-800/50' : 'border-slate-200 bg-white'}`}>
            <View
              className={`flex size-12 items-center justify-center rounded-lg bg-primary/10`}>
              <Text className="text-2xl text-primary">🏠</Text>
            </View>
            <View className="flex-1">
              <Text
                className={`text-base font-semibold leading-normal ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                Home
              </Text>
              <Text
                className={`text-sm leading-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Adama, Ethiopia (Primary)
              </Text>
            </View>
          </View>
        </View>

        {/* Delivery Method Toggle */}
        <View className="px-4 py-2">
          <View className={`flex-row rounded-xl p-1 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
            {['Pickup', 'Delivery'].map((method) => (
              <Pressable
                key={method}
                onPress={() => setDeliveryMethod(method)}
                className={`h-10 flex-1 items-center justify-center rounded-lg transition-all ${
                  deliveryMethod === method
                    ? isDark
                      ? 'bg-slate-700 shadow-sm'
                      : 'bg-white shadow-sm'
                    : ''
                }`}>
                <Text
                  className={`truncate text-sm font-medium ${
                    deliveryMethod === method
                      ? 'font-bold text-primary'
                      : isDark
                        ? 'text-slate-400'
                        : 'text-slate-600'
                  }`}>
                  {method}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Delivery Provider Selection */}
        {deliveryMethod === 'Delivery' && (
          <View className="p-4">
            <View className="mb-3 flex-row items-center gap-2">
              <Text className="text-2xl">🛵</Text>
              <Text className="text-base font-bold">Available Couriers</Text>
            </View>
            <View className="space-y-3">
              {providers.map((provider) => (
                <Pressable
                  key={provider.id}
                  onPress={() => setSelectedProvider(provider.id)}
                  className={`flex-row items-center gap-4 rounded-xl border-2 p-4 ${
                    selectedProvider === provider.id
                      ? 'border-primary/40'
                      : isDark
                        ? 'border-slate-800'
                        : 'border-slate-200'
                  } ${isDark ? 'bg-slate-800/50' : 'bg-white'}`}>
                  <View className="size-12 rounded-full border-2 border-primary bg-primary/10 items-center justify-center">
                    <Text className="text-2xl">🛵</Text>
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-start justify-between">
                      <Text
                        className={`text-sm font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                        {provider.name}
                      </Text>
                      <Text className="font-bold text-primary">ETB {provider.fee}</Text>
                    </View>
                    <View className="mt-1 flex-row items-center gap-1">
                      <Text className="text-amber-500">⭐</Text>
                      <Text
                        className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {provider.rating} • {provider.reviews}
                      </Text>
                    </View>
                  </View>
                  {selectedProvider === provider.id && (
                    <View className="flex size-6 items-center justify-center rounded-full bg-primary">
                      <Text className="text-white text-xs">✓</Text>
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Order Summary */}
        <View
          className={`mt-2 border-t ${isDark ? 'border-slate-800 bg-slate-800/30' : 'bg-white'} p-4 pb-32`}>
          <Text
            className={`mb-4 text-base font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            Order Summary
          </Text>
          <View className="space-y-3">
            {cart?.items.map((item) => (
              <View key={item.product._id} className="flex-row items-center justify-between">
                <Text numberOfLines={1} className={`text-sm flex-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {item.product.name} (x{item.quantity})
                </Text>
                <Text
                  className={`text-sm font-medium ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  ETB {item.product.price * item.quantity}
                </Text>
              </View>
            ))}
            
            <View className="flex-row items-center justify-between">
              <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Delivery Fee
              </Text>
              <Text
                className={`text-sm font-medium ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                ETB {deliveryFee}
              </Text>
            </View>
            <View className={`my-2 h-px ${isDark ? 'border-slate-700' : 'border-slate-200'}`} />
            <View className="flex-row items-center justify-between">
              <Text className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                Total
              </Text>
              <Text className="text-xl font-extrabold text-primary">ETB {total}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Payment Bar */}
      <View
        className={`fixed bottom-0 left-0 right-0 max-w-md border-t ${isDark ? 'bg-background-dark border-slate-800' : 'border-slate-100 bg-white'} p-4`}>
        <Pressable
          onPress={handlePlaceOrder}
          disabled={isPlacingOrder}
          className={`flex-row items-center justify-center gap-2 rounded-xl bg-primary py-4 ${isPlacingOrder ? 'opacity-50' : ''}`}>
          {isPlacingOrder ? <ActivityIndicator color="white" /> : (
            <>
              <Text className="font-bold text-white">Place Order</Text>
              <Text className="text-white">→</Text>
            </>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
