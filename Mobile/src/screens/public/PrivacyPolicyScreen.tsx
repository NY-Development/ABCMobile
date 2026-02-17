import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';
import { ROUTES } from '@/constants/routes';

const SERVICE_CONTEXTS = [
  'Visit our website at https://adama-bakery.vercel.app or any website that links to this Privacy Notice.',
  'Download and use our mobile application (Adama Bakery & Cake | ABC), or any other application that links to this Privacy Notice.',
  'Use the ABC Online Ordering & Management System to order baked goods and manage purchases.',
  'Engage with us in other related ways, including sales, marketing, or events.',
];

const PERSONAL_INFO_ITEMS = [
  'Names, phone numbers, email addresses, usernames, and passwords when you register or participate in activities.',
];

const APPLICATION_DATA_ITEMS = [
  'Geolocation information for location-based services such as finding the nearest branch or delivery.',
  'Mobile device data including device ID, model, operating system, and unique device ID for security and operation.',
];

const PROCESSING_REASONS = [
  'To facilitate account creation and authentication and otherwise manage user accounts.',
  'To deliver and facilitate delivery of services to the user (for example, fulfilling orders).',
  'To respond to user inquiries and offer support.',
  'To fulfill and manage orders, payments, returns, and exchanges made through the Services.',
  'To deliver targeted advertising to you.',
  'To protect our Services, including fraud monitoring and prevention.',
  'To comply with our legal obligations.',
];

const SHARING_REASONS = [
  'Business transfers in connection with any merger or sale of company assets.',
  'Google Maps Platform APIs to provide directions and location-based services.',
];

const PRIVACY_RIGHTS = [
  'Review, change, or terminate your account at any time.',
  'Withdraw your consent to processing your personal information by contacting us.',
];

