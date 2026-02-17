import React from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';

export const ContactScreen = () => {
  const navigation = useNavigation();
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';
  const toggleIconColor = isDark ? '#f5d67d' : '#374151';
  const placeholderColor = isDark ? '#9aa0a6' : '#9ca3af';

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top', 'bottom']}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="flex-row items-center justify-between bg-background-light/90 px-5 py-4 dark:bg-background-dark/90">
          <Pressable
            onPress={() => navigation.goBack()}
            className="h-10 w-10 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark"
          >
            <MaterialCommunityIcons name="arrow-left" size={20} color={toggleIconColor} />
          </Pressable>
          <Text className="text-lg font-bold text-text-main dark:text-white">Contact Us</Text>
          <Pressable
            onPress={toggle}
            className="h-10 w-10 items-center justify-center rounded-full bg-surface-light shadow-sm ring-1 ring-gray-200 dark:bg-surface-dark dark:ring-gray-700"
          >
            <MaterialCommunityIcons name={toggleIconName} size={20} color={toggleIconColor} />
          </Pressable>
        </View>

        <View className="px-5 py-2">
          <View className="mb-8 mt-2 items-center">
            <Text className="text-sm text-text-muted dark:text-gray-400">
              We'd love to hear from you! Reach out for support or inquiries.
            </Text>
          </View>

          <View className="mb-10 gap-4">
            <Pressable className="flex-row items-center gap-4 rounded-xl bg-surface-light p-4 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
              <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MaterialCommunityIcons name="phone" size={20} color="#f97316" />
              </View>
              <View>
                <Text className="text-sm font-bold text-text-main dark:text-white">Phone</Text>
                <Text className="text-xs text-text-muted dark:text-gray-400">+251 911 123 456</Text>
              </View>
            </Pressable>
            <Pressable className="flex-row items-center gap-4 rounded-xl bg-surface-light p-4 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
              <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MaterialCommunityIcons name="email" size={20} color="#f97316" />
              </View>
              <View>
                <Text className="text-sm font-bold text-text-main dark:text-white">Email</Text>
                <Text className="text-xs text-text-muted dark:text-gray-400">help@abcbakery.com</Text>
              </View>
            </Pressable>
            <View className="flex-row items-center gap-4 rounded-xl bg-surface-light p-4 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
              <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MaterialCommunityIcons name="map-marker" size={20} color="#f97316" />
              </View>
              <View>
                <Text className="text-sm font-bold text-text-main dark:text-white">Office</Text>
                <Text className="text-xs text-text-muted dark:text-gray-400">Kebele 04, Adama, ET</Text>
              </View>
            </View>
          </View>

          <View className="rounded-xl bg-surface-light p-6 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/5">
            <Text className="mb-6 text-xl font-bold text-text-main dark:text-white">Send a Message</Text>

            <View className="gap-5">
              <View className="gap-2">
                <Text className="text-xs font-semibold uppercase tracking-wide text-text-muted dark:text-gray-400">
                  Full Name
                </Text>
                <View className="relative flex-row items-center">
                  <MaterialCommunityIcons name="account" size={18} color={isDark ? '#6b7280' : '#9ca3af'} style={{ position: 'absolute', left: 12 }} />
                  <TextInput
                    placeholder="John Doe"
                    placeholderTextColor={placeholderColor}
                    className="w-full rounded-lg bg-neutral-light py-3.5 pl-10 pr-4 text-sm font-medium text-text-main dark:bg-neutral-dark dark:text-white"
                  />
                </View>
              </View>

              <View className="gap-2">
                <Text className="text-xs font-semibold uppercase tracking-wide text-text-muted dark:text-gray-400">
                  Email Address
                </Text>
                <View className="relative flex-row items-center">
                  <MaterialCommunityIcons name="at" size={18} color={isDark ? '#6b7280' : '#9ca3af'} style={{ position: 'absolute', left: 12 }} />
                  <TextInput
                    placeholder="john@example.com"
                    placeholderTextColor={placeholderColor}
                    keyboardType="email-address"
                    className="w-full rounded-lg bg-neutral-light py-3.5 pl-10 pr-4 text-sm font-medium text-text-main dark:bg-neutral-dark dark:text-white"
                  />
                </View>
              </View>

              <View className="gap-2">
                <Text className="text-xs font-semibold uppercase tracking-wide text-text-muted dark:text-gray-400">
                  Message
                </Text>
                <View className="relative">
                  <MaterialCommunityIcons name="chat-outline" size={18} color={isDark ? '#6b7280' : '#9ca3af'} style={{ position: 'absolute', left: 12, top: 12 }} />
                  <TextInput
                    placeholder="How can we help you today?"
                    placeholderTextColor={placeholderColor}
                    multiline
                    numberOfLines={4}
                    className="w-full rounded-lg bg-neutral-light py-3.5 pl-10 pr-4 text-sm font-medium text-text-main dark:bg-neutral-dark dark:text-white"
                    style={{ textAlignVertical: 'top' }}
                  />
                </View>
              </View>

              <Pressable className="mt-2 flex-row items-center justify-center gap-2 rounded-xl bg-primary py-4">
                <Text className="text-sm font-bold text-background-dark">Send Message</Text>
                <MaterialCommunityIcons name="send" size={18} color="#1b180d" />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
