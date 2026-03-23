import React, { useState, useMemo } from 'react';
import { View, ScrollView, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/src/features/theme';
import { useAllUsers } from '@/src/features/admin/hooks';
import {
  ChevronLeft,
  Plus,
  Search,
  Sun,
  Moon,
  Trash2,
  User,
  CheckCircle,
  BarChart,
  Users,
  CreditCard,
  UserCircle,
} from 'lucide-react-native';
import { AdminBottomNav } from '../components/AdminBottomNav';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  verified?: boolean;
}

const navItems = [
  { label: 'Dashboard', icon: BarChart, route: '/(admin)/dashboard' },
  { label: 'Users', icon: Users, route: '/(admin)/users', active: true },
  { label: 'Transactions', icon: CreditCard, route: '/(admin)/transactions' },
  { label: 'Verification', icon: CheckCircle, route: '/(admin)/verification' },
  { label: 'Profile', icon: UserCircle, route: '/(admin)/profile' },
];

export default function UserManagement() {
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeStore();
  const { data: usersData, isLoading, error } = useAllUsers();
  const [searchText, setSearchText] = useState('');

  // Format and filter users
  const filteredUsers = useMemo(() => {
    if (!usersData) return [];
    return usersData.filter(
      (user: any) =>
        user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [usersData, searchText]);

  const UserCard = ({ user }: { user: any }) => (
    <Pressable
      onPress={() => router.push(`/(admin)/users/${user._id || user.id}` as any)}
      className="mb-3 overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm"
      style={{ cursor: 'pointer' }}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Icon as={User} size={24} className="text-primary" />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
              <Text className="font-bold text-foreground">{user.name}</Text>
              {user.isAccountVerified && <Icon as={CheckCircle} size={16} className="text-primary" />}
            </View>
            <Text className="text-xs uppercase tracking-wider text-muted-foreground">
              {user.role}
            </Text>
            <Text className="mt-1 text-xs text-muted-foreground">{user.email}</Text>
          </View>
        </View>
        <Icon
          as={ChevronLeft}
          size={20}
          className="text-muted-foreground"
          style={{ transform: [{ rotate: '180deg' }] }}
        />
      </View>
      <View className="mt-4 flex-row gap-2 border-t border-border pt-4">
        <Pressable
          className="flex-1 items-center justify-center rounded-lg bg-primary/10 py-2.5"
          style={{ cursor: 'pointer' }}>
          <Text className="text-sm font-bold text-primary">View Details</Text>
        </Pressable>
        <Pressable
          className="flex-1 items-center justify-center rounded-lg border border-destructive bg-destructive/10 py-2.5"
          style={{ cursor: 'pointer' }}>
          <Text className="text-sm font-bold text-destructive">Delete</Text>
        </Pressable>
      </View>
    </Pressable>
  );

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
        <Text className="text-center text-foreground">Error loading users</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-24">
        {/* Header */}
        <View className="sticky top-0 z-10 border-b border-border bg-card px-4 py-4">
          <View className="flex-row items-center gap-3">
            <Pressable onPress={() => router.back()} style={{ cursor: 'pointer' }}>
              <Icon as={ChevronLeft} size={24} className="text-primary" />
            </Pressable>
            <Text className="text-xl font-bold text-foreground">User Management</Text>
            <View className="flex-1" />
            <Pressable style={{ cursor: 'pointer' }}>
              <Icon as={Plus} size={24} className="text-primary" />
            </Pressable>
            <Button
              variant="secondary"
              size="icon"
              onPress={toggleTheme}
              className="rounded-full"
            >
              {isDark ? (
                <Icon as={Moon} size={24} className="text-primary" />
              ) : (
                <Icon as={Sun} size={24} className="text-primary" />
              )}
            </Button>
          </View>
        </View>

        {/* Search Bar */}
        <View className="border-b border-border bg-card px-4 py-4">
          <View className="flex-row items-center rounded-xl border border-border bg-card">
            <View className="px-4 pb-3 pt-3">
              <Icon as={Search} size={20} className="text-muted-foreground" />
            </View>
            <TextInput
              placeholder="Search by name or email"
              value={searchText}
              onChangeText={setSearchText}
              className="flex-1 border-l border-border py-3 pr-4 text-foreground"
              placeholderTextColor="#7e6f67"
            />
          </View>
        </View>

        {/* Global Actions */}
        <View className="px-4 py-4">
          <Pressable
            className="flex-row items-center justify-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 py-3"
            style={{ cursor: 'pointer' }}>
            <Icon as={Trash2} size={20} className="text-destructive" />
            <Text className="font-semibold text-destructive">Delete All Users</Text>
          </Pressable>
        </View>

        {/* Users List Header */}
        <View className="flex-row items-center justify-between px-4 pb-4">
          <View className="flex-row items-center gap-2">
            <Text className="text-lg font-bold text-foreground">All Users</Text>
            <Text className="text-sm font-normal text-muted-foreground">
              ({filteredUsers.length} total)
            </Text>
          </View>
          <Pressable className="flex-row items-center gap-1" style={{ cursor: 'pointer' }}>
            <Text className="text-xs font-semibold text-primary">Filter</Text>
          </Pressable>
        </View>

        {/* Users List */}
        <View className="px-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user: any) => <UserCard key={user._id || user.id} user={user} />)
          ) : (
            <View className="items-center justify-center py-8">
              <Text className="text-muted-foreground">No users found</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <AdminBottomNav navItems={navItems} isDark={isDark} />
    </SafeAreaView>
  );
}
