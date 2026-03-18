import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useThemeStore } from '@/src/features/theme';
import { ScreenLayout } from '@/src/components/ScreenLayout';

export default function PrivacyPolicyScreen() {
  const { isDark } = useThemeStore();
  const textClass = isDark ? 'text-slate-400' : 'text-slate-600';
  const headingClass = isDark ? 'text-white' : 'text-slate-900';

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
    <ScreenLayout title="Privacy Policy" showBackButton={true} showThemeToggle={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="gap-6 px-6">
          <Text className={`text-sm ${textClass}`}>
            Last updated: {new Date().toLocaleDateString()}
          </Text>

          {sections.map((section, idx) => (
            <View key={idx} className="gap-2">
              <Text className={`text-lg font-bold ${headingClass}`}>
                {idx + 1}. {section.title}
              </Text>
              <Text className={`text-sm leading-6 ${textClass}`}>{section.content}</Text>
            </View>
          ))}

          <View
            className={`rounded-lg border p-4 ${
              isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'
            }`}>
            <Text className={`text-xs ${textClass}`}>
              By using Adama Bakery, you agree to this privacy policy. We reserve the right to
              update this policy at any time.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
