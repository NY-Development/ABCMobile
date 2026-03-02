import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useThemeStore } from '../../store/themeStore';
import { ROUTES } from '../../constants/routes';
import { OrderConfirmationModal } from '../../components/ui/OrderConfirmationModal';
import type { CustomerStackParamList } from '../../types/navigation';

type Step = 'address' | 'payment' | 'review';

type Address = {
  id: string;
  label: string;
  icon: 'home' | 'briefcase' | 'home-city';
  line: string;
  phone: string;
};

type PaymentMethod = {
  id: string;
  label: string;
  icon: 'credit-card-outline' | 'wallet-outline' | 'cash';
};

const addresses: Address[] = [
  {
    id: '1',
    label: 'Home',
    icon: 'home',
    line: '123 Bole Road, Adama, Ethiopia',
    phone: '+251 91 123 4567',
  },
  {
    id: '2',
    label: 'Office',
    icon: 'briefcase',
    line: '456 Adama Industrial Park, Adama',
    phone: '+251 91 987 6543',
  },
  {
    id: '3',
    label: "Parent's House",
    icon: 'home-city',
    line: 'Kebele 04, House No. 892, Adama',
    phone: '+251 91 555 1212',
  },
];

const paymentMethods: PaymentMethod[] = [
  { id: 'card', label: 'Credit Card', icon: 'credit-card-outline' },
  { id: 'telebirr', label: 'Telebirr', icon: 'wallet-outline' },
  { id: 'cash', label: 'Cash on Delivery', icon: 'cash' },
];

