import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react-native';
import { useAuthStore } from '@/src/features/auth';
import * as adminService from '@/src/services/admin';
import { useQuery } from '@tanstack/react-query';
import { Icon } from '@/components/ui/icon';

export default function VendorEditProfileScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const ownerId = (user as any)?._id ?? (user as any)?.id;

  const { data: owner } = useQuery({
    queryKey: ['admin', 'owner', ownerId],
    enabled: !!ownerId,
    queryFn: () => adminService.getOwnerById(ownerId),
    staleTime: 1000 * 60,
  });

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-row items-center border-b border-border px-4 py-3">
          <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full">
            <Icon as={ArrowLeft} size={20} className="text-primary" />
          </Pressable>
          <Text className="ml-3 text-lg font-bold text-foreground">Edit Profile</Text>
        </View>

        <View className="px-4 py-6">
          <View className="rounded-xl border border-border bg-card p-4">
            <Text className="mb-4 text-sm font-bold text-foreground">Business Information</Text>

            <View className="flex-row items-center gap-3 mb-3">
              <Icon as={Phone} size={18} className="text-muted-foreground" />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">Phone</Text>
                <Text className="mt-1 text-sm font-semibold text-foreground">{(user as any)?.phone || 'N/A'}</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3 mb-3">
              <Icon as={Mail} size={18} className="text-muted-foreground" />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">Email</Text>
                <Text className="mt-1 text-sm font-semibold text-foreground">{(user as any)?.email || 'N/A'}</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3">
              <Icon as={MapPin} size={18} className="text-muted-foreground" />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">Address</Text>
                <Text className="mt-1 text-sm font-semibold text-foreground">
                  {owner?.address || owner?.location || 'N/A'}
                </Text>
              </View>
            </View>

            <View className="mt-4 rounded-lg bg-muted p-3">
              <Text className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Verification</Text>
              <Text className="mt-1 text-sm font-semibold text-foreground">
                {owner?.companyVerified ? 'Verified' : 'Pending'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
