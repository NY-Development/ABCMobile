import React, { useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Image, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ROUTES } from '../../constants/routes';
import { useThemeStore } from '../../store/themeStore';
import {
  fetchOwnerProducts,
  fetchOwnerReviews,
  type OwnerReviewsResponse,
  type Product,
} from '../../services/customerService';
import type { CustomerStackParamList } from '../../types/navigation';

const DEFAULT_TABS = ['Products', 'Reviews', 'Info'] as const;
const CATEGORY_FILTERS = ['All Items', 'Breads', 'Pastries', 'Cakes', 'Drinks'] as const;

type ScreenRoute = RouteProp<CustomerStackParamList, 'CustomerStorefront'>;
type TabKey = (typeof DEFAULT_TABS)[number];
type CategoryKey = (typeof CATEGORY_FILTERS)[number];

const FALLBACK_PRODUCT_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBMf9clQa2Dd5okXlcYCAmLMPoNbjvCbXeJRj5VuZxUZIvJD6b-rQ-aj1qCh6Q1oxwSVj3sjYiG42RdqINnct3XSwwxdH_DS4HfdIYSWeY__JVfvr5eSdXJfSpWRQzFXq308czgVV_aws8ikjxl7w-4RQWSoQGBY0rK1g_fWeouW5Vq7OAA0efTJFGYOHk_CQVifEOBJo4As2ECtYNdLMJhOfRbA9HFYSpmMDWVA8K6b-YwiehIMhTa0-d8q76fKukMRMzWLhsLSLMD';

