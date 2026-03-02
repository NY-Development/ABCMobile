import React from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ROUTES } from '../../constants/routes';
import type { CustomerStackParamList } from '../../types/navigation';

export const ExploreScreen = () => {
  const navigation = useNavigation<StackNavigationProp<CustomerStackParamList, 'Explore'>>();
  const insets = useSafeAreaInsets();

  const categories = [
    {
      name: 'Cakes',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBQSNcO8miyLWldgur1XYUhn9GhauV_tYMJAq4DyvsTKEu6nJMa7-WADYIrZY3lZjOfaFnxENFP2ofuAe7CYNCL1gb4aOeKfXeKVPfOzKLg0ybxNGPSzetXd1wtjehMNjUAszZKqAP4LsOCdCTlW7i9F4mDNgGPeeOHzxdZhOM8rCwTsdZbSZwtAPhPrZpASkRyIMqHNi6lGwS7ijOc5QLUrXDroQ3zp4gaY9SExLiDIBYs2dVaXSUHPfag0HWIShepUCZIp2hliINW',
    },
    {
      name: 'Pastries',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDvsjrzA-frA5ijpOd7hEnuG6KjBxv85A7tBM6YQTh1GvQ2YQp2lcUDc0ECfw4sFdHU869HplUqWGkGl86_80VV1xS9EeOon5CWeaIKpdn87pe4CaveNyCu7g9D8NUr3-18MsTEz1I7ybnzhMMYf3YQ8G2MpzZYdmS1czKzEUs9UZcLNXF7kHh7VCJwAC1qZYjSkpUD0MSSSgMv6AaH7BY4lKm9rfR4EssYJjOTQnp8ckK6_mXo9Cocp53ZfKUKz2cag3QffYpM1XZD',
    },
    {
      name: 'Bread',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCJBeepdeR5SBwKaHw3ntOn5X4gQqan4rJ5UXdeiiEr09lpqrxCwmX4O-V33uCrmw8PAxa8djA_FK5hGlLJTscIIGfqD80EvKqxRes0lyxH2q0iiScU2-S4yn43ZMo1Y5R2IVL0fJdC_uzHvY0DfcXvFT2CjYbjdvA974hzxcyYLlYzX9tTkJL8B-e5rHkyLhyHl8FWE9h6m6OcFCcLkLgFNPDrL2SKiNbw6WrlM_4Sa5rWkeZCL7KQjyyHSy8Re-jPDHDx1Rrxw0pI',
    },
    { name: 'Cookies', icon: 'cookie' as const },
    { name: 'Donuts', icon: 'food-croissant' as const },
  ];

  const bakeries = [
    {
      name: 'Golden Crumb Bakery',
      location: 'Adama Central • 1.2 km away',
      rating: 4.8,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCJBeepdeR5SBwKaHw3ntOn5X4gQqan4rJ5UXdeiiEr09lpqrxCwmX4O-V33uCrmw8PAxa8djA_FK5hGlLJTscIIGfqD80EvKqxRes0lyxH2q0iiScU2-S4yn43ZMo1Y5R2IVL0fJdC_uzHvY0DfcXvFT2CjYbjdvA974hzxcyYLlYzX9tTkJL8B-e5rHkyLhyHl8FWE9h6m6OcFCcLkLgFNPDrL2SKiNbw6WrlM_4Sa5rWkeZCL7KQjyyHSy8Re-jPDHDx1Rrxw0pI',
    },
    {
      name: 'Sweet Delights',
      location: 'Bole Road, Adama • 2.4 km away',
      rating: 4.5,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC6EJxo99UdR-KioDpVfYizP3EN8TENBD7-goKwNW3e8tpUtPvcVyOIe7J-P_tZTOAFgXk8uk_igfwig_AXFYXOd1ItvU6hop_TgwHoYWajdaOZRrD_HWhsfPlgipudc5THuKqntwIrZDJ9NdmHNm-7NMueFtzfuBLqr-AGw8q8l3anbXtfLDVMIm4Hsx6WAqDdZcpKNGLYkY-Ua1-WU-ofCexw58pGtlFT_XPZqUFRqtks3rPFt-wQCEjbLQpsUHwBPSNbxPIGzOi0',
    },
  ];

  const products = [
    {
      productId: 'explore-1',
      name: 'Wild Berry Cream',
      price: 120,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB2B4FdOYFD6-J04Mb_j5AjNYIrcUhN2ursEcQvsgjQlKvqx2ycSACQ7nE8sPTVWe5_qq-Xi_1VCATdMhTiqLD-kU4PGIk6z9WFifPVNS_-wZIdVy_UWF_2Bxc4EP1Oq_CZV1jcfC8KoWfaA17r4f-Oc_xOR-nkba3QQzl2YAU1mLk3dPOfumnArcXWaJdVj77Pkr136KDreoStbmm8yWe4JPe_xgcpTwgfEcyZ82A1Abv9G53LpYkP2SY5R3SsEPkPkJ3MGVHz9L5k',
      ownerName: 'Golden Crumb Bakery',
    },
    {
      productId: 'explore-2',
      name: 'Royal Truffle',
      price: 450,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBQSNcO8miyLWldgur1XYUhn9GhauV_tYMJAq4DyvsTKEu6nJMa7-WADYIrZY3lZjOfaFnxENFP2ofuAe7CYNCL1gb4aOeKfXeKVPfOzKLg0ybxNGPSzetXd1wtjehMNjUAszZKqAP4LsOCdCTlW7i9F4mDNgGPeeOHzxdZhOM8rCwTsdZbSZwtAPhPrZpASkRyIMqHNi6lGwS7ijOc5QLUrXDroQ3zp4gaY9SExLiDIBYs2dVaXSUHPfag0HWIShepUCZIp2hliINW',
      ownerName: 'Sweet Delights',
    },
    {
      productId: 'explore-3',
      name: 'Butter Croissant',
      price: 85,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDvsjrzA-frA5ijpOd7hEnuG6KjBxv85A7tBM6YQTh1GvQ2YQp2lcUDc0ECfw4sFdHU869HplUqWGkGl86_80VV1xS9EeOon5CWeaIKpdn87pe4CaveNyCu7g9D8NUr3-18MsTEz1I7ybnzhMMYf3YQ8G2MpzZYdmS1czKzEUs9UZcLNXF7kHh7VCJwAC1qZYjSkpUD0MSSSgMv6AaH7BY4lKm9rfR4EssYJjOTQnp8ckK6_mXo9Cocp53ZfKUKz2cag3QffYpM1XZD',
      ownerName: 'Golden Crumb Bakery',
    },
    {
      productId: 'explore-4',
      name: 'Choco Heaven',
      price: 180,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC6EJxo99UdR-KioDpVfYizP3EN8TENBD7-goKwNW3e8tpUtPvcVyOIe7J-P_tZTOAFgXk8uk_igfwig_AXFYXOd1ItvU6hop_TgwHoYWajdaOZRrD_HWhsfPlgipudc5THuKqntwIrZDJ9NdmHNm-7NMueFtzfuBLqr-AGw8q8l3anbXtfLDVMIm4Hsx6WAqDdZcpKNGLYkY-Ua1-WU-ofCexw58pGtlFT_XPZqUFRqtks3rPFt-wQCEjbLQpsUHwBPSNbxPIGzOi0',
      ownerName: 'Sweet Delights',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top', 'bottom']}>
      <View className="flex-1">
        <View className="bg-background-light/85 px-5 pb-4 pt-2 dark:bg-background-dark/85">
          <View className="flex-row items-center gap-3">
            <View className="relative flex-1">
              <View className="pointer-events-none absolute inset-y-0 left-0 items-center justify-center pl-4">
                <MaterialCommunityIcons name="magnify" size={20} color="#9a864c" />
              </View>
              <TextInput
                placeholder="Search bakeries or treats..."
                placeholderTextColor="#9a864c"
                className="rounded-2xl bg-surface-light py-3.5 pl-11 pr-4 text-sm text-text-main shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:text-gray-100"
              />
            </View>
            <Pressable className="h-12 w-12 items-center justify-center rounded-2xl bg-surface-light shadow-sm ring-1 ring-black/5 dark:bg-surface-dark">
              <MaterialCommunityIcons name="tune" size={20} color="#1b180d" />
            </Pressable>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 110, 132) }}
        >
          <View className="gap-8 pb-2">
            <View className="gap-4">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5">
                <View className="flex-row gap-4">
                  {categories.map((category, index) => {
                    const selected = index === 0;
                    return (
                      <View key={category.name} className="items-center gap-2">
                        <View className="h-16 w-16 items-center justify-center rounded-3xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark">
                          {category.image ? (
                            <Image source={{ uri: category.image }} className="h-10 w-10" resizeMode="contain" />
                          ) : (
                            <MaterialCommunityIcons name={category.icon} size={28} color="#ecb613" />
                          )}
                        </View>
                        <Text className={selected ? 'text-[11px] font-bold text-text-main dark:text-gray-100' : 'text-[11px] font-bold text-text-muted dark:text-gray-400'}>
                          {category.name}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>

            <View className="gap-4">
              <View className="flex-row items-center justify-between px-5">
                <Text className="text-xl font-bold tracking-tight text-text-main dark:text-gray-100">Bakeries Near You</Text>
                <Pressable>
                  <Text className="text-sm font-semibold text-primary">View map</Text>
                </Pressable>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5">
                <View className="flex-row gap-4">
                  {bakeries.map((bakery) => (
                    <Pressable
                      key={bakery.name}
                      onPress={() => navigation.navigate(ROUTES.CustomerStorefront, { ownerName: bakery.name, ownerImage: bakery.image, rating: bakery.rating })}
                      className="w-72"
                    >
                      <View className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-md">
                        <Image source={{ uri: bakery.image }} className="h-full w-full" resizeMode="cover" />
                        <View className="absolute right-3 top-3 flex-row items-center gap-1 rounded-full bg-white/90 px-2 py-1">
                          <MaterialCommunityIcons name="star" size={12} color="#ecb613" />
                          <Text className="text-[10px] font-bold text-text-main">{bakery.rating.toFixed(1)}</Text>
                        </View>
                      </View>
                      <View className="mt-3">
                        <Text className="text-base font-bold text-text-main dark:text-gray-100">{bakery.name}</Text>
                        <Text className="text-xs text-text-muted dark:text-gray-400">{bakery.location}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View className="gap-4 px-5">
              <View className="flex-row items-center justify-between">
                <Text className="text-xl font-bold tracking-tight text-text-main dark:text-gray-100">Discover New Favorites</Text>
              </View>

              <View className="flex-row flex-wrap justify-between gap-y-4">
                {products.map((product) => (
                  <Pressable
                    key={product.productId}
                    onPress={() =>
                      navigation.navigate(ROUTES.ProductDetail, {
                        productId: product.productId,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        ownerName: product.ownerName,
                      })
                    }
                    className="w-[48%]"
                  >
                    <View className="relative aspect-square overflow-hidden rounded-3xl bg-surface-light shadow-sm dark:bg-surface-dark">
                      <Image source={{ uri: product.image }} className="h-full w-full" resizeMode="cover" />
                      <Pressable className="absolute bottom-2 right-2 h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg">
                        <MaterialCommunityIcons name="plus" size={22} color="#ffffff" />
                      </Pressable>
                    </View>
                    <View className="px-1 pt-2">
                      <Text className="text-sm font-bold text-text-main dark:text-gray-100" numberOfLines={1}>{product.name}</Text>
                      <Text className="text-[11px] font-bold text-primary">{product.price} ETB</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