export const CheckoutScreen = () => {
  const navigation = useNavigation<StackNavigationProp<CustomerStackParamList, 'Checkout'>>();
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const insets = useSafeAreaInsets();

  const [step, setStep] = useState<Step>('address');
  const [selectedAddress, setSelectedAddress] = useState('1');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [saveCard, setSaveCard] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBack = () => {
    if (step === 'review') {
      setStep('payment');
      return;
    }
    if (step === 'payment') {
      setStep('address');
      return;
    }
    navigation.goBack();
  };

  const stepMeta = {
    address: { title: 'Shipping Address', cta: 'Continue to Payment' },
    payment: { title: 'Payment Method', cta: 'Review Order' },
    review: { title: 'Order Review', cta: 'Place Order' },
  } as const;

  const stepIndex = step === 'address' ? 1 : step === 'payment' ? 2 : 3;

  const onContinue = () => {
    if (step === 'address') {
      setStep('payment');
      return;
    }
    if (step === 'payment') {
      setStep('review');
      return;
    }

    setShowConfirmation(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top', 'bottom']}>
      <OrderConfirmationModal
        visible={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onTrackOrder={() => {
          setShowConfirmation(false);
          navigation.navigate(ROUTES.Orders);
        }}
      />

      <View className="flex-1">
        <View className="z-20 bg-background-light/90 px-4 pb-2 pt-2 dark:bg-background-dark/90">
          <View className="flex-row items-center justify-between">
            <Pressable onPress={handleBack} className="h-10 w-10 items-center justify-center rounded-full">
              <MaterialCommunityIcons name="chevron-left" size={24} color={isDark ? '#ffffff' : '#1b180d'} />
            </Pressable>
            <Text className="text-lg font-bold text-text-main dark:text-gray-50">Checkout</Text>
            <Pressable onPress={toggle} className="h-10 w-10 items-center justify-center rounded-full">
              <MaterialCommunityIcons
                name={isDark ? 'white-balance-sunny' : 'weather-night'}
                size={20}
                color={isDark ? '#ecb613' : '#1b180d'}
              />
            </Pressable>
          </View>

          <View className="px-4 py-4">
            <View className="relative flex-row items-center justify-between">
              <View className="absolute left-0 right-0 top-4 h-0.5 bg-neutral-light dark:bg-neutral-dark" />
              <View
                className="absolute left-0 top-4 h-0.5 bg-primary"
                style={{ width: stepIndex === 1 ? '0%' : stepIndex === 2 ? '50%' : '100%' }}
              />

              <View className="items-center">
                <View className="h-8 w-8 items-center justify-center rounded-full bg-primary">
                  {stepIndex > 1 ? (
                    <MaterialCommunityIcons name="check" size={14} color="#fff" />
                  ) : (
                    <MaterialCommunityIcons name="map-marker" size={14} color="#fff" />
                  )}
                </View>
                <Text className="mt-1 text-xs font-bold text-primary">Address</Text>
              </View>

              <View className="items-center">
                <View
                  className={
                    stepIndex >= 2
                      ? 'h-8 w-8 items-center justify-center rounded-full bg-primary'
                      : 'h-8 w-8 items-center justify-center rounded-full bg-neutral-light dark:bg-neutral-dark'
                  }
                >
                  {stepIndex > 2 ? (
                    <MaterialCommunityIcons name="check" size={14} color="#fff" />
                  ) : (
                    <MaterialCommunityIcons
                      name="credit-card-outline"
                      size={14}
                      color={stepIndex >= 2 ? '#fff' : isDark ? '#bcaea5' : '#976d4e'}
                    />
                  )}
                </View>
                <Text className={stepIndex >= 2 ? 'mt-1 text-xs font-bold text-primary' : 'mt-1 text-xs font-medium text-text-muted dark:text-gray-400'}>
                  Payment
                </Text>
              </View>

              <View className="items-center">
                <View
                  className={
                    stepIndex >= 3
                      ? 'h-8 w-8 items-center justify-center rounded-full bg-primary'
                      : 'h-8 w-8 items-center justify-center rounded-full bg-neutral-light dark:bg-neutral-dark'
                  }
                >
                  <MaterialCommunityIcons
                    name="file-document-outline"
                    size={14}
                    color={stepIndex >= 3 ? '#fff' : isDark ? '#bcaea5' : '#976d4e'}
                  />
                </View>
                <Text className={stepIndex >= 3 ? 'mt-1 text-xs font-bold text-primary' : 'mt-1 text-xs font-medium text-text-muted dark:text-gray-400'}>
                  Review
                </Text>
              </View>
            </View>
          </View>
        </View>

        <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 180 }} showsVerticalScrollIndicator={false}>
          {step === 'address' ? (
            <View>
              <Text className="mb-4 text-2xl font-bold text-text-main dark:text-gray-50">Shipping Address</Text>
              <View className="gap-4">
                {addresses.map((address) => {
                  const selected = selectedAddress === address.id;
                  return (
                    <Pressable
                      key={address.id}
                      onPress={() => setSelectedAddress(address.id)}
                      className={
                        selected
                          ? 'rounded-xl border-2 border-primary bg-white p-4 dark:bg-neutral-dark'
                          : 'rounded-xl border border-neutral-light bg-white p-4 dark:border-neutral-dark dark:bg-neutral-dark'
                      }
                    >
                      <View className="flex-row items-start gap-4">
                        <View
                          className={
                            selected
                              ? 'mt-1 h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-primary'
                              : 'mt-1 h-5 w-5 rounded-full border-2 border-text-muted/30'
                          }
                        >
                          {selected ? <View className="h-2 w-2 rounded-full bg-white" /> : null}
                        </View>
                        <View className="flex-1">
                          <View className="mb-1 flex-row items-center justify-between">
                            <View className="flex-row items-center gap-2">
                              <MaterialCommunityIcons name={address.icon} size={18} color={selected ? '#ecb613' : isDark ? '#bcaea5' : '#976d4e'} />
                              <Text className="text-base font-bold text-text-main dark:text-gray-50">{address.label}</Text>
                            </View>
                            <Pressable>
                              <MaterialCommunityIcons name="pencil" size={18} color={isDark ? '#bcaea5' : '#976d4e'} />
                            </Pressable>
                          </View>
                          <Text className="text-sm font-medium text-text-main dark:text-gray-50">{address.line}</Text>
                          <Text className="mt-1 text-sm text-text-muted dark:text-gray-400">{address.phone}</Text>
                        </View>
                      </View>
                    </Pressable>
                  );
                })}

                <Pressable className="mt-1 flex-row items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-4">
                  <MaterialCommunityIcons name="plus" size={18} color="#ecb613" />
                  <Text className="font-bold text-primary">Add New Address</Text>
                </Pressable>
              </View>
            </View>
          ) : null}

          {step === 'payment' ? (
            <View>
              <Text className="mb-1 text-2xl font-bold text-text-main dark:text-gray-50">Payment Method</Text>
              <Text className="mb-6 text-sm text-text-muted dark:text-gray-400">Select how you'd like to pay for your treats.</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 px-4 pb-3">
                <View className="flex-row gap-3">
                  {paymentMethods.map((method) => {
                    const selected = selectedPayment === method.id;
                    return (
                      <Pressable
                        key={method.id}
                        onPress={() => setSelectedPayment(method.id)}
                        className={
                          selected
                            ? 'h-24 w-32 items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-primary/5'
                            : 'h-24 w-32 items-center justify-center gap-2 rounded-2xl border-2 border-neutral-light bg-surface-light dark:border-neutral-dark dark:bg-surface-dark'
                        }
                      >
                        <MaterialCommunityIcons name={method.icon} size={30} color={selected ? '#ecb613' : '#9ca3af'} />
                        <Text className="text-xs font-bold text-text-main dark:text-gray-50">{method.label}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>

              <View className="mb-6 mt-3 aspect-[1.586] w-full justify-between rounded-2xl bg-neutral-900 p-6">
                <View className="flex-row items-start justify-between">
                  <View>
                    <Text className="text-xs uppercase tracking-wider text-gray-400">Current Balance</Text>
                    <Text className="text-lg font-bold text-white">ETB 4,250.00</Text>
                  </View>
                  <MaterialCommunityIcons name="contactless-payment" size={24} color="#fff" />
                </View>
                <View>
                  <Text className="mb-3 font-mono text-xl tracking-widest text-white">•••• •••• •••• 4289</Text>
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-[10px] uppercase text-gray-400">Card Holder</Text>
                      <Text className="font-medium text-white">Abebe Bikila</Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-[10px] uppercase text-gray-400">Expires</Text>
                      <Text className="font-medium text-white">12/25</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className="gap-4">
                <View>
                  <Text className="mb-2 text-sm font-semibold text-text-main dark:text-gray-200">Card Number</Text>
                  <TextInput placeholder="0000 0000 0000 0000" placeholderTextColor="#9ca3af" className="rounded-xl bg-neutral-light px-4 py-4 text-text-main dark:bg-neutral-dark dark:text-gray-50" />
                </View>

                <View className="flex-row gap-4">
                  <View className="flex-1">
                    <Text className="mb-2 text-sm font-semibold text-text-main dark:text-gray-200">Expiry Date</Text>
                    <TextInput placeholder="MM/YY" placeholderTextColor="#9ca3af" className="rounded-xl bg-neutral-light px-4 py-4 text-text-main dark:bg-neutral-dark dark:text-gray-50" />
                  </View>
                  <View className="flex-1">
                    <Text className="mb-2 text-sm font-semibold text-text-main dark:text-gray-200">CVV</Text>
                    <TextInput placeholder="123" placeholderTextColor="#9ca3af" className="rounded-xl bg-neutral-light px-4 py-4 text-text-main dark:bg-neutral-dark dark:text-gray-50" />
                  </View>
                </View>

                <View>
                  <Text className="mb-2 text-sm font-semibold text-text-main dark:text-gray-200">Cardholder Name</Text>
                  <TextInput placeholder="Enter name on card" placeholderTextColor="#9ca3af" className="rounded-xl bg-neutral-light px-4 py-4 text-text-main dark:bg-neutral-dark dark:text-gray-50" />
                </View>

                <Pressable onPress={() => setSaveCard((prev) => !prev)} className="flex-row items-center gap-3 p-2">
                  <View className={saveCard ? 'h-5 w-5 items-center justify-center rounded border-2 border-primary bg-primary' : 'h-5 w-5 rounded border-2 border-gray-300'}>
                    {saveCard ? <MaterialCommunityIcons name="check" size={12} color="#fff" /> : null}
                  </View>
                  <Text className="text-sm text-text-muted dark:text-gray-400">Save this card for future purchases</Text>
                </Pressable>
              </View>
            </View>
          ) : null}

          {step === 'review' ? (
            <View className="gap-5">
              <Text className="text-2xl font-bold text-text-main dark:text-gray-50">Order Review</Text>

              <View className="rounded-2xl border border-gray-100 bg-background-light p-5 dark:border-white/5 dark:bg-white/5">
                <View className="mb-3 flex-row items-center justify-between border-b border-gray-200 pb-3 dark:border-white/10">
                  <View className="flex-row items-center gap-3">
                    <Image
                      source={{
                        uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD02Vccs75oNthlI12IUUdGwAjTabR5-hmbS_RhqnasGhk0XdJjd8zazlvUtWu0xEAtDyogtsfZK603ZEC4eU0a0DbW0ThiPYGkWrbZ84smNxnePMCEHaSOn3Fb02Ne0xJzaY-VML24bkaBm4mvyKu-tJS1ECqsbfW6Dmq3gUNiI70yqIUpuodL9afd_k3AfuvNohCoJvGJ47o0r4Py_NsmcskX_z8aabbeLgtuTwtFGitXjb3HZmsxJ4KKKd7E1aKbZx6z-F5GKXzC',
                      }}
                      className="h-10 w-10 rounded-full"
                    />
                    <View>
                      <Text className="text-sm font-bold text-text-main dark:text-gray-50">Golden Grain Bakery</Text>
                      <Text className="text-xs text-text-muted dark:text-gray-400">4 items</Text>
                    </View>
                  </View>
                  <Pressable>
                    <Text className="text-sm font-semibold text-primary">Edit</Text>
                  </Pressable>
                </View>

                <View className="gap-3">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-text-main dark:text-gray-50">Croissant Amande x2</Text>
                    <Text className="text-sm font-semibold text-text-main dark:text-gray-50">$8.00</Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-text-main dark:text-gray-50">Sourdough Loaf x1</Text>
                    <Text className="text-sm font-semibold text-text-main dark:text-gray-50">$6.50</Text>
                  </View>
                </View>
              </View>

              <View className="rounded-2xl border border-gray-100 bg-background-light p-4 dark:border-white/5 dark:bg-white/5">
                <View className="flex-row items-start gap-3">
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-white/10">
                    <MaterialCommunityIcons name="map-marker" size={20} color="#ecb613" />
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-xs uppercase tracking-wider text-text-muted dark:text-gray-400">Deliver to</Text>
                      <Pressable><Text className="text-sm font-semibold text-primary">Edit</Text></Pressable>
                    </View>
                    <Text className="mt-1 text-sm font-semibold text-text-main dark:text-gray-50">Home</Text>
                    <Text className="text-sm text-text-muted dark:text-gray-300">123 Bole Road, Adama, Oromia Region</Text>
                    <View className="mt-2 w-fit flex-row items-center gap-2 rounded-lg border border-gray-100 bg-white px-2 py-1 dark:border-white/5 dark:bg-white/5">
                      <MaterialCommunityIcons name="clock-outline" size={14} color={isDark ? '#bcaea5' : '#976d4e'} />
                      <Text className="text-xs text-text-muted dark:text-gray-400">Estimated: 25-35 min</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className="rounded-2xl border border-gray-100 bg-background-light p-4 dark:border-white/5 dark:bg-white/5">
                <View className="flex-row items-center gap-3">
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-white/10">
                    <MaterialCommunityIcons name="wallet-outline" size={20} color="#ecb613" />
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-sm font-semibold text-text-main dark:text-gray-50">Telebirr</Text>
                      <Pressable><Text className="text-sm font-semibold text-primary">Change</Text></Pressable>
                    </View>
                    <Text className="text-sm text-text-muted dark:text-gray-400">Ending in •••• 8899</Text>
                  </View>
                </View>
                <View className="mt-2 flex-row items-center gap-1.5">
                  <MaterialCommunityIcons name="lock" size={14} color="#16a34a" />
                  <Text className="text-xs text-text-muted dark:text-gray-400">Payments are secure and encrypted</Text>
                </View>
              </View>

              <View className="gap-2 border-t border-gray-100 pt-4 dark:border-white/10">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-text-muted dark:text-gray-400">Subtotal</Text>
                  <Text className="text-sm text-text-main dark:text-gray-50">$14.50</Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-text-muted dark:text-gray-400">Delivery Fee</Text>
                  <Text className="text-sm text-text-main dark:text-gray-50">$2.00</Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-text-muted dark:text-gray-400">Tax</Text>
                  <Text className="text-sm text-text-main dark:text-gray-50">$0.00</Text>
                </View>
                <View className="my-1 border-t border-dashed border-gray-300 dark:border-gray-700" />
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-bold text-text-main dark:text-gray-50">Total</Text>
                  <Text className="text-lg font-bold text-primary">$16.50</Text>
                </View>
              </View>
            </View>
          ) : null}
        </ScrollView>

        <View
          className="absolute bottom-0 left-0 right-0 border-t border-neutral-light bg-white/90 p-4 dark:border-neutral-dark dark:bg-surface-dark/90"
          style={{ paddingBottom: Math.max(insets.bottom + 8, 12) }}
        >
          <Pressable
            onPress={onContinue}
            className="h-12 w-full flex-row items-center justify-center gap-2 rounded-xl bg-primary active:scale-[0.98]"
          >
            <Text className="font-bold text-white">{stepMeta[step].cta}</Text>
            <MaterialCommunityIcons name="arrow-right" size={18} color="#fff" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
