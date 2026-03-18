import React from 'react';
import { View, Text, ScrollView, Pressable, ImageBackground, Image } from 'react-native';
import { router } from 'expo-router';
import { useThemeStore } from '@/src/features/theme';
import { ScreenLayout } from '@/src/components/ScreenLayout';
import { PrimaryButton } from '@/src/components/FormComponents';
import { ChevronRight } from 'lucide-react-native';

export default function LandingScreen() {
  const { isDark } = useThemeStore();
  const accentClass = '#ec5b13';

  return (
    <ScreenLayout showBackButton={false} showThemeToggle={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Hero Section */}
        <View
          className={`rounded-2xl p-6 ${isDark ? 'bg-slate-800' : 'bg-slate-100'} mb-6 items-center gap-4`}>
          <Text className="text-6xl">🍰</Text>
          <Text
            className={`text-center text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Adama Bakery
          </Text>
          <Text className={`text-center text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Fresh baked goodness delivered to your doorstep
          </Text>
        </View>

        {/* Featured Section */}
        <View className="mb-6 px-6">
          <Text className={`mb-4 text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Featured Today
          </Text>

          {['Chocolate Cake', 'Sourdough Bread', 'Croissants'].map((item, idx) => (
            <Pressable
              key={idx}
              className={`mb-3 flex-row items-center gap-4 rounded-lg border p-4 ${
                isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
              }`}>
              <Text className="text-4xl">{['🍫', '🍞', '🥐'][idx]}</Text>
              <View className="flex-1">
                <Text className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item}
                </Text>
                <Text className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Order now for fresh delivery
                </Text>
              </View>
              <ChevronRight size={20} color={accentClass} />
            </Pressable>
          ))}
        </View>

        {/* Stats Section */}
        <View className="mb-6 flex-row justify-between px-6">
          {[
            { label: 'Orders', value: '5000+' },
            { label: 'Customers', value: '2000+' },
            { label: 'Reviews', value: '4.8⭐' },
          ].map((stat, idx) => (
            <View
              key={idx}
              className={`mx-1 flex-1 items-center rounded-lg p-4 ${
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              }`}>
              <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {stat.value}
              </Text>
              <Text className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* CTA Buttons */}
        <View className="gap-3 px-6">
          <PrimaryButton label="Browse Products" onPress={() => router.push('/(customer)/home')} />
          <Pressable
            className={`items-center rounded-lg border p-4 ${
              isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
            }`}
            onPress={() => router.push('/(global)/login')}>
            <Text className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Sign In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
