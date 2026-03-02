import React, { useMemo, useState, useRef } from 'react';
import { 
  Image, 
  Pressable, 
  ScrollView, 
  Text, 
  View, 
  Animated, 
  LayoutAnimation, 
  Platform, 
  UIManager 
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

import { ROUTES } from '../../constants/routes';
import type { CustomerStackParamList } from '../../types/navigation';
import { useThemeStore } from '../../store/themeStore';

// Android LayoutAnimation setup
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const CartScreen = () => {
  const navigation = useNavigation<StackNavigationProp<CustomerStackParamList, 'Cart'>>();
  const { mode, toggle } = useThemeStore();
  const insets = useSafeAreaInsets();
  const isDark = mode === 'dark';

  // Refs to control individual swipeable rows
  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

  const [items, setItems] = useState([
    { id: '1', name: 'Sourdough Loaf', bakery: 'The Daily Bread Bakery', price: 5.5, quantity: 1, image: 'https://images.unsplash.com/photo-1585478259715-876a6a81fc08?q=80&w=200' },
    { id: '2', name: 'Chocolate Croissant', bakery: 'Patisserie Claude', price: 3.25, quantity: 2, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=200' },
    { id: '3', name: 'Blueberry Muffin', bakery: 'Muffin Top Bakery', price: 2.75, quantity: 1, image: 'https://images.unsplash.com/photo-1607958674115-05b24858a945?q=80&w=200' },
  ]);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const total = subtotal + 3.70; // Mock delivery + tax

  const updateQuantity = (id: string, delta: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeItem = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItems((prev) => prev.filter((item) => item.id !== id));
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  // Only triggers the visual slide
  const handleRevealDelete = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    swipeableRefs.current[id]?.openRight();
  };

  const renderRightActions = (progress: any, dragX: any, id: string) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <Pressable 
        onPress={() => removeItem(id)}
        className="bg-red-500 justify-center items-center w-24 mb-4 rounded-2xl ml-2"
      >
        <Animated.View style={{ transform: [{ scale }] }} className="items-center">
          <MaterialCommunityIcons name="trash-can-outline" size={24} color="white" />
          <Text className="text-white text-[10px] font-bold uppercase mt-1">Confirm</Text>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top']}>
        <View className="flex-1">
          
          {/* Header with Back Arrow */}
          <View className="flex-row items-center justify-between border-b border-primary/10 bg-background-light/90 px-6 py-5 dark:border-primary/5 dark:bg-background-dark/90">
            <View className="flex-row items-center gap-4">
              <Pressable 
                onPress={() => navigation.goBack()}
                className="h-10 w-10 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark shadow-sm"
              >
                <MaterialCommunityIcons name="chevron-left" size={28} color={isDark ? '#fcfbf8' : '#1b180d'} />
              </Pressable>
              <Text className="text-2xl font-bold tracking-tight text-text-main dark:text-gray-50">
                My Cart <Text className="text-lg font-semibold text-primary">({itemCount})</Text>
              </Text>
            </View>
            
            <Pressable onPress={toggle} className="h-10 w-10 items-center justify-center rounded-full bg-surface-light shadow-sm dark:bg-surface-dark">
              <MaterialCommunityIcons name={isDark ? 'white-balance-sunny' : 'weather-night'} size={20} color={isDark ? '#ecb613' : '#1b180d'} />
            </Pressable>
          </View>

          <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 300 }}>
            <View className="gap-1">
              {items.map((item) => (
                <Swipeable
                  key={item.id}
                  ref={(el) => {
                    swipeableRefs.current[item.id] = el;
                  }}
                  friction={2}
                  rightThreshold={40}
                  renderRightActions={(prog, drag) => renderRightActions(prog, drag, item.id)}
                  containerStyle={{ overflow: 'visible' }}
                >
                  <View className="mb-4 rounded-2xl border border-primary/10 bg-surface-light p-3 shadow-sm dark:border-white/5 dark:bg-surface-dark">
                    <View className="flex-row gap-4">
                      <View className="h-24 w-24 overflow-hidden rounded-xl bg-gray-100">
                        <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />
                      </View>

                      <View className="flex-1 justify-between py-1">
                        <View>
                          <View className="flex-row items-start justify-between">
                            <Text className="text-lg font-bold leading-tight text-text-main dark:text-gray-50">{item.name}</Text>
                            
                            {/* REVEAL BUTTON */}
                            <Pressable 
                              onPress={() => handleRevealDelete(item.id)}
                              className="p-1 -mr-1"
                            >
                              <MaterialCommunityIcons 
                                name="delete-outline" 
                                size={20} 
                                color={isDark ? '#a89f8a' : '#8c7e60'} 
                              />
                            </Pressable>
                          </View>
                          <Text className="mt-1 text-sm font-medium text-text-muted dark:text-gray-400">{item.bakery}</Text>
                        </View>

                        <View className="flex-row items-end justify-between">
                          <Text className="text-lg font-bold text-primary">${item.price.toFixed(2)}</Text>
                          <View className="flex-row items-center gap-3 rounded-full border border-primary/5 bg-background-light px-3 py-1 dark:bg-background-dark">
                            <Pressable onPress={() => updateQuantity(item.id, -1)} className="h-6 w-6 items-center justify-center rounded-full">
                              <MaterialCommunityIcons name="minus" size={14} color={isDark ? '#fcfbf8' : '#1b180d'} />
                            </Pressable>
                            <Text className="w-4 text-center text-sm font-semibold text-text-main dark:text-gray-50">{item.quantity}</Text>
                            <Pressable onPress={() => updateQuantity(item.id, 1)} className="h-6 w-6 items-center justify-center rounded-full">
                              <MaterialCommunityIcons name="plus" size={14} color={isDark ? '#fcfbf8' : '#1b180d'} />
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </Swipeable>
              ))}

              {items.length === 0 && (
                <View className="items-center justify-center py-20 opacity-40">
                   <MaterialCommunityIcons name="cart-off" size={64} color={isDark ? '#fff' : '#000'} />
                   <Text className="mt-4 text-lg font-medium dark:text-white">Your cart is empty</Text>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Footer Bottom Sheet */}
          <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl border-t border-primary/10 bg-surface-light dark:border-white/5 dark:bg-surface-dark shadow-2xl" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
            <View className="px-6 py-6">
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="text-lg font-bold text-text-main dark:text-gray-50">Total</Text>
                <Text className="text-2xl font-extrabold text-primary">${total.toFixed(2)}</Text>
              </View>

              <Pressable 
                onPress={() => items.length > 0 && navigation.navigate(ROUTES.Checkout)}
                disabled={items.length === 0}
                className={`rounded-full py-4 flex-row items-center justify-center gap-2 ${items.length === 0 ? 'bg-gray-300' : 'bg-primary'}`}
              >
                <Text className="text-lg font-bold text-white">Proceed to Checkout</Text>
                <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};