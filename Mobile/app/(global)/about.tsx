import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useThemeStore } from '@/src/features/theme';
import { ScreenLayout } from '@/src/components/ScreenLayout';

export default function AboutScreen() {
  const { isDark } = useThemeStore();
  const textClass = isDark ? 'text-slate-400' : 'text-slate-600';
  const headingClass = isDark ? 'text-white' : 'text-slate-900';

  return (
    <ScreenLayout title="About Adama Bakery" showBackButton={true} showThemeToggle={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="gap-6 px-6">
          {/* Logo */}
          <View className="items-center py-6">
            <Text className="mb-4 text-6xl">🍰</Text>
            <Text className={`text-2xl font-bold ${headingClass}`}>Adama Bakery</Text>
            <Text className={`mt-2 text-sm ${textClass}`}>Version 1.0.0</Text>
          </View>

          {/* Mission */}
          <View className="gap-2">
            <Text className={`text-lg font-bold ${headingClass}`}>Our Mission</Text>
            <Text className={`text-sm leading-6 ${textClass}`}>
              Adama Bakery is dedicated to bringing freshly baked, high-quality bakery products to
              your doorstep. We believe in using traditional baking methods combined with modern
              convenience.
            </Text>
          </View>

          {/* Values */}
          <View className="gap-2">
            <Text className={`text-lg font-bold ${headingClass}`}>Our Values</Text>
            <View className="gap-3">
              {[
                { icon: '✨', title: 'Quality', desc: 'Only the finest ingredients' },
                { icon: '⏰', title: 'Freshness', desc: 'Baked fresh daily' },
                { icon: '🤝', title: 'Community', desc: 'Supporting local bakers' },
              ].map((value, idx) => (
                <View key={idx} className="flex-row gap-3">
                  <Text className="text-2xl">{value.icon}</Text>
                  <View>
                    <Text className={`font-bold ${headingClass}`}>{value.title}</Text>
                    <Text className={`text-sm ${textClass}`}>{value.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Contact */}
          <View className="gap-2">
            <Text className={`text-lg font-bold ${headingClass}`}>Contact Us</Text>
            <Text className={`text-sm ${textClass}`}>
              📧 contact@adamabakery.com{'\n'}
              📱 +251 911 234 567{'\n'}
              📍 Addis Ababa, Ethiopia
            </Text>
          </View>

          {/* Social */}
          <View className="gap-2">
            <Text className={`text-lg font-bold ${headingClass}`}>Follow Us</Text>
            <View className="flex-row gap-3">
              {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                <Text
                  key={social}
                  className={`rounded-lg px-4 py-2 text-sm ${
                    isDark ? 'bg-slate-800' : 'bg-slate-100'
                  } ${headingClass}`}>
                  {social}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
