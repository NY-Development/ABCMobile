import React, { useRef } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';

const TOC_ITEMS = [
  { key: 'section-1', title: 'The Application' },
  { key: 'section-2', title: 'Scope of License' },
  { key: 'section-3', title: 'Technical Requirements' },
  { key: 'section-4', title: 'No Maintenance and Support' },
  { key: 'section-5', title: 'User-Generated Contributions' },
  { key: 'section-6', title: 'Contribution License' },
  { key: 'section-7', title: 'Liability' },
  { key: 'section-8', title: 'Warranty' },
  { key: 'section-9', title: 'Product Claims' },
  { key: 'section-10', title: 'Legal Compliance' },
  { key: 'section-11', title: 'Contact Information' },
  { key: 'section-12', title: 'Termination' },
  { key: 'section-13', title: 'Third-Party Terms of Agreements and Beneficiary' },
  { key: 'section-14', title: 'Intellectual Property Rights' },
  { key: 'section-15', title: 'Applicable Law' },
  { key: 'section-16', title: 'Miscellaneous' },
];

const CONTRIBUTION_ITEMS = [
  'The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights...',
  'You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us...',
  'Your Contributions are not false, inaccurate, or misleading.',
  'Your Contributions do not violate any applicable law, regulation, or rule.',
];

