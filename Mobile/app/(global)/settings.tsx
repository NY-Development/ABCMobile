import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useThemeStore } from '@/src/features/theme';
import {
  Bell,
  Moon,
  Globe,
  Info,
  FileText,
  Scale,
  LogIn,
  Home,
  Search,
  Clock,
  Settings,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react-native';
import { GlobalBottomNav } from '@/src/components/GlobalBottomNav';

export default function SettingsScreen() {
  const { isDark, setTheme } = useThemeStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View
        className="flex-row items-center gap-2 border-b bg-card border-border px-4 py-3">
        <Pressable
          onPress={() => router.back()}
          className="rounded-full p-2 active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ArrowLeft size={24} color={isDark ? '#ffffff' : '#1e293b'} />
        </Pressable>
        <Text
          className={`text-lg font-bold ${isDark ? 'text-card-foreground' : 'text-foreground'}`}>
          Settings
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Preferences Section */}
        <View className="gap-2 px-4 py-6">
          <Text
            className={`mb-2 px-2 text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-muted-foreground' : 'text-muted-foreground'
            }`}>
            Preferences
          </Text>

          {/* Notifications */}
          <View
            className={`flex-row items-center justify-between rounded-xl border px-4 py-4 ${
              isDark ? 'border-border bg-card' : 'border-border bg-card'
            }`}>
            <View className="flex-row items-center gap-4">
              <View className={`rounded-lg p-2 ${isDark ? 'bg-primary/10' : 'bg-primary/10'}`}>
                <Bell size={20} color="#ec5b13" />
              </View>
              <Text
                className={`text-sm font-medium ${isDark ? 'text-card-foreground' : 'text-foreground'}`}>
                Notifications
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#cbd5e1', true: '#ec5b13' }}
            />
          </View>

          {/* Dark Mode */}
          <View
            className={`flex-row items-center justify-between rounded-xl border px-4 py-4 ${
              isDark ? 'border-border bg-card' : 'border-border bg-card'
            }`}>
            <View className="flex-row items-center gap-4">
              <View className={`rounded-lg p-2 ${isDark ? 'bg-primary/10' : 'bg-primary/10'}`}>
                <Moon size={20} color="#ec5b13" />
              </View>
              <Text
                className={`text-sm font-medium ${isDark ? 'text-card-foreground' : 'text-foreground'}`}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={(value) => setTheme(value)}
              trackColor={{ false: '#cbd5e1', true: '#ec5b13' }}
            />
          </View>

          {/* Language */}
          <Pressable
            onPress={() => {}}
            className={`flex-row items-center justify-between rounded-xl border px-4 py-4 active:opacity-70 ${
              isDark ? 'border-border bg-card' : 'border-border bg-card'
            }`}>
            <View className="flex-row items-center gap-4">
              <View className={`rounded-lg p-2 ${isDark ? 'bg-primary/10' : 'bg-primary/10'}`}>
                <Globe size={20} color="#ec5b13" />
              </View>
              <View>
                <Text
                  className={`text-sm font-medium ${isDark ? 'text-card-foreground' : 'text-foreground'}`}>
                  Language
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-2">
              <Text
                className={`text-xs ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                English (US)
              </Text>
              <ChevronRight size={20} color={isDark ? '#64748b' : '#cbd5e1'} />
            </View>
          </Pressable>
        </View>

        {/* Legal & Info Section */}
        <View className="gap-2 px-4 py-6">
          <Text
            className={`mb-2 px-2 text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-muted-foreground' : 'text-muted-foreground'
            }`}>
            Legal & Info
          </Text>

          {/* About */}
          <Pressable
            onPress={() => router.push('/(global)/about')}
            className={`flex-row items-center justify-between rounded-xl border px-4 py-4 active:opacity-70 ${
              isDark ? 'border-border bg-card' : 'border-border bg-card'
            }`}>
            <View className="flex-row items-center gap-4">
              <View className={`rounded-lg p-2 ${isDark ? 'bg-primary/10' : 'bg-primary/10'}`}>
                <Info size={20} color="#ec5b13" />
              </View>
              <Text
                className={`text-sm font-medium ${isDark ? 'text-card-foreground' : 'text-foreground'}`}>
                About
              </Text>
            </View>
            <ChevronRight size={20} color={isDark ? '#64748b' : '#cbd5e1'} />
          </Pressable>

          {/* Privacy Policy */}
          <Pressable
            onPress={() => router.push('/(global)/privacy-policy')}
            className={`flex-row items-center justify-between rounded-xl border px-4 py-4 active:opacity-70 ${
              isDark ? 'border-border bg-card' : 'border-border bg-card'
            }`}>
            <View className="flex-row items-center gap-4">
              <View className={`rounded-lg p-2 ${isDark ? 'bg-primary/10' : 'bg-primary/10'}`}>
                <Scale size={20} color="#ec5b13" />
              </View>
              <Text
                className={`text-sm font-medium ${isDark ? 'text-card-foreground' : 'text-foreground'}`}>
                Privacy Policy
              </Text>
            </View>
            <ChevronRight size={20} color={isDark ? '#64748b' : '#cbd5e1'} />
          </Pressable>

          {/* Terms of Service */}
          <Pressable
            onPress={() => router.push('/(global)/terms')}
            className={`flex-row items-center justify-between rounded-xl border px-4 py-4 active:opacity-70 ${
              isDark ? 'border-border bg-card' : 'border-border bg-card'
            }`}>
            <View className="flex-row items-center gap-4">
              <View className={`rounded-lg p-2 ${isDark ? 'bg-primary/10' : 'bg-primary/10'}`}>
                <FileText size={20} color="#ec5b13" />
              </View>
              <Text
                className={`text-sm font-medium ${isDark ? 'text-card-foreground' : 'text-foreground'}`}>
                Terms of Service
              </Text>
            </View>
            <ChevronRight size={20} color={isDark ? '#64748b' : '#cbd5e1'} />
          </Pressable>
        </View>

        {/* Action Zone */}
        <View className="px-4 py-6">
          <Pressable
            onPress={() => router.push('/(global)/login')}
            className="flex-row items-center justify-center gap-2 rounded-xl bg-primary py-4 active:opacity-80">
            <LogIn size={20} color="white" />
            <Text className="font-bold text-white">Login</Text>
          </Pressable>
          <Text
            className={`mt-6 text-center text-[10px] ${
              isDark ? 'text-muted-foreground' : 'text-muted-foreground'
            }`}>
            Adama Bakery & Cake v2.4.0 (Build 2023)
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <GlobalBottomNav />
    </SafeAreaView>
  );
}
