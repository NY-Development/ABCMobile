import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';
import type { CustomerStackParamList } from '../../types/navigation';

type ScreenRoute = RouteProp<CustomerStackParamList, 'ProductDetail'>;

export const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ScreenRoute>();
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';

  const [quantity, setQuantity] = useState(1);

  const name = route.params?.name ?? 'Bakery Item';
  const price = route.params?.price ?? 0;
  const image = route.params?.image;
  const description =
    route.params?.description ??
    'A fluffy, moist bakery treat made with locally sourced ingredients.';
  const ownerName = route.params?.ownerName ?? 'Adama Bakery';
  const rating = route.params?.rating ?? 4.8;
  const reviewsCount = route.params?.reviewsCount ?? 120;

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top']}>
      <View className="relative h-[45vh]">
        <Image
          source={{
            uri:
              image ||
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDf3cfB8u1VJ8j2KDbCxI2NVOVdJAbtKyztqbOPz7EAexXWukz6EczdCzvHm2q7R7SqmI9wcyTCsVCuFG98xpQ4v9OB4iMh1llbCjQfacijRFpGU0PNgNc62z5SYEbxMo7jhjKZEty9zWryYEQCE0HDtU8QjL9zkgyYXIhO-ulMzgDNFWYYRLzg1578VkI-ZQUgYxNa34Gc5xo59Zxwghiung_eD3SoN1rYdLwJD1_iAwuNUVBudkyVzcSrGRzYtBKyY3qxsKvaG9mX',
          }}
          className="h-full w-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

        <View className="absolute left-0 right-0 top-0 flex-row items-center justify-between px-4 pt-6">
          <Pressable
            onPress={() => navigation.goBack()}
            className="h-12 w-12 items-center justify-center rounded-full bg-white/20"
          >
            <MaterialCommunityIcons name="arrow-left" size={20} color="#ffffff" />
          </Pressable>
          <View className="flex-row gap-2">
            <Pressable
              onPress={toggle}
              className="h-12 w-12 items-center justify-center rounded-full bg-white/20"
            >
              <MaterialCommunityIcons name={toggleIconName} size={20} color="#ffffff" />
            </Pressable>
            <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <MaterialCommunityIcons name="heart" size={20} color="#ffffff" />
            </Pressable>
          </View>
        </View>
      </View>

      <ScrollView className="-mt-10 flex-1 rounded-t-3xl bg-background-light px-6 pt-8 dark:bg-background-dark">
        <View className="absolute left-1/2 top-3 h-1.5 w-12 -translate-x-1/2 rounded-full bg-gray-300 dark:bg-gray-600" />

        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-sm font-medium uppercase tracking-wide text-primary">{ownerName}</Text>
            <Text className="mt-1 text-3xl font-bold text-text-main dark:text-gray-100">
              {name}
            </Text>
          </View>
          <View className="items-center rounded-xl bg-primary/10 p-2">
            <MaterialCommunityIcons name="star" size={20} color="#f97316" />
            <Text className="text-lg font-bold text-text-main dark:text-gray-100">{rating.toFixed(1)}</Text>
            <Text className="text-[10px] text-text-muted dark:text-gray-400">({reviewsCount})</Text>
          </View>
        </View>

        <View className="mt-6 flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-text-muted dark:text-gray-400">Price</Text>
            <View className="flex-row items-baseline gap-1">
              <Text className="text-sm font-medium text-primary">ETB</Text>
              <Text className="text-3xl font-bold text-text-main dark:text-gray-100">
                {price.toLocaleString()}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center rounded-full border border-neutral-light bg-white p-1.5 dark:border-neutral-dark dark:bg-neutral-dark">
            <Pressable
              onPress={handleDecrease}
              className="h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700"
            >
              <MaterialCommunityIcons name="minus" size={18} color={isDark ? '#d4c59a' : '#6b7280'} />
            </Pressable>
            <Text className="w-12 text-center text-xl font-bold text-text-main dark:text-gray-100">
              {quantity}
            </Text>
            <Pressable
              onPress={handleIncrease}
              className="h-10 w-10 items-center justify-center rounded-full bg-primary"
            >
              <MaterialCommunityIcons name="plus" size={18} color="#ffffff" />
            </Pressable>
          </View>
        </View>

        <View className="mt-6 border-t border-neutral-light pt-6 dark:border-neutral-dark">
          <Text className="text-lg font-bold text-text-main dark:text-gray-100">Description</Text>
          <Text className="mt-3 text-sm leading-relaxed text-text-muted dark:text-gray-400">
            {description}
          </Text>
        </View>

        <View className="mt-6">
          <Text className="text-lg font-bold text-text-main dark:text-gray-100">Ingredients</Text>
          <View className="mt-3 flex-row flex-wrap gap-2">
            {['Organic Flour', 'Farm Eggs', 'Wild Honey', 'Vanilla Bean', 'Whole Milk'].map((ingredient) => (
              <View
                key={ingredient}
                className="rounded-full border border-neutral-light bg-white px-4 py-2 dark:border-neutral-dark dark:bg-neutral-dark"
              >
                <Text className="text-sm text-text-muted dark:text-gray-400">
                  {ingredient}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-6 pb-24">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold text-text-main dark:text-gray-100">Reviews</Text>
            <Text className="text-sm font-medium text-primary">See all</Text>
          </View>
          <View className="mt-3 rounded-2xl border border-neutral-light bg-white p-4 dark:border-neutral-dark dark:bg-neutral-dark">
            <View className="flex-row items-center gap-3">
              <View className="h-8 w-8 overflow-hidden rounded-full bg-neutral-light dark:bg-neutral-dark" />
              <View className="flex-1">
                <Text className="text-sm font-bold text-text-main dark:text-gray-100">Sarah M.</Text>
                <View className="flex-row items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <MaterialCommunityIcons key={index} name="star" size={12} color="#f97316" />
                  ))}
                </View>
              </View>
              <Text className="text-xs text-text-muted dark:text-gray-400">2 days ago</Text>
            </View>
            <Text className="mt-3 text-sm text-text-muted dark:text-gray-400">
              Absolutely delicious! The honey glaze is not too sweet and the cake itself is incredibly moist.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white/80 px-6 pb-6 pt-4 backdrop-blur-xl dark:bg-background-dark/80">
        <Pressable className="w-full flex-row items-center justify-between rounded-2xl bg-primary px-6 py-4">
          <Text className="text-lg font-bold text-white">Add to Cart</Text>
          <View className="rounded-lg bg-white/20 px-3 py-1">
            <Text className="text-sm font-semibold text-white">
              ETB {(price * quantity).toLocaleString()}
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