export const EulaScreen = () => {
  const scrollRef = useRef<ScrollView>(null);
  const sectionOffsets = useRef<Record<string, number>>({});
  const navigation = useNavigation();
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';
  const toggleIconColor = isDark ? '#f5d67d' : '#374151';

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top', 'bottom']}>
      <View className="flex-1">
        <View className="flex-row items-center justify-between border-b border-black/5 bg-background-light/95 px-5 py-4 dark:border-white/5 dark:bg-background-dark/95">
          <Pressable
            onPress={() => navigation.goBack()}
            className="h-10 w-10 items-center justify-center rounded-full"
          >
            <MaterialCommunityIcons name="arrow-left" size={20} color={toggleIconColor} />
          </Pressable>
          <Text className="text-base font-semibold uppercase tracking-wide text-text-main/80 dark:text-white">
            Legal
          </Text>
          <Pressable
            onPress={toggle}
            className="h-10 w-10 items-center justify-center rounded-full bg-surface-light shadow-sm ring-1 ring-gray-200 dark:bg-surface-dark dark:ring-gray-700"
          >
            <MaterialCommunityIcons name={toggleIconName} size={20} color={toggleIconColor} />
          </Pressable>
        </View>

        <ScrollView ref={scrollRef} className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
          <View className="mx-auto w-full max-w-2xl px-6 pt-6">
            <View className="mb-10 items-center text-center">
              <View className="mb-4 h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MaterialCommunityIcons name="gavel" size={22} color="#f97316" />
              </View>
              <Text className="text-3xl font-bold leading-tight text-text-main dark:text-white">
                End User License Agreement (EULA)
              </Text>
              <Text className="mt-3 text-sm text-text-muted dark:text-white">
                Last updated: November 8, 2025
              </Text>
            </View>

            <View className="gap-10 text-base leading-relaxed text-text-main/90 dark:text-white">
              <View className="rounded-2xl border border-black/5 bg-surface-light p-6 shadow-sm dark:border-white/5 dark:bg-surface-dark">
                <Text className="text-base text-text-main dark:text-white">
                  The ABC Ordering and Loyalty App (the "Licensed Application") is licensed to you
                  (End-User) by ABC Project (Adama Bakery and Cake) (the "Licensor"), located at
                  P.O. Box 456, Adama, Oromia, Ethiopia, for use only under the terms of this License
                  Agreement.
                </Text>
                <Text className="mt-4 text-base text-text-main dark:text-white">
                  By downloading or using the Licensed Application, you indicate that you agree to be
                  bound by all of the terms and conditions of this License Agreement. The platform
                  through which this Application is purchased or downloaded is referred to in this
                  License Agreement as "Services".
                </Text>
              </View>

              <View className="rounded-2xl bg-surface-light p-6 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
                <Text className="text-base font-bold text-text-main dark:text-white">
                  Table of Contents
                </Text>
                <View className="mt-3 gap-2">
                  {TOC_ITEMS.map((item) => (
                    <Pressable
                      key={item.key}
                      onPress={() => {
                        const y = sectionOffsets.current[item.key];
                        if (typeof y === 'number') {
                          scrollRef.current?.scrollTo({ y, animated: true });
                        }
                      }}
                    >
                      <Text className="text-sm text-text-main dark:text-white">- {item.title}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View onLayout={(event) => {
                sectionOffsets.current['section-1'] = event.nativeEvent.layout.y;
              }}>
                <Text className="mb-3 text-xl font-bold text-text-main dark:text-white">
                  1. The Application
                </Text>
                <Text className="text-base text-text-main dark:text-white">
                  The "ABC Ordering and Loyalty App" ("Licensed Application") is software created for
                  ordering bakery and cake items and customized for mobile devices. It is used for
                  submitting and tracking orders.
                </Text>
              </View>

              <View onLayout={(event) => {
                sectionOffsets.current['section-2'] = event.nativeEvent.layout.y;
              }}>
                <Text className="mb-3 text-xl font-bold text-text-main dark:text-white">
                  2. Scope of License
                </Text>
                <Text className="text-base text-text-main dark:text-white">
                  The Licensor grants you a non-transferable license to use the Licensed Application
                  on devices you own or control as permitted by the Usage Rules. This license does not
                  allow use on devices you do not own or control, and you may not distribute or make
                  the Licensed Application available over a network for multiple devices.
                </Text>
              </View>

              <View onLayout={(event) => {
                sectionOffsets.current['section-3'] = event.nativeEvent.layout.y;
              }}>
                <Text className="mb-3 text-xl font-bold text-text-main dark:text-white">
                  3. Technical Requirements
                </Text>
                <Text className="text-base text-text-main dark:text-white">
                  To use the Licensed Application, you must have an active internet connection and a
                  compatible operating system (iOS or Android). The Licensor is not responsible for
                  compatibility issues or data usage fees incurred by the End-User.
                </Text>
              </View>

              <View onLayout={(event) => {
                sectionOffsets.current['section-4'] = event.nativeEvent.layout.y;
              }}>
                <Text className="mb-3 text-xl font-bold text-text-main dark:text-white">
                  4. No Maintenance or Support
                </Text>
                <Text className="text-base text-text-main dark:text-white">
                  4.1 The Licensor is not obligated, expressed or implied, to provide maintenance or
                  support for the Licensed Application beyond what is typically expected for a standard
                  commercial application.
                </Text>
                <Text className="mt-3 text-base text-text-main dark:text-white">
                  4.2 The Licensor and the End-User acknowledge that the Services have no obligation
                  whatsoever to furnish maintenance and support services with respect to the Licensed
                  Application.
                </Text>
              </View>

              <View onLayout={(event) => {
                sectionOffsets.current['section-5'] = event.nativeEvent.layout.y;
              }}>
                <Text className="mb-3 text-xl font-bold text-text-main dark:text-white">
                  5. User-Generated Contributions
                </Text>
                <Text className="text-base text-text-main dark:text-white">
                  The Licensed Application is primarily for ordering and loyalty use. While it does
                  not offer users to freely submit or post public content, we may provide you with the
                  opportunity to create, submit, post, display, transmit, perform, publish, distribute,
                  or broadcast content and materials to us (such as reviews or customized cake
                  requests) (collectively, "Contributions"). When you create or make available any
                  Contributions, you represent and warrant that:
                </Text>
                <View className="mt-3 gap-2">
                  {CONTRIBUTION_ITEMS.map((item) => (
                    <Text key={item} className="text-base text-text-main dark:text-white">
                      - {item}
                    </Text>
                  ))}
                </View>
              </View>

              <View onLayout={(event) => {
                sectionOffsets.current['section-6'] = event.nativeEvent.layout.y;
              }}>
                <Text className="mb-3 text-xl font-bold text-text-main dark:text-white">
                  6. Contribution License
                </Text>
                <Text className="text-base text-text-main dark:text-white">
                  You agree that we may access, store, process, and use any information and personal
                  data that you provide following the terms of the Privacy Policy and your choices.
                  By submitting suggestions or other feedback, you agree that we can use and share such
                  feedback for any purpose without compensation to you.
                </Text>
              </View>

              <View onLayout={(event) => {
                sectionOffsets.current['section-7'] = event.nativeEvent.layout.y;
              }}>
                <Text className="mb-3 text-xl font-bold text-text-main dark:text-white">
                  7. Liability
                </Text>
                <View className="rounded-xl bg-red-100 p-4 dark:bg-red-900/30">
                  <View className="flex-row items-start gap-3">
                    <MaterialCommunityIcons name="alert-circle" size={20} color={isDark ? '#fecaca' : '#b91c1c'} />
                    <Text className="flex-1 text-base font-bold text-red-700 dark:text-white">
                      IN NO EVENT WILL THE LICENSOR OR ITS DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO
                      YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY,
                      INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE,
                      LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE LICENSED APPLICATION.
                    </Text>
                  </View>
                </View>
              </View>

              <View onLayout={(event) => {
                sectionOffsets.current['section-8'] = event.nativeEvent.layout.y;
              }}>
                <Text className="mb-3 text-xl font-bold text-text-main dark:text-white">
                  8. Warranty
                </Text>
                <Text className="text-base text-text-main dark:text-white">
                  8.1 The Licensor warrants that the Licensed Application is free of spyware, trojan
                  horses, viruses, or other malware at the time of download and works as described.
                </Text>
                <Text className="mt-3 text-base text-text-main dark:text-white">
                  8.2 No warranty is provided for the Licensed Application that has been modified or
                  used with inappropriate hardware, software, or accessories.
                </Text>
              </View>

              <View onLayout={(event) => {
                sectionOffsets.current['section-9'] = event.nativeEvent.layout.y;
              }}>
                <Text className="mb-3 text-xl font-bold text-text-main dark:text-white">
                  9. Product Claims
                </Text>
                <Text className="text-base text-text-main dark:text-white">
                  The Licensor and the End-User acknowledge that the Licensor, and not the Services,
                  is responsible for addressing any claims relating to the Licensed Application or the
                  End-User's possession and use of it.
                </Text>
              </View>

              <View onLayout={(event) => {
                sectionOffsets.current['section-10'] = event.nativeEvent.layout.y;
              }}>
                <Text className="mb-3 text-xl font-bold text-text-main dark:text-white">
                  10. Legal Compliance
                </Text>
                <Text className="text-base text-text-main dark:text-white">
                  You represent and warrant that you are not located in a country subject to a US
                  Government embargo or designated as a terrorist supporting country and are not listed
                  on any US Government list of prohibited or restricted parties.
                </Text>
              </View>

              <View onLayout={(event) => {
                sectionOffsets.current['section-11'] = event.nativeEvent.layout.y;
              }}>
                <Text className="mb-3 text-xl font-bold text-text-main dark:text-white">
                  11. Contact Information
                </Text>
                <Text className="text-base text-text-main dark:text-white">
                  For general inquiries, complaints, questions, or claims concerning the Licensed
                  Application, please contact the Licensor at:
                </Text>
                <View className="mt-3 gap-2">
                  <Text className="text-base text-text-main dark:text-white">
                    Email: yamlaknegash96@gmail.com
                  </Text>
                  <Text className="text-base text-text-main dark:text-white">
                    Address: P.O. Box 456, Adama, Oromia, Ethiopia
                  </Text>
                </View>
              </View>

              <View onLayout={(event) => {
                sectionOffsets.current['section-12'] = event.nativeEvent.layout.y;
              }}>
                <Text className="mb-3 text-xl font-bold text-text-main dark:text-white">
                  12. Termination
                </Text>
                <Text className="text-base text-text-main dark:text-white">
                  The license is valid until terminated by the Licensor or by you. Your rights under
                  this license will terminate automatically and without notice if you fail to adhere
                  to any term of this license. Upon termination, you shall stop all use of the Licensed
                  Application and destroy all copies.
                </Text>
              </View>

              <View onLayout={(event) => {
                sectionOffsets.current['section-13'] = event.nativeEvent.layout.y;
              }}>
                <Text className="mb-3 text-xl font-bold text-text-main dark:text-white">
                  13. Third-Party Terms of Agreements and Beneficiary
                </Text>
                <Text className="text-base text-text-main dark:text-white">
                  The Licensor represents and warrants that it will comply with applicable third-party
                  terms of agreement when using the Licensed Application. The Licensor's subsidiaries
                  shall be third-party beneficiaries of this End User License Agreement.
                </Text>
              </View>

              <View onLayout={(event) => {
                sectionOffsets.current['section-14'] = event.nativeEvent.layout.y;
              }}>
                <Text className="mb-3 text-xl font-bold text-text-main dark:text-white">
                  14. Intellectual Property Rights
                </Text>
                <Text className="text-base text-text-main dark:text-white">
                  The Licensor and the End-User acknowledge that, in the event of any third-party claim
                  that the Licensed Application infringes intellectual property rights, the Licensor is
                  solely responsible for the investigation, defense, settlement, and discharge of any
                  such claim.
                </Text>
              </View>

              <View onLayout={(event) => {
                sectionOffsets.current['section-15'] = event.nativeEvent.layout.y;
              }}>
                <Text className="mb-3 text-xl font-bold text-text-main dark:text-white">
                  15. Applicable Law
                </Text>
                <Text className="text-base text-text-main dark:text-white">
                  This License Agreement is governed by the laws of Ethiopia, excluding conflicts of
                  law rules.
                </Text>
              </View>

              <View onLayout={(event) => {
                sectionOffsets.current['section-16'] = event.nativeEvent.layout.y;
              }}>
                <Text className="mb-3 text-xl font-bold text-text-main dark:text-white">
                  16. Miscellaneous
                </Text>
                <Text className="text-base text-text-main dark:text-white">
                  16.1 If any term of this agreement becomes invalid, the validity of the remaining
                  provisions shall not be affected. Invalid terms will be replaced by valid ones that
                  achieve the primary purpose.
                </Text>
                <Text className="mt-3 text-base text-text-main dark:text-white">
                  16.2 Collateral agreements, changes, and amendments are only valid if laid down in
                  writing.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View className="border-t border-black/5 bg-surface-light/80 px-5 pb-8 pt-5 dark:border-white/5 dark:bg-surface-dark/90">
          <View className="mx-auto max-w-md flex-row gap-4">
            <Pressable className="flex-1 items-center justify-center rounded-xl border border-gray-200 bg-transparent py-4 dark:border-gray-700">
              <Text className="text-base font-bold text-text-main dark:text-white">Decline</Text>
            </Pressable>
            <Pressable className="flex-1 items-center justify-center rounded-xl bg-primary py-4 shadow-lg shadow-primary/20">
              <Text className="text-base font-bold text-background-dark">Accept Agreement</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
