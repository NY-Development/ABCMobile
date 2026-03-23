import React from 'react';
import { View, Text, ScrollView, Pressable, Image, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '@/src/features/theme';
import { GlobalBottomNav } from '@/src/components/GlobalBottomNav';
import PrimaryButton from '@/src/components/PrimaryButton';
import { Search } from 'lucide-react-native';
import icon from '../../assets/images/icon.png';

export default function LandingScreen() {
  const { isDark } = useThemeStore();

  const locations = [
    {
      id: 1,
      name: 'Downtown Branch',
      address: '123 Adama Center, Main St.',
      hours: 'Open until 9 PM',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD6Bpfc-7nj5OY6VFcXIovBOZRVZrcJ29vSeXjDM2o_byVPhN3Qau_pVBiU0fYPl_VXYDeou0BxRkQx_k5yqOvt6edKAMj0O5NzDTw90pGaS-zlRzlx0H0dPOaLsgDvp6fvQ4W8AJyVbZ3jAwolNL15P2VCSWrft8KpQbheGakWgqphX95mqTqTveghNnAIZfWNB4NdHrPm-QvCCkJLOSw-x5MjiflGGYB8-oaWn7rc7af56vdSxXv45eYolV0efc9wXbJGHIdNd4Q',
    },
    {
      id: 2,
      name: 'Heritage Square',
      address: 'Old Town Market District',
      hours: 'Open until 10 PM',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDLJBcTzHTxrhttoxdO-9zsku9OTk6hpJro97Om8cJb2OKSJeQluMl_z_kkRgaAWG-jDJ91McdfPvEahFlt4RpMVm3DdZC6kpOfkPQdcw6_6PxrUU0wc3lIb2FHLcfxkSRpgwpSXbzUc1G1fYm8Bb5M1RxAqmejZtN-zuAng0zuWlkYh3FleP10gsPwYbdOdQbMtriyymqK3Zx59bdhnX-PDsZkOSZPQDnP56_YYEjJ-gxB5YP7SyVkqvVyNbdoXay6AspRT2YUJIY',
    },
  ];

  const specials = [
    {
      id: 1,
      name: 'Berry Bliss Cake',
      price: '$24.00',
      badge: 'BESTSELLER',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDxfP9me3XPnbOrSSi2zNR_4MkBazItsJnBEduJYlay2Dx4r4riMYFmWjGKBiAsZNXoZtMjA-4oWUcFt7qtQjrWAzrgA9kOujIfesTGI9-biONU21Rn7ug_8F-B7JCoxekWQ18jK7oy75rcZHdyOXJsAKkjhvPufp9oRFiu_L7W2vWTKIk_qdYkMsliKXRbyY7RZY-q6E_HZ6mX_lfXF_48oGmB4v6ji4kNeJuwGoAh1leQQ3VrkMlKDZwHZTyoI0rNeVGtRph2eNY',
    },
    {
      id: 2,
      name: 'Rainbow Macarons',
      price: '$12.50',
      badge: null,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB3zCj4ASYs2jI9eW3loZv6gaqDSjKtEYPbYDw7xf8ZPry0gCTvjut6tkXTc8QX7F-IMlUPzjxpWfUNm2Gl9T6tlNgQ1Gv6UX-nNCfoDE6HOLA5dIjybjHQRFx_pTh05If3d7GgMDo72KnuRjeYKoYchLdZPTMha072AWcO-QUj7SvrJ8phCo_kaLvnP0n0wV8RlJIBqqHMMelQ2EtfZyTRZHucIqK3IwR3_Sji5QwIsV89F5RU1hCggcZgf4dSPknePj2_CZX12xY',
    },
    {
      id: 3,
      name: 'Butter Croissant',
      price: '$4.95',
      badge: null,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuASj3CRWaRiMXvzHks-phkEpdFW2KyY6H0fBQTcIb92pGtF4oj9zfcOAvqRls4HnLGwvEDcJXQr2fUnUGSRSy4cQ3KGDeg9KyXXxYmlvhfUHPD7gAAFgChB1P8KOde2OoiFuk7fSIe7ukEHBjKKSUTrz6W874E5z4Y4d9-LQugtwwwZH4vGiBK-oeVZ8FohTaNVo7fz7N2f_0tC7ohYg5zzrzpkZ4k13UynbXHqmbmg4-moIA7eAmAeVgStfdBOceGYhpONVLQWgns',
    },
  ];

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-background' : 'dark:bg-background bg-background'}`}>
      {/* Header */}
      <View
        className={`flex-row items-center justify-between border-b px-4 py-3 ${
          isDark ? 'bg-background border-border' : 'bg-background border-border'
        }`}>
        <Image source={icon} className='w-10 h-10 rounded-full object-cover' />
        <Text
          className={`text-lg font-bold ${isDark ? 'text-card-foreground' : 'text-foreground'}`}>
          ABC Bakery
        </Text>
        <Search size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero Section */}
        <ImageBackground
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwwnxX7XmGX61ISVbaWkKzZZTmAehHS-JjRqJUsKv4_9Dh77V4b-rcf_i-44Wr5MbzUE6fmQk2al-KMruOH50TvJrrRyqdrc2_JQesqGU7YYRpiQ9HXG_ae7AWvvhWeiEyiVCXPKAhXdR8QxshjnCEYGLYt-VbIW_drX6_Ydh2mUouWkiCEWmlByFZJCWn_VrSB2o2WX-wrXch5vq1wbJIIZj1oruErfGbrLv9kqxmy3H-lo3GQ5phCTJi2Oh0SIXzRu-k3l0tq8A',
          }}
          style={{
            minHeight: 420,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 24,
            paddingVertical: 48,
            overflow: 'hidden',
            marginHorizontal: 24,
            borderRadius: 12,
            marginTop: 12,
          }}
          >
          <View className="items-center justify-center gap-4">
            <Text className="text-center text-4xl font-black text-primary">Adama Bakery & Cake</Text>
            <Text className="text-center text-sm leading-relaxed text-white/90">
              Experience the taste of artisan cakes and freshly baked goods made with love and local
              ingredients.
            </Text>
            <PrimaryButton label="Explore Menu" onPress={() => router.push('/(customer)/home')} />
          </View>
        </ImageBackground>

        {/* Introduction Text */}
        <View className="gap-2 px-6 py-6">
          <Text
            className={`text-xl font-bold ${isDark ? 'text-card-foreground' : 'text-foreground'}`}>
            Taste the Tradition
          </Text>
          <Text
            className={`leading-relaxed ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
            Since 1995, Adama Bakery & Cake (ABC) has been the heart of the community. From our
            signature sourdough to our world-famous celebration cakes, every bite is a testament to
            our passion for baking.
          </Text>
        </View>

        {/* Our Locations */}
        <View className="px-6 py-4">
          <View className="mb-4 flex-row items-center justify-between">
            <Text
              className={`text-lg font-bold ${isDark ? 'text-card-foreground' : 'text-foreground'}`}>
              Our Locations
            </Text>
            <Pressable onPress={() => {}}>
              <Text className="text-sm font-semibold text-primary">View All</Text>
            </Pressable>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
            <View className="flex-row gap-3 pr-6">
              {locations.map((location) => (
                <Pressable
                  key={location.id}
                  className={`w-80 gap-3 rounded-xl p-3 ${
                    isDark ? 'border border-border bg-card' : 'border border-border bg-card'
                  }`}>
                  <Image
                    source={{ uri: location.image }}
                    style={{ height: 128, borderRadius: 8, resizeMode: 'cover' }}
                  />
                  <View className="gap-1 px-2 pb-2">
                    <Text
                      className={`text-base font-bold ${isDark ? 'text-card-foreground' : 'text-foreground'}`}>
                      {location.name}
                    </Text>
                    <Text
                      className={`text-sm ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                      {location.address}
                    </Text>
                    <View className="mt-1 flex-row items-center gap-1">
                      <Text className="text-sm font-semibold text-primary">
                        ⏰ {location.hours}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Today's Specials */}
        <View className="px-6 py-4">
          <View className="mb-4 flex-row items-center justify-between">
            <Text
              className={`text-lg font-bold ${isDark ? 'text-card-foreground' : 'text-foreground'}`}>
              Today's Specials
            </Text>
            <Pressable onPress={() => {}}>
              <Text className="text-sm font-semibold text-primary">See Menu</Text>
            </Pressable>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
            <View className="flex-row gap-3 pr-6">
              {specials.map((special) => (
                <Pressable key={special.id} className="w-40 gap-2">
                  <View className="relative h-40 overflow-hidden rounded-xl shadow-md">
                    <Image
                      source={{ uri: special.image }}
                      style={{ height: 160, width: 160, resizeMode: 'cover' }}
                    />
                    {special.badge && (
                      <View
                        className={`absolute right-3 top-3 rounded-full px-2 py-1 ${
                          isDark ? 'bg-background-dark/90' : 'bg-background-light/90'
                        }`}>
                        <Text className="text-xs font-bold text-primary">{special.badge}</Text>
                      </View>
                    )}
                  </View>
                  <View className="gap-1">
                    <Text
                      className={`text-sm font-bold ${
                        isDark ? 'text-card-foreground' : 'text-foreground'
                      }`}
                      numberOfLines={1}>
                      {special.name}
                    </Text>
                    <Text className="text-sm font-extrabold text-primary">{special.price}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      {/* Bottom Navigation */}
      <GlobalBottomNav />
    </SafeAreaView>
  );
}
