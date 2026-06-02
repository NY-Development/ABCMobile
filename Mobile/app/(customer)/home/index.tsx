import { router } from 'expo-router';
import { View, Text, ScrollView, Pressable, TextInput, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { useAllProductsQuery } from '@/src/features/restaurants/restaurants.hooks';
import { useAddToCartMutation, useGetCartQuery } from '@/src/features/cart/cart.hooks';
import { Product } from '@/src/features/restaurants/restaurants.types';
import { 
  MapPin, 
  Search as SearchIcon, 
  ShoppingCart, 
  Plus,
  Utensils,
  Cake as CakeIcon,
  Cookie,
  Coffee,
  IceCream,
  Croissant
} from 'lucide-react-native';
import { Icon as UiIcon } from '@/components/ui/icon';

export default function ExploreBarkeriesScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const { data: products, isLoading } = useAllProductsQuery();
  const { mutate: addToCart } = useAddToCartMutation();
  const { data: cart } = useGetCartQuery();

  const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const categories = [
    { id: 'Bread', name: 'Bread', icon: Croissant },
    { id: 'Cake', name: 'Cakes', icon: CakeIcon },
    { id: 'Pastries', name: 'Pastries', icon: Cookie },
    { id: 'Snacks', name: 'Snacks', icon: IceCream },
    { id: 'Coffee', name: 'Coffee', icon: Coffee },
  ];

  if (isLoading) {
    return (
      <SafeAreaView className={`flex-1 items-center justify-center ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
        <ActivityIndicator size="large" color="#f97015" />
      </SafeAreaView>
    );
  }

  const signatureCakes = products?.filter(p => p.category === 'Cake').slice(0, 5) || [];
  const popularProducts = products?.slice(0, 10) || [];
  
  const featuredBanners = products?.slice(0, 2).map((p, idx) => ({
    id: p._id,
    title: idx === 0 ? 'Morning Freshness' : 'Sweet Delights',
    subtitle: idx === 0 ? `Get 20% off ${p.name}` : `New flavor: ${p.name}`,
    image: p.image,
  })) || [];

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
      {/* Header */}
      <View
        className={`flex-row items-center border-b border-border bg-card px-4 py-3 justify-between`}>
        <View className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <UiIcon as={MapPin} size={18} className="text-primary" />
        </View>
        <View className="flex-1 px-3">
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Delivering to</Text>
          <Text className="text-sm font-bold text-foreground">Adama, Ethiopia</Text>
        </View>
        <Pressable
          className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-muted"
          onPress={() => router.push('/(customer)/cart')}>
          <UiIcon as={ShoppingCart} size={18} className="text-primary" />
          {cartCount > 0 && (
            <View className="absolute -top-1 -right-1 h-5 w-5 items-center justify-center rounded-full bg-primary border-2 border-background">
              <Text className="text-[10px] font-bold text-white">{cartCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Search Bar */}
        <View className="px-4 py-4">
          <View className="h-14 flex-row items-center rounded-2xl bg-muted/50 px-4 border border-border">
            <UiIcon as={SearchIcon} size={20} className="text-muted-foreground" />
            <TextInput
              className={`flex-1 text-foreground px-3 text-base font-medium`}
              placeholder="Search for bread, cakes or bakeries"
              placeholderTextColor="#94a3b8"
            />
          </View>
        </View>

        {/* Hero Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-1">
          <View className="flex-row gap-4 px-4 pb-4">
            {featuredBanners.map((item) => (
              <Pressable
                key={item.id}
                className="relative h-44 w-[320px] overflow-hidden rounded-3xl"
                onPress={() => router.push(`/(customer)/restaurants/product/${item.id}`)}>
                <Image source={{ uri: item.image }} className="h-44 w-full" />
                <View className="absolute inset-0 bg-black/40 p-6 justify-end">
                  <Text className="text-2xl font-black text-white leading-tight">{item.title}</Text>
                  <Text className="text-sm font-bold text-white/90 mt-1">{item.subtitle}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Categories */}
        <View className="py-6">
          <Text className="mb-4 px-4 text-lg font-bold text-foreground">Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
            <View className="flex-row gap-6">
              {categories.map((cat) => (
                <View key={cat.id} className="items-center gap-2">
                  <View className={`h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/5`}>
                    <UiIcon as={cat.icon} size={28} className="text-primary" />
                  </View>
                  <Text className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{cat.name}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Signature Products Section */}
        <View className="bg-muted/30 py-6">
          <View className="mb-4 flex-row items-center justify-between px-4">
            <Text className="text-lg font-bold text-foreground">Signature Cakes</Text>
            <Pressable onPress={() => router.push('/(customer)/restaurants/products')}>
              <Text className="text-sm font-bold text-primary">Explore All</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
            <View className="flex-row gap-4 pb-2">
              {signatureCakes.map((cake) => (
                <Pressable
                  key={cake._id}
                  className="w-44 bg-card rounded-3xl border border-border p-3 shadow-sm"
                  onPress={() => router.push(`/(customer)/restaurants/product/${cake._id}`)}>
                  <Image source={{ uri: cake.image }} className="aspect-square w-full rounded-2xl bg-muted" />
                  <View className="mt-3">
                    <Text numberOfLines={1} className="text-sm font-bold text-foreground">{cake.name}</Text>
                    <View className="mt-1 flex-row items-center justify-between">
                      <Text className="text-sm font-black text-primary">ETB {cake.price}</Text>
                      <View className="h-6 w-6 rounded-lg bg-primary/10 items-center justify-center">
                        <Plus size={14} className="text-primary" />
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Popular Near You */}
        <View className="p-4 pb-32">
          <Text className="mb-4 text-lg font-bold text-foreground">Popular Near You</Text>
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {popularProducts.map((product) => (
              <View key={product._id} className="w-[48%]">
                <Pressable
                  className="bg-card rounded-3xl border border-border p-3 shadow-sm"
                  onPress={() => router.push(`/(customer)/restaurants/product/${product._id}`)}>
                  <Image source={{ uri: product.image }} className="aspect-square w-full rounded-2xl bg-muted" />
                  <View className="mt-3">
                    <Text numberOfLines={1} className="text-sm font-bold text-foreground">{product.name}</Text>
                    <Text numberOfLines={1} className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                      {typeof product.owner === 'string' ? 'Bakery' : product.owner?.companyName || 'Bakery'}
                    </Text>
                    <View className="mt-2 flex-row items-center justify-between">
                      <Text className="text-sm font-black text-primary">ETB {product.price}</Text>
                      <Pressable 
                        className="h-8 w-8 rounded-full bg-primary items-center justify-center shadow-lg shadow-primary/40"
                        onPress={() => addToCart({ productId: product._id, quantity: 1 })}>
                        <Plus size={16} color="white" />
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
