import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/src/features/theme';
import { Sun, Moon, ArrowLeft } from 'lucide-react-native';
import { GlobalBottomNav } from '@/src/components/GlobalBottomNav';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
  const { isDark, toggleTheme } = useThemeStore();
  const router = useRouter();

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
      {/* Header */}
      <View
        className={`flex-row items-center justify-between border-b px-4 py-3 ${
          isDark ? 'bg-background-dark border-border' : 'bg-background-light border-border'
        }`}>
        <Pressable
          onPress={() => router.back()}
          className="rounded-full p-2 active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ArrowLeft size={24} color={isDark ? '#ffffff' : '#1e293b'} />
        </Pressable>

        <Text
          className={`flex-1 text-center text-lg font-bold ${
            isDark ? 'text-card-foreground' : 'text-foreground'
          }`}>
          About Adama Bakery
        </Text>

        <Pressable onPress={toggleTheme} className="rounded-lg p-2 active:opacity-70">
          {isDark ? <Sun size={24} color="#fbb040" /> : <Moon size={24} color="#64748b" />}
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="gap-6 px-6">
          {/* Logo */}
          <View className="items-center py-6">
            <Text className="mb-4 text-6xl">🍰</Text>
            <Text
              className={`text-2xl font-bold ${
                isDark ? 'text-card-foreground' : 'text-foreground'
              }`}>
              Adama Bakery
            </Text>
            <Text
              className={`mt-2 text-sm ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
              Version 1.0.0
            </Text>
          </View>

          {/* Mission */}
          <View className="gap-2">
            <Text
              className={`text-lg font-bold ${
                isDark ? 'text-card-foreground' : 'text-foreground'
              }`}>
              Our Mission
            </Text>
            <Text
              className={`text-sm leading-6 ${
                isDark ? 'text-muted-foreground' : 'text-muted-foreground'
              }`}>
              Adama Bakery is dedicated to bringing freshly baked, high-quality bakery products to
              your doorstep. We believe in using traditional baking methods combined with modern
              convenience.
            </Text>
          </View>

          {/* Values */}
          <View className="gap-2">
            <Text
              className={`text-lg font-bold ${
                isDark ? 'text-card-foreground' : 'text-foreground'
              }`}>
              Our Values
            </Text>
            <View className="gap-3">
              {[
                { icon: '✨', title: 'Quality', desc: 'Only the finest ingredients' },
                { icon: '⏰', title: 'Freshness', desc: 'Baked fresh daily' },
                { icon: '🤝', title: 'Community', desc: 'Supporting local bakers' },
              ].map((value, idx) => (
                <View key={idx} className="flex-row gap-3">
                  <Text className="text-2xl">{value.icon}</Text>
                  <View>
                    <Text
                      className={`font-bold ${
                        isDark ? 'text-card-foreground' : 'text-foreground'
                      }`}>
                      {value.title}
                    </Text>
                    <Text
                      className={`text-sm ${
                        isDark ? 'text-muted-foreground' : 'text-muted-foreground'
                      }`}>
                      {value.desc}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Contact */}
          <View className="gap-2">
            <Text
              className={`text-lg font-bold ${
                isDark ? 'text-card-foreground' : 'text-foreground'
              }`}>
              Contact Us
            </Text>
            <Text
              className={`text-sm ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
              📧 contact@adamabakery.com{'\n'}
              📱 +251 911 234 567{'\n'}
              📍 Addis Ababa, Ethiopia
            </Text>
          </View>

          {/* Social */}
          <View className="gap-2">
            <Text
              className={`text-lg font-bold ${
                isDark ? 'text-card-foreground' : 'text-foreground'
              }`}>
              Follow Us
            </Text>
            <View className="flex-row gap-3">
              {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                <Text
                  key={social}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                    isDark ? 'bg-card/10 text-card-foreground' : 'bg-secondary text-foreground'
                  }`}>
                  {social}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Bottom Navigation */}
      <GlobalBottomNav />
    </SafeAreaView>
  );
}
