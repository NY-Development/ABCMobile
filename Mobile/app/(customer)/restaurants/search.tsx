import { router } from 'expo-router';
import { View, Text, ScrollView, Pressable, Image, TextInput, FlatList } from 'react-native';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  MapPin, 
  ShoppingCart, 
  Search, 
  ChevronRight,
  Plus,
  Home,
  Clock,
  User,
  Compass,
  Cupcake,
  Cookie,
  Coffee,
  IceCream,
  Cake as CakeIcon,
  ChefHat
} from 'lucide-react-native';
import { Icon as UiIcon } from '@/components/ui/icon';
import { useAllProductsQuery } from '@/src/features/restaurants/restaurants.hooks';
import { useGetCartQuery } from '@/src/features/cart/cart.hooks';
import { useMemo } from 'react';

export default function ExploreScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const { data: products, isLoading } = useAllProductsQuery();
  const { data: cart } = useGetCartQuery();
  
  const cartCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const featuredCakes = useMemo(() => {
    return products?.filter(p => p.category.toLowerCase().includes('cake')).slice(0, 5) || [];
  }, [products]);

  const popularProducts = useMemo(() => {
    return products?.slice(0, 4) || [];
  }, [products]);

  const categories = [
    { name: 'Bread', icon: ChefHat },
    { name: 'Cakes', icon: CakeIcon },
    { name: 'Pastries', icon: Cookie },
    { name: 'Sweets', icon: Cupcake },
    { name: 'Coffee', icon: Coffee },
    { name: 'Desserts', icon: IceCream },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center bg-background p-4 pb-2 justify-between border-b border-[#ec5b13]/10">
        <View className="text-[#ec5b13] flex size-10 items-center justify-center">
          <UiIcon as={MapPin} size={24} className="text-[#ec5b13]" />
        </View>
        <Text className="text-slate-900 dark:text-slate-100 text-lg font-black tracking-tight flex-1 text-center">
          Explore Bakeries
        </Text>
        <Pressable 
          onPress={() => router.push('/(customer)/cart')}
          className="flex size-10 items-center justify-center rounded-full bg-[#ec5b13]/10 text-[#ec5b13] relative">
          <UiIcon as={ShoppingCart} size={20} className="text-[#ec5b13]" />
          {cartCount > 0 && (
            <View className="absolute -top-1 -right-1 size-4 bg-[#ec5b13] rounded-full items-center justify-center">
              <Text className="text-[10px] text-white font-black">{cartCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Search Bar */}
        <View className="px-4 py-3">
          <View className="flex-row items-center bg-[#ec5b13]/5 h-12 rounded-2xl px-4 shadow-sm">
            <UiIcon as={Search} size={20} className="text-[#ec5b13]" />
            <TextInput 
              placeholder="Search bread, cakes or bakeries"
              className="flex-1 ml-3 text-base text-foreground font-medium"
              placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
            />
          </View>
        </View>

        {/* Hero Carousel */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-4" snapToInterval={320} decelerationRate="fast">
          <View className="flex-row gap-4 h-48">
            <View className="w-[300px] h-full rounded-3xl overflow-hidden relative shadow-lg">
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHWxC8-6CeWLxwWnoUOFklByGsuVcIjFIVh5kxX1bptVgnSvSvn49ywxPJYqEa6kJO4QLekJ7ohJiRb0TiBHoyyA1w1R5Y3KWBAKCzfulscIlMnDmON_Ly6ZTHWK-VRMDJTV6pMUsK1QVLnekLIK4-ugbDLAeXUIZnb5OmeRjP0diqOQYNOlDQHnXoZ6agwcI-_W4bt6iRh6XuORZWi--ZCmphy14rqZAywdsN8Pp3H8zhlj_9pv8MnDBaIAJtViuAOfIaA4r_Eiw' }}
                className="w-full h-full"
              />
              <View className="absolute inset-0 bg-black/40 p-4 justify-end">
                <Text className="text-white text-lg font-black">Morning Freshness</Text>
                <Text className="text-white/80 text-sm font-bold">20% Off Sourdough Today</Text>
              </View>
            </View>
            <View className="w-[300px] h-full rounded-3xl overflow-hidden relative shadow-lg">
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC88Ym-jETFufQMKARWYgrfmXI1JiOdhnPQNfM95f-Wa_Xcw_yN-3rVGtddWMM6NYBCC97IkoCpiTQhRPhoNUnTIKOnHvL9ANybrIgsILjaNgKLHlh6JH_oiiO-xN_1nu4KApIyOsnhWwlhcNzH8ldGaQ04920qmH6sSaEkrcFMCVMcuzLdO1i7d3GBCKpFICbLVvdwpEN4MyWZAtvB13NH6nyEIhS1uw29LKzIEa8aA3PKJiTZuZzNZ18kgSjg1dxbG36agMf1ZDw' }}
                className="w-full h-full"
              />
              <View className="absolute inset-0 bg-black/40 p-4 justify-end">
                <Text className="text-white text-lg font-black">Sweet Delights</Text>
                <Text className="text-white/80 text-sm font-bold">New custom cake flavors</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Categories */}
        <View className="py-4">
          <Text className="text-slate-900 dark:text-slate-100 text-lg font-black px-4 mb-4">Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
            <View className="flex-row gap-6">
              {categories.map((cat, idx) => (
                <View key={idx} className="items-center gap-2">
                  <View className={`size-16 rounded-full items-center justify-center ${idx === 0 ? 'bg-[#ec5b13]' : 'bg-[#ec5b13]/10'}`}>
                    <UiIcon as={cat.icon} size={28} className={idx === 0 ? 'text-white' : 'text-[#ec5b13]'} />
                  </View>
                  <Text className="text-[10px] font-black uppercase tracking-widest text-slate-500">{cat.name}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Signature Products Section */}
        <View className="py-6 bg-[#ec5b13]/5">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="text-slate-900 dark:text-slate-100 text-lg font-black">Signature Specials</Text>
            <Pressable>
              <Text className="text-[#ec5b13] text-sm font-black">View all</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
            <View className="flex-row gap-4 pb-4">
              {featuredCakes.map((product) => (
                <Pressable 
                  key={product._id}
                  onPress={() => router.push(`/customer/restaurants/product/${product._id}` as any)}
                  className="w-40 bg-background rounded-2xl p-3 shadow-sm border border-[#ec5b13]/10">
                  <Image source={{ uri: product.image }} className="w-full aspect-square rounded-xl bg-muted mb-2" />
                  <Text numberOfLines={1} className="font-black text-sm text-foreground">{product.name}</Text>
                  <Text className="text-[#ec5b13] font-black text-sm mt-1">ETB {product.price}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Popular Grid */}
        <View className="p-4 pb-24">
          <Text className="text-slate-900 dark:text-slate-100 text-lg font-black mb-4">Popular Near You</Text>
          <View className="flex-row flex-wrap gap-4">
            {popularProducts.map((product) => (
              <Pressable 
                key={product._id}
                onPress={() => router.push(`/customer/restaurants/product/${product._id}` as any)}
                className="w-[165px] bg-background rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
                <Image source={{ uri: product.image }} className="w-full aspect-square bg-muted" />
                <View className="p-3">
                  <Text numberOfLines={1} className="font-black text-sm text-foreground">{product.name}</Text>
                  <Text className="text-slate-400 text-[10px] font-bold italic">{(product.owner as any)?.companyName || 'Artisan Bakery'}</Text>
                  <View className="flex-row items-center justify-between mt-1">
                    <Text className="text-[#ec5b13] font-black text-sm">ETB {product.price}</Text>
                    <View className="bg-[#ec5b13] size-6 rounded-full items-center justify-center">
                      <UiIcon as={Plus} size={14} className="text-white" strokeWidth={3} />
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Modern Bottom Nav */}
      <View className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 px-4 pb-4 pt-2">
        <View className="flex-row justify-around">
          <Pressable onPress={() => router.push('/(customer)/restaurants')} className="items-center gap-1">
            <UiIcon as={Home} size={24} className="text-slate-400" />
            <Text className="text-[10px] font-bold text-slate-400">Home</Text>
          </Pressable>
          <Pressable className="items-center gap-1">
            <UiIcon as={Compass} size={24} className="text-[#ec5b13]" />
            <Text className="text-[10px] font-black text-[#ec5b13]">Explore</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/(customer)/orders')} className="items-center gap-1">
            <UiIcon as={Clock} size={24} className="text-slate-400" />
            <Text className="text-[10px] font-bold text-slate-400">Orders</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/(customer)/profile')} className="items-center gap-1">
            <UiIcon as={User} size={24} className="text-slate-400" />
            <Text className="text-[10px] font-bold text-slate-400">Profile</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
