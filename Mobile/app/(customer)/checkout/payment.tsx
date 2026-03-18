import { router } from 'expo-router';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentMethodScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const [selectedMethod, setSelectedMethod] = useState('mobile-money');

  const paymentMethods = [
    {
      id: 'mobile-money',
      icon: '📳',
      name: 'Mobile Money',
      description: 'Telebirr, M-Pesa, or CBE Birr',
    },
    {
      id: 'card',
      icon: '💳',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, or AMEX',
    },
    {
      id: 'cod',
      icon: '💵',
      name: 'Cash on Delivery',
      description: 'Pay when you receive your cake',
    },
  ];

  return (
    <SafeAreaView
      className={`max-w-md flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
      {/* Top App Bar */}
      <View
        className={`sticky top-0 z-10 flex-row items-center border-b ${
          isDark
            ? 'bg-background-dark/80 border-slate-800'
            : 'bg-background-light/80 border-slate-200'
        } p-4 backdrop-blur-md`}>
        <Pressable
          className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-slate-200 dark:hover:bg-slate-800"
          onPress={() => router.back()}>
          <Text className="text-xl">←</Text>
        </Pressable>
        <Text
          className={`flex-1 pr-10 text-center text-lg font-bold ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
          Checkout
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-32">
        {/* Order Summary Section */}
        <View className="p-4">
          <Text
            className={`mb-4 text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            Order Summary
          </Text>
          <View
            className={`flex-col gap-4 rounded-xl border p-4 shadow-sm ${
              isDark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-100 bg-white'
            }`}>
            <View className="mb-4 flex-row items-center gap-4">
              <Image
                source={require('@/assets/images/placeholder.png')}
                className="size-16 rounded-lg bg-primary/10"
              />
              <View className="flex-1">
                <Text className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  Chocolate Fudge Cake
                </Text>
                <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Size: 1kg • Message: Happy Birthday
                </Text>
              </View>
              <Text className="font-bold">ETB 1,200</Text>
            </View>

            <View className="space-y-3 border-t border-slate-700/50 pt-4 dark:border-slate-700">
              <View className="flex-row items-center justify-between">
                <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Subtotal
                </Text>
                <Text className="text-sm font-medium">ETB 1,200.00</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Delivery Fee
                </Text>
                <Text className="text-sm font-medium">ETB 150.00</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Service Fee
                </Text>
                <Text className="text-sm font-medium">ETB 25.00</Text>
              </View>
              <View
                className={`mt-2 border-t border-dashed border-slate-200 pt-2 dark:border-slate-700`}
              />
              <View className="flex-row items-center justify-between">
                <Text
                  className={`text-base font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  Total Amount
                </Text>
                <Text className="text-2xl font-black text-primary">ETB 1,375.00</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Method Section */}
        <View className="p-4">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className={`text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Payment Method
            </Text>
            <View className="inline-flex flex-row items-center gap-1 rounded-full bg-green-100 px-2 py-1 dark:bg-green-900/30">
              <Text className="text-lg">🔒</Text>
              <Text className="text-xs font-semibold text-green-700 dark:text-green-400">
                Secure
              </Text>
            </View>
          </View>

          <View className="flex-col gap-3">
            {paymentMethods.map((method) => (
              <Pressable
                key={method.id}
                onPress={() => setSelectedMethod(method.id)}
                className={`flex-row items-center gap-4 rounded-xl border-2 p-4 transition-all ${
                  selectedMethod === method.id
                    ? 'border-primary bg-primary/5'
                    : isDark
                      ? 'border-slate-800'
                      : 'border-slate-200'
                }`}>
                <Text className="text-2xl">{method.icon}</Text>
                <View className="flex-1">
                  <Text
                    className={`mb-1 font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {method.name}
                  </Text>
                  <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {method.description}
                  </Text>
                </View>
                {selectedMethod === method.id && (
                  <View className="flex size-5 items-center justify-center rounded-full border-2 border-primary">
                    <View className="size-2 rounded-full bg-primary" />
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* Security Badges */}
        <View className="mt-8 flex-row items-center justify-center gap-8 px-4 opacity-60">
          <View className="flex-col items-center gap-2">
            <Text className="text-4xl">✓</Text>
            <Text
              className={`text-[10px] font-bold uppercase tracking-widest ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
              Verified
            </Text>
          </View>
          <View className="flex-col items-center gap-2">
            <Text className="text-4xl">🔒</Text>
            <Text
              className={`text-[10px] font-bold uppercase tracking-widest ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
              Encrypted
            </Text>
          </View>
          <View className="flex-col items-center gap-2">
            <Text className="text-4xl">🛡️</Text>
            <Text
              className={`text-[10px] font-bold uppercase tracking-widest ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
              PCI Compliant
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Payment Action */}
      <View
        className={`fixed bottom-0 left-0 right-0 mx-auto max-w-md border-t ${
          isDark ? 'bg-background-dark border-slate-800' : 'bg-background-light border-slate-200'
        } p-4`}>
        <Pressable className="flex-row items-center justify-center gap-3 rounded-xl bg-primary py-4 shadow-lg shadow-primary/20 active:scale-95">
          <Text className="font-bold text-white">Pay Now</Text>
          <Text className="text-white">→</Text>
        </Pressable>
        <View className="mt-3 flex-row items-center justify-center gap-1">
          <Text className="text-base">ℹ️</Text>
          <Text
            className={`flex items-center justify-center gap-1 text-center text-[10px] text-slate-400 dark:text-slate-500`}>
            By clicking "Pay Now", you agree to our Terms of Service
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
