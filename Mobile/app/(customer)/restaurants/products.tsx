import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, Pressable, Image, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { useState, useMemo } from 'react';
import { useOwnerProductsQuery } from '@/src/features/restaurants/restaurants.hooks';
import { useAddToCartMutation, useGetCartQuery } from '@/src/features/cart/cart.hooks';
import { Product } from '@/src/features/restaurants/restaurants.types';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Search, 
  Heart, 
  Plus 
} from 'lucide-react-native';
import { Icon as UiIcon } from '@/components/ui/icon';

export default function OurProductsScreen() {
  const { id: ownerId, name: bakeryName } = useLocalSearchParams<{ id: string; name: string }>();
  const isDark = useThemeStore((state) => state.isDark);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  const { data: products, isLoading } = useOwnerProductsQuery(ownerId as string);
  const { mutate: addToCart } = useAddToCartMutation();
  const { data: cart } = useGetCartQuery();

  const cartCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const categories = useMemo(() => {
    if (!products) return ['All'];
    const cats = new Set(products.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(p => {
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchText.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchText]);

  const renderProductCard = ({ item }: { item: Product }) => (
    <Pressable
      onPress={() => router.push(`/customer/restaurants/product/${item._id}` as any)}
      className="flex-1 flex-col bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden shadow-sm active:scale-[0.98] transition-all m-2">
      <View className="relative aspect-square w-full bg-slate-100 dark:bg-slate-900/50">
        <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />
        <Pressable className="absolute top-2 right-2 size-9 flex items-center justify-center bg-white/90 dark:bg-slate-900/90 rounded-full shadow-sm">
          <UiIcon as={Heart} size={18} className="text-slate-400" />
        </Pressable>
      </View>
      <div className="p-3 flex flex-col flex-1">
        <Text numberOfLines={2} className="text-slate-900 dark:text-slate-100 text-sm font-bold leading-tight mb-2">
          {item.name}
        </Text>
        <View className="mt-auto flex-row items-center justify-between">
          <Text className="text-[#ec5b13] font-black text-base">ETB {item.price}</Text>
          <Pressable 
            className="flex size-9 items-center justify-center bg-[#ec5b13] rounded-xl shadow-lg shadow-[#ec5b13]/20"
            onPress={() => addToCart({ productId: item._id, quantity: 1 })}>
            <UiIcon as={Plus} size={18} className="text-white" />
          </Pressable>
        </View>
      </div>
    </Pressable>
  );

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#ec5b13" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header Section */}
      <View className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-[#ec5b13]/10">
        <View className="flex-row items-center p-4 justify-between w-full">
          <View className="flex-row items-center gap-3">
            <Pressable
              className="flex size-10 items-center justify-center rounded-full active:bg-[#ec5b13]/10 transition-colors"
              onPress={() => router.back()}>
              <UiIcon as={ArrowLeft} size={20} className="text-foreground" />
            </Pressable>
            <Text className="text-lg font-black tracking-tight text-foreground">
              {bakeryName || 'Adama Bakery & Cake'}
            </Text>
          </View>
          <Pressable 
            className="relative flex size-10 items-center justify-center rounded-full active:bg-[#ec5b13]/10 transition-colors"
            onPress={() => router.push('/(customer)/cart')}>
            <UiIcon as={ShoppingCart} size={20} className="text-foreground" />
            {cartCount > 0 && (
              <View className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ec5b13]">
                <Text className="text-[10px] font-black text-white">{cartCount}</Text>
              </View>
            )}
          </Pressable>
        </View>
        
        {/* Search Bar */}
        <View className="px-4 pb-4 w-full">
          <View className="relative flex-row items-center w-full">
            <View className="absolute left-4 z-10">
              <UiIcon as={Search} size={18} className="text-[#ec5b13]" />
            </View>
            <TextInput 
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#ec5b13]/5 dark:bg-[#ec5b13]/10 text-foreground text-base font-medium"
              placeholder="Search for breads, cakes, or pastries"
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
            />
          </View>
        </View>

        {/* Categories */}
        <View className="px-4 w-full">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="border-b border-[#ec5b13]/5">
            <View className="flex-row gap-6">
              {categories.map((category) => (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  className={`flex flex-col items-center justify-center pb-3 pt-2 shrink-0 ${
                    selectedCategory === category ? 'border-b-2 border-[#ec5b13]' : 'border-b-2 border-transparent'
                  }`}>
                  <Text className={`text-sm font-black uppercase tracking-widest ${
                    selectedCategory === category ? 'text-[#ec5b13]' : 'text-slate-400'
                  }`}>
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Product Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={{ padding: 8, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-20 p-6 bg-card rounded-3xl border border-dashed border-border m-4">
            <UiIcon as={Search} size={48} className="text-muted-foreground opacity-20 mb-4" />
            <Text className="text-muted-foreground font-black uppercase tracking-widest text-center">No products found in this bakery</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
