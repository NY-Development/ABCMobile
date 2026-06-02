import { router } from 'expo-router';
import { View, Text, ScrollView, Pressable, Image, FlatList, ActivityIndicator } from 'react-native';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { useState, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAllProductsQuery } from '@/src/features/restaurants/restaurants.hooks';
import { Owner, Product } from '@/src/features/restaurants/restaurants.types';
import { 
  ChevronLeft, 
  Search, 
  Star, 
  MapPin, 
  Clock,
  ArrowRight,
  Navigation,
  SlidersHorizontal
} from 'lucide-react-native';
import { Icon as UiIcon } from '@/components/ui/icon';

export default function AllBakeriesScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const [selectedFilter, setSelectedFilter] = useState('nearby');
  const { data: products, isLoading } = useAllProductsQuery();

  const bakeries = useMemo(() => {
    if (!products) return [];
    
    // Group products by owner to get unique bakeries
    const ownerMap = new Map<string, Owner>();
    products.forEach((p: Product) => {
      if (typeof p.owner !== 'string') {
        ownerMap.set(p.owner._id, p.owner);
      }
    });

    return Array.from(ownerMap.values()).map(owner => ({
      id: owner._id,
      name: owner.companyName || owner.name || 'Bakery',
      rating: 4.8, 
      distance: '1.2 km',
      location: 'Downtown District',
      description: `Artisan bakery famous for traditional sourdough, flaky croissants, and seasonal pastries.`,
      status: 'Open Until 8:00 PM',
      isOpen: true,
      image: owner.companyImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUPR5hsfobriGXeLVBsCapVz1M7TU7UxaHWAYchcUX7oFsq58zhFp00IcPY6VGDQbaEMqATUHyADHvniiVhHCfZQFdiYYfE3Y_jEwI1MS6fXtqmwXfv41-9kVWRX64tLRARHasgGcj_LidbDzIwSuvAHB7uGPTwukv9F5urVH94f8B0NajK8bNkOFFZ5tknwusEG_R8FTs0HGI7EQXLM4zJ3l1-VjZfdK2Ok7ocmfvNi79vQ3LnT6UWb4p4RwLE4gUXYTKqqHF3MU',
    }));
  }, [products]);

  const filters = [
    { id: 'nearby', label: 'Nearby', icon: Navigation },
    { id: 'toprated', label: 'Top Rated', icon: Star },
    { id: 'opennow', label: 'Open Now', icon: Clock },
  ];

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#ec5b13" />
      </SafeAreaView>
    );
  }

  const renderBakeryCard = ({ item }: { item: any }) => (
    <Pressable
      onPress={() => router.push(`/customer/restaurants/${item.id}` as any)}
      className="bg-card rounded-[24px] border border-slate-100 dark:border-slate-800 mb-6 overflow-hidden shadow-sm active:scale-[0.98]">
      <View className="relative aspect-[16/9] w-full bg-muted">
        <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />
        {!item.isOpen && (
          <View className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <Text className="text-xl font-black text-white uppercase tracking-[4px]">Closed</Text>
          </View>
        )}
        <View className="absolute right-3 top-3 flex-row items-center gap-1 rounded-xl bg-white/90 dark:bg-slate-900/90 px-2.5 py-1.5 shadow-sm">
          <UiIcon as={Star} size={12} className="text-[#ec5b13] fill-[#ec5b13]" />
          <Text className="text-[10px] font-black text-foreground">{item.rating}</Text>
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-lg font-black text-foreground tracking-tight">{item.name}</Text>
            <View className="mt-1 flex-row items-center gap-1">
              <UiIcon as={MapPin} size={12} className="text-slate-500" />
              <Text className="text-xs font-bold text-slate-500">
                {item.distance} • {item.location}
              </Text>
            </View>
          </View>
        </View>

        <Text numberOfLines={2} className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
          {item.description}
        </Text>

        <View className="mt-4 flex-row items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
          <Text className="text-[10px] font-black text-[#ec5b13] uppercase tracking-widest">
            {item.status}
          </Text>
          <Pressable 
            onPress={() => router.push(`/customer/restaurants/${item.id}` as any)}
            className="bg-[#ec5b13] px-5 py-2.5 rounded-xl shadow-md shadow-[#ec5b13]/20">
            <Text className="text-white text-xs font-black uppercase tracking-widest">View Details</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center bg-background/80 backdrop-blur-md px-4 py-4 border-b border-slate-200 dark:border-slate-800">
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-[#ec5b13]/10">
          <UiIcon as={ChevronLeft} size={20} className="text-[#ec5b13]" />
        </Pressable>
        <Text className="flex-1 px-4 text-lg font-black text-foreground tracking-tight">Adama Bakeries</Text>
        <Pressable className="h-10 w-10 items-center justify-center rounded-full active:bg-muted">
          <UiIcon as={Search} size={18} className="text-slate-700 dark:text-slate-300" />
        </Pressable>
      </View>

      <ScrollView stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false}>
        {/* Adama Header Intro (Optional visual space) */}
        <View className="h-2" />

        {/* Filter Chips Container */}
        <View className="bg-background/95 backdrop-blur-md py-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
            <View className="flex-row gap-3">
              {filters.map((filter) => (
                <Pressable
                  key={filter.id}
                  onPress={() => setSelectedFilter(filter.id)}
                  className={`h-11 flex-row items-center px-5 rounded-xl ${
                    selectedFilter === filter.id
                      ? 'bg-[#ec5b13] shadow-lg shadow-[#ec5b13]/20'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                  }`}>
                  <UiIcon 
                    as={filter.icon} 
                    size={14} 
                    className={selectedFilter === filter.id ? 'text-white' : 'text-slate-700 dark:text-slate-200'} 
                  />
                  <Text className={`ml-2 text-sm font-black ${
                    selectedFilter === filter.id ? 'text-white' : 'text-slate-700 dark:text-slate-200'
                  }`}>
                    {filter.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Bakery List */}
        <View className="p-4 pb-32">
          {bakeries.length === 0 ? (
            <View className="items-center justify-center py-20 p-6 bg-card rounded-3xl border border-dashed border-border">
              <UiIcon as={Search} size={48} className="text-muted-foreground opacity-20 mb-4" />
              <Text className="text-muted-foreground font-black uppercase tracking-widest text-center">No bakeries found in this area</Text>
            </View>
          ) : (
            bakeries.map((bakery) => (
              <View key={bakery.id}>
                {renderBakeryCard({ item: bakery })}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
