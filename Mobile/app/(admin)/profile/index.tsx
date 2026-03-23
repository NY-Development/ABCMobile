import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useThemeStore } from '@/src/features/theme';
import { useLogoutMutation } from '@/src/features/auth/auth.hooks';
import { authAPI } from '@/src/features/auth/auth.api';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import {
  ChevronLeft,
  Bell,
  Sun,
  Moon,
  LogOut,
  Settings,
  Shield,
  FileText,
  BarChart,
  Users,
  CreditCard,
  CheckCircle,
  UserCircle,
  Key,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from 'lucide-react-native';
import { AdminBottomNav } from '../components/AdminBottomNav';

export default function AdminProfileScreen() {
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeStore();
  const { mutate: logout } = useLogoutMutation();

  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: authAPI.getProfile,
  });

  const adminUser = profileData;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const adminMenu = [
    { icon: Settings, label: 'Settings', route: '#' },
    { icon: Shield, label: 'Security', route: '#' },
    { icon: FileText, label: 'Policies', route: '#' },
    { icon: BarChart, label: 'Reports', route: '#' },
  ];

  const navItems = [
    { label: 'Dashboard', icon: BarChart, route: '/(admin)/dashboard' },
    { label: 'Users', icon: Users, route: '/(admin)/users' },
    { label: 'Transactions', icon: CreditCard, route: '/(admin)/transactions' },
    { label: 'Verification', icon: CheckCircle, route: '/(admin)/verification' },
    { label: 'Profile', icon: UserCircle, route: '/(admin)/profile', active: true },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-24">
        {/* Header */}
        <View className="sticky top-0 z-10 border-b border-border bg-card px-4 py-4">
          <View className="flex-row items-center gap-3">
            <Pressable onPress={() => router.back()} style={{ cursor: 'pointer' }}>
              <Icon as={ChevronLeft} size={24} className="text-primary" />
            </Pressable>
            <Text className="text-xl font-bold text-foreground">Admin Profile</Text>
            <View className="flex-1" />
            <Pressable style={{ cursor: 'pointer' }}>
              <Icon as={Bell} size={24} className="text-primary" />
            </Pressable>
            <Pressable onPress={toggleTheme} style={{ cursor: 'pointer' }}>
              {isDark ? (
                <Icon as={Moon} size={24} className="text-primary" />
              ) : (
                <Icon as={Sun} size={24} className="text-primary" />
              )}
            </Pressable>
          </View>
        </View>

        {/* Admin Info Section */}
        <View className="border-b border-border bg-card p-6">
          <View className="flex-row items-end gap-4">
            {/* Avatar */}
            <View className="h-20 w-20 items-center justify-center rounded-full border-4 border-primary bg-primary/10">
              <Icon as={UserCircle} size={44} className="text-primary" />
            </View>
            {/* User Info */}
            <View className="flex-1 pb-1">
              <Text className="text-2xl font-bold text-foreground">
                {adminUser?.name || (isProfileLoading ? 'Loading...' : 'Admin User')}
              </Text>
              <View className="mt-1 inline-flex flex-row items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5">
                <Icon as={Key} size={14} className="text-primary" />
                <Text className="text-xs font-bold uppercase tracking-widest text-primary">
                  Administrator
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Info Section */}
        <View className="border-b border-border bg-background p-6">
          <Text className="mb-4 text-lg font-bold text-foreground">Admin Info</Text>
          <View className="space-y-3">
            <View className="flex-row items-center gap-3">
              <View className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon as={Mail} size={18} className="text-primary" />
              </View>
              <View>
                <Text className="text-xs uppercase tracking-wider text-muted-foreground">
                  Email
                </Text>
                <Text className="font-semibold text-foreground">{adminUser?.email || 'N/A'}</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon as={Phone} size={18} className="text-primary" />
              </View>
              <View>
                <Text className="text-xs uppercase tracking-wider text-muted-foreground">
                  Phone
                </Text>
                <Text className="font-semibold text-foreground">{adminUser?.phone || 'N/A'}</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon as={MapPin} size={18} className="text-primary" />
              </View>
              <View>
                <Text className="text-xs uppercase tracking-wider text-muted-foreground">
                  Location
                </Text>
                <Text className="font-semibold text-foreground">
                  {(adminUser?.ownerInfo as any)?.location || 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Admin Settings Menu */}
        <View className="bg-background p-4">
          <Text className="mb-3 text-lg font-bold text-foreground">Admin Settings</Text>
          <View className="space-y-2">
            {adminMenu.map((item) => (
              <Pressable
                key={item.label}
                onPress={() => item.route !== '#' && router.push(item.route as any)}
                style={{ cursor: 'pointer' }}
                className="flex-row items-center gap-3 rounded-lg border-0 bg-card px-4 py-3">
                <Icon as={item.icon} size={22} className="text-primary" />
                <View className="flex-1">
                  <Text className="font-medium text-foreground">{item.label}</Text>
                </View>
                <Icon
                  as={ChevronRight}
                  size={18}
                  className={item.route !== '#' ? 'text-primary' : 'text-muted-foreground'}
                />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Theme Toggle */}
        <View className="border-t border-border bg-background p-4">
          <Pressable
            onPress={toggleTheme}
            style={{ cursor: 'pointer' }}
            className="flex-row items-center gap-3 rounded-lg border-0 bg-card px-4 py-3">
            {isDark ? <Icon as={Moon} size={24} className="text-primary" /> : <Icon as={Sun} size={24} className="text-primary" />}
            <View className="flex-1">
              <Text className="font-medium text-foreground">
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </View>
            <View className="h-6 w-11 rounded-full border-2 border-primary bg-primary/20">
              <View
                className={`h-4 w-4 rounded-full bg-primary transition-all ${
                  isDark ? 'translate-x-5' : 'translate-x-1'
                } mt-0.5`}
              />
            </View>
          </Pressable>
        </View>

        {/* Logout Button */}
        <View className="px-4 pb-8 pt-4">
          <Button
            onPress={handleLogout}
            variant="destructive"
            className="flex-row items-center justify-center gap-2 rounded-lg py-3.5"
            size="lg"
          >
            <Icon as={LogOut} size={20} className="text-destructive-foreground" />
            <Text className="font-bold uppercase tracking-widest text-destructive-foreground">
              Logout
            </Text>
          </Button>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <AdminBottomNav navItems={navItems} isDark={isDark} />
    </SafeAreaView>
  );
}
