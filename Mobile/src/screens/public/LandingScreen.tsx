import React, { useEffect } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { ROUTES } from '../../constants/routes';
import { useThemeStore } from '../../store/themeStore';

const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD7V2XK_6pa4KLDXAYevzQv-QQIItrUjP7yPsII0EW-ZXgD51b6NutK77eQH7WzraFiScqJ_Kh-YjfvDtHYOXPBQOFBOhnIMQz4-Kg0XRAWH1SFdcf3ZHlLbmHgBwdbgHeCsXGLDZSstdoDbCIZQuHeb6BqSWtDPigCvyoV9g7z6lun33Auo_Dk3IR20sMcJppjwtWbkmDwDVaCWlILwsxYOI0z4hWu0gcBFt8-WSPoV5mCF_1JZeERo1kckwPNDd9EO7re5lDsSYDz';

const FEATURED_BAKERIES = [
  {
    id: '1',
    name: 'Golden Crust Bakery',
    tagline: 'Artisan Sourdough & Pastries',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtG1Kf96HosOaM8d3jbiAORWsOzZts1VXb5iQe3IKIaqYhdBEONhJbl55mQPFSn86zOdCGi1c5-ObeJTXKDTNNbOk3_Pi-5yP0YYsCvPDbYaDBSE94AoZe6pt4xesOduE3uS8Zx8ZfQ175TRq_BOBHL84y-aZVrHUtv9_XRWeUJlt2pSD-WIbiy_uXqWBsGjGgq0rgp1yVC7JZsg9Yl9bwr2ovahFumQKvhlRdtF-bNU9HEVAtGLzMkiQNCLsSV4ge1NZwtuGvmodG',
    rating: 4.9,
    distance: '0.8 km',
    status: 'Open Now',
    statusColor: '#16a34a',
  },
  {
    id: '2',
    name: "Mama's Oven",
    tagline: 'Traditional Cakes & Sweets',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA09OrMixSTIOYApNrRLKeSoQB_9Yip6PN4dvmC0VTVavnM_8vUCb8v9gYpNKI5TObVRZD1TbMcNcHQlkv-UJWcOMu5X3ya3pOH1MhvMrddoAxBwsyZh-2laZlgaDiAvTrCz_FSscrqR1uUk9wuAJjdPiENkiTY0XKFPt2D6_I6RJ9UUk0-n2M1NBANqiIHPwZddLshIcBCg403JHryNUf1q8vYvjQlwj-PhDOdfNZ1NIedqfa4mCfVulLrgyL4SbWZTIBSk3jAgJl',
    rating: 4.7,
    distance: '1.2 km',
    status: 'Closing Soon',
    statusColor: '#ef4444',
  },
  {
    id: '3',
    name: 'Adama Sweets',
    tagline: 'Local Favorites',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQKwFwufU47u1Ew8KF9IdNqK2RzaN-gRMyWFiynwljB606IKPd_bewmYVfLDqdxanHuXYLVak9aJeK3ZzDfc1GsQlVyQC2A3QZHdNgkyenle6_PJGjrjH5OvvXFA6KJQwHZxG9x9Eul7s_8AH-Lo0BenU7HxGotWOddqET0uzE5Qh4wMo_N_7xsnFWfHVa3Ekjnoz8SV6Rdw0okkUJHe0Ycbl5OEGp_Lxz_K8PRe5AcosfgDkdrEF3HFU8jen0Ot0NDXFEoBDMJdGU',
    rating: 4.5,
    distance: '2.5 km',
    status: 'Open Now',
    statusColor: '#16a34a',
  },
];

const POPULAR_CAKES = [
  {
    id: '1',
    name: 'Chocolate Truffle',
    by: "Mama's Oven",
    price: 'ETB 450',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5fltLd3s6xeqbSpUb_feryvDa3xkk62xwtRTBtSoB-VsVWnO4tDx2AZhFRmnfly7D2fIE8Oa9mXFwNvOj1xWD9AEYckzvKWnTgaKMrxi8eGV_baLr3YyYBJ6oAh7TDDfn4c2psEvwgCuNbiGTsbtEsTD0vsxPEWCfQ4PMasppS_FCY20YqmXsAIAb7bR06JVvNQYZhxB23QhPitKhh9CUecUH0CZ9nn-GSJwNVog39NncE8gR_dsUW5BsGMjHioz29afuij3x33t8',
  },
  {
    id: '2',
    name: 'Berry Cheesecake',
    by: 'Golden Crust',
    price: 'ETB 520',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL8a_w4M3509tFEZY-tn-9Jpn0atRdUj8JF3Ir6LASJLNheirNbE7_HN95lWn7hNKle8QXkUvksUQIT8NtIJqGn1a0PyypNOmM3j8B8ERTq5YYhjol9SSetymTqM23wM5ngtfBlkhX7rPHaevl75EH0nXYogIGlwCVC3T0PCCoe0Mztn9IC8_ibpIRweOF9zGPZDTjcGTbdVV1Lu4C8HUoSCFtzDE-ESmh_LrNi9PAzSnArDZRz5vfKfFgkfk6I2LbbEDty-aVfIkH',
  },
  {
    id: '3',
    name: 'Confetti Cake',
    by: 'Adama Sweets',
    price: 'ETB 380',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoat7sBlFxO87EstGvS3oGVU_775-NB0mF2Mi20sNXkeSqY6pJ9jJ02XDexIv6wLslN3yHQmYMH6MR4Zb9ZGtgnGmFi3turkeNfGm8SLeX05GPegz_pZ8d0FC0VMTL5Y8Tu_OWupdMlVAU80-HkJoz9W1DYrmbw61VZykWNo8NGxGe3_-BIWTEy3rGEdOrmKkV1ktKFVAht59SUwMGg7t7Np-OR_TJRz6XSaEp6PL2a9JS6VD2X68Qxg5nF0-GcQtXUZ1IILi4a2FL',
  },
];

