import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useThemeStore } from '@/src/features/theme';
import { ScreenLayout } from '@/src/components/ScreenLayout';

export default function TermsScreen() {
  const { isDark } = useThemeStore();
  const textClass = isDark ? 'text-slate-400' : 'text-slate-600';
  const headingClass = isDark ? 'text-white' : 'text-slate-900';

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
    <ScreenLayout title="Terms of Service" showBackButton={true} showThemeToggle={true}>
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
              By using Adama Bakery, you agree to these terms of service. We reserve the right to
              update our terms at any time without notice.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
