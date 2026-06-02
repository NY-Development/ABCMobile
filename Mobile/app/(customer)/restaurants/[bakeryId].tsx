import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, Pressable, Image, ActivityIndicator } from 'react-native';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useMemo } from 'react';
import { useOwnerProductsQuery, useAllProductsQuery } from '@/src/features/restaurants/restaurants.hooks';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  Clock, 
  MapPin, 
  ShoppingBag,
  Info 
} from 'lucide-react-native';
import { Icon as UiIcon } from '@/components/ui/icon';
import { useGetCartQuery } from '@/src/features/cart/cart.hooks';

export default function BakeryDetailsScreen() {
  const { bakeryId } = useLocalSearchParams<{ bakeryId: string }>();
  const isDark = useThemeStore((state) => state.isDark);
  const [activeTab, setActiveTab] = useState('products');
  
  const { data: products, isLoading } = useOwnerProductsQuery(bakeryId as string);
  const { data: cart } = useGetCartQuery();

  const cartStats = useMemo(() => {
    if (!cart) return { count: 0, total: 0 };
    const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    return { count, total };
  }, [cart]);

  const bakeryInfo = useMemo(() => {
    if (!products || products.length === 0) return null;
    const owner = typeof products[0].owner !== 'string' ? products[0].owner : null;
    return {
      name: owner?.companyName || 'Adama Bakery & Cake',
      description: 'Freshly baked artisan breads and custom cakes',
      rating: 4.8,
      reviews: '1.2k+',
      deliveryFee: 'Free',
      pricing: '$$',
      about: 'Founded in 2012, Adama Bakery specializes in traditional sourdough and contemporary pastry arts. We use organic locally-sourced grains to ensure every bite is a celebration of flavor.',
      hours: 'Open until 8:00 PM',
      distance: '1.2 km away',
      heroImage: owner?.companyImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4bYDfu1itvo-9Bw6vAhGn9EPhnwJwHiAT3mDICGeUsm1Vwq2Zg-F5w4ibR4458bCWe8sfdKLpVTzs-8WscI3v6BjsVmsDd035tcMz7Gb-ZPtGi4FpskKFmX92mgJOwIHApdR77vD01RIkBgtm_pC7uLI6fj8LXExtKlfPWJr65l2cjcbDeEGOtxzgoOSyPCaIPvpQtQh65N1HgYgaDdWvQB9Pt9C1cdU0ibKq4uzUGPfqmLdfhu5TtfjjI-IYGd0xkOKmCNw9ABQ',
      logo: owner?.companyImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyxhkqJOWzU3I6hIBZ0J3Siexr6b4FO629OeOdHpGgp_dgLYdZ59MhND-WllJFPF0Ye0Ezl2C1lNEjj-_d_qPp_ug95bjZF87UmwOIK82nJpZPLOCXGolLUUU1O9m9y7VLYZ6Ttwufd_teDuEKqU_FxYNhx65Pc-PzTcJ6jG_Sh2Y2UNWpUg9QspwXvywucdBJ1yu0rVlnLQ8DlLuGFsRohnlju1KEeYbyPv7lnuI9JjwsS0NolMPX_OfuFG_J1jySMlEFdWDWhYE',
    };
  }, [products]);

  const categories = useMemo(() => {
    if (!products) return [];
    const catMap = new Map();
    products.forEach(p => {
      if (!catMap.has(p.category)) catMap.set(p.category, []);
      catMap.get(p.category).push(p);
    });
    return Array.from(catMap.entries()).map(([name, items]) => ({ name, items }));
  }, [products]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#ec5b13" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Top Navigation Bar */}
      <View className="flex-row items-center bg-background/80 backdrop-blur-md p-4 justify-between border-b border-[#ec5b13]/10">
        <Pressable
          className="flex size-10 items-center justify-center rounded-full bg-[#ec5b13]/10"
          onPress={() => router.back()}>
          <UiIcon as={ArrowLeft} size={20} className="text-[#ec5b13]" />
        </Pressable>
        <View className="flex-row items-center gap-2">
          <Pressable className="flex size-10 items-center justify-center rounded-full active:bg-[#ec5b13]/10">
            <UiIcon as={Heart} size={20} className="text-[#ec5b13]" />
          </Pressable>
          <Pressable className="flex size-10 items-center justify-center rounded-full active:bg-[#ec5b13]/10">
            <UiIcon as={Share2} size={20} className="text-[#ec5b13]" />
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[3]}>
        {/* Hero Section */}
        <View className="relative w-full h-64 p-4">
          <View className="w-full h-full rounded-3xl overflow-hidden shadow-lg bg-muted">
            <Image 
              source={{ uri: bakeryInfo?.heroImage }} 
              className="w-full h-full" 
              resizeMode="cover" 
            />
          </View>
          {/* Logo Overlay */}
          <View className="absolute -bottom-6 left-10">
            <View className="size-20 rounded-2xl bg-white dark:bg-slate-800 p-1 shadow-xl border-2 border-[#ec5b13]/20">
              <Image 
                source={{ uri: bakeryInfo?.logo }} 
                className="w-full h-full rounded-xl" 
                resizeMode="cover" 
              />
            </View>
          </View>
        </View>

        {/* Bakery Info Section */}
        <View className="px-4 pt-10 pb-4">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-slate-900 dark:text-slate-100 text-2xl font-black tracking-tight">
                {bakeryInfo?.name}
              </Text>
              <Text className="text-[#ec5b13] font-bold mt-0.5">{bakeryInfo?.description}</Text>
            </View>
            <View className="bg-[#ec5b13]/10 px-3 py-1.5 rounded-full flex-row items-center gap-1">
              <UiIcon as={Star} size={14} className="text-[#ec5b13] fill-[#ec5b13]" />
              <Text className="text-sm font-black text-[#ec5b13]">{bakeryInfo?.rating}</Text>
            </View>
          </View>
          
          <View className="flex-row items-center gap-4 mt-3">
            <View className="flex-row items-center gap-1.5">
              <UiIcon as={Clock} size={14} className="text-slate-400" />
              <Text className="text-xs font-bold text-slate-500">{bakeryInfo?.hours}</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <UiIcon as={MapPin} size={14} className="text-slate-400" />
              <Text className="text-xs font-bold text-slate-500">{bakeryInfo?.distance}</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="flex-row gap-3 p-4">
          {[
            { label: 'Reviews', value: bakeryInfo?.reviews, color: 'text-foreground' },
            { label: 'Delivery', value: bakeryInfo?.deliveryFee, color: 'text-[#ec5b13]' },
            { label: 'Pricing', value: bakeryInfo?.pricing, color: 'text-foreground' }
          ].map((stat, i) => (
            <View key={i} className="flex-1 bg-[#ec5b13]/5 border border-[#ec5b13]/10 rounded-2xl p-4 gap-1">
              <Text className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</Text>
              <Text className={`text-lg font-black ${stat.color}`}>{stat.value}</Text>
            </View>
          ))}
        </View>

        {/* Tabs Section */}
        <View className="bg-background/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
          <View className="flex-row px-4 gap-8">
            {[
              { id: 'products', label: 'Products' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'info', label: 'Info' }
            ].map((tab) => (
              <Pressable 
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                className={`pb-3 pt-4 border-b-4 ${activeTab === tab.id ? 'border-[#ec5b13]' : 'border-transparent'}`}>
                <Text className={`text-xs font-black uppercase tracking-[2px] ${activeTab === tab.id ? 'text-[#ec5b13]' : 'text-slate-400'}`}>
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Dynamic Content Based on Tabs */}
        {activeTab === 'products' && (
          <View className="p-4 space-y-8 pb-32">
            {categories.map((cat, idx) => (
              <View key={idx} className="mb-8">
                <View className="flex-row items-center gap-2 mb-4">
                  <View className="w-1 h-6 bg-[#ec5b13] rounded-full" />
                  <Text className="text-slate-900 dark:text-slate-100 text-xl font-black">{cat.name}</Text>
                </View>
                <View className="gap-4">
                  {cat.items.map((product: any) => (
                    <Pressable
                      key={product._id}
                      onPress={() => router.push(`/customer/restaurants/product/${product._id}` as any)}
                      className="flex-row gap-4 bg-white dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98]">
                      <View className="size-20 rounded-xl bg-slate-100 dark:bg-slate-900/50 overflow-hidden">
                        <Image source={{ uri: product.image }} className="w-full h-full" resizeMode="cover" />
                      </View>
                      <View className="flex-1 justify-between py-1">
                        <View>
                          <Text className="font-black text-slate-900 dark:text-slate-100 text-base">{product.name}</Text>
                          <Text numberOfLines={1} className="text-xs font-medium text-slate-500 mt-0.5">{product.description || 'Natural fermentation, fresh baked'}</Text>
                        </View>
                        <Text className="font-black text-[#ec5b13] text-lg">ETB {product.price}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'info' && (
          <View className="p-4 pt-6 space-y-6 pb-32">
            <View>
              <Text className="text-lg font-black text-foreground mb-2">About</Text>
              <Text className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {bakeryInfo?.about}
              </Text>
            </View>
            <View className="bg-muted p-4 rounded-2xl flex-row items-center gap-3">
              <UiIcon as={Info} size={20} className="text-primary" />
              <Text className="text-xs font-bold text-muted-foreground flex-1">
                We use organic locally-sourced grains to ensure every bite is a celebration of flavor.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button: Cart */}
      {cartStats.count > 0 && (activeTab === 'products') && (
        <View className="absolute bottom-10 left-0 right-0 items-center px-6">
          <Pressable
            onPress={() => router.push('/(customer)/cart')}
            className="w-full flex-row items-center justify-between bg-[#ec5b13] px-6 py-4 rounded-[32px] shadow-2xl active:scale-95">
            <View className="flex-row items-center gap-3">
              <UiIcon as={ShoppingBag} size={24} className="text-white" />
              <Text className="font-black text-white text-lg">View Cart ({cartStats.count})</Text>
            </View>
            <View className="bg-white/20 px-3 py-1.5 rounded-xl">
              <Text className="text-sm font-black text-white">ETB {cartStats.total.toFixed(2)}</Text>
            </View>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
