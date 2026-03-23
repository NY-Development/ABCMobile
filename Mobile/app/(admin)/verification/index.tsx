import React, { useMemo } from 'react';
import { View, ScrollView, Pressable, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '@/src/features/theme';
import { useAllOwners } from '@/src/features/admin/hooks';
import {
  ChevronLeft,
  Search,
  Sun,
  Moon,
  CheckCircle,
  Eye,
  BarChart,
  Users,
  CreditCard,
  UserCircle,
  MapPin,
  Building2,
} from 'lucide-react-native';
import { AdminBottomNav } from '../components/AdminBottomNav';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';

interface VerificationOwner {
  _id: string;
  companyName?: string;
  companyImage?: string;
  location?: string;
  companyVerified?: boolean;
}

const navItems = [
  { label: 'Dashboard', icon: BarChart, route: '/(admin)/dashboard' },
  { label: 'Users', icon: Users, route: '/(admin)/users' },
  { label: 'Transactions', icon: CreditCard, route: '/(admin)/transactions' },
  { label: 'Verification', icon: CheckCircle, route: '/(admin)/verification', active: true },
  { label: 'Profile', icon: UserCircle, route: '/(admin)/profile' },
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
    return verifications.filter((v: any) => !v.companyVerified).length;
  }, [verifications]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#f97015" />
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
    <View className="mb-4 overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm">
      <View className="flex-row gap-4">
        <View className="h-20 w-20 items-center justify-center rounded-lg bg-muted-foreground/20">
          {owner.companyImage ? (
            <Image
              source={{ uri: owner.companyImage }}
              className="h-20 w-20 rounded-lg"
              resizeMode="cover"
            />
          ) : (
            <Icon as={Building2} size={34} className="text-primary" />
          )}
        </View>
        <View className="flex-1">
          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              <Text className="text-base font-bold text-foreground">
                {owner.companyName || 'Company'}
              </Text>
              <View className="mt-1 flex-row items-center gap-1">
                <Icon as={MapPin} size={14} className="text-muted-foreground" />
                <Text className="text-sm text-muted-foreground">{owner.location || 'N/A'}</Text>
              </View>
            </View>
            <View
              className={`rounded px-2 py-0.5 ${
                owner.companyVerified ? 'bg-primary/10' : 'bg-muted/30'
              }`}>
              <Text
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  owner.companyVerified ? 'text-primary' : 'text-muted-foreground'
                }`}>
                {owner.companyVerified ? 'Verified' : 'Pending'}
              </Text>
            </View>
          </View>
          <Button
            variant={owner.companyVerified ? 'secondary' : 'default'}
            className="mt-4 rounded-lg"
            onPress={() => router.push(`/(admin)/verification/${owner._id}`)}
          >
            <Icon
              as={owner.companyVerified ? Eye : CheckCircle}
              size={16}
              className={
                owner.companyVerified ? 'text-secondary-foreground' : 'text-primary-foreground'
              }
            />
            <Text className="text-sm font-bold">
              {owner.companyVerified ? 'View Details' : 'Verify Now'}
            </Text>
          </Button>
        </View>
      </View>
    </View>
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
            <Icon as={ChevronLeft} size={24} className="text-primary" />
          </Pressable>
          <Text className="flex-1 text-center text-lg font-bold text-foreground">
            Owner Verification Hub
          </Text>
          <Pressable
            style={{ cursor: 'pointer' }}
            className="flex h-10 w-10 items-center justify-center rounded-full">
            <Icon as={Search} size={20} className="text-primary" />
          </Pressable>
          <Pressable
            onPress={toggleTheme}
            style={{ cursor: 'pointer' }}
            className="ml-2 flex h-10 w-10 items-center justify-center rounded-full">
            {isDark ? (
              <Icon as={Moon} size={20} className="text-primary" />
            ) : (
              <Icon as={Sun} size={20} className="text-primary" />
            )}
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
            verifications.map((owner: any) => (
              <VerificationCard key={owner._id} owner={owner} />
            ))
          ) : (
            <View className="items-center justify-center py-8">
              <Text className="text-muted-foreground">No verifications found</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <AdminBottomNav navItems={navItems} isDark={isDark} />
    </SafeAreaView>
  );
}
