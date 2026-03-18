import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '@/src/features/theme';
import { useAllPayments } from '@/src/features/admin/hooks';
import { ChevronLeft, Search, Sun, Moon } from 'lucide-react-native';

interface Transaction {
  id: string;
  customerName: string;
  amount: number;
  description: string;
  timestamp: string;
  status: 'paid' | 'unpaid';
}

const mockTransactions: Transaction[] = [];

const tabs = [
  { id: 'all', label: 'All Activity' },
  { id: 'pending', label: 'Pending' },
  { id: 'payouts', label: 'Payouts' },
];

const navItems = [
  { label: 'Dashboard', icon: '📊', route: '/(admin)/dashboard' },
  { label: 'Users', icon: '👥', route: '/(admin)/users' },
  { label: 'Transactions', icon: '💳', route: '/(admin)/transactions', active: true },
  { label: 'Verification', icon: '✓', route: '/(admin)/verification' },
  { label: 'Profile', icon: '👨‍💼', route: '/(admin)/profile' },
];

export default function TransactionLogs() {
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState('all');
  const { data: paymentsData, isLoading, error } = useAllPayments();

  // Format transactions
  const filteredTransactions = useMemo(() => {
    if (!paymentsData) return [];
    if (activeTab === 'all') return paymentsData;
    return paymentsData.filter((t) => {
      if (activeTab === 'pending') return t.status === 'unpaid';
      if (activeTab === 'payouts') return t.status === 'paid';
      return true;
    });
  }, [paymentsData, activeTab]);

  const totalRevenue = useMemo(() => {
    return filteredTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  }, [filteredTransactions]);

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
        <Text className="text-center text-foreground">Error loading transactions</Text>
      </SafeAreaView>
    );
  }

  const TransactionRow = ({ transaction }: { transaction: Transaction }) => (
    <View className="mb-2 flex-row items-center gap-4 rounded-xl border border-border bg-card p-3 shadow-sm">
      <View
        className={`h-12 w-12 items-center justify-center rounded-full ${
          transaction.status === 'paid' ? 'bg-primary/10' : 'bg-muted-foreground/20'
        }`}>
        <Text className="text-lg text-primary">👤</Text>
      </View>
      <View className="flex-1">
        <View className="flex-row items-baseline justify-between">
          <Text className="font-bold text-foreground">{transaction.customerName}</Text>
          <Text className="font-bold text-foreground">${transaction.amount.toFixed(2)}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-muted-foreground">{transaction.description}</Text>
          <Text className="text-[10px] font-medium text-muted-foreground">
            {transaction.timestamp}
          </Text>
        </View>
      </View>
      <View
        className={`h-2 w-2 rounded-full ${
          transaction.status === 'paid'
            ? 'bg-green-500 shadow-lg shadow-green-500/50'
            : 'bg-muted-foreground'
        }`}
      />
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
            <ChevronLeft size={24} color="#ec5b13" />
          </Pressable>
          <Text className="flex-1 text-center text-lg font-bold text-foreground">Transactions</Text>
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
          <Text className="text-xs font-medium uppercase tracking-widest text-primary/60">
            Total Revenue
          </Text>
          <Text className="mt-3 text-3xl font-bold text-white">${totalRevenue.toFixed(2)}</Text>
          <View className="mt-4 flex-row items-center gap-2">
            <View className="rounded-full bg-white/20 px-2.5 py-0.5">
              <Text className="text-xs font-bold text-white">📈 +12.5%</Text>
            </View>
            <Text className="text-xs text-white/60">vs last month</Text>
          </View>
        </View>

        {/* Transactions List */}
        <View className="px-4 pb-4">
          <Text className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Recent Transactions
          </Text>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
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
      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-around border-t border-border bg-card px-4 pb-6 pt-3">
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
