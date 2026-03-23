import React, { useMemo } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/src/features/theme';
import { useAdminDashboardStats } from '@/src/features/admin/hooks';
import {
  Bell,
  Users,
  Store,
  Package,
  ShoppingCart,
  DollarSign,
  Star,
  BarChart,
  CreditCard,
  CheckCircle,
  UserCircle,
  ArrowRight,
  TrendingUp,
  TrendingDown,
} from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { AdminBottomNav } from '../components/AdminBottomNav';

interface StatCardType {
  id: string;
  icon: any;
  label: string;
  value: string;
  color: string;
}

export default function AdminDashboardScreen() {
  const navItems = [
    { label: 'Dashboard', icon: BarChart, route: '/(admin)/dashboard', active: true },
    { label: 'Users', icon: Users, route: '/(admin)/users' },
    { label: 'Transactions', icon: CreditCard, route: '/(admin)/transactions' },
    { label: 'Verification', icon: CheckCircle, route: '/(admin)/verification' },
    { label: 'Profile', icon: UserCircle, route: '/(admin)/profile' },
  ];

  const router = useRouter();
  const { toggleTheme } = useThemeStore();
  const { data: dashboardData, isLoading, error } = useAdminDashboardStats();

  // Format the data from the API
  const stats = useMemo(
    () => ({
      totalUsers: dashboardData?.stats?.totalUsers ?? 0,
      totalOwners: dashboardData?.stats?.totalOwners ?? 0,
      totalProducts: dashboardData?.stats?.totalProducts ?? 0,
      totalOrders: dashboardData?.stats?.totalOrders ?? 0,
      totalReviews: dashboardData?.stats?.totalReviews ?? 0,
      totalRevenue: dashboardData?.stats?.totalRevenue ?? 0,
    }),
    [dashboardData]
  );

  const monthlySales = dashboardData?.stats?.monthlySales ?? [];
  const topProducts = dashboardData?.stats?.topProducts ?? [];

  const revenueTrend = useMemo(() => {
    if (!monthlySales || monthlySales.length < 2) return { last: 0, prev: 0, pct: 0 };

    const last = Number(monthlySales[monthlySales.length - 1]?.totalRevenue ?? 0);
    const prev = Number(monthlySales[monthlySales.length - 2]?.totalRevenue ?? 0);

    const pct = prev ? ((last - prev) / prev) * 100 : 0;
    return { last, prev, pct };
  }, [monthlySales]);

  const trendBars = useMemo(() => {
    const values = (monthlySales ?? []).map((m: any) => Number(m?.totalRevenue ?? 0));
    const max = Math.max(...values, 1);
    return values.map((v) => Math.max(5, Math.round((v / max) * 100)));
  }, [monthlySales]);

  const statCards: StatCardType[] = [
    {
      id: '1',
      icon: Users,
      label: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      color: 'bg-primary/10',
    },
    {
      id: '2',
      icon: Store,
      label: 'Total Owners',
      value: stats.totalOwners.toLocaleString(),
      color: 'bg-primary/10',
    },
    {
      id: '3',
      icon: Package,
      label: 'Products',
      value: stats.totalProducts.toLocaleString(),
      color: 'bg-primary/10',
    },
    {
      id: '4',
      icon: ShoppingCart,
      label: 'Orders',
      value: stats.totalOrders.toLocaleString(),
      color: 'bg-primary/10',
    },
    {
      id: '5',
      icon: DollarSign,
      label: 'Revenue',
      value: `ETB ${stats.totalRevenue.toLocaleString()}`,
      color: 'bg-primary/10',
    },
  ];

  const StatCard = ({ stat }: { stat: StatCardType }) => (
    <View className="flex-1 rounded-xl border border-border bg-card p-4 shadow-sm">
      <View className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <Icon as={stat.icon} size={24} className="text-primary" />
      </View>
      <Text className="text-2xl font-bold text-foreground">{stat.value}</Text>
      <Text className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {stat.label}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 pb-24">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pb-2 pt-6">
          <Text className="text-lg font-bold text-foreground">Insights Dashboard</Text>
          <Button
            variant="secondary"
            size="icon"
            onPress={toggleTheme}
            className="rounded-full"
          >
            <Icon as={Bell} size={20} className="text-primary" />
          </Button>
        </View>

        {/* Loading State */}
        {isLoading && (
          <View className="flex-1 items-center justify-center py-8">
            <ActivityIndicator size="large" color="#f97015" />
          </View>
        )}

        {/* Error State */}
        {error && (
          <View className="m-4 rounded-lg bg-destructive/10 p-4">
            <Text className="font-semibold text-destructive">Error loading dashboard data</Text>
            <Text className="mt-1 text-xs text-muted-foreground">Please try again later</Text>
          </View>
        )}

        {!isLoading && !error && (
          <>
            {/* Refreshing Indicator */}
            <View className="px-4 py-4">
              <View className="flex-row items-center justify-center gap-2">
                <Text className="text-xs font-medium text-muted-foreground">Data loaded</Text>
              </View>
            </View>

            {/* Revenue Highlight Card */}
            <View className="mx-4 mb-6 overflow-hidden rounded-xl bg-primary p-6 shadow-lg">
              <View className="mb-4 flex-row items-center justify-between">
                <View>
                  <Text className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
                    Total Revenue
                  </Text>
                  <Text className="mt-2 text-3xl font-bold text-primary-foreground">
                    {(stats.totalRevenue / 1000).toFixed(1)}K
                  </Text>
                  <Text className="mt-1 text-sm text-primary-foreground/60">
                    Last month: ETB {revenueTrend.last.toLocaleString()}
                  </Text>
                </View>
                <View
                  className={`rounded-full px-3 py-2 ${
                    revenueTrend.pct >= 0 ? 'bg-primary-foreground/15' : 'bg-destructive/15'
                  }`}
                >
                  <View className="flex-row items-center gap-1">
                    <Icon
                      as={revenueTrend.pct >= 0 ? TrendingUp : TrendingDown}
                      size={14}
                      className={revenueTrend.pct >= 0 ? 'text-primary-foreground' : 'text-destructive-foreground'}
                    />
                    <Text className="text-xs font-bold text-primary-foreground">
                      {revenueTrend.pct >= 0 ? '+' : ''}
                      {revenueTrend.pct.toFixed(1)}%
                    </Text>
                  </View>
                </View>
              </View>
              <Button
                variant="ghost"
                onPress={() => router.push('/(admin)/transactions')}
                className="mt-4 flex-row items-center justify-center gap-2 rounded-lg bg-primary-foreground/20"
              >
                <Text className="text-sm font-bold text-primary-foreground">View Detailed Report</Text>
                <Icon as={ArrowRight} size={18} className="text-primary-foreground" />
              </Button>
            </View>

            {/* Key Statistics Section */}
            <View className="px-4 pb-2 pt-2">
              <Text className="text-lg font-bold text-foreground">Key Statistics</Text>
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
                <View className="mt-3 rounded-xl border border-border bg-card p-6 shadow-sm">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <View className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon as={Star} size={24} className="text-primary" />
                      </View>
                      <Text className="text-2xl font-bold text-foreground">
                        {stats.totalReviews.toLocaleString()}
                      </Text>
                      <Text className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Customer Reviews
                      </Text>
                    </View>
                    {topProducts?.[0] ? (
                      <View className="flex-1 items-end">
                        <Text className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Top Product
                        </Text>
                        <Text className="mt-1 text-sm font-bold text-foreground" numberOfLines={1}>
                          {topProducts[0]?.name}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>

            {/* Latest Trends Chart Placeholder */}
            <View className="mx-4 mb-6 overflow-hidden rounded-xl bg-secondary p-4">
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="font-bold text-foreground">
                  Latest Trends
                </Text>
                <Text className="text-xs font-bold text-primary">See All</Text>
              </View>
              <View className="mb-6 h-32 flex-row items-end justify-center gap-2 rounded-lg bg-primary/10 p-4">
                {trendBars.slice(-6).map((height, index) => (
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
      <AdminBottomNav navItems={navItems} />
    </SafeAreaView>
  );
}
