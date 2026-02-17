import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';
import { ROUTES } from '@/constants/routes';

const ACCOUNT_RULES = [
  'Provide accurate and complete registration information.',
  'Maintain the security and confidentiality of your password.',
  'Notify us immediately of any unauthorized use of your account.',
];

const CANCELLATION_RULES = [
  'Cancellations: Orders may be cancelled within a short time window (typically 30 minutes) of placement, provided preparation has not yet begun. Custom or large orders may have stricter policies communicated at the time of order.',
  'Refunds: Refunds are issued at the sole discretion of ABC Project. If a product is significantly damaged or incorrect, you must notify us within 2 hours of receipt. No refunds for taste preference or items consumed.',
];

const LOYALTY_RULES = [
  'Loyalty points are earned only on qualifying purchases made through the Service.',
  'Points have no monetary value and cannot be redeemed for cash.',
  'We may modify, suspend, or terminate the Loyalty Program or any membership at any time.',
];

export const TermsOfServiceScreen = () => {
  const navigation = useNavigation();
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';
  const toggleIconColor = isDark ? '#f5d67d' : '#374151';

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top', 'bottom']}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="flex-row items-center justify-between border-b border-gray-100 bg-background-light/95 px-5 py-4 dark:border-gray-800 dark:bg-background-dark/95">
          <Pressable
            onPress={() => navigation.goBack()}
            className="h-10 w-10 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark"
          >
            <MaterialCommunityIcons name="arrow-left" size={20} color={toggleIconColor} />
          </Pressable>
          <Text className="text-lg font-bold text-text-main dark:text-white">Legal & Terms</Text>
          <Pressable
            onPress={toggle}
            className="h-10 w-10 items-center justify-center rounded-full bg-surface-light shadow-sm ring-1 ring-gray-200 dark:bg-surface-dark dark:ring-gray-700"
          >
            <MaterialCommunityIcons name={toggleIconName} size={20} color={toggleIconColor} />
          </Pressable>
        </View>

          <View className="mx-auto w-full max-w-2xl px-6 py-6">
          <View className="mb-8">
              <Text className="mb-2 text-2xl font-extrabold text-text-main dark:text-white">
                Terms and Conditions
              </Text>
              <Text className="text-sm font-medium text-text-muted dark:text-white">
                Last updated: November 08, 2025
              </Text>
          </View>

            <View className="mb-8 gap-3">
              <Text className="text-base leading-relaxed text-text-muted dark:text-white">
                These Terms and Conditions ("Terms") govern your use of the ABC Ordering and Loyalty
                App, including the website at https://adama-bakery.vercel.app and the mobile
                application (collectively, the "Service"), provided by ABC Project (Adama Bakery and
                Cake) ("we," "us," or "our").
              </Text>
              <View className="rounded-xl bg-primary/10 p-4">
                <Text className="text-sm text-text-main dark:text-white">
                  By accessing or using the Service, you agree to be bound by these Terms. If you
                  disagree with any part of the terms, you may not access the Service.
                </Text>
              </View>
            </View>

            <View className="mb-8 gap-3">
              <View className="flex-row items-center gap-2">
                <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                  <Text className="text-xs font-bold text-primary">1</Text>
                </View>
                <Text className="text-lg font-bold text-text-main dark:text-white">
                  Acceptance of Terms
                </Text>
              </View>
              <Text className="text-base leading-relaxed text-text-muted dark:text-white">
                By using the Service, you confirm you are at least 18 years old or are accessing the
                Service under the supervision of a parent or legal guardian. These Terms constitute a
                binding legal agreement between you and ABC Project.
              </Text>
            </View>

            <View className="mb-8 gap-3">
              <View className="flex-row items-center gap-2">
                <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                  <Text className="text-xs font-bold text-primary">2</Text>
                </View>
                <Text className="text-lg font-bold text-text-main dark:text-white">
                  User Accounts and Registration
                </Text>
              </View>
              <Text className="text-base leading-relaxed text-text-muted dark:text-white">
                To access certain features, including placing orders and participating in the loyalty
                program, you must register for an account. You agree to:
              </Text>
              <View className="gap-2">
                {ACCOUNT_RULES.map((rule) => (
                  <Text key={rule} className="text-base text-text-muted dark:text-white">
                    - {rule}
                  </Text>
                ))}
              </View>
              <Text className="text-base leading-relaxed text-text-muted dark:text-white">
                We reserve the right to suspend or terminate your account if information provided is
                inaccurate, false, or misleading.
              </Text>
            </View>

            <View className="mb-8 gap-3">
              <View className="flex-row items-center gap-2">
                <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                  <Text className="text-xs font-bold text-primary">3</Text>
                </View>
                <Text className="text-lg font-bold text-text-main dark:text-white">
                  Online Ordering and Payment
                </Text>
              </View>
              <Text className="text-base leading-relaxed text-text-muted dark:text-white">
                Order Acceptance: All orders placed through the Service are subject to acceptance by
                ABC Project. We may refuse or cancel any order due to limitations on quantities,
                pricing errors, or fraud avoidance issues.
              </Text>
              <Text className="text-base leading-relaxed text-text-muted dark:text-white">
                Payment Processing: Payment must be processed through accepted methods (for example,
                Chapa). By submitting an order, you authorize our payment processor to charge the
                specified amount.
              </Text>
            </View>

            <View className="mb-8 gap-3">
              <View className="flex-row items-center gap-2">
                <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                  <Text className="text-xs font-bold text-primary">4</Text>
                </View>
                <Text className="text-lg font-bold text-text-main dark:text-white">
                  Cancellations and Refunds
                </Text>
              </View>
              <View className="gap-2">
                {CANCELLATION_RULES.map((rule) => (
                  <Text key={rule} className="text-base text-text-muted dark:text-white">
                    - {rule}
                  </Text>
                ))}
              </View>
            </View>

            <View className="mb-8 gap-3">
              <View className="flex-row items-center gap-2">
                <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                  <Text className="text-xs font-bold text-primary">5</Text>
                </View>
                <Text className="text-lg font-bold text-text-main dark:text-white">Loyalty Program</Text>
              </View>
              <View className="gap-2">
                {LOYALTY_RULES.map((rule) => (
                  <Text key={rule} className="text-base text-text-muted dark:text-white">
                    - {rule}
                  </Text>
                ))}
              </View>
            </View>

            <View className="mb-8 gap-3">
              <View className="flex-row items-center gap-2">
                <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                  <Text className="text-xs font-bold text-primary">6</Text>
                </View>
                <Text className="text-lg font-bold text-text-main dark:text-white">Intellectual Property</Text>
              </View>
              <Text className="text-base leading-relaxed text-text-muted dark:text-white">
                The Service and its original content, features, and functionality are and will remain
                the exclusive property of ABC Project and its licensors. You may not use our
                intellectual property without prior written consent.
              </Text>
            </View>

            <View className="mb-8 gap-3">
              <View className="flex-row items-center gap-2">
                <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                  <Text className="text-xs font-bold text-primary">7</Text>
                </View>
                <Text className="text-lg font-bold text-text-main dark:text-white">Termination</Text>
              </View>
              <Text className="text-base leading-relaxed text-text-muted dark:text-white">
                We may terminate or suspend your account immediately without notice for any reason,
                including a breach of these Terms. Upon termination, your right to use the Service
                ceases.
              </Text>
            </View>

            <View className="mb-8 gap-3">
              <View className="flex-row items-center gap-2">
                <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                  <Text className="text-xs font-bold text-primary">8</Text>
                </View>
                <Text className="text-lg font-bold text-text-main dark:text-white">Disclaimer of Warranties</Text>
              </View>
              <Text className="text-base leading-relaxed text-text-muted dark:text-white">
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Your use of the
                Service is at your sole risk. We disclaim all warranties of any kind.
              </Text>
            </View>

            <View className="mb-8 gap-3">
              <View className="flex-row items-center gap-2">
                <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                  <Text className="text-xs font-bold text-primary">9</Text>
                </View>
                <Text className="text-lg font-bold text-text-main dark:text-white">Limitation of Liability</Text>
              </View>
              <View className="rounded-xl bg-red-100 p-4 dark:bg-red-900/30">
                <View className="flex-row items-start gap-3">
                  <MaterialCommunityIcons name="alert-circle" size={20} color={isDark ? '#fecaca' : '#b91c1c'} />
                  <Text className="flex-1 text-base font-bold text-red-700 dark:text-white">
                    IN NO EVENT SHALL ABC PROJECT, NOR ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS,
                    SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                    CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, USE, GOODWILL,
                    OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF THE SERVICE.
                  </Text>
                </View>
              </View>
            </View>

            <View className="mb-8 gap-3">
              <View className="flex-row items-center gap-2">
                <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                  <Text className="text-xs font-bold text-primary">10</Text>
                </View>
                <Text className="text-lg font-bold text-text-main dark:text-white">Governing Law</Text>
              </View>
              <Text className="text-base leading-relaxed text-text-muted dark:text-white">
                These Terms shall be governed and construed in accordance with the laws of Ethiopia.
              </Text>
            </View>

            <View className="mb-8 gap-3">
              <View className="flex-row items-center gap-2">
                <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                  <Text className="text-xs font-bold text-primary">11</Text>
                </View>
                <Text className="text-lg font-bold text-text-main dark:text-white">Changes to Terms</Text>
              </View>
              <Text className="text-base leading-relaxed text-text-muted dark:text-white">
                We may modify or replace these Terms at any time. If a revision is material, we will
                try to provide at least 30 days' notice. By continuing to use the Service after the
                changes become effective, you agree to be bound by the revised terms.
              </Text>
            </View>

            <View className="mb-8 gap-3">
              <View className="flex-row items-center gap-2">
                <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                  <Text className="text-xs font-bold text-primary">12</Text>
                </View>
                <Text className="text-lg font-bold text-text-main dark:text-white">Contact Us</Text>
              </View>
              <Text className="text-base leading-relaxed text-text-muted dark:text-white">
                If you have any questions about these Terms, please contact us:
              </Text>
              <View className="mt-3 gap-2">
                <Text className="text-base text-text-muted dark:text-white">
                  - By email: yamlaknegash96@gmail.com
                </Text>
                <Text className="text-base text-text-muted dark:text-white">
                  - By post: ABC Project (Adama Bakery & Cake), P.O. Box 456, Adama, Oromia, Ethiopia
                </Text>
              </View>
            </View>

          <View className="mb-8 gap-3">
            <View className="flex-row items-center gap-2">
              <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                <Text className="text-xs font-bold text-primary">4</Text>
              </View>
              <Text className="text-lg font-bold text-text-main dark:text-white">Privacy Policy Summary</Text>
            </View>
            <Text className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
              We value your privacy. Your data is used solely to improve your experience and
              facilitate orders.
            </Text>
            <View className="mt-2 gap-2">
              <View className="flex-row items-start gap-3 rounded-lg p-3">
                <MaterialCommunityIcons name="shield-check" size={18} color="#f97316" />
                <View>
                  <Text className="text-sm font-semibold text-text-main dark:text-white">Data Collection</Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    We collect basic profile information and order history.
                  </Text>
                </View>
              </View>
              <View className="flex-row items-start gap-3 rounded-lg p-3">
                <MaterialCommunityIcons name="map-marker" size={18} color="#f97316" />
                <View>
                  <Text className="text-sm font-semibold text-text-main dark:text-white">Location Services</Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    Location data is used only to show nearby bakeries and calculate delivery fees.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-8 border-t border-gray-200 pt-8 text-center dark:border-gray-800">
            <Text className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Have questions about our legal policies?
            </Text>
            <Pressable 
            onPress={() => navigation.navigate(ROUTES.Contact as never)}
            className="flex-row items-center justify-center gap-2 rounded-xl border border-gray-200 bg-surface-light px-6 py-3 dark:border-gray-700 dark:bg-surface-dark">
              <MaterialCommunityIcons name="email" size={18} color={toggleIconColor} />
              <Text className="text-sm font-semibold text-text-main dark:text-white">
                Contact Legal Support
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
