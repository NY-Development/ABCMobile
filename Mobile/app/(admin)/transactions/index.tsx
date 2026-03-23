import React, { useState, useMemo } from 'react';
import { View, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/src/features/theme';
import { useAllPayments } from '@/src/features/admin/hooks';
import { ChevronLeft, Search, Sun, Moon, User, BarChart, Users, CreditCard, CheckCircle, UserCircle } from 'lucide-react-native';
import { AdminBottomNav } from '../components/AdminBottomNav';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const tabs = [
  { id: 'all', label: 'All Activity' },
  { id: 'pending', label: 'Pending' },
  { id: 'payouts', label: 'Payouts' },
];

const navItems = [
  { label: 'Dashboard', icon: BarChart, route: '/(admin)/dashboard' },
  { label: 'Users', icon: Users, route: '/(admin)/users' },
  { label: 'Transactions', icon: CreditCard, route: '/(admin)/transactions', active: true },
  { label: 'Verification', icon: CheckCircle, route: '/(admin)/verification' },
  { label: 'Profile', icon: UserCircle, route: '/(admin)/profile' },
];

export default function TransactionLogs() {
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState('all');
  const { data: paymentsData, isLoading, error } = useAllPayments();

  const payments = paymentsData?.payments ?? [];

  // Format/filter transactions (backend returns paid orders + orderStatus)
  const filteredTransactions = useMemo(() => {
    if (!payments?.length) return [];
    if (activeTab === 'all') return payments;

    return payments.filter((t: any) => {
      const status = t?.orderStatus;
      if (activeTab === 'pending') return status === 'pending' || status === 'in-progress';
      if (activeTab === 'payouts') return status === 'delivered';
      return true;
    });
  }, [payments, activeTab]);

  const totalRevenue = useMemo(() => {
    return filteredTransactions.reduce(
      (sum: number, t: any) => sum + (Number(t.totalPrice ?? t.amount) || 0),
      0
    );
  }, [filteredTransactions]);

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
        <Text className="text-center text-foreground">Error loading transactions</Text>
      </SafeAreaView>
    );
  }

  const TransactionRow = ({ transaction }: { transaction: any }) => (
    (() => {
      const status = transaction?.orderStatus;
      const avatarBgClass =
        status === 'delivered' ? 'bg-primary/10' : status === 'cancelled' ? 'bg-destructive/10' : 'bg-muted';
      const dotBgClass =
        status === 'delivered'
          ? 'bg-primary shadow-lg shadow-primary/50'
          : status === 'cancelled'
            ? 'bg-destructive'
            : 'bg-muted-foreground';

      return (
    <View className="mb-2 flex-row items-center gap-4 rounded-xl border border-border bg-card p-3 shadow-sm">
      <View
        className={`h-12 w-12 items-center justify-center rounded-full ${avatarBgClass}`}>
        <Icon as={User} size={24} className="text-primary" />
      </View>
      <View className="flex-1">
        <View className="flex-row items-baseline justify-between">
          <Text className="font-bold text-foreground">{transaction.customerName}</Text>
          <Text className="font-bold text-foreground">
            ETB{' '}
            {Number(transaction.totalPrice ?? transaction.amount ?? 0).toLocaleString()}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-muted-foreground">
            {transaction.productName ? `${transaction.productName} • Qty ${transaction.quantity ?? 1}` : status}
          </Text>
          <Text className="text-[10px] font-medium text-muted-foreground">
            {transaction.paidAt || transaction.timestamp}
          </Text>
        </View>
      </View>
      <View
        className={`h-2 w-2 rounded-full ${dotBgClass}`}
      />
    </View>
      );
    })()
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
          <Text className="flex-1 text-center text-lg font-bold text-foreground">Transactions</Text>
          <Pressable
            style={{ cursor: 'pointer' }}
            className="flex h-10 w-10 items-center justify-center rounded-full">
            <Icon as={Search} size={20} className="text-primary" />
          </Pressable>
          <Button
            variant="secondary"
            size="icon"
            onPress={toggleTheme}
            className="ml-2 rounded-full"
          >
            {isDark ? <Icon as={Moon} size={20} className="text-primary" /> : <Icon as={Sun} size={20} className="text-primary" />}
          </Button>
        </View>

        {/* Tabs */}
        <View className="sticky top-16 z-10 border-b border-border bg-card">
          <View className="flex-row px-4">
            {tabs.map((tab) => (
              <Pressable
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                style={{ cursor: 'pointer' }}
                className={`flex-1 border-b-2 py-3 ${
                  activeTab === tab.id ? 'border-primary' : 'border-transparent'
                }`}>
                <Text
                  className={`text-sm font-bold uppercase tracking-wider ${
                    activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Summary Card */}
        <View className="mx-4 my-4 overflow-hidden rounded-xl bg-primary p-6 shadow-lg">
          <Text className="text-xs font-medium uppercase tracking-widest text-primary-foreground/60">Total Revenue</Text>
          <Text className="mt-3 text-3xl font-bold text-primary-foreground">
            ETB {totalRevenue.toLocaleString()}
          </Text>
          <Text className="mt-2 text-sm text-primary-foreground/60">
            Paid Orders: {filteredTransactions.length}
          </Text>
        </View>

        {/* Transactions List */}
        <View className="px-4 pb-4">
          <Text className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Recent Transactions
          </Text>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction: any) => (
              <TransactionRow key={transaction.id || transaction._id} transaction={transaction} />
            ))
          ) : (
            <View className="items-center justify-center py-8">
              <Text className="text-muted-foreground">No transactions found</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <AdminBottomNav navItems={navItems} isDark={isDark} />
    </SafeAreaView>
  );
}
