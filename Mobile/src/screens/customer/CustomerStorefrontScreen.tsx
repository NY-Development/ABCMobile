import React, { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
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

type ScreenRoute = RouteProp<CustomerStackParamList, 'CustomerStorefront'>;

type TabKey = (typeof DEFAULT_TABS)[number];

export const CustomerStorefrontScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<CustomerStackParamList, 'CustomerStorefront'>>();
  const route = useRoute<ScreenRoute>();
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';

  const [activeTab, setActiveTab] = useState<TabKey>('Products');
  const [products, setProducts] = useState<Product[]>([]);
  const [reviewsData, setReviewsData] = useState<OwnerReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const ownerName = route.params?.ownerName ?? 'Bakery';
  const ownerImage = route.params?.ownerImage;
  const ownerRating = route.params?.rating ?? 4.8;
  const ownerReviewsCount = route.params?.reviewsCount ?? 120;
  const ownerLocation = route.params?.location ?? 'Adama';
  const ownerStatus = route.params?.status ?? 'Open Now';
  const ownerId = route.params?.ownerId;

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
      } catch (error) {
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
    }

    return () => {
      isMounted = false;
    };
  }, [ownerId]);

  const productGrid = useMemo(() => {
    if (products.length === 0) {
      return (
        <View className="rounded-2xl border border-dashed border-primary/30 bg-surface-light p-5 dark:bg-surface-dark">
          <Text className="text-sm font-semibold text-text-main dark:text-gray-100">
            No products available yet.
          </Text>
          <Text className="mt-1 text-xs text-text-muted dark:text-gray-400">
            This bakery will add items soon.
          </Text>
        </View>
      );
    }

    return (
      <View className="flex-row flex-wrap gap-4">
        {products.map((product) => (
          <Pressable
            key={product._id}
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
            className="w-[48%] rounded-xl bg-surface-light p-3 shadow-sm ring-1 ring-border-light dark:bg-surface-dark dark:ring-border-dark"
          >
            <View className="mb-3 aspect-square overflow-hidden rounded-lg bg-neutral-light dark:bg-neutral-dark">
              <Image
                source={{
                  uri:
                    product.image ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBMf9clQa2Dd5okXlcYCAmLMPoNbjvCbXeJRj5VuZxUZIvJD6b-rQ-aj1qCh6Q1oxwSVj3sjYiG42RdqINnct3XSwwxdH_DS4HfdIYSWeY__JVfvr5eSdXJfSpWRQzFXq308czgVV_aws8ikjxl7w-4RQWSoQGBY0rK1g_fWeouW5Vq7OAA0efTJFGYOHk_CQVifEOBJo4As2ECtYNdLMJhOfRbA9HFYSpmMDWVA8K6b-YwiehIMhTa0-d8q76fKukMRMzWLhsLSLMD',
                }}
                className="h-full w-full"
                resizeMode="cover"
              />
              <View className="absolute bottom-2 right-2 h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
                <MaterialCommunityIcons name="plus" size={16} color="#1b180d" />
              </View>
            </View>
            <Text className="text-sm font-bold text-text-main dark:text-gray-100" numberOfLines={2}>
              {product.name}
            </Text>
            <Text className="mt-1 text-base font-bold text-primary">
              ETB {Number(product.price).toLocaleString()}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  }, [navigation, ownerName, products]);

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="relative h-72">
          <Image
            source={{
              uri:
                ownerImage ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBGOF-NmBSKiclPYY0rvXyi1QFmMZeasx_5TwU7cs9Tg02QvGQLEsF01_lVy2sFAO77F3q_0L6j4KwQGpNlZ_qSqRxGVCRJ807in2leFNdAPSAB_uA7RyRdMFYISCWyT8jG4BL5nytKURLYtXu21Zj0VMq8msyUBj9udvcl4KNFcpf55rD9cUoF-wda084z_m4RIesHZFRKYuhopg6F_KOiWuFd14RYIJgwSxcu-obGNG1XMSyCQZxW3m7euF_5wMaCb3ztDIOuSSs1',
            }}
            className="h-full w-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

          <View className="absolute left-0 right-0 top-0 flex-row items-center justify-between px-4 pt-6">
            <Pressable
              onPress={() => navigation.goBack()}
              className="h-10 w-10 items-center justify-center rounded-full bg-white/20"
            >
              <MaterialCommunityIcons name="arrow-left" size={20} color="#ffffff" />
            </Pressable>
            <View className="flex-row gap-2">
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
        </View>

        <View className="-mt-6 rounded-t-3xl bg-background-light px-5 pt-6 dark:bg-background-dark">
          <Text className="text-2xl font-bold text-text-main dark:text-gray-100">
            {ownerName}
          </Text>
          <View className="mt-2 gap-2">
            <View className="flex-row items-center gap-2">
              <MaterialCommunityIcons name="star" size={16} color="#f97316" />
              <Text className="text-sm font-bold text-text-main dark:text-gray-100">
                {ownerRating.toFixed(1)}
              </Text>
              <Text className="text-sm text-text-muted dark:text-gray-400">
                ({ownerReviewsCount} reviews)
              </Text>
              <Text className="text-sm text-primary">• {ownerStatus}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <MaterialCommunityIcons name="map-marker" size={16} color={isDark ? '#d4c59a' : '#9a864c'} />
              <Text className="text-sm text-text-muted dark:text-gray-400">
                {ownerLocation}
              </Text>
            </View>
          </View>
        </View>

        <View className="sticky top-0 z-10 border-b border-neutral-light bg-background-light/95 px-5 pt-2 dark:border-neutral-dark dark:bg-background-dark/95">
          <View className="flex-row justify-between">
            {DEFAULT_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <Pressable key={tab} onPress={() => setActiveTab(tab)} className="flex-1">
                  <Text
                    className={
                      isActive
                        ? 'pb-3 text-center text-sm font-bold text-primary'
                        : 'pb-3 text-center text-sm font-medium text-text-muted dark:text-gray-400'
                    }
                  >
                    {tab}
                  </Text>
                  {isActive ? <View className="h-0.5 bg-primary" /> : null}
                </Pressable>
              );
            })}
          </View>
        </View>

        <View className="px-5 pb-28 pt-4">
          {activeTab === 'Products' ? (
            loading ? (
              <Text className="text-sm font-semibold text-text-muted dark:text-gray-400">
                Loading products...
              </Text>
            ) : (
              productGrid
            )
          ) : null}

          {activeTab === 'Reviews' ? (
            loading ? (
              <Text className="text-sm font-semibold text-text-muted dark:text-gray-400">
                Loading reviews...
              </Text>
            ) : reviewsData?.reviews?.length ? (
              <View className="gap-4">
                {reviewsData.reviews.map((review) => (
                  <View
                    key={review.id}
                    className="rounded-2xl bg-surface-light p-4 ring-1 ring-border-light dark:bg-surface-dark dark:ring-border-dark"
                  >
                    <View className="flex-row items-center gap-3">
                      <View className="h-8 w-8 overflow-hidden rounded-full bg-neutral-light dark:bg-neutral-dark">
                        {review.customerImage ? (
                          <Image source={{ uri: review.customerImage }} className="h-full w-full" />
                        ) : null}
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm font-bold text-text-main dark:text-gray-100">
                          {review.customerName ?? 'Customer'}
                        </Text>
                        <View className="flex-row items-center gap-1">
                          <MaterialCommunityIcons name="star" size={12} color="#f97316" />
                          <Text className="text-xs text-text-muted dark:text-gray-400">
                            {review.rating.toFixed(1)}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-xs text-text-muted dark:text-gray-400">
                        {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}
                      </Text>
                    </View>
                    <Text className="mt-3 text-sm text-text-muted dark:text-gray-400">
                      {review.comment}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <View className="rounded-2xl border border-dashed border-primary/30 bg-surface-light p-5 dark:bg-surface-dark">
                <Text className="text-sm font-semibold text-text-main dark:text-gray-100">
                  No reviews yet.
                </Text>
                <Text className="mt-1 text-xs text-text-muted dark:text-gray-400">
                  Reviews will appear after customers leave feedback.
                </Text>
              </View>
            )
          ) : null}

          {activeTab === 'Info' ? (
            <View className="gap-4">
              <View className="rounded-2xl bg-surface-light p-4 ring-1 ring-border-light dark:bg-surface-dark dark:ring-border-dark">
                <Text className="text-sm font-semibold text-text-main dark:text-gray-100">Location</Text>
                <Text className="mt-2 text-sm text-text-muted dark:text-gray-400">
                  {ownerLocation}
                </Text>
              </View>
              <View className="rounded-2xl bg-surface-light p-4 ring-1 ring-border-light dark:bg-surface-dark dark:ring-border-dark">
                <Text className="text-sm font-semibold text-text-main dark:text-gray-100">Status</Text>
                <Text className="mt-2 text-sm text-text-muted dark:text-gray-400">
                  {ownerStatus}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>

      <SafeAreaView
        edges={['bottom']}
        className="absolute bottom-0 left-0 right-0 border-t border-border-light bg-background-light/90 px-6 pb-6 pt-3 dark:border-border-dark dark:bg-background-dark/90"
      >
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => navigation.navigate(ROUTES.CustomerStorefront as never)}
            className="items-center"
          >
            <View className="h-10 w-12 items-center justify-center rounded-full bg-primary/10">
              <MaterialCommunityIcons name="home" size={24} color="#f97316" />
            </View>
            <Text className="mt-1 text-[10px] font-bold text-primary">Home</Text>
          </Pressable>

          <Pressable className="items-center">
            <View className="h-10 w-12 items-center justify-center rounded-full">
              <MaterialCommunityIcons
                name="magnify"
                size={24}
                color={isDark ? '#d4c59a' : '#9a864c'}
              />
            </View>
            <Text className="mt-1 text-[10px] font-medium text-text-muted dark:text-gray-400">
              Explore
            </Text>
          </Pressable>

          <Pressable className="items-center">
            <View className="h-10 w-12 items-center justify-center rounded-full">
              <MaterialCommunityIcons
                name="shopping"
                size={24}
                color={isDark ? '#d4c59a' : '#9a864c'}
              />
            </View>
            <Text className="mt-1 text-[10px] font-medium text-text-muted dark:text-gray-400">
              Orders
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate(ROUTES.CustomerProfile)}
            className="items-center"
          >
            <View className="h-10 w-12 items-center justify-center rounded-full">
              <MaterialCommunityIcons
                name="account"
                size={24}
                color={isDark ? '#d4c59a' : '#9a864c'}
              />
            </View>
            <Text className="mt-1 text-[10px] font-medium text-text-muted dark:text-gray-400">
              Profile
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};
