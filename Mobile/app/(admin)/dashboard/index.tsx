import React, { useMemo } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/src/features/theme';
import { useAdminDashboardStats } from '@/src/features/admin/hooks';
import { Sun, Moon, Bell } from 'lucide-react-native';

interface StatCard {
  id: string;
  icon: string;
  label: string;
  value: string;
  color: string;
}

interface DashboardStats {
  totalUsers: number;
  totalOwners: number;
  totalProducts: number;
  totalOrders: number;
  totalReviews: number;
  totalRevenue: number;
}

const navItems = [
  { label: 'Dashboard', icon: '📊', route: '/(admin)/dashboard', active: true },
  { label: 'Users', icon: '👥', route: '/(admin)/users' },
  { label: 'Transactions', icon: '💳', route: '/(admin)/transactions' },
  { label: 'Verification', icon: '✓', route: '/(admin)/verification' },
  { label: 'Profile', icon: '👨‍💼', route: '/(admin)/profile' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeStore();
  const { data: dashboardData, isLoading, error } = useAdminDashboardStats();

  // Format the data from the API
  const stats = useMemo(
    () => ({
      totalUsers: dashboardData?.totalUsers ?? 0,
      totalOwners: dashboardData?.totalOwners ?? 0,
      totalProducts: dashboardData?.totalProducts ?? 0,
      totalOrders: dashboardData?.totalOrders ?? 0,
      totalReviews: dashboardData?.totalReviews ?? 0,
      totalRevenue: dashboardData?.totalRevenue ?? 0,
    }),
    [dashboardData]
  );

  const StatCard = ({ stat }: { stat: StatCard }) => (
    <View
      className={`background:border flex-1 rounded-xl border p-4 text-foreground shadow-sm ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <View className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}>
        <Text className="text-lg">{stat.icon}</Text>
      </View>
      <Text className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
        {stat.value}
      </Text>
      <Text
        className={`mt-1 text-xs font-medium uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        {stat.label}
      </Text>
    </View>
  );

  const statCards: StatCard[] = [
    {
      id: '1',
      icon: '👤',
      label: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      color: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      id: '2',
      icon: '🏪',
      label: 'Total Owners',
      value: stats.totalOwners.toLocaleString(),
      color: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      id: '3',
      icon: '📦',
      label: 'Products',
      value: stats.totalProducts.toLocaleString(),
      color: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      id: '4',
      icon: '🛒',
      label: 'Orders',
      value: stats.totalOrders.toLocaleString(),
      color: 'bg-green-50 dark:bg-green-900/20',
    },
  ];

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-slate-950' : 'bg-background'}`}>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-24">
        {/* Header */}
        <View
          className={`sticky top-0 z-10 flex-row items-center justify-between border-b p-4 ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-border bg-card'}`}>
          <View className="flex-1">
            <Text className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-foreground'}`}>
              Insights Dashboard
            </Text>
          </View>
          <Pressable
            onPress={toggleTheme}
            className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full ${isDark ? 'bg-slate-800' : 'bg-secondary'}`}
            style={{ cursor: 'pointer' }}>
            {isDark ? <Sun size={20} color="#ec5b13" /> : <Moon size={20} color="#ec5b13" />}
          </Pressable>
          <Pressable
            className={`flex h-10 w-10 items-center justify-center rounded-full ${isDark ? 'bg-slate-800' : 'bg-secondary'}`}
            style={{ cursor: 'pointer' }}>
            <Bell size={20} color="#ec5b13" />
          </Pressable>
        </View>

        {/* Loading State */}
        {isLoading && (
          <View className="flex-1 items-center justify-center py-8">
            <ActivityIndicator size="large" color="#ec5b13" />
          </View>
        )}

        {/* Error State */}
        {error && (
          <View className="m-4 rounded-lg bg-red-500/10 p-4">
            <Text className="font-semibold text-red-600">Error loading dashboard data</Text>
            <Text className="mt-1 text-xs text-red-500">Please try again later</Text>
          </View>
        )}

        {!isLoading && (
          <>
            {/* Refreshing Indicator */}
            <View className="px-4 py-4">
              <View className="flex-row items-center justify-center gap-2">
                <Text
                  className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
                  Data loaded
                </Text>
              </View>
            </View>

            {/* Revenue Highlight Card */}
            <View className="mx-4 mb-6 overflow-hidden rounded-xl bg-primary p-6 shadow-lg">
              <View className="mb-4 flex-row items-center justify-between">
                <View>
                  <Text className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    Total Revenue
                  </Text>
                  <Text className="mt-2 text-3xl font-bold text-white">
                    ${(stats.totalRevenue / 1000).toFixed(1)}K
                  </Text>
                  <Text className="mt-1 text-sm text-white/60">vs last month $407,315</Text>
                </View>
                <View className="rounded-full bg-green-500/20 px-3 py-2">
                  <Text className="text-xs font-bold text-green-400">+12.5% ↑</Text>
                </View>
              </View>
              <Pressable
                className="mt-4 flex-row items-center justify-center gap-2 rounded-lg bg-white/20 py-2.5"
                style={{ cursor: 'pointer' }}>
                <Text className="text-sm font-bold text-white">View Detailed Report</Text>
                <Text className="text-white">→</Text>
              </Pressable>
            </View>

            {/* Key Statistics Section */}
            <View className="px-4 pb-2 pt-2">
              <Text
                className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-foreground'}`}>
                Key Statistics
              </Text>
            </View>

            {/* Stats Grid */}
            <View className="px-4 py-4">
              <View className="flex-col gap-3">
                <View className="flex-row gap-3">
                  <StatCard stat={statCards[0]} />
                  <StatCard stat={statCards[1]} />
                </View>
                <View className="flex-row gap-3">
                  <StatCard stat={statCards[2]} />
                  <StatCard stat={statCards[3]} />
                </View>
                {/* Reviews Stat - Full Width */}
                <View
                  className={`rounded-xl border p-6 shadow-sm ${isDark ? 'border-slate-700 bg-slate-900' : 'border-border bg-card'}`}>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <View
                        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${isDark ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
                        <Text className="text-lg">⭐</Text>
                      </View>
                      <Text
                        className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                        {stats.totalReviews.toLocaleString()}
                      </Text>
                      <Text
                        className={`mt-1 text-xs font-medium uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Customer Reviews
                      </Text>
                    </View>
                    <View className="flex-row gap-2">
                      <View
                        className={`h-8 w-8 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}
                      />
                      <View
                        className={`h-8 w-8 rounded-full ${isDark ? 'bg-slate-600' : 'bg-slate-300'}`}
                      />
                      <View
                        className={`h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                        <Text className="text-[10px] font-bold">+5</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Latest Trends Chart Placeholder */}
            <View
              className={`mx-4 mb-6 overflow-hidden rounded-xl p-4 ${isDark ? 'bg-slate-900' : 'bg-secondary'}`}>
              <View className="mb-4 flex-row items-center justify-between">
                <Text className={`font-bold ${isDark ? 'text-slate-100' : 'text-foreground'}`}>
                  Latest Trends
                </Text>
                <Text className="text-xs font-bold text-primary">See All</Text>
              </View>
              <View className="mb-6 h-32 flex-row items-end justify-center gap-2 rounded-lg bg-primary/10 p-4">
                {[50, 65, 30, 100, 80, 50].map((height, index) => (
                  <View
                    key={index}
                    className="flex-1 rounded-t bg-primary"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View
        className={`absolute bottom-0 left-0 right-0 flex-row items-center justify-between border-t px-4 pb-6 pt-3 ${isDark ? 'border-slate-800 bg-slate-950' : 'border-border bg-card'}`}>
        {navItems.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => item.route && router.push(item.route as any)}
            className="flex-1 flex-col items-center gap-1"
            style={{ cursor: 'pointer' }}>
            <Text
              className={`text-2xl ${item.active ? 'text-primary' : isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
              {item.icon}
            </Text>
            <Text
              className={`text-[10px] font-bold uppercase ${
                item.active ? 'text-primary' : isDark ? 'text-slate-400' : 'text-muted-foreground'
              }`}>
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
