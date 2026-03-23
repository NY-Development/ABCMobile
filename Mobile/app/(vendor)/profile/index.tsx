import React, { useMemo } from 'react';
import { View, Text, ScrollView, Pressable, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Phone, Mail, MapPin, CheckCircle, Eye, Boxes } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/src/features/auth';
import { authAPI } from '@/src/features/auth/auth.api';
import { vendorAPI } from '@/src/services/vendor';
import { Icon } from '@/components/ui/icon';

export default function VendorProfileScreen() {
  const router = useRouter();
  const { user } = useAuthStore();

  const ownerId = (user as any)?.ownerInfo?._id ?? (user as any)?._id ?? (user as any)?.id;

  const { data: profileData } = useQuery({
    queryKey: ['auth', 'profile', 'vendor'],
    queryFn: () => authAPI.getProfile(),
    staleTime: 1000 * 60,
  });
  const owner = (profileData as any)?.ownerInfo ?? (user as any)?.ownerInfo;
  const profileUser = (profileData as any) ?? user;

  const { data: productsData } = useQuery({
    queryKey: ['vendor', 'products', 'my'],
    enabled: !!ownerId,
    queryFn: () => vendorAPI.getMyProducts(ownerId),
    staleTime: 1000 * 60,
  });

  const products = productsData ?? [];

  const activeProducts = useMemo(() => products.filter((p: any) => p?.isActive).length, [products]);

  const heroImage = owner?.companyImage;
  const isVerified = Boolean(owner?.companyVerified);
  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between border-b border-border bg-card px-4 py-3">
          <View className="flex-1">
            <Text className="text-lg font-bold text-foreground">My Profile</Text>
          </View>
        </View>

        {/* Hero Section */}
        <View className="relative h-48 w-full overflow-hidden bg-primary/10">
          {heroImage ? (
            <ImageBackground source={{ uri: heroImage }} className="h-full w-full">
              <View className="flex-1 bg-foreground/10" />
            </ImageBackground>
          ) : null}

          {/* Bakery Logo Overlay */}
          <View className="absolute bottom-4 left-4 flex-row items-end gap-4">
            <View className="h-20 w-20 items-center justify-center rounded-xl border-2 border-primary bg-card p-2 shadow-lg">
              {heroImage ? (
                <Image source={{ uri: heroImage }} className="h-16 w-16 rounded-lg" />
              ) : (
                <Text className="text-lg font-bold text-primary">Bakery</Text>
              )}
            </View>
            <View className="mb-1 flex-1">
              <View className="flex-row items-center gap-2">
                <Text className="text-2xl font-bold text-primary-foreground">
                  {owner?.companyName || 'Bakery'}
                </Text>
                <View className="inline-flex flex-row items-center gap-1 rounded-full bg-primary px-2 py-1">
                  {isVerified ? <Icon as={CheckCircle} size={12} className="text-primary-foreground" /> : null}
                  <Text className="text-[10px] font-bold text-primary-foreground">
                    {isVerified ? 'Verified' : 'Pending'}
                  </Text>
                </View>
              </View>
              <Text className="text-sm text-muted-foreground" numberOfLines={1}>
                {owner?.location || 'Location'}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="relative z-10 mx-4 -mt-4 mb-4 flex-row gap-3">
          <View className="flex-1 rounded-2xl border border-border bg-card p-4 shadow-sm">
            <Text className="text-xs font-semibold uppercase text-muted-foreground">Active Products</Text>
            <View className="mt-2 flex-row items-baseline gap-1">
              <Text className="text-2xl font-bold text-foreground">{activeProducts}</Text>
            </View>
          </View>
          <View className="flex-1 rounded-2xl border border-border bg-card p-4 shadow-sm">
            <Text className="text-xs font-semibold uppercase text-muted-foreground">Trading Status</Text>
            <View className="mt-2 flex-row items-baseline gap-1">
              <Text className="text-2xl font-bold text-foreground">{isVerified ? 'Verified' : 'Pending'}</Text>
            </View>
          </View>
        </View>

        {/* Banner */}
        <View className="mx-4 mb-4 flex-row items-center gap-3 rounded-2xl border border-border bg-muted p-4">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Icon as={CheckCircle} size={20} className={isVerified ? 'text-primary' : 'text-muted-foreground'} />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-bold text-foreground">
              Trading License {isVerified ? 'Verified' : 'Pending'}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {owner?.tradingLicense ? `License: ${owner.tradingLicense}` : 'License not uploaded'}
            </Text>
          </View>
        </View>

        {/* Business Details */}
        <View className="mx-4 mb-4 rounded-2xl border border-border bg-card shadow-sm">
          <View className="flex-row items-center justify-between border-b border-border px-5 py-4">
            <Text className="text-lg font-bold text-foreground">Business Details</Text>
            <Pressable onPress={() => router.push('/(vendor)/profile/edit' as any)}>
              <Text className="text-sm font-semibold text-primary">Edit</Text>
            </Pressable>
          </View>

          <View className="space-y-5 px-5 py-5">
            <View className="flex-row gap-4">
              <Icon as={Phone} size={20} className="text-muted-foreground" />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">Phone</Text>
                <Text className="mt-1 text-sm font-semibold text-foreground">{(profileUser as any)?.phone || 'N/A'}</Text>
              </View>
            </View>

            <View className="flex-row gap-4">
              <Icon as={Mail} size={20} className="text-muted-foreground" />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">Email</Text>
                <Text className="mt-1 text-sm font-semibold text-foreground">{(profileUser as any)?.email || 'N/A'}</Text>
              </View>
            </View>

            <View className="flex-row gap-4">
              <Icon as={MapPin} size={20} className="text-muted-foreground" />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">Address</Text>
                <Text className="mt-1 text-sm font-semibold text-foreground">{owner?.address || owner?.location || 'N/A'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mx-4 mb-8 gap-3">
          <Pressable
            onPress={() => router.push('/(vendor)/menu/inventory')}
            className="flex-row items-center justify-center rounded-2xl bg-primary px-6 py-4 shadow-lg"
          >
            <Icon as={Boxes} size={20} className="text-primary-foreground" />
            <Text className="ml-2 text-lg font-bold text-primary-foreground">Manage Inventory</Text>
          </Pressable>

          <Pressable
            className="flex-row items-center justify-center rounded-2xl border-2 border-primary bg-transparent px-6 py-4"
            onPress={() => {}}
          >
            <Icon as={Eye} size={20} className="text-primary" />
            <Text className="ml-2 text-lg font-bold text-primary">View Public Profile</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