export const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';
  const toggleIconColor = isDark ? '#f5d67d' : '#374151';

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top', 'bottom']}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="flex-row items-center justify-between border-b border-black/5 bg-background-light/90 px-5 py-3 dark:border-white/5 dark:bg-background-dark/90">
          <Pressable
            onPress={() => navigation.goBack()}
            className="h-10 w-10 items-center justify-center rounded-full text-text-main dark:text-white"
          >
            <MaterialCommunityIcons name="arrow-left" size={22} color={toggleIconColor} />
          </Pressable>
          <Text className="text-lg font-bold text-text-main dark:text-white">Privacy Policy</Text>
          <Pressable
            onPress={toggle}
            className="h-10 w-10 items-center justify-center rounded-full bg-surface-light shadow-sm ring-1 ring-gray-200 dark:bg-surface-dark dark:ring-gray-700"
          >
            <MaterialCommunityIcons name={toggleIconName} size={20} color={toggleIconColor} />
          </Pressable>
        </View>

        <View className="mx-auto w-full max-w-2xl px-6 py-8">
          <View className="mb-8">
            <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
              Last updated: November 05, 2025
            </Text>
            <Text className="mb-4 text-3xl font-extrabold leading-tight text-text-main dark:text-white">
              Adama Bakery & Cake Privacy Policy
            </Text>
            <Text className="text-base leading-relaxed text-text-muted dark:text-white">
              This Privacy Notice for ABC Project ("we," "us," or "our") describes how and why we
              might access, collect, store, use, and share ("process") your personal information when
              you use our Services.
            </Text>
            <View className="mt-4 gap-2">
              {SERVICE_CONTEXTS.map((item) => (
                <Text key={item} className="text-sm text-text-muted dark:text-white">
                  - {item}
                </Text>
              ))}
            </View>
            <View className="mt-4 rounded-2xl bg-primary/10 p-4">
              <Text className="text-sm text-text-main dark:text-white">
                Questions or concerns? Reading this Privacy Notice will help you understand your
                privacy rights and choices. If you still have any questions or concerns, please
                contact us at yamlaknegash96@gmail.com.
              </Text>
            </View>
          </View>

          <View className="mb-8 rounded-2xl bg-surface-light p-6 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
            <View className="mb-4 flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <MaterialCommunityIcons name="folder-open" size={20} color="#f97316" />
              </View>
              <Text className="flex-1 text-xl font-bold text-text-main dark:text-white">
                1. What information do we collect?
              </Text>
            </View>
            <View className="gap-4">
              <Text className="text-base leading-relaxed text-text-muted dark:text-white">
                Personal information you disclose to us.
              </Text>
              <View className="gap-2">
                {PERSONAL_INFO_ITEMS.map((item) => (
                  <Text key={item} className="text-sm text-text-muted dark:text-white">
                    - {item}
                  </Text>
                ))}
              </View>
              <Text className="text-base leading-relaxed text-text-muted dark:text-white">
                Payment Data: We may collect data necessary to process your payment if you choose to
                make purchases. All payment data is handled and stored by our third-party payment
                gateway, Chapa. See https://chapa.co/privacy.
              </Text>
              <Text className="text-base leading-relaxed text-text-muted dark:text-white">
                Application Data: If you use our mobile application, we may collect:
              </Text>
              <View className="gap-2">
                {APPLICATION_DATA_ITEMS.map((item) => (
                  <Text key={item} className="text-sm text-text-muted dark:text-white">
                    - {item}
                  </Text>
                ))}
              </View>
              <Text className="text-base leading-relaxed text-text-muted dark:text-white">
                Information automatically collected: Some information such as your IP address and
                device characteristics is collected automatically when you visit our Services to
                maintain security and for analytics.
              </Text>
            </View>
          </View>

          <View className="mb-8 rounded-2xl bg-surface-light p-6 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
            <View className="mb-4 flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <MaterialCommunityIcons name="database" size={20} color="#f97316" />
              </View>
              <Text className="text-xl font-bold text-text-main dark:text-white">
                2. How do we process your information?
              </Text>
            </View>
            <View className="gap-3">
              {PROCESSING_REASONS.map((item) => (
                <View key={item} className="flex-row items-start gap-3">
                  <MaterialCommunityIcons name="check-circle" size={18} color="#f97316" />
                  <Text className="flex-1 text-base text-text-muted dark:text-white">
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="mb-10 rounded-2xl bg-surface-light p-6 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
            <View className="mb-4 flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <MaterialCommunityIcons name="gavel" size={20} color="#f97316" />
              </View>
              <Text className="flex-1 text-xl font-bold text-text-main dark:text-white">
                3. When and with whom do we share your personal information?
              </Text>
            </View>
            <Text className="text-base leading-relaxed text-text-muted dark:text-white">
              We may share your personal information in the following situations:
            </Text>
            <View className="mt-4 gap-2">
              {SHARING_REASONS.map((item) => (
                <Text key={item} className="text-sm text-text-muted dark:text-white">
                  - {item}
                </Text>
              ))}
            </View>
          </View>

          <View className="mb-8 rounded-2xl bg-surface-light p-6 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
            <Text className="text-xl font-bold text-text-main dark:text-white">
              4. Do we use cookies and other tracking technologies?
            </Text>
            <Text className="mt-3 text-base leading-relaxed text-text-muted dark:text-white">
              In short: Yes, we may use cookies and other tracking technologies to collect and store
              your information.
            </Text>
            <Text className="mt-3 text-base leading-relaxed text-text-muted dark:text-white">
              We use cookies for analytics and advertising, including to help manage and display ads
              tailored to your interests. We may share your information with Google Analytics to
              track and analyze use of the Services. To opt out, visit
              https://tools.google.com/dlpage/gaoptout.
            </Text>
          </View>

          <View className="mb-8 rounded-2xl bg-surface-light p-6 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
            <Text className="text-xl font-bold text-text-main dark:text-white">
              5. How do we handle your social logins?
            </Text>
            <Text className="mt-3 text-base leading-relaxed text-text-muted dark:text-white">
              If you choose to register or log in using a third-party social media account, we may
              receive certain profile information such as your name and email address. We use this
              information only for the purposes described in this Privacy Notice.
            </Text>
          </View>

          <View className="mb-8 rounded-2xl bg-surface-light p-6 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
            <Text className="text-xl font-bold text-text-main dark:text-white">
              6. How long do we keep your information?
            </Text>
            <Text className="mt-3 text-base leading-relaxed text-text-muted dark:text-white">
              We keep your personal information for as long as necessary to fulfill the purposes
              outlined in this Privacy Notice unless a longer retention period is required or
              permitted by law.
            </Text>
          </View>

          <View className="mb-8 rounded-2xl bg-surface-light p-6 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
            <Text className="text-xl font-bold text-text-main dark:text-white">
              7. How do we keep your information safe?
            </Text>
            <Text className="mt-3 text-base leading-relaxed text-text-muted dark:text-white">
              We implement appropriate technical and organizational security measures designed to
              protect your information. However, no electronic transmission can be guaranteed to be
              100 percent secure.
            </Text>
          </View>

          <View className="mb-8 rounded-2xl bg-surface-light p-6 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
            <Text className="text-xl font-bold text-text-main dark:text-white">
              8. What are your privacy rights?
            </Text>
            <Text className="mt-3 text-base leading-relaxed text-text-muted dark:text-white">
              In short: You may review, change, or terminate your account at any time. You have the
              right to withdraw your consent to processing your personal information by contacting us.
            </Text>
            <View className="mt-3 gap-2">
              {PRIVACY_RIGHTS.map((item) => (
                <Text key={item} className="text-sm text-text-muted dark:text-white">
                  - {item}
                </Text>
              ))}
            </View>
          </View>

          <View className="mb-8 rounded-2xl bg-surface-light p-6 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
            <Text className="text-xl font-bold text-text-main dark:text-white">
              9. Controls for do-not-track features
            </Text>
            <Text className="mt-3 text-base leading-relaxed text-text-muted dark:text-white">
              We do not currently respond to Do-Not-Track browser signals or any mechanism that
              automatically communicates your choice not to be tracked online.
            </Text>
          </View>

          <View className="mb-8 rounded-2xl bg-surface-light p-6 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
            <Text className="text-xl font-bold text-text-main dark:text-white">
              10. Trial phase data usage
            </Text>
            <Text className="mt-3 text-base leading-relaxed text-text-muted dark:text-white">
              During the trial phase of our services, we may collect and use personal information to
              enhance user experience and improve our offerings. Users may opt out at any time.
            </Text>
          </View>

          <View className="mb-8 rounded-2xl bg-surface-light p-6 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
            <Text className="text-xl font-bold text-text-main dark:text-white">
              11. Do we make updates to this notice?
            </Text>
            <Text className="mt-3 text-base leading-relaxed text-text-muted dark:text-white">
              We will update this Privacy Notice as necessary to stay compliant with relevant laws.
              Please review this notice frequently.
            </Text>
          </View>

          <View className="mb-8 rounded-2xl bg-surface-light p-6 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
            <Text className="text-xl font-bold text-text-main dark:text-white">
              12. How can you contact us about this notice?
            </Text>
            <Text className="mt-3 text-base leading-relaxed text-text-muted dark:text-white">
              You may email us at yamlaknegash96@gmail.com or contact us by post at:
            </Text>
            <View className="mt-4 rounded-lg bg-background-light p-4 dark:bg-background-dark">
              <Text className="text-sm text-text-main dark:text-white">ABC Project (Adama Bakery & Cake)</Text>
              <Text className="text-sm text-text-main dark:text-white">Oromia</Text>
              <Text className="text-sm text-text-main dark:text-white">East Showa Zone</Text>
              <Text className="text-sm text-text-main dark:text-white">Addis Ababa, Oromia 1000</Text>
              <Text className="text-sm text-text-main dark:text-white">Ethiopia</Text>
            </View>
          </View>

          <View className="mb-10 rounded-2xl bg-surface-light p-6 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
            <Text className="text-xl font-bold text-text-main dark:text-white">
              13. How can you review, update, or delete the data we collect from you?
            </Text>
            <Text className="mt-3 text-base leading-relaxed text-text-muted dark:text-white">
              You may request access to, correct inaccuracies, or delete your personal information.
              Please visit https://adama-bakery.vercel.app/contact.
            </Text>
          </View>

          <View className="items-center pb-8">
            <Text className="mb-3 text-sm text-text-muted dark:text-white">
              Have questions about this policy?
            </Text>
            <Pressable 
            onPress={() => navigation.navigate(ROUTES.Contact as never)}
            className="flex-row items-center gap-2 rounded-xl bg-text-main px-6 py-3 dark:bg-white">
              <MaterialCommunityIcons name="email" size={18} color={isDark ? '#000000' : '#ffffff'} />
              <Text className="text-sm font-bold text-white dark:text-black">
                Contact Privacy Officer
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
