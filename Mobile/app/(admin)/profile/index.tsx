import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/src/features/theme';
import { useLogoutMutation } from '@/src/features/auth/auth.hooks';
import {
  ChevronLeft,
  Bell,
  Sun,
  Moon,
  LogOut,
  Settings,
  Shield,
  FileText,
} from 'lucide-react-native';

export default function AdminProfileScreen() {
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeStore();
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const adminMenu = [
    { icon: '⚙️', label: 'Settings', route: '#' },
    { icon: '🛡️', label: 'Security', route: '#' },
    { icon: '📄', label: 'Policies', route: '#' },
    { icon: '📊', label: 'Reports', route: '#' },
  ];

  const navItems = [
    { label: 'Dashboard', icon: '📊', route: '/(admin)/dashboard' },
    { label: 'Users', icon: '👥', route: '/(admin)/users' },
    { label: 'Transactions', icon: '💳', route: '/(admin)/transactions' },
    { label: 'Verification', icon: '✓', route: '/(admin)/verification' },
    { label: 'Profile', icon: '👨‍💼', route: '/(admin)/profile', active: true },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-24">
        {/* Header */}
        <View className="sticky top-0 z-10 border-b border-border bg-card px-4 py-4">
          <View className="flex-row items-center gap-3">
            <Pressable onPress={() => router.back()} style={{ cursor: 'pointer' }}>
              <ChevronLeft size={24} color="#ec5b13" />
            </Pressable>
            <Text className="text-xl font-bold text-foreground">Admin Profile</Text>
            <View className="flex-1" />
            <Pressable style={{ cursor: 'pointer' }}>
              <Bell size={24} color="#ec5b13" />
            </Pressable>
            <Pressable onPress={toggleTheme} style={{ cursor: 'pointer' }}>
              {isDark ? <Moon size={24} color="#ec5b13" /> : <Sun size={24} color="#ec5b13" />}
            </Pressable>
          </View>
        </View>

        {/* Admin Info Section */}
        <View className="border-b border-border bg-card p-6">
          <View className="flex-row items-end gap-4">
            {/* Avatar */}
            <View className="h-20 w-20 items-center justify-center rounded-full border-4 border-primary bg-primary/10">
              <Text className="text-3xl">👨‍💼</Text>
            </View>
            {/* User Info */}
            <View className="flex-1 pb-1">
              <Text className="text-2xl font-bold text-foreground">Admin User</Text>
              <View className="mt-1 inline-flex flex-row items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5">
                <Text className="text-sm">🔑</Text>
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
                <Text className="text-lg">📧</Text>
              </View>
              <View>
                <Text className="text-xs uppercase tracking-wider text-muted-foreground">
                  Email
                </Text>
                <Text className="font-semibold text-foreground">admin@platform.com</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Text className="text-lg">📱</Text>
              </View>
              <View>
                <Text className="text-xs uppercase tracking-wider text-muted-foreground">
                  Phone
                </Text>
                <Text className="font-semibold text-foreground">+251 91 xxx xxxx</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Text className="text-lg">📍</Text>
              </View>
              <View>
                <Text className="text-xs uppercase tracking-wider text-muted-foreground">
                  Location
                </Text>
                <Text className="font-semibold text-foreground">Addis Ababa, Ethiopia</Text>
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
                <Text className="text-xl">{item.icon}</Text>
                <View className="flex-1">
                  <Text className="font-medium text-foreground">{item.label}</Text>
                </View>
                <Text className={item.route !== '#' ? 'text-primary' : 'text-muted-foreground'}>
                  →
                </Text>
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
            {isDark ? <Moon size={24} color="#ec5b13" /> : <Sun size={24} color="#ec5b13" />}
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
          <Pressable
            onPress={handleLogout}
            className="flex-row items-center justify-center gap-2 rounded-lg border border-red-300/30 bg-red-50 py-3.5"
            style={{ cursor: 'pointer' }}>
            <LogOut size={20} color="#dc2626" />
            <Text className="font-bold uppercase tracking-widest text-red-600">Logout</Text>
          </Pressable>
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
