import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useLogoutMutation } from '@/src/hooks/useAuth';
import {
  Bell,
  Clock,
  CreditCard,
  Lock,
  ShieldCheck,
  LogOut,
  FileText,
  ChevronRight,
  AlertCircle,
} from 'lucide-react-native';

export default function VendorSettingsScreen() {
  const router = useRouter();
  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation();
  const [notifications, setNotifications] = useState({
    newOrders: true,
    dailyReports: true,
  });

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Logout',
        onPress: () => {
          logout();
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <View className="border-b border-border bg-card px-4 py-3">
          <Text className="text-lg font-bold text-foreground">Settings</Text>
        </View>

        {/* Profile Section */}
        <View className="mx-4 mb-6 mt-4 flex-row items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Text className="text-3xl">🍰</Text>
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold text-foreground">Adama Bakery</Text>
            <Text className="text-sm text-muted-foreground">Owner: Adama Kebede</Text>
            <View className="mt-2 inline-flex flex-row items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
              <Text className="text-xs font-bold text-primary">Premium Partner</Text>
            </View>
          </View>
        </View>

        {/* Daily Payouts Card */}
        <View className="mx-4 mb-6 flex-row items-center justify-between rounded-2xl bg-primary p-6 shadow-lg">
          <View>
            <Text className="text-xs font-semibold uppercase text-primary/70">Daily Payouts</Text>
            <Text className="mt-1 text-3xl font-bold text-white">$1,240.50</Text>
            <Pressable className="mt-3 flex-row items-center justify-center rounded-lg bg-white/20 px-4 py-2">
              <Text className="text-sm font-bold text-white">View Wallet</Text>
            </Pressable>
          </View>
          <View className="h-20 w-20 items-center justify-center rounded-full bg-white/10">
            <CreditCard size={32} color="rgba(255,255,255,0.3)" />
          </View>
        </View>

        {/* Business Notifications */}
        <View className="mx-4 mb-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <View className="mb-4 flex-row items-center gap-3">
            <Bell size={20} color="#ec5b13" />
            <Text className="text-lg font-bold text-foreground">Business Notifications</Text>
          </View>

          <View className="space-y-4">
            {/* New Orders Toggle */}
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">New Orders</Text>
                <Text className="mt-1 text-xs text-muted-foreground">
                  Real-time alerts for every sale
                </Text>
              </View>
              <Switch
                value={notifications.newOrders}
                onValueChange={(value) =>
                  setNotifications((prev) => ({ ...prev, newOrders: value }))
                }
                trackColor={{ false: '#e5e7eb', true: '#ec5b1380' }}
                thumbColor={notifications.newOrders ? '#ec5b13' : '#6b7280'}
              />
            </View>

            {/* Daily Reports Toggle */}
            <View className="border-t border-border pt-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground">Daily Reports</Text>
                  <Text className="mt-1 text-xs text-muted-foreground">
                    Summary of earnings and stock
                  </Text>
                </View>
                <Switch
                  value={notifications.dailyReports}
                  onValueChange={(value) =>
                    setNotifications((prev) => ({ ...prev, dailyReports: value }))
                  }
                  trackColor={{ false: '#e5e7eb', true: '#ec5b1380' }}
                  thumbColor={notifications.dailyReports ? '#ec5b13' : '#6b7280'}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Operating Hours */}
        <View className="mx-4 mb-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Clock size={20} color="#ec5b13" />
              <Text className="text-lg font-bold text-foreground">Operating Hours</Text>
            </View>
            <Pressable>
              <Text className="text-xs font-bold uppercase text-primary">Edit</Text>
            </Pressable>
          </View>

          <View className="space-y-2">
            <View className="flex-row items-center justify-between border-b border-border pb-3">
              <Text className="text-sm text-muted-foreground">Mon - Fri</Text>
              <Text className="font-semibold text-foreground">06:00 AM - 08:00 PM</Text>
            </View>
            <View className="flex-row items-center justify-between border-b border-border py-3">
              <Text className="text-sm text-muted-foreground">Saturday</Text>
              <Text className="font-semibold text-foreground">07:00 AM - 09:00 PM</Text>
            </View>
            <View className="flex-row items-center justify-between pt-3">
              <Text className="text-sm text-muted-foreground">Sunday</Text>
              <Text className="font-semibold italic text-primary">Closed</Text>
            </View>
          </View>
        </View>

        {/* Payment & Payouts */}
        <View className="mx-4 mb-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <View className="mb-4 flex-row items-center gap-3">
            <CreditCard size={20} color="#ec5b13" />
            <Text className="text-lg font-bold text-foreground">Payment & Payouts</Text>
          </View>

          <Pressable className="flex-row items-center justify-between rounded-xl border border-border bg-muted px-4 py-3">
            <View className="flex-row items-center gap-3">
              <View className="items-center justify-center rounded-lg bg-border p-2">
                <CreditCard size={18} color="#6b7280" />
              </View>
              <View>
                <Text className="text-sm font-bold text-foreground">Chase Business</Text>
                <Text className="text-xs text-muted-foreground">Ending in •••• 8829</Text>
              </View>
            </View>
            <ChevronRight size={18} color="#9ca3af" />
          </Pressable>

          <Text className="mt-3 text-xs font-semibold uppercase tracking-tight text-muted-foreground">
            Next Payout scheduled for Wednesday, Oct 25
          </Text>
        </View>

        {/* Security */}
        <View className="mx-4 mb-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <View className="mb-4 flex-row items-center gap-3">
            <ShieldCheck size={20} color="#ec5b13" />
            <Text className="text-lg font-bold text-foreground">Security</Text>
          </View>

          <Pressable className="flex-row items-center justify-between border-b border-border py-3">
            <View className="flex-row items-center gap-3">
              <Lock size={16} color="#9ca3af" />
              <Text className="text-sm font-semibold text-foreground">Change Password</Text>
            </View>
            <ChevronRight size={16} color="#9ca3af" />
          </Pressable>

          <Pressable className="flex-row items-center justify-between pt-3">
            <View className="flex-row items-center gap-3">
              <AlertCircle size={16} color="#9ca3af" />
              <Text className="text-sm font-semibold text-foreground">Two-Factor Auth</Text>
            </View>
            <View className="rounded-lg bg-primary/10 px-2 py-1">
              <Text className="text-xs font-bold text-primary">Enabled</Text>
            </View>
          </Pressable>
        </View>

        {/* Legal Section */}
        <View className="mx-4 mb-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <Text className="mb-4 text-lg font-bold text-foreground">Legal</Text>

          <View className="flex-row gap-3">
            <Pressable className="flex-1 flex-row items-center gap-3 rounded-xl border border-border bg-muted px-4 py-3">
              <FileText size={18} color="#9ca3af" />
              <Text className="text-sm font-medium text-foreground">Terms</Text>
            </Pressable>

            <Pressable className="flex-1 flex-row items-center gap-3 rounded-xl border border-border bg-muted px-4 py-3">
              <AlertCircle size={18} color="#9ca3af" />
              <Text className="text-sm font-medium text-foreground">Privacy</Text>
            </Pressable>
          </View>
        </View>

        {/* Logout Button */}
        <View className="mx-4 mb-8">
          <Pressable
            onPress={handleLogout}
            disabled={isLoggingOut}
            className={`flex-row items-center justify-center gap-2 rounded-xl px-6 py-4 ${
              isLoggingOut ? 'bg-red-400 opacity-60' : 'bg-red-600'
            }`}>
            <LogOut size={20} color="#fff" />
            <Text className="text-lg font-bold text-white">
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
