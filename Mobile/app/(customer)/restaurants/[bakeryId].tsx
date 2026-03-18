import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, Pressable, Image, FlatList } from 'react-native';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BakeryDetailsScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const { bakeryId } = useLocalSearchParams();

  // Mock bakery data
  const bakeryData = {
    id: bakeryId || '1',
    name: 'Adama Bakery & Cake',
    description: 'Freshly baked artisan breads and custom cakes',
    rating: 4.8,
    reviews: '1.2k+',
    deliveryFee: 'Free',
    pricing: '$$',
    about:
      'Founded in 2012, Adama Bakery specializes in traditional sourdough and contemporary pastry arts. We use organic locally-sourced grains to ensure every bite is a celebration of flavor.',
    hours: 'Open until 8:00 PM',
    distance: '1.2 km away',
    heroImage: require('@/assets/images/placeholder.png'),
    logo: require('@/assets/images/placeholder.png'),
  };

  const categories = [
    {
      id: '1',
      name: 'Signature Breads',
      products: [
        {
          id: 'b1',
          name: 'Classic Sourdough',
          description: 'Natural fermentation, 24h rise',
          price: '$7.50',
        },
        {
          id: 'b2',
          name: 'French Baguette',
          description: 'Crispy crust, soft airy inside',
          price: '$4.25',
        },
      ],
    },
    {
      id: '2',
      name: 'Custom Cakes',
      products: [
        {
          id: 'c1',
          name: 'Velvet Dream Chocolate',
          description: 'Three layers of rich Belgian chocolate with silky ganache.',
          price: '$45.00',
        },
      ],
    },
  ];

  const cartItems = 2;
  const cartTotal = 11.75;

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
      {/* Top Navigation Bar */}
      <View
        className={`sticky top-0 z-50 flex-row items-center justify-between border-b ${isDark ? 'bg-background-dark/80 border-primary/10' : 'bg-background-light/80 border-primary/10'} px-4 py-3 backdrop-blur-md`}>
        <Pressable
          className="flex size-10 items-center justify-center rounded-full"
          onPress={() => router.back()}>
          <Text className="text-2xl text-primary">←</Text>
        </Pressable>
        <View className="flex-row items-center gap-3">
          <Pressable className="flex size-10 items-center justify-center rounded-full hover:bg-primary/10">
            <Text className="text-2xl text-primary">❤️</Text>
          </Pressable>
          <Pressable className="flex size-10 items-center justify-center rounded-full hover:bg-primary/10">
            <Text className="text-2xl text-primary">📤</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Hero Section */}
        <View className="relative">
          <Image source={bakeryData.heroImage} className="h-64 w-full bg-slate-200" />
          {/* Logo Overlay */}
          <View className="absolute -bottom-12 left-8 flex size-24 items-center justify-center rounded-xl border-2 border-primary/20 bg-white p-1 shadow-xl dark:bg-slate-800">
            <Image source={bakeryData.logo} className="size-full rounded-lg" />
          </View>
        </View>

        {/* Bakery Info Section */}
        <View className="px-4 pb-4 pt-16">
          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              <Text
                className={`text-3xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {bakeryData.name}
              </Text>
              <Text className="font-medium text-primary">{bakeryData.description}</Text>
            </View>
            <View className="rounded-full bg-primary/10 px-3 py-1">
              <Text className="text-sm font-bold text-primary">⭐ {bakeryData.rating}</Text>
            </View>
          </View>

          {/* Hours & Distance */}
          <View className="mt-2 flex-row items-center gap-4">
            <View className="flex-row items-center gap-1">
              <Text className="text-base">🕐</Text>
              <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {bakeryData.hours}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Text className="text-base">📍</Text>
              <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {bakeryData.distance}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="flex-row gap-3 px-4 py-2">
          <View
            className={`flex-1 rounded-xl border ${isDark ? 'border-primary/20 bg-primary/5' : 'border-primary/20 bg-primary/5'} p-4`}>
            <Text
              className={`text-xs font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Reviews
            </Text>
            <Text className={`text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              {bakeryData.reviews}
            </Text>
          </View>
          <View
            className={`flex-1 rounded-xl border ${isDark ? 'border-primary/20 bg-primary/5' : 'border-primary/20 bg-primary/5'} p-4`}>
            <Text
              className={`text-xs font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Delivery
            </Text>
            <Text className="text-xl font-bold text-primary">{bakeryData.deliveryFee}</Text>
          </View>
          <View
            className={`flex-1 rounded-xl border ${isDark ? 'border-primary/20 bg-primary/5' : 'border-primary/20 bg-primary/5'} p-4`}>
            <Text
              className={`text-xs font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Pricing
            </Text>
            <Text className={`text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              {bakeryData.pricing}
            </Text>
          </View>
        </View>

        {/* About Section */}
        <View className="px-4 py-3">
          <Text className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            About
          </Text>
          <Text className={`mt-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {bakeryData.about}
          </Text>
        </View>

        {/* Tabs Section */}
        <View
          className={`sticky top-16 z-40 border-b ${isDark ? 'bg-background-dark border-slate-800' : 'bg-background-light border-slate-200'}`}>
          <View className="flex-row px-4">
            <Pressable className="border-b-4 border-primary pb-3 pt-2">
              <Text className="text-sm font-bold uppercase tracking-widest text-primary">
                Products
              </Text>
            </Pressable>
            <Pressable className="flex-1 border-b-4 border-transparent pb-3 pl-8 pt-2">
              <Text
                className={`text-sm font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Reviews
              </Text>
            </Pressable>
            <Pressable className="flex-1 border-b-4 border-transparent pb-3 pl-8 pt-2">
              <Text
                className={`text-sm font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Info
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Product Categories */}
        <View className="space-y-8 p-4 pb-24">
          {categories.map((category) => (
            <View key={category.id}>
              <View className="mb-4 flex-row items-center gap-2">
                <View className="h-6 w-1 rounded-full bg-primary" />
                <Text
                  className={`text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {category.name}
                </Text>
              </View>

              <View className="gap-4">
                {category.products.map((product) => (
                  <Pressable
                    key={product.id}
                    onPress={() =>
                      router.push(
                        `/(customer)/restaurants/product/${product.id}?name=${product.name}&price=${product.price}`
                      )
                    }>
                    <View
                      className={`flex-row gap-4 rounded-xl border p-3 shadow-sm ${isDark ? 'border-slate-800 bg-slate-800/50' : 'border-slate-100 bg-white'}`}>
                      <View className="size-20 rounded-lg bg-slate-200" />
                      <View className="flex-1 justify-between py-1">
                        <View>
                          <Text
                            className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                            {product.name}
                          </Text>
                          <Text
                            className={`line-clamp-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {product.description}
                          </Text>
                        </View>
                        <Text className="font-bold text-primary">{product.price}</Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button: Cart */}
      <Pressable
        onPress={() => router.push('/(customer)/cart')}
        className="absolute bottom-6 right-6 z-50 flex-row items-center gap-3 rounded-full bg-primary px-6 py-4 shadow-2xl active:scale-95">
        <Text className="text-2xl text-white">🛒</Text>
        <View>
          <Text className="font-bold text-white">View Cart ({cartItems})</Text>
          <View className="rounded bg-white/20 px-2 py-0.5">
            <Text className="text-sm font-bold text-white">${cartTotal.toFixed(2)}</Text>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}
