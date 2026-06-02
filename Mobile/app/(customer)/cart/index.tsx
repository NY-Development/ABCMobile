import { router } from 'expo-router';
import { View, Text, ScrollView, Pressable, Image, TextInput, ActivityIndicator } from 'react-native';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation, useClearCartMutation } from '@/src/features/cart/cart.hooks';
import { 
  ChevronLeft, 
  Trash2, 
  ShoppingBasket, 
  Minus, 
  Plus, 
  TicketPercent,
  ArrowRight
} from 'lucide-react-native';
import { Icon as UiIcon } from '@/components/ui/icon';

export default function ShoppingCartScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const [promoCode, setPromoCode] = useState('');

  const { data: cart, isLoading } = useGetCartQuery();
  const { mutate: addToCart } = useAddToCartMutation();
  const { mutate: removeFromCart } = useRemoveFromCartMutation();
  const { mutate: clearCart } = useClearCartMutation();

  if (isLoading) {
    return (
      <SafeAreaView className={`flex-1 items-center justify-center ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
        <ActivityIndicator size="large" color="#f97015" />
      </SafeAreaView>
    );
  }

  const subtotal = cart?.totalPrice || 0;
  const deliveryFee = subtotal > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  if (!cart || cart.items.length === 0) {
    return (
      <SafeAreaView className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
        <View className="flex-row items-center border-b border-border bg-card px-4 py-4">
          <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-xl bg-muted">
            <UiIcon as={ChevronLeft} size={20} className="text-primary" />
          </Pressable>
          <Text className="flex-1 text-center text-lg font-bold text-foreground">My Cart</Text>
          <View className="w-10" />
        </View>
        <View className="flex-1 items-center justify-center p-10">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
            <UiIcon as={ShoppingBasket} size={40} className="text-primary" />
          </View>
          <Text className="text-2xl font-bold text-foreground">Your cart is empty</Text>
          <Text className="text-muted-foreground text-center mt-2 px-6">Looks like you haven't added anything to your cart yet.</Text>
          <Pressable 
            onPress={() => router.push('/(customer)/home')}
            className="mt-8 bg-primary px-10 py-4 rounded-2xl shadow-lg shadow-primary/30 active:scale-95">
            <Text className="text-white font-bold uppercase tracking-widest">Start Shopping</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center border-b border-border bg-card px-4 py-4">
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-xl bg-muted">
          <UiIcon as={ChevronLeft} size={20} className="text-primary" />
        </Pressable>
        <Text className="flex-1 text-center text-lg font-bold text-foreground">My Cart</Text>
        <Pressable onPress={() => clearCart()} className="h-10 w-10 items-center justify-center rounded-xl bg-red-50">
          <UiIcon as={Trash2} size={18} className="text-red-500" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="px-4 py-6 gap-4">
          {cart.items.map((item) => (
            <View
              key={item.product._id}
              className="flex-row items-center gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm">
              <Image source={{ uri: item.product.image }} className="h-20 w-20 rounded-2xl bg-muted" />
              <View className="flex-1 justify-between py-1">
                <View>
                  <Text numberOfLines={1} className="text-base font-bold text-foreground">{item.product.name}</Text>
                  <Text className="text-sm font-black text-primary mt-1">ETB {item.product.price}</Text>
                </View>
                <View className="flex-row items-center mt-3 self-start gap-4 bg-muted/50 rounded-xl px-2 py-1">
                  <Pressable 
                    onPress={() => removeFromCart({ productId: item.product._id, quantity: 1 })}
                    className="h-8 w-8 items-center justify-center rounded-lg bg-background border border-border">
                    <Minus size={14} className="text-primary" />
                  </Pressable>
                  <Text className="w-4 text-center font-bold text-foreground">{item.quantity}</Text>
                  <Pressable 
                    onPress={() => addToCart({ productId: item.product._id, quantity: 1 })}
                    className="h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Plus size={14} color="white" />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Promo Code */}
        <View className="px-4 pb-12">
          <View className="flex-row gap-2 h-14">
            <View className="flex-1 flex-row items-center rounded-2xl bg-muted/30 px-4 border border-border">
              <UiIcon as={TicketPercent} size={18} className="text-primary" />
              <TextInput
                className="flex-1 px-3 text-sm font-bold text-foreground"
                placeholder="Promo Code"
                placeholderTextColor="#94a3b8"
                value={promoCode}
                onChangeText={setPromoCode}
              />
            </View>
            <Pressable className="bg-foreground rounded-2xl px-6 items-center justify-center shadow-lg active:scale-95">
              <Text className="text-sm font-bold text-background uppercase tracking-widest">Apply</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="bg-card border-t border-border p-6 shadow-2xl">
        <View className="gap-2 mb-6">
          <View className="flex-row justify-between">
            <Text className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Subtotal</Text>
            <Text className="text-sm font-black text-foreground">ETB {subtotal.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Delivery</Text>
            <Text className="text-sm font-black text-foreground">ETB {deliveryFee.toFixed(2)}</Text>
          </View>
          <View className="h-[1px] bg-border my-2" />
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-black text-foreground uppercase tracking-tighter">Total</Text>
            <Text className="text-2xl font-black text-primary">ETB {total.toFixed(2)}</Text>
          </View>
        </View>
        
        <Pressable
          onPress={() => router.push('/(customer)/checkout')}
          className="h-16 flex-row items-center justify-center gap-3 rounded-2xl bg-primary shadow-xl shadow-primary/40 active:scale-[0.98]">
          <Text className="text-lg font-black text-white uppercase tracking-widest">Checkout</Text>
          <ArrowRight size={20} color="white" />
        </Pressable>
        
        <Text className="mt-4 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">
          Free delivery on orders above ETB 1000.00
        </Text>
      </View>
    </SafeAreaView>
  );
}
