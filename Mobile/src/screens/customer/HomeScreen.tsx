import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthProvider';
import { useThemeStore } from '../../store/themeStore';
import {
  fetchAllProducts,
  fetchOwners,
  type OwnerUser,
  type Product,
} from '../../services/customerService';
import type { CustomerStackParamList } from '../../types/navigation';

const CATEGORY_FILTERS = ['All', 'Cakes', 'Bread', 'Birthday', 'Wedding'];

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<CustomerStackParamList>>();
  const { user } = useAuth();
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';
  const toggleIconColor = isDark ? '#f97316' : '#9a864c';

  const [owners, setOwners] = useState<OwnerUser[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const [ownersResponse, productsResponse] = await Promise.all([
          fetchOwners(),
          fetchAllProducts(),
        ]);
        if (!isMounted) return;
        setOwners(ownersResponse.filter((owner) => owner.role === 'owner'));
        setProducts(productsResponse);
      } catch (error) {
        if (!isMounted) return;
        setOwners([]);
        setProducts([]);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredOwners = useMemo(() => {
    if (!normalizedSearch) return owners;
    return owners.filter((owner) => {
      const ownerName = owner.ownerInfo?.companyName ?? owner.name;
      return ownerName?.toLowerCase().includes(normalizedSearch);
    });
  }, [normalizedSearch, owners]);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (activeCategory !== 'All') {
      const match = activeCategory.toLowerCase();
      filtered = filtered.filter((product) =>
        (product.category ?? '').toLowerCase().includes(match)
      );
    }
    if (!normalizedSearch) return filtered;
    return filtered.filter((product) => {
      const searchText = `${product.name} ${product.category ?? ''}`.toLowerCase();
      return searchText.includes(normalizedSearch);
    });
  }, [activeCategory, normalizedSearch, products]);

  const featuredOwners = filteredOwners.slice(0, 2);
  const dailyFavorites = filteredProducts.slice(0, 6);

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="bg-background-light/95 px-4 pb-2 pt-2 dark:bg-background-dark/95">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20">
                <Image
                  source={{
                    uri:
                      user?.image ||
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuA_r8GcHYSEruwPi9jpdLVmVxyJkrApqKUVizH8t_7MJECEkZ5F8_Fl7bOsiaHBJqIeE5CQiXvSCO6Wf21aVCUiyQIZyHzYF197S33yN9OOW5HeuGN1QXZYYRxcgCuflqo1eBmJb0y6M4s5FgfjO_4j2jSiNnfqOBgSembUeNUIA-yAafOkBsV9C2WCnMAhXru8CFf15c4CkmLWK7MI0yyThUA94OB3ekkMCUyHM17BGjobd85D7CmMr5TBmfkiP745RzXUVxLJmzKl',
                  }}
                  className="h-full w-full"
                  resizeMode="cover"
                />
              </View>
              <View>
                <Text className="text-xs font-medium text-text-muted dark:text-gray-400">
                  Good Evening,
                </Text>
                <Text className="text-xl font-bold text-text-main dark:text-gray-100">
                  {user?.name ?? 'Customer'}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-2">
              <Pressable
                className="h-10 w-10 items-center justify-center rounded-full bg-surface-light shadow-sm ring-1 ring-border-light dark:bg-surface-dark dark:ring-border-dark"
                onPress={toggle}
              >
                <MaterialCommunityIcons name={toggleIconName} size={20} color={toggleIconColor} />
              </Pressable>
              <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-surface-light shadow-sm ring-1 ring-border-light dark:bg-surface-dark dark:ring-border-dark">
                <View className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                <MaterialCommunityIcons name="bell-outline" size={20} color={toggleIconColor} />
              </Pressable>
            </View>
          </View>

          <View className="mt-4">
            <View className="relative">
              <View className="absolute left-4 top-1/2 -translate-y-1/2">
                <MaterialCommunityIcons
                  name="magnify"
                  size={18}
                  color={isDark ? '#d4c59a' : '#9a864c'}
                />
              </View>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search for croissants, cakes..."
                placeholderTextColor={isDark ? '#d4c59a' : '#9a864c'}
                className="w-full rounded-full bg-neutral-light px-11 py-3.5 text-sm text-text-main shadow-inner dark:bg-surface-dark dark:text-gray-100"
              />
            </View>
          </View>
        </View>

        <View className="mt-4 flex-row gap-3 px-4 pb-2">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3">
              {CATEGORY_FILTERS.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <Pressable
                    key={category}
                    onPress={() => setActiveCategory(category)}
                    className={
                      isActive
                        ? 'h-10 rounded-full bg-primary px-5 shadow-lg shadow-primary/30'
                        : 'h-10 rounded-full bg-surface-light px-5 ring-1 ring-border-light dark:bg-surface-dark dark:ring-border-dark'
                    }
                  >
                    <View className="flex-1 items-center justify-center">
                      <Text className={isActive ? 'text-sm font-bold text-white' : 'text-sm font-medium text-text-muted dark:text-gray-400'}>
                        {category}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <View className="mt-2 gap-4 px-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold text-text-main dark:text-gray-100">Featured in Adama</Text>
            <Text className="text-xs font-semibold text-primary">See All</Text>
          </View>

          {loading ? (
            <View className="rounded-2xl bg-surface-light p-6 dark:bg-surface-dark">
              <Text className="text-sm font-semibold text-text-muted dark:text-gray-400">
                Loading bakeries...
              </Text>
            </View>
          ) : featuredOwners.length === 0 ? (
            <View className="rounded-2xl border border-dashed border-primary/30 bg-surface-light p-5 dark:bg-surface-dark">
              <Text className="text-sm font-semibold text-text-main dark:text-gray-100">
                No bakeries available yet.
              </Text>
              <Text className="mt-1 text-xs text-text-muted dark:text-gray-400">
                Check back soon for new bakery partners.
              </Text>
            </View>
          ) : (
            featuredOwners.map((owner) => {
              const ownerName = owner.ownerInfo?.companyName ?? owner.name;
              const ownerImage = owner.ownerInfo?.companyImage ?? owner.image;
              const rating = 4.7;
              return (
                <Pressable
                  key={owner._id}
                  onPress={() =>
                    navigation.navigate(ROUTES.CustomerStorefront, {
                      ownerId: owner._id,
                      ownerName,
                      ownerImage,
                      rating,
                      reviewsCount: 120,
                      location: owner.ownerInfo?.location ?? 'Adama',
                      status: 'Open Now',
                    })
                  }
                  className="overflow-hidden rounded-2xl bg-surface-light shadow-lg shadow-primary/5 ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5"
                >
                  <View className="relative aspect-[16/10]">
                    <Image
                      source={{
                        uri:
                          ownerImage ||
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuCJBeepdeR5SBwKaHw3ntOn5X4gQqan4rJ5UXdeiiEr09lpqrxCwmX4O-V33uCrmw8PAxa8djA_FK5hGlLJTscIIGfqD80EvKqxRes0lyxH2q0iiScU2-S4yn43ZMo1Y5R2IVL0fJdC_uzHvY0DfcXvFT2CjYbjdvA974hzxcyYLlYzX9tTkJL8B-e5rHkyLhyHl8FWE9h6m6OcFCcLkLgFNPDrL2SKiNbw6WrlM_4Sa5rWkeZCL7KQjyyHSy8Re-jPDHDx1Rrxw0pI',
                      }}
                      className="h-full w-full"
                      resizeMode="cover"
                    />
                    <View className="absolute bottom-3 left-3 rounded-lg bg-surface-light/90 px-2 py-1 dark:bg-surface-dark/90">
                      <Text className="text-xs font-bold text-text-main dark:text-gray-100">OPEN</Text>
                    </View>
                  </View>
                  <View className="gap-2 p-4">
                    <View className="flex-row items-start justify-between">
                      <View>
                        <Text className="text-lg font-bold text-text-main dark:text-gray-100">
                          {ownerName}
                        </Text>
                        <Text className="text-xs text-text-muted dark:text-gray-400">
                          Artisan Breads • Pastries
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-1 rounded-lg bg-primary/10 px-2 py-1">
                        <MaterialCommunityIcons name="star" size={14} color="#f97316" />
                        <Text className="text-xs font-bold text-primary">{rating.toFixed(1)}</Text>
                      </View>
                    </View>
                    <View className="flex-row items-center gap-4">
                      <View className="flex-row items-center gap-1">
                        <MaterialCommunityIcons name="map-marker" size={14} color={isDark ? '#d4c59a' : '#9a864c'} />
                        <Text className="text-xs text-text-muted dark:text-gray-400">1.2 km</Text>
                      </View>
                      <View className="flex-row items-center gap-1">
                        <MaterialCommunityIcons name="clock-outline" size={14} color={isDark ? '#d4c59a' : '#9a864c'} />
                        <Text className="text-xs text-text-muted dark:text-gray-400">15-20 min</Text>
                      </View>
                      <View className="flex-row items-center gap-1">
                        <MaterialCommunityIcons name="cash" size={14} color={isDark ? '#d4c59a' : '#9a864c'} />
                        <Text className="text-xs text-text-muted dark:text-gray-400">$$$</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            })
          )}
        </View>

        <View className="mt-6 gap-4">
          <View className="flex-row items-center justify-between px-4">
            <Text className="text-lg font-bold text-text-main dark:text-gray-100">Daily Favorites</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 pb-4">
            <View className="flex-row gap-4">
              {dailyFavorites.map((product) => (
                <Pressable
                  key={product._id}
                  onPress={() =>
                    navigation.navigate(ROUTES.ProductDetail, {
                      productId: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      description: product.description,
                      ownerName:
                        typeof product.owner === 'object'
                          ? product.owner?.name
                          : undefined,
                    })
                  }
                  className="w-40 overflow-hidden rounded-2xl bg-surface-light shadow-md ring-1 ring-border-light dark:bg-surface-dark dark:ring-border-dark"
                >
                  <View className="aspect-square w-full">
                    <Image
                      source={{
                        uri:
                          product.image ||
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuBQSNcO8miyLWldgur1XYUhn9GhauV_tYMJAq4DyvsTKEu6nJMa7-WADYIrZY3lZjOfaFnxENFP2ofuAe7CYNCL1gb4aOeKfXeKVPfOzKLg0ybxNGPSzetXd1wtjehMNjUAszZKqAP4LsOCdCTlW7i9F4mDNgGPeeOHzxdZhOM8rCwTsdZbSZwtAPhPrZpASkRyIMqHNi6lGwS7ijOc5QLUrXDroQ3zp4gaY9SExLiDIBYs2dVaXSUHPfag0HWIShepUCZIp2hliINW',
                      }}
                      className="h-full w-full"
                      resizeMode="cover"
                    />
                  </View>
                  <View className="gap-1 p-3">
                    <Text className="truncate text-sm font-bold text-text-main dark:text-gray-100">
                      {product.name}
                    </Text>
                    <Text className="truncate text-xs text-text-muted dark:text-gray-400">
                      {typeof product.owner === 'object' ? product.owner?.name : 'Bakery'}
                    </Text>
                    <View className="mt-2 flex-row items-center justify-between">
                      <Text className="text-sm font-bold text-primary">
                        {Number(product.price).toLocaleString()} ETB
                      </Text>
                      <View className="h-6 w-6 items-center justify-center rounded-full bg-primary">
                        <MaterialCommunityIcons name="plus" size={14} color="#ffffff" />
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