export const LandingScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const searchScale = useSharedValue(1);
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';
  const toggleIconColor = isDark ? '#f5d67d' : '#374151';

  useEffect(() => {
    searchScale.value = withSpring(1, { damping: 15 });
  }, [searchScale]);

  const searchAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: searchScale.value }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top', 'bottom']}>
      {/* Sticky Header */}
      <Animated.View
        entering={FadeInDown.duration(400).springify()}
        className="flex-row items-center justify-between bg-background-light/95 px-5 py-3 dark:bg-background-dark/95"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <View className="flex-row items-center gap-2">
          <View className="h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary/20">
            <Image source={require('../../../assets/icon.png')} className="h-6 w-6 rounded-full" resizeMode="contain" />
          </View>
          <Text className="text-lg font-bold tracking-tight text-text-main dark:text-gray-100">ABC Bakery</Text>
        </View>
        <Pressable
          className="h-10 w-10 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 2,
            elevation: 2,
          }}
          onPress={toggle}
        >
          <MaterialCommunityIcons name={toggleIconName} size={22} color={toggleIconColor} />
        </Pressable>
      </Animated.View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 140 + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Animated.View
          entering={FadeIn.duration(300)}
          className="relative px-4 pt-2"
        >
          <View
            className="overflow-hidden rounded-xl"
            style={{
              minHeight: 320,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.15,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <ImageBackground
              source={{ uri: HERO_IMAGE }}
              className="flex-1 justify-end rounded-xl bg-cover bg-center p-6"
              style={{
                minHeight: 320,
                overflow: 'hidden',
              }}
            >
              <View
                pointerEvents="none"
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  borderRadius: 12,
                  backgroundColor: 'rgba(0,0,0,0.35)',
                }}
              />
              <View className="relative z-10 mb-8 gap-3">
                <Animated.View entering={FadeInUp.delay(100).duration(400).springify()}>
                  <View className="self-center rounded-full bg-primary/20 px-3 py-1.5">
                    <Text className="text-xs font-bold uppercase tracking-wider text-primary">
                      Premium Marketplace
                    </Text>
                  </View>
                </Animated.View>
                <Animated.Text
                  entering={FadeInUp.delay(180).duration(400).springify()}
                  className="text-center text-3xl font-extrabold leading-tight tracking-tight text-white"
                >
                  Freshly Baked Happiness{'\n'}in Adama
                </Animated.Text>
                <Animated.Text
                  entering={FadeInUp.delay(260).duration(400).springify()}
                  className="mx-auto max-w-xs text-center text-sm font-medium text-gray-200"
                >
                  Connect with the best local bakers for pickup or delivery.
                </Animated.Text>
              </View>
            </ImageBackground>
          </View>

          {/* Floating Search Bar */}
          <Animated.View
            entering={FadeInUp.delay(340).duration(400).springify()}
            style={{
              position: 'absolute',
              bottom: -28,
              left: 16,
              right: 16,
              maxWidth: windowWidth - 32,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.12,
              shadowRadius: 24,
              elevation: 12,
            }}
          >
            <Animated.View style={searchAnimatedStyle}>
              <View className="flex-row items-center gap-2 rounded-2xl bg-surface-light px-2 py-2 dark:bg-surface-dark">
                <View className="h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-neutral-dark">
                  <MaterialCommunityIcons name="magnify" size={22} color="#ecb613" />
                </View>
                <TextInput
                  className="flex-1 py-2 text-sm font-medium text-text-main dark:text-gray-100"
                  placeholder="Find sourdough, donuts..."
                  placeholderTextColor={isDark ? '#9aa0a6' : '#9ca3af'}
                  editable={false}
                />
                <Pressable className="rounded-xl bg-primary px-4 py-2.5">
                  <Text className="text-sm font-bold text-background-dark">Go</Text>
                </Pressable>
              </View>
            </Animated.View>
          </Animated.View>
        </Animated.View>

        {/* Spacer for floating search */}
        <View className="h-12" />

        {/* Featured Bakeries */}
        <Animated.View entering={FadeIn.delay(200).duration(400)} className="mt-2 py-4">
          <View className="flex-row items-center justify-between px-5">
            <Text className="text-xl font-bold tracking-tight text-text-main dark:text-gray-100">
              Featured Bakeries
            </Text>
            <Pressable>
              <Text className="text-sm font-semibold text-primary">See all</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16, paddingHorizontal: 20, paddingVertical: 16 }}
            className="mt-2"
          >
            {FEATURED_BAKERIES.map((bakery, index) => (
              <Animated.View
                key={bakery.id}
                entering={FadeInDown.delay(280 + index * 80).duration(400).springify()}
                className="w-[280px] overflow-hidden rounded-xl bg-surface-light dark:bg-surface-dark"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <View className="relative h-36 w-full">
                  <Image
                    source={{ uri: bakery.image }}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                  <View className="absolute right-3 top-3 flex-row items-center gap-1 rounded-full bg-white/90 px-2 py-1 dark:bg-neutral-dark/80">
                    <MaterialCommunityIcons name="star" size={14} color="#ecb613" />
                    <Text className="text-xs font-bold text-text-main dark:text-gray-100">{bakery.rating}</Text>
                  </View>
                </View>
                <View className="flex-col p-4">
                  <Text className="text-lg font-bold text-text-main dark:text-gray-100">{bakery.name}</Text>
                  <Text className="text-sm text-text-muted dark:text-gray-400">{bakery.tagline}</Text>
                  <View className="mt-3 flex-row items-center justify-between border-t border-gray-100 pt-3 dark:border-neutral-dark">
                    <View className="flex-row items-center gap-1">
                      <MaterialCommunityIcons name="map-marker" size={16} color="#6b7280" />
                      <Text className="text-xs font-medium text-gray-500 dark:text-gray-400">{bakery.distance}</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <MaterialCommunityIcons name="clock-outline" size={16} color={bakery.statusColor} />
                      <Text className="text-xs font-medium" style={{ color: bakery.statusColor }}>
                        {bakery.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Popular Cakes */}
        <Animated.View entering={FadeIn.delay(300).duration(400)} className="py-2">
          <View className="flex-row items-center justify-between px-5">
            <Text className="text-xl font-bold tracking-tight text-text-main dark:text-gray-100">
              Popular Cakes Today
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16, paddingHorizontal: 20, paddingVertical: 16 }}
            className="mt-2"
          >
            {POPULAR_CAKES.map((cake, index) => (
              <Animated.View
                key={cake.id}
                entering={FadeInUp.delay(350 + index * 80).duration(400).springify()}
                className="w-40 overflow-hidden rounded-xl bg-surface-light dark:bg-surface-dark"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <View className="aspect-square w-full">
                  <Image
                    source={{ uri: cake.image }}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="flex-col p-3">
                  <Text className="truncate text-base font-bold text-text-main dark:text-gray-100" numberOfLines={1}>
                    {cake.name}
                  </Text>
                  <Text className="truncate text-xs text-text-muted dark:text-gray-400" numberOfLines={1}>
                    By {cake.by}
                  </Text>
                  <View className="mt-2 flex-row items-center justify-between">
                    <Text className="text-sm font-bold text-primary">{cake.price}</Text>
                    <Pressable className="h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <MaterialCommunityIcons name="plus" size={16} color="#ecb613" />
                    </Pressable>
                  </View>
                </View>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        <View className="h-8" />
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <Animated.View
        entering={FadeInUp.delay(400).duration(400).springify()}
        className="absolute left-0 right-0 border-t border-gray-200 bg-background-light/95 px-4 pt-4 dark:border-neutral-dark dark:bg-background-dark/95"
        style={{
          bottom: 0,
          paddingBottom: Math.max(insets.bottom, 16) + 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <View className="mx-auto max-w-md flex-row gap-3">
          <Pressable
            onPress={() => navigation.navigate(ROUTES.Register as never)}
            className="flex-1 items-center justify-center rounded-full border-2 border-primary/20 py-3 active:opacity-80"
          >
            <Text className="text-base font-bold text-primary">Register</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate(ROUTES.Login as never)}
            className="flex-1 items-center justify-center rounded-full bg-primary py-3 active:opacity-90"
            style={{
              shadowColor: '#ecb613',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 4,
            }}
          >
            <Text className="text-base font-bold text-background-dark">Login</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate(ROUTES.Settings as never)}
            className="h-12 w-12 items-center justify-center rounded-2xl border-2 border-primary/20 bg-surface-light/60 text-primary dark:bg-surface-dark/60"
          >
            <MaterialCommunityIcons name="cog" size={20} color="#ecb613" />
          </Pressable>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};
