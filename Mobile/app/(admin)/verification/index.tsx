import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '@/src/features/theme';
import { useAllOwners } from '@/src/features/admin/hooks';
import { ChevronLeft, Search, Sun, Moon, CheckCircle, Eye } from 'lucide-react-native';

interface VerificationOwner {
  id: string;
  name: string;
  location: string;
  image: string;
  status: 'pending' | 'verified';
}

const mockVerifications: VerificationOwner[] = [];

const navItems = [
  { label: 'Dashboard', icon: '📊', route: '/(admin)/dashboard' },
  { label: 'Users', icon: '👥', route: '/(admin)/users' },
  { label: 'Transactions', icon: '💳', route: '/(admin)/transactions' },
  { label: 'Verification', icon: '✓', route: '/(admin)/verification', active: true },
  { label: 'Profile', icon: '👨‍💼', route: '/(admin)/profile' },
];

export default function VerificationHub() {
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeStore();
  const { data: ownersData, isLoading, error } = useAllOwners();

  const verifications = useMemo(() => {
    if (!ownersData) return [];
    return ownersData;
  }, [ownersData]);

  const pendingCount = useMemo(() => {
    return verifications.filter((v) => v.status === 'pending').length;
  }, [verifications]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#ec5b13" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="text-center text-foreground">Error loading verifications</Text>
      </SafeAreaView>
    );
  }

  const VerificationCard = ({ owner }: { owner: VerificationOwner }) => (
    <Pressable
      onPress={() => router.push(`/(admin)/verification/${owner.id}`)}
      className="mb-4 overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm"
      style={{ cursor: 'pointer' }}>
      <View className="flex-row gap-4">
        <View className="h-20 w-20 items-center justify-center rounded-lg bg-muted-foreground/20">
          <Text className="text-3xl">{owner.image || '🏢'}</Text>
        </View>
        <View className="flex-1">
          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              <Text className="text-base font-bold text-foreground">{owner.name}</Text>
              <View className="mt-1 flex-row items-center gap-1">
                <Text className="text-sm">📍</Text>
                <Text className="text-sm text-muted-foreground">{owner.location}</Text>
              </View>
            </View>
            <View
              className={`rounded px-2 py-0.5 ${
                owner.status === 'pending' ? 'bg-amber-100' : 'bg-green-100'
              }`}>
              <Text
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  owner.status === 'pending' ? 'text-amber-700' : 'text-green-700'
                }`}>
                {owner.status === 'pending' ? 'Pending' : 'Verified ✓'}
              </Text>
            </View>
          </View>
          <Pressable
            style={{ cursor: 'pointer' }}
            className={`mt-4 flex-row items-center justify-center gap-2 rounded-lg py-2 ${
              owner.status === 'pending'
                ? 'bg-primary'
                : 'border border-border bg-muted-foreground/10'
            }`}>
            {owner.status === 'pending' ? (
              <>
                <CheckCircle size={16} color="white" />
                <Text className="text-sm font-bold text-white">Verify Now</Text>
              </>
            ) : (
              <>
                <Eye size={16} color="#ec5b13" />
                <Text className="text-sm font-bold text-foreground">View Details</Text>
              </>
            )}
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-24">
        {/* Header */}
        <View className="sticky top-0 z-10 flex-row items-center justify-between border-b border-border bg-card p-4">
          <Pressable
            onPress={() => router.back()}
            style={{ cursor: 'pointer' }}
            className="flex h-10 w-10 items-center justify-center rounded-full">
            <ChevronLeft size={24} color="#ec5b13" />
          </Pressable>
          <Text className="flex-1 text-center text-lg font-bold text-foreground">
            Owner Verification Hub
          </Text>
          <Pressable
            style={{ cursor: 'pointer' }}
            className="flex h-10 w-10 items-center justify-center rounded-full">
            <Search size={20} color="#ec5b13" />
          </Pressable>
          <Pressable
            onPress={toggleTheme}
            style={{ cursor: 'pointer' }}
            className="ml-2 flex h-10 w-10 items-center justify-center rounded-full">
            {isDark ? <Moon size={20} color="#ec5b13" /> : <Sun size={20} color="#ec5b13" />}
          </Pressable>
        </View>

        {/* Search & Filter Area */}
        <View className="border-b border-border bg-background px-4 pb-4 pt-6">
          <View className="flex-row items-center justify-between pb-4">
            <View>
              <Text className="text-2xl font-bold text-foreground">Verifications</Text>
            </View>
            <View className="rounded-full bg-primary/10 px-3 py-1">
              <Text className="text-sm font-medium text-primary">{pendingCount} Pending</Text>
            </View>
          </View>
        </View>

        {/* Verification Cards */}
        <View className="px-4 py-4">
          {verifications.length > 0 ? (
            verifications.map((owner) => (
              <VerificationCard key={owner.id || owner._id} owner={owner} />
            ))
          ) : (
            <View className="items-center justify-center py-8">
              <Text className="text-muted-foreground">No verifications found</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-around border-t border-border bg-card px-4 pb-6 pt-2">
        {navItems.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => item.route && router.push(item.route as any)}
            style={{ cursor: 'pointer' }}
            className="flex-1 flex-col items-center gap-1">
            <Text className={`text-2xl ${item.active ? 'text-primary' : 'text-muted-foreground'}`}>
              {item.icon}
            </Text>
            <Text
              className={`text-[10px] font-bold uppercase ${
                item.active ? 'text-primary' : 'text-muted-foreground'
              }`}>
              {item.label.slice(0, 3)}
            </Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
