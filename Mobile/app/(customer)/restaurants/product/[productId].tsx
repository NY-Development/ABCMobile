import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, Pressable, Image, ActivityIndicator } from 'react-native';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProductByIdQuery } from '@/src/features/restaurants/restaurants.hooks';
import { useAddToCartMutation } from '@/src/features/cart/cart.hooks';
import { 
  ArrowLeft, 
  Share2, 
  Star, 
  Minus, 
  Plus, 
  Timer, 
  Leaf, 
  Cake, 
  Heart,
  ShoppingBasket
} from 'lucide-react-native';
import { Icon as UiIcon } from '@/components/ui/icon';

export default function ProductDetailsScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useProductByIdQuery(productId as string);
  const { mutate: addToCart, isPending } = useAddToCartMutation();

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#ec5b13" />
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="text-destructive font-bold text-lg">Product not found</Text>
        <Pressable className="mt-4 bg-primary px-6 py-3 rounded-xl" onPress={() => router.back()}>
          <Text className="text-white font-bold tracking-widest uppercase">Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    addToCart({ productId: product._id, quantity });
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center bg-background p-4 border-b border-[#ec5b13]/10">
        <Pressable
          className="flex size-12 shrink-0 items-center justify-center rounded-full active:bg-[#ec5b13]/10 transition-colors"
          onPress={() => router.back()}>
          <UiIcon as={ArrowLeft} size={28} className="text-[#ec5b13]" />
        </Pressable>
        <Text className="flex-1 text-center text-lg font-black tracking-tight text-foreground">
          Product Detail
        </Text>
        <View className="w-12 items-center justify-end">
          <Pressable className="flex items-center justify-center rounded-xl h-12 w-12 active:bg-[#ec5b13]/10">
            <UiIcon as={Share2} size={20} className="text-[#ec5b13]" />
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Product Image Hero */}
        <View className="p-4">
          <View className="w-full aspect-square bg-[#ec5b13]/5 rounded-3xl overflow-hidden shadow-lg shadow-[#ec5b13]/10">
            <Image 
              source={{ uri: product.image }} 
              className="w-full h-full" 
              resizeMode="cover" 
            />
          </View>
        </View>

        {/* Product Info */}
        <View className="px-4 pt-4">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <View className="bg-[#ec5b13]/10 self-start px-2 py-1 rounded-lg mb-2">
                <Text className="text-[#ec5b13] text-[10px] font-black uppercase tracking-widest">
                  Premium Selection
                </Text>
              </View>
              <Text className="text-slate-900 dark:text-slate-100 text-3xl font-black tracking-tight">
                {product.name}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <UiIcon as={Star} size={18} className="text-[#ec5b13] fill-[#ec5b13]" />
              <Text className="text-foreground font-black text-lg">4.9</Text>
            </View>
          </View>

          {/* Price and Quantity Selector */}
          <View className="mt-4 flex-row items-center justify-between">
            <Text className="text-[#ec5b13] text-2xl font-black tracking-tight">
              ETB {product.price.toFixed(2)}
            </Text>
            
            <View className="flex-row items-center bg-[#ec5b13]/5 dark:bg-[#ec5b13]/10 rounded-full p-1 border border-[#ec5b13]/20">
              <Pressable
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-background shadow-sm border border-[#ec5b13]/10">
                <UiIcon as={Minus} size={14} className="text-[#ec5b13]" strokeWidth={3} />
              </Pressable>
              <Text className="px-4 font-black text-slate-900 dark:text-slate-100 text-base">
                {quantity}
              </Text>
              <Pressable
                onPress={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#ec5b13] shadow-sm">
                <UiIcon as={Plus} size={14} className="text-white" strokeWidth={3} />
              </Pressable>
            </View>
          </View>

          {/* Description Section */}
          <View className="mt-8">
            <Text className="text-slate-900 dark:text-slate-100 font-black text-lg mb-2">
              Description
            </Text>
            <Text className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">
              {product.description || 'A rich, handcrafted treat made daily in our bakery using premium organic ingredients. Perfect for celebrations or a decadent indulgence.'}
            </Text>
          </View>

          {/* Specs Grid */}
          <View className="mt-8 flex-row gap-3">
            {[
              { icon: Timer, label: 'Prep Time', value: '2 Hours' },
              { icon: Leaf, label: 'Organic', value: '100% Nat.' },
              { icon: Cake, label: 'Serves', value: '8-10 People' }
            ].map((spec, i) => (
              <View key={i} className="flex-1 flex-col items-center p-3 bg-[#ec5b13]/5 rounded-2xl border border-[#ec5b13]/10">
                <UiIcon as={spec.icon} size={20} className="text-[#ec5b13] mb-1" />
                <Text className="text-[9px] uppercase text-slate-500 font-black tracking-widest">{spec.label}</Text>
                <Text className="text-xs font-black text-foreground">{spec.value}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className="h-32" />
      </ScrollView>

      {/* Footer / Buy Bar */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-[#ec5b13]/10 pb-8">
        <View className="flex-row gap-4 max-w-4xl mx-auto">
          <Pressable className="flex items-center justify-center w-14 h-14 rounded-2xl border-2 border-[#ec5b13]/30 bg-transparent active:bg-[#ec5b13]/5">
            <UiIcon as={Heart} size={24} className="text-[#ec5b13]" />
          </Pressable>
          <Pressable
            onPress={handleAddToCart}
            disabled={isPending}
            className={`flex-1 flex-row items-center justify-center gap-3 rounded-2xl bg-[#ec5b13] px-6 h-14 shadow-lg shadow-[#ec5b13]/30 active:scale-[0.98] ${isPending ? 'opacity-80' : ''}`}>
            {isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <UiIcon as={ShoppingBasket} size={24} className="text-white" />
                <Text className="text-white font-black text-base uppercase tracking-widest">
                  Add to Cart - ETB {(product.price * quantity).toFixed(2)}
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
