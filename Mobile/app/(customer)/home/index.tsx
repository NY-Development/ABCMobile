import { router } from 'expo-router';
import { View, Text, ScrollView, FlatList, Pressable, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '@/src/features/theme/theme.store';

export default function ExploreBarkeriesScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  // Mock data for featured bakeries
  const featuredBakeries = [
    {
      id: '1',
      title: 'Morning Freshness',
      subtitle: 'Get 20% off all sourdough bread today',
      image: '../../assets/images/placeholder.png',
    },
    {
      id: '2',
      title: 'Sweet Delights',
      subtitle: 'New custom cake flavors now available',
      image: '../../assets/images/placeholder.png',
    },
  ];

  // Product categories
  const categories = [
    { id: '1', name: 'Bread', icon: 'bakery_dining' },
    { id: '2', name: 'Cakes', icon: 'cake' },
    { id: '3', name: 'Pastries', icon: 'cookie' },
    { id: '4', name: 'Desserts', icon: 'icecream' },
    { id: '5', name: 'Coffee', icon: 'coffee' },
  ];

  // Signature cakes
  const signatureCakes = [
    { id: '1', name: 'Red Velvet Bliss', price: '$4.50', bakery: 'Adama Bakery' },
    { id: '2', name: 'Strawberry Dream', price: '$22.00', bakery: 'Sweet Corner' },
    { id: '3', name: 'Fudge Fantasy', price: '$5.20', bakery: 'Chocolate House' },
  ];

  // Popular products
  const popularProducts = [
    { id: '1', name: 'Butter Croissant', location: 'The French Corner', price: '$3.25' },
    { id: '2', name: 'Macaron Box (6pcs)', location: 'Petite Patisserie', price: '$12.00' },
    { id: '3', name: 'Artisan Baguette', location: 'Old Town Bakery', price: '$2.80' },
    { id: '4', name: 'Giant Cinnamon Roll', location: 'Sugar & Spice', price: '$4.95' },
  ];

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
      {/* Header */}
      <View
        className={`flex-row items-center ${isDark ? 'bg-background-dark' : 'bg-background-light'} sticky top-0 z-10 justify-between border-b border-primary/10 px-4 pb-2`}>
        <View className="flex h-10 w-10 items-center justify-center text-primary">
          {/* Location Icon */}
          <Text className="text-2xl text-primary">📍</Text>
        </View>
        <Text
          className={`flex-1 text-center text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
          Adama Bakery & Cake
        </Text>
        <Pressable
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
          onPress={() => router.push('/(customer)/cart')}>
          <Text className="text-2xl text-primary">🛒</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Search Bar */}
        <View className={`px-4 py-3 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
          <View className="h-12 flex-row items-center rounded-xl bg-primary/5 shadow-sm">
            <View className="flex items-center justify-center pl-4">
              <Text className="text-xl text-primary">🔍</Text>
            </View>
            <TextInput
              className={`flex-1 ${isDark ? 'text-slate-100' : 'text-slate-900'} px-2 text-base placeholder:text-slate-400`}
              placeholder="Search for bread, cakes or bakeries"
              placeholderTextColor={isDark ? '#94a3b8' : '#cbd5e1'}
            />
          </View>
        </View>

        {/* Hero Carousel: Featured Bakeries */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          className="flex-1">
          <View className="flex-row gap-4 p-4">
            {featuredBakeries.map((item) => (
              <Pressable
                key={item.id}
                className="relative h-40 min-w-[300px] flex-1 flex-col gap-3 overflow-hidden rounded-xl"
                onPress={() => router.push('/(customer)/restaurants')}>
                <Image source={item.image} className="h-40 w-full rounded-xl" />
                <View className="absolute inset-0 flex-col justify-end rounded-xl bg-black/50 p-4">
                  <Text className="text-lg font-bold text-white">{item.title}</Text>
                  <Text className="text-sm font-medium text-white/80">{item.subtitle}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Categories */}
        <View className="py-4">
          <Text
            className={`mb-4 px-4 text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            Categories
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
            <View className="flex-row gap-4 px-4">
              {categories.map((cat) => (
                <View key={cat.id} className="min-w-[70px] flex-col items-center gap-2">
                  <View
                    className={`size-16 rounded-full ${cat.id === '1' ? 'bg-primary' : 'bg-primary/20'} flex items-center justify-center`}>
                    <Text
                      className={cat.id === '1' ? 'text-2xl text-white' : 'text-2xl text-primary'}>
                      {cat.icon === 'bakery_dining' && '🥖'}
                      {cat.icon === 'cake' && '🎂'}
                      {cat.icon === 'cookie' && '🍪'}
                      {cat.icon === 'icecream' && '🍦'}
                      {cat.icon === 'coffee' && '☕'}
                    </Text>
                  </View>
                  <Text
                    className={`text-xs font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {cat.name}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Signature Cakes */}
        <View className={`py-4 ${isDark ? 'bg-primary/5' : 'bg-primary/5'}`}>
          <View className="mb-4 flex-row items-center justify-between px-4">
            <Text className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Signature Cakes
            </Text>
            <Pressable onPress={() => router.push('/(customer)/restaurants/products')}>
              <Text className="text-sm font-bold text-primary">View all</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-4">
            <View className="flex-row gap-4 px-4">
              {signatureCakes.map((cake) => (
                <Pressable
                  key={cake.id}
                  className={`min-w-[160px] ${isDark ? 'bg-background-dark' : 'bg-background-light'} rounded-xl border border-primary/10 p-3 shadow-sm`}
                  onPress={() => router.push(`/(customer)/restaurants/product/${cake.id}`)}>
                  <View className="mb-3 aspect-square w-full rounded-lg bg-gray-300" />
                  <Text
                    className={`text-sm font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {cake.name}
                  </Text>
                  <Text className="mt-1 text-sm font-bold text-primary">{cake.price}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Popular Products */}
        <View className={`p-4 pb-24 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
          <Text
            className={`mb-4 text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            Popular Near You
          </Text>
          <View className="flex-row flex-wrap gap-4">
            {popularProducts.map((product, idx) => (
              <View
                key={product.id}
                className={`min-w-[45%] flex-1 ${idx % 2 === 1 ? 'ml-auto' : ''}`}>
                <Pressable
                  className="flex-col gap-2"
                  onPress={() => router.push(`/(customer)/restaurants/product/${product.id}`)}>
                  <View className="aspect-square w-full rounded-xl bg-gray-300" />
                  <View>
                    <Text
                      className={`text-sm font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                      {product.name}
                    </Text>
                    <Text
                      className={`text-xs italic ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {product.location}
                    </Text>
                    <View className="mt-1 flex-row items-center justify-between">
                      <Text className="font-bold text-primary">{product.price}</Text>
                      <Pressable className="rounded-full bg-primary p-1">
                        <Text className="text-white">+</Text>
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View
        className={`absolute bottom-0 left-0 right-0 ${isDark ? 'bg-background-dark' : 'bg-background-light'} border-t border-primary/10 px-4 pb-3 pt-2`}>
        <View className="flex-row justify-between gap-2">
          <Pressable
            className="flex flex-1 flex-col items-center justify-center gap-1"
            onPress={() => router.push('/(customer)/home')}>
            <Text className="text-xl text-slate-400">🏠</Text>
            <Text className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Home
            </Text>
          </Pressable>
          <Pressable
            className="flex flex-1 flex-col items-center justify-center gap-1"
            onPress={() => router.push('/(customer)/restaurants')}>
            <Text className="text-xl text-primary">🔍</Text>
            <Text className="text-xs font-medium text-primary">Explore</Text>
          </Pressable>
          <Pressable
            className="flex flex-1 flex-col items-center justify-center gap-1"
            onPress={() => router.push('/(customer)/orders/history')}>
            <Text className="text-xl text-slate-400">📋</Text>
            <Text className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Orders
            </Text>
          </Pressable>
          <Pressable
            className="flex flex-1 flex-col items-center justify-center gap-1"
            onPress={() => router.push('/(customer)/profile')}>
            <Text className="text-xl text-slate-400">👤</Text>
            <Text className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Profile
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