export const CustomerStorefrontScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<CustomerStackParamList, 'CustomerStorefront'>>();
  const route = useRoute<ScreenRoute>();
  const { mode, toggle } = useThemeStore();
  const insets = useSafeAreaInsets();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';

  const [activeTab, setActiveTab] = useState<TabKey>('Products');
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('All Items');
  const [products, setProducts] = useState<Product[]>([]);
  const [reviewsData, setReviewsData] = useState<OwnerReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const ownerName = route.params?.ownerName ?? 'Golden Crumb Artisan';
  const ownerImage = route.params?.ownerImage;
  const ownerRating = route.params?.rating ?? 4.8;
  const ownerReviewsCount = route.params?.reviewsCount ?? 120;
  const ownerLocation = route.params?.location ?? '12 Bole Road, Adama';
  const ownerStatus = route.params?.status ?? 'Open Now';
  const ownerId = route.params?.ownerId;

  const ownerPhoneFromParams = route.params?.ownerPhone;
  const ownerEmailFromParams = route.params?.ownerEmail;

  useEffect(() => {
    let isMounted = true;
    const load = async (currentOwnerId: string) => {
      try {
        setLoading(true);
        const [productsResponse, reviewsResponse] = await Promise.all([
          fetchOwnerProducts(currentOwnerId),
          fetchOwnerReviews(currentOwnerId),
        ]);
        if (!isMounted) return;
        setProducts(productsResponse);
        setReviewsData(reviewsResponse);
      } catch {
        if (!isMounted) return;
        setProducts([]);
        setReviewsData(null);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    if (ownerId) {
      load(ownerId);
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [ownerId]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All Items') return products;

    const matcher: Record<Exclude<CategoryKey, 'All Items'>, RegExp> = {
      Breads: /(bread|baguette|sourdough|loaf|rye)/i,
      Pastries: /(pastry|croissant|danish|eclair|cinnamon)/i,
      Cakes: /(cake|gateau|cheesecake|muffin)/i,
      Drinks: /(drink|coffee|tea|juice)/i,
    };

    const regex = matcher[activeCategory as Exclude<CategoryKey, 'All Items'>];
    return products.filter((product) => regex.test(`${product.name} ${product.category ?? ''}`));
  }, [activeCategory, products]);

  const reviewStats = useMemo(() => {
    const reviews = reviewsData?.reviews ?? [];
    const total = reviews.length;
    const initial = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>;

    reviews.forEach((review) => {
      const key = Math.min(5, Math.max(1, Math.round(review.rating)));
      initial[key] += 1;
    });

    return {
      total,
      average: Number(reviewsData?.averageRating ?? ownerRating),
      counts: initial,
    };
  }, [ownerRating, reviewsData]);

  const ownerPhone = useMemo(() => {
    if (ownerPhoneFromParams) return ownerPhoneFromParams;
    const ownerFromProduct = products.find(
      (product) => typeof product.owner === 'object' && product.owner !== null,
    )?.owner as Product['owner'] & { phone?: string };

    return ownerFromProduct?.phone ?? '';
  }, [ownerPhoneFromParams, products]);

  const ownerEmail = useMemo(() => {
    if (ownerEmailFromParams) return ownerEmailFromParams;
    const ownerFromProduct = products.find(
      (product) => typeof product.owner === 'object' && product.owner !== null,
    )?.owner as Product['owner'] & { email?: string };

    return ownerFromProduct?.email ?? '';
  }, [ownerEmailFromParams, products]);

  const openExternal = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      Alert.alert('Unable to open app', 'No compatible app is available on this device.');
      return;
    }
    await Linking.openURL(url);
  };

  const handleCallPress = () => {
    if (!ownerPhone) {
      Alert.alert('Phone not available', 'This bakery has no phone number yet.');
      return;
    }

    Alert.alert('Call permission', `Allow opening your dialer to call ${ownerPhone}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Allow',
        onPress: async () => {
          const normalizedPhone = ownerPhone.replace(/\s+/g, '');
          await openExternal(`tel:${normalizedPhone}`);
        },
      },
    ]);
  };

  const handleMessagePress = () => {
    if (!ownerPhone && !ownerEmail) {
      Alert.alert('Contact not available', 'This bakery has no phone or email yet.');
      return;
    }

    const messageBody = `Hi ${ownerName}, I'd like to ask about your products and availability.`;

    Alert.alert('Message permission', 'Allow opening a messaging app with prefilled content?', [
      { text: 'Cancel', style: 'cancel' },
      ...(ownerPhone
        ? [
            {
              text: 'SMS',
              onPress: async () => {
                const normalizedPhone = ownerPhone.replace(/\s+/g, '');
                await openExternal(`sms:${normalizedPhone}?body=${encodeURIComponent(messageBody)}`);
              },
            },
          ]
        : []),
      ...(ownerEmail
        ? [
            {
              text: 'Email',
              onPress: async () => {
                const subject = `Inquiry for ${ownerName}`;
                await openExternal(
                  `mailto:${ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageBody)}`,
                );
              },
            },
          ]
        : []),
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top']}>
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          stickyHeaderIndices={[2]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 110, 132) }}
        >
          <View className="relative h-[300px]">
            <Image
              source={{
                uri:
                  ownerImage ||
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBGOF-NmBSKiclPYY0rvXyi1QFmMZeasx_5TwU7cs9Tg02QvGQLEsF01_lVy2sFAO77F3q_0L6j4KwQGpNlZ_qSqRxGVCRJ807in2leFNdAPSAB_uA7RyRdMFYISCWyT8jG4BL5nytKURLYtXu21Zj0VMq8msyUBj9udvcl4KNFcpf55rD9cUoF-wda084z_m4RIesHZFRKYuhopg6F_KOiWuFd14RYIJgwSxcu-obGNG1XMSyCQZxW3m7euF_5wMaCb3ztDIOuSSs1',
              }}
              className="h-full w-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-black/35" />
          </View>

          <View className="-mt-8 rounded-t-2xl bg-background-light px-5 pt-6 dark:bg-background-dark">
            <Text className="mb-2 text-2xl font-bold text-text-main dark:text-gray-50">{ownerName}</Text>
            <View className="gap-2 pb-2">
              <View className="flex-row items-center gap-1.5">
                <MaterialCommunityIcons name="star" size={18} color="#ecb613" />
                <Text className="text-sm font-bold text-text-main dark:text-gray-50">{ownerRating.toFixed(1)}</Text>
                <Text className="text-sm text-text-muted dark:text-gray-400">({ownerReviewsCount} reviews)</Text>
                <Text className="text-sm text-text-muted dark:text-gray-400">•</Text>
                <Text className="text-sm font-medium text-primary">{ownerStatus}</Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <MaterialCommunityIcons name="map-marker" size={16} color={isDark ? '#d4c59a' : '#9a864c'} />
                <Text className="text-sm text-text-muted dark:text-gray-400">{ownerLocation}</Text>
              </View>
            </View>
          </View>

          <View className="border-b border-neutral-subtle/20 bg-background-light/95 px-5 pt-2 dark:bg-background-dark/95">
            <View className="flex-row justify-between">
              {DEFAULT_TABS.map((tab) => {
                const active = activeTab === tab;
                return (
                  <Pressable key={tab} onPress={() => setActiveTab(tab)} className="flex-1">
                    <Text
                      className={
                        active
                          ? 'pb-3 text-center text-sm font-bold text-primary'
                          : 'pb-3 text-center text-sm font-medium text-text-muted dark:text-gray-400'
                      }
                    >
                      {tab}
                    </Text>
                    {active ? <View className="h-0.5 bg-primary" /> : <View className="h-0.5 bg-transparent" />}
                  </Pressable>
                );
              })}
            </View>
          </View>

          {activeTab === 'Products' ? (
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5 py-4">
                <View className="flex-row gap-3">
                  {CATEGORY_FILTERS.map((category) => {
                    const active = activeCategory === category;
                    return (
                      <Pressable
                        key={category}
                        onPress={() => setActiveCategory(category)}
                        className={
                          active
                            ? 'rounded-xl bg-primary px-4 py-2'
                            : 'rounded-xl border border-neutral-subtle/20 bg-surface-light px-4 py-2 dark:bg-surface-dark'
                        }
                      >
                        <Text className={active ? 'text-sm font-bold text-neutral-text-dark' : 'text-sm font-medium text-text-main dark:text-gray-100'}>
                          {category}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>

              <View className="flex-row flex-wrap gap-4 px-5 pb-6">
                {loading ? (
                  <Text className="text-sm font-semibold text-text-muted dark:text-gray-400">Loading products...</Text>
                ) : filteredProducts.length === 0 ? (
                  <View className="w-full rounded-2xl border border-dashed border-primary/30 bg-surface-light p-5 dark:bg-surface-dark">
                    <Text className="text-sm font-semibold text-text-main dark:text-gray-100">No items in this category yet.</Text>
                    <Text className="mt-1 text-xs text-text-muted dark:text-gray-400">Try another filter.</Text>
                  </View>
                ) : (
                  <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    scrollEnabled={false}
                    columnWrapperStyle={{ gap: 12 }}
                    contentContainerStyle={{ gap: 12 }}
                    renderItem={({ item: product }) => (
                      <Pressable
                        onPress={() =>
                          navigation.navigate(ROUTES.ProductDetail, {
                            productId: product._id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            description: product.description,
                            ownerName,
                          })
                        }
                        className="flex-1 rounded-xl border border-transparent bg-surface-light p-3 shadow-sm dark:border-neutral-subtle/10 dark:bg-surface-dark"
                      >
                        <View className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-neutral-light dark:bg-neutral-dark">
                          <Image
                            source={{ uri: product.image || FALLBACK_PRODUCT_IMAGE }}
                            className="h-full w-full"
                            resizeMode="cover"
                          />
                          <View className="absolute bottom-2 right-2 h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
                            <MaterialCommunityIcons name="plus" size={16} color="#1b180d" />
                          </View>
                        </View>
                        <Text className="mb-1 text-sm font-bold leading-tight text-text-main dark:text-gray-50" numberOfLines={2}>
                          {product.name}
                        </Text>
                        <Text className="text-base font-bold text-primary">ETB {Number(product.price).toLocaleString()}</Text>
                      </Pressable>
                    )}
                  />
                )}
              </View>
            </View>
          ) : null}

          {activeTab === 'Reviews' ? (
            <View className="px-5 py-6">
              <View className="mb-8 flex-row items-center gap-8 rounded-2xl border border-neutral-subtle/10 bg-surface-light p-6 dark:bg-surface-dark">
                <View className="items-center">
                  <Text className="mb-1 text-5xl font-bold text-text-main dark:text-gray-50">{reviewStats.average.toFixed(1)}</Text>
                  <View className="mb-1 flex-row items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const icon = i < Math.floor(reviewStats.average) ? 'star' : i === Math.floor(reviewStats.average) && reviewStats.average % 1 >= 0.5 ? 'star-half-full' : 'star-outline';
                      return <MaterialCommunityIcons key={`star-${i}`} name={icon} size={14} color="#ecb613" />;
                    })}
                  </View>
                  <Text className="text-xs font-medium text-text-muted dark:text-gray-400">{reviewStats.total || ownerReviewsCount} reviews</Text>
                </View>

                <View className="flex-1 gap-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviewStats.counts[star] || 0;
                    const percent = reviewStats.total ? Math.max(2, Math.round((count / reviewStats.total) * 100)) : star === 5 ? 85 : star === 4 ? 10 : 3;
                    return (
                      <View key={`bar-${star}`} className="flex-row items-center gap-3">
                        <Text className="w-2 text-xs font-bold text-text-muted dark:text-gray-400">{star}</Text>
                        <View className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-subtle/10">
                          <View className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>

              <View className="gap-6">
                {(reviewsData?.reviews ?? []).length > 0 ? (
                  (reviewsData?.reviews ?? []).map((review) => (
                    <View key={review.id} className="border-b border-neutral-subtle/10 pb-6">
                      <View className="mb-3 flex-row items-start justify-between">
                        <View className="flex-row items-center gap-3">
                          <Image
                            source={{ uri: review.customerImage || FALLBACK_PRODUCT_IMAGE }}
                            className="h-10 w-10 rounded-full bg-neutral-subtle/10"
                          />
                          <View>
                            <Text className="text-sm font-bold text-text-main dark:text-gray-50">{review.customerName ?? 'Customer'}</Text>
                            <View className="flex-row">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <MaterialCommunityIcons
                                  key={`${review.id}-star-${i}`}
                                  name={i < Math.round(review.rating) ? 'star' : 'star-outline'}
                                  size={12}
                                  color="#ecb613"
                                />
                              ))}
                            </View>
                          </View>
                        </View>
                        <Text className="text-xs text-text-muted dark:text-gray-400">
                          {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}
                        </Text>
                      </View>
                      <Text className="text-sm leading-relaxed text-text-main dark:text-gray-100">{review.comment || 'Great experience!'}</Text>
                    </View>
                  ))
                ) : (
                  <View className="rounded-2xl border border-dashed border-primary/30 bg-surface-light p-5 dark:bg-surface-dark">
                    <Text className="text-sm font-semibold text-text-main dark:text-gray-100">No reviews yet.</Text>
                    <Text className="mt-1 text-xs text-text-muted dark:text-gray-400">Reviews will appear after customers leave feedback.</Text>
                  </View>
                )}
              </View>
            </View>
          ) : null}

          {activeTab === 'Info' ? (
            <View className="space-y-8 px-6 py-8">
              <View>
                <Text className="mb-3 text-lg font-bold text-text-main dark:text-gray-50">Our Story</Text>
                <Text className="text-[15px] leading-relaxed text-text-muted dark:text-gray-300">
                  Founded in the heart of Adama, {ownerName} brings the timeless tradition of slow-fermented sourdough and delicate French pastries to your doorstep. We use locally sourced grains and traditional techniques to ensure every bite tells a story of quality and passion.
                </Text>
              </View>

              <View className="flex-row gap-4">
                <Pressable onPress={handleCallPress} className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-neutral-subtle/20 bg-surface-light py-3.5 shadow-sm dark:bg-surface-dark">
                  <MaterialCommunityIcons name="phone" size={18} color="#ecb613" />
                  <Text className="font-semibold text-text-main dark:text-gray-100">Call Us</Text>
                </Pressable>
                <Pressable onPress={handleMessagePress} className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-neutral-subtle/20 bg-surface-light py-3.5 shadow-sm dark:bg-surface-dark">
                  <MaterialCommunityIcons name="chat-processing-outline" size={18} color="#ecb613" />
                  <Text className="font-semibold text-text-main dark:text-gray-100">Message</Text>
                </Pressable>
              </View>

              <View>
                <Text className="mb-4 text-lg font-bold text-text-main dark:text-gray-50">Opening Hours</Text>
                <View className="gap-3">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-medium text-text-main dark:text-gray-100">Monday - Friday</Text>
                    <Text className="text-text-muted dark:text-gray-400">07:00 AM - 08:00 PM</Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="font-medium text-text-main dark:text-gray-100">Saturday</Text>
                    <Text className="text-text-muted dark:text-gray-400">08:00 AM - 09:00 PM</Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="font-medium text-text-main dark:text-gray-100">Sunday</Text>
                    <Text className="text-text-muted dark:text-gray-400">08:00 AM - 04:00 PM</Text>
                  </View>
                </View>
              </View>

              <View>
                <View className="mb-4 flex-row items-center justify-between">
                  <Text className="text-lg font-bold text-text-main dark:text-gray-50">Location</Text>
                  <Text className="text-sm font-semibold text-primary">Get Directions</Text>
                </View>

                <View className="relative h-48 w-full overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-800">
                  <Image
                    source={{
                      uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQjoZub2aXBrYTuDVnUmAyfCq-3XzVNbeVyqAgHp3GE3E5gHw2ywRI8B_qD0PJI50eaPl6UUiRCq3ZGy-bdP0U6V25ALQTRO73VCq62R3uK3tfv93ca70VxBsWSUkOx5rLtEhpdkB42gN7jMwE13ootJ_zs5xIzPqZ7ACJEwNf9JoC3YdI_TPwxJAoojxn3s_5noctl6hLfqTwEa1lCmifxsJL0dfCQNq0qb47XhX2UM-8OK4Uc8txi1lsKMar7lAgWYnIq2fKr8mZ',
                    }}
                    className="h-full w-full"
                    resizeMode="cover"
                  />

                  <View className="absolute inset-0 items-center justify-center">
                    <MaterialCommunityIcons name="map-marker" size={44} color="#ecb613" />
                  </View>

                  <View className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/20 bg-white/90 p-3 dark:bg-neutral-900/90">
                    <Text className="text-xs font-bold text-text-main dark:text-gray-100">12 Bole Road</Text>
                    <Text className="text-[10px] text-text-muted dark:text-gray-400">Adama, Ethiopia</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : null}
        </ScrollView>

        <View className="absolute left-0 right-0 z-50 flex-row items-center justify-between px-4" style={{ top: Math.max(insets.top + 8, 16) }}>
          <Pressable
            onPress={() => navigation.goBack()}
            className="h-10 w-10 items-center justify-center rounded-full bg-white/20"
          >
            <MaterialCommunityIcons name="arrow-left" size={20} color="#ffffff" />
          </Pressable>
          <View className="flex-row gap-3">
            <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <MaterialCommunityIcons name="heart-outline" size={20} color="#ffffff" />
            </Pressable>
            <Pressable
              onPress={toggle}
              className="h-10 w-10 items-center justify-center rounded-full bg-white/20"
            >
              <MaterialCommunityIcons name={toggleIconName} size={20} color="#ffffff" />
            </Pressable>
          </View>
        </View>

        <View className="absolute left-0 right-0 z-40 px-5" style={{ bottom: Math.max(insets.bottom + 8, 16) }}>
          <Pressable className="h-14 flex-row items-center justify-between rounded-xl bg-primary px-5 shadow-xl shadow-primary/30">
            <View className="flex-row items-center gap-3">
              <View className="h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Text className="text-sm font-bold text-neutral-text-dark">2</Text>
              </View>
              <Text className="text-base font-bold text-neutral-text-dark">View Cart</Text>
            </View>
            <Text className="text-lg font-bold text-neutral-text-dark">ETB 230</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
