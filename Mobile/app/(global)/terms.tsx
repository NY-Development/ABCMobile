import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/src/features/theme';
import { Sun, Moon, ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalBottomNav } from '@/src/components/GlobalBottomNav';

export default function TermsScreen() {
  const { isDark, toggleTheme } = useThemeStore();
  const router = useRouter();

  const sections = [
    {
      title: 'Agreement to Terms',
      content:
        'By accessing and using Adama Bakery application, you accept and agree to be bound by the terms and provision of this agreement.',
    },
    {
      title: 'User Responsibilities',
      content:
        'You agree to use this application only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment.',
    },
    {
      title: 'Product Information',
      content:
        'We strive to provide accurate product information. However, we do not warrant that all product descriptions are accurate or error-free.',
    },
    {
      title: 'Ordering & Payment',
      content:
        'By placing an order, you agree to pay the listed price including any applicable taxes and delivery fees.',
    },
    {
      title: 'Limitation of Liability',
      content:
        'Adama Bakery shall not be liable for any indirect, incidental, special, consequential, or punitive damages.',
    },
    {
      title: 'Cancellation & Refunds',
      content:
        'Cancellations must be made before your order is prepared. Refunds will be processed within 5-7 business days.',
    },
    {
      title: 'Modifications to Terms',
      content:
        'We reserve the right to modify these terms at any time. Continued use of the application constitutes acceptance of changes.',
    },
    {
      title: 'Contact',
      content: 'For questions about these terms, please contact support@adamabakery.com',
    },
  ];

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
      {/* Header */}
      <View
        className={`flex-row items-center justify-between border-b px-4 py-3 ${isDark ? 'bg-background-dark border-border' : 'bg-background-light border-border'}`}>
        <Pressable
          onPress={() => router.back()}
          className="rounded-full p-2 active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ArrowLeft size={24} color={isDark ? '#ffffff' : '#1e293b'} />
        </Pressable>
        <Text
          className={`flex-1 text-center text-lg font-bold ${isDark ? 'text-card-foreground' : 'text-foreground'}`}>
          Terms of Service
        </Text>
        <Pressable onPress={toggleTheme} className="rounded-lg p-2 active:opacity-70">
          {isDark ? <Sun size={24} color="#fbb040" /> : <Moon size={24} color="#64748b" />}
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="gap-6 px-6">
          <Text className={`text-sm ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
            Last updated: {new Date().toLocaleDateString()}
          </Text>

          {sections.map((section, idx) => (
            <View key={idx} className="gap-2">
              <Text
                className={`text-lg font-bold ${isDark ? 'text-card-foreground' : 'text-foreground'}`}>
                {idx + 1}. {section.title}
              </Text>
              <Text
                className={`text-sm leading-6 ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                {section.content}
              </Text>
            </View>
          ))}

          <View
            className={`rounded-lg border p-4 ${isDark ? 'border-border bg-card/10' : 'border-border bg-card'}`}>
            <Text
              className={`text-xs ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
              By using Adama Bakery, you agree to these terms of service. We reserve the right to
              update our terms at any time without notice.
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* Bottom Navigation */}
      <GlobalBottomNav />
    </SafeAreaView>
  );
}
