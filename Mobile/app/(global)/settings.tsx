import React from 'react';
import { View, Text, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { useThemeStore } from '@/src/features/theme';
import { useAuthStore } from '@/src/features/auth';
import { ScreenLayout } from '@/src/components/ScreenLayout';
import { Bell, Globe, LogOut, ChevronRight, Moon, User } from 'lucide-react-native';

export default function SettingsScreen() {
  const { isDark, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  const textClass = isDark ? 'text-slate-400' : 'text-slate-600';

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Logout',
        onPress: async () => {
          await logout();
          router.replace('/(global)/login');
        },
      },
    ]);
  };

  const settingItems = [
    {
      icon: <User size={20} color="#ec5b13" />,
      label: 'Profile Settings',
      onPress: () => router.push('/(customer)/profile'),
    },
    {
      icon: <Bell size={20} color="#ec5b13" />,
      label: 'Notifications',
      toggle: true,
    },
    {
      icon: <Globe size={20} color="#ec5b13" />,
      label: 'Language',
      description: 'English',
      onPress: () => {},
    },
  ];

  return (
    <ScreenLayout title="Settings" showBackButton={true} showThemeToggle={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Profile Section */}
        {user && (
          <View
            className={`mx-6 mb-6 rounded-lg border p-4 ${
              isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'
            }`}>
            <Text
              className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Logged in as
            </Text>
            <Text className={`mt-2 text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {user.name}
            </Text>
            <Text className={`mt-1 text-sm ${textClass}`}>{user.email}</Text>
          </View>
        )}

        {/* Settings Items */}
        <View className="mb-6 gap-3 px-6">
          {settingItems.map((item, idx) => (
            <Pressable
              key={idx}
              onPress={item.onPress}
              className={`flex-row items-center justify-between rounded-lg border p-4 ${
                isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
              }`}>
              <View className="flex-1 flex-row items-center gap-3">
                {item.icon}
                <View>
                  <Text className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {item.label}
                  </Text>
                  {item.description && (
                    <Text className={`mt-1 text-xs ${textClass}`}>{item.description}</Text>
                  )}
                </View>
              </View>
              {item.toggle ? (
                <Switch value={isDark} onValueChange={toggleTheme} />
              ) : (
                <ChevronRight size={20} color={isDark ? '#64748b' : '#cbd5e1'} />
              )}
            </Pressable>
          ))}
        </View>

        {/* About & Help */}
        <View className="mb-6 gap-3 px-6">
          <Pressable
            onPress={() => router.push('/(global)/about')}
            className={`flex-row items-center justify-between rounded-lg border p-4 ${
              isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
            }`}>
            <Text className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              About Adama Bakery
            </Text>
            <ChevronRight size={20} color={isDark ? '#64748b' : '#cbd5e1'} />
          </Pressable>

          <Pressable
            onPress={() => router.push('/(global)/privacy-policy')}
            className={`flex-row items-center justify-between rounded-lg border p-4 ${
              isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
            }`}>
            <Text className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Privacy Policy
            </Text>
            <ChevronRight size={20} color={isDark ? '#64748b' : '#cbd5e1'} />
          </Pressable>

          <Pressable
            onPress={() => router.push('/(global)/terms')}
            className={`flex-row items-center justify-between rounded-lg border p-4 ${
              isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
            }`}>
            <Text className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Terms of Service
            </Text>
            <ChevronRight size={20} color={isDark ? '#64748b' : '#cbd5e1'} />
          </Pressable>
        </View>

        {/* Logout Button */}
        <View className="px-6">
          <Pressable
            onPress={handleLogout}
            className="flex-row items-center justify-center gap-2 rounded-lg bg-red-600 p-4">
            <LogOut size={20} color="white" />
            <Text className="font-bold text-white">Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
