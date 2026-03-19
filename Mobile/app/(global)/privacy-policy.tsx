import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/src/features/theme';
import { Sun, Moon, ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalBottomNav } from '@/src/components/GlobalBottomNav';

export default function PrivacyPolicyScreen() {
  const { isDark, toggleTheme } = useThemeStore();
  const router = useRouter();

  const sections = [
    {
      title: 'Data Collection',
      content:
        'We collect information you provide directly to us, such as when you create an account or place an order.',
    },
    {
      title: 'Data Usage',
      content:
        'Your data is used to provide services, process orders, and improve our application experience.',
    },
    {
      title: 'Data Protection',
      content:
        'We implement appropriate security measures to protect your personal information from unauthorized access.',
    },
    {
      title: 'Third-party Sharing',
      content:
        'We do not share your personal data with third parties without your explicit consent.',
    },
    {
      title: 'Cookies',
      content:
        'We use cookies to enhance your experience and analytics. You can control cookie settings in your browser.',
    },
    {
      title: 'Contact Us',
      content: 'If you have privacy concerns, please contact us at privacy@adamabakery.com',
    },
  ];

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
          className={`flex-1 text-center text-lg font-bold ${isDark ? 'text-card-foreground' : 'text-foreground'}`}>
          Privacy Policy
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
              By using Adama Bakery, you agree to this privacy policy. We reserve the right to
              update this policy at any time.
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* Bottom Navigation */}
      <GlobalBottomNav />
    </SafeAreaView>
  );
}
