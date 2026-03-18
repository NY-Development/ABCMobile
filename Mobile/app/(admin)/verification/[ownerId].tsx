import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Modal } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

interface OwnerDetails {
  id: string;
  name: string;
  businessId: string;
  activeBranches: number;
  accountNumber: string;
  location: string;
  image: string;
}

const mockOwner: OwnerDetails = {
  id: '1',
  name: 'TechFlow Solutions',
  businessId: 'BUS-99201-ORG',
  activeBranches: 4,
  accountNumber: '**** **** 4892 1002',
  location: 'San Francisco, CA',
  image: '🏢',
};

export default function OwnerDetailsScreen() {
  const router = useRouter();
  const { ownerId } = useLocalSearchParams();
  const [showModal, setShowModal] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-black/40">
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setShowModal(false);
          router.back();
        }}>
        <View className="flex-1 justify-end bg-black/40">
          {/* Modal Bottom Sheet */}
          <View className="max-h-[90%] rounded-t-3xl bg-white dark:bg-slate-900">
            {/* Handle */}
            <View className="items-center py-3">
              <View className="h-1 w-12 rounded-full bg-slate-300 dark:bg-slate-600" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
              <View className="border-b border-slate-200 px-4 py-4 dark:border-slate-800">
                <View className="flex-row items-center justify-between">
                  <Text className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Owner Details
                  </Text>
                  <Pressable
                    onPress={() => {
                      setShowModal(false);
                      router.back();
                    }}
                    className="h-10 w-10 items-center justify-center">
                    <Text className="text-2xl">✕</Text>
                  </Pressable>
                </View>
              </View>

              {/* Company Image */}
              <View className="mx-4 my-4 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                <View className="h-48 items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800">
                  <Text className="text-6xl">{mockOwner.image}</Text>
                </View>
                <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <Text className="text-sm font-medium text-white">Primary Business Hub</Text>
                </View>
              </View>

              {/* Business Details Section */}
              <View className="px-4 pt-4">
                <Text className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Business Information
                </Text>
              </View>

              <View className="mx-4 my-2 space-y-1">
                <View className="flex-row justify-between border-b border-slate-200 py-3 dark:border-slate-800">
                  <Text className="text-sm text-slate-500 dark:text-slate-400">Business ID</Text>
                  <Text className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {mockOwner.businessId}
                  </Text>
                </View>
                <View className="flex-row justify-between border-b border-slate-200 py-3 dark:border-slate-800">
                  <Text className="text-sm text-slate-500 dark:text-slate-400">
                    Active Branches
                  </Text>
                  <Text className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {mockOwner.activeBranches} Locations
                  </Text>
                </View>
                <View className="flex-row items-center justify-between border-b border-slate-200 py-3 dark:border-slate-800">
                  <Text className="text-sm text-slate-500 dark:text-slate-400">
                    Registered Location
                  </Text>
                  <Pressable className="flex-row items-center gap-1">
                    <Text className="text-sm font-semibold text-primary">📍 View Maps</Text>
                  </Pressable>
                </View>
              </View>

              {/* Financials Section */}
              <View className="mx-4 my-4">
                <Text className="mb-3 text-lg font-bold text-slate-900 dark:text-slate-100">
                  Financials
                </Text>
                <View className="flex-row items-center justify-between rounded-lg border border-slate-200 bg-background p-4 dark:border-slate-800 dark:bg-slate-800/50">
                  <View className="flex-row items-center gap-3">
                    <View className="rounded-lg bg-primary/10 p-2">
                      <Text className="text-lg">💳</Text>
                    </View>
                    <View>
                      <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Account Number
                      </Text>
                      <Text className="font-medium text-slate-900 dark:text-slate-100">
                        {mockOwner.accountNumber}
                      </Text>
                    </View>
                  </View>
                  <Pressable>
                    <Text className="text-lg text-slate-400">📋</Text>
                  </Pressable>
                </View>
              </View>

              {/* Verification Documents */}
              <View className="mx-4 my-4">
                <Text className="mb-3 text-lg font-bold text-slate-900 dark:text-slate-100">
                  Verification Documents
                </Text>

                <View className="mb-3 flex-row items-center gap-4 rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                  <View className="h-16 w-16 rounded-lg bg-slate-200 dark:bg-slate-700">
                    <Text className="text-3xl">📄</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Trading License 2024
                    </Text>
                    <Text className="text-xs text-slate-500 dark:text-slate-400">
                      PDF • 2.4 MB • Verified ✓
                    </Text>
                  </View>
                  <Pressable>
                    <Text className="text-lg">👁️</Text>
                  </Pressable>
                </View>

                <View className="flex-row items-center gap-4 rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                  <View className="h-16 w-16 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-700">
                    <Text className="text-lg">📋</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Tax Certificate
                    </Text>
                    <Text className="text-xs text-slate-500 dark:text-slate-400">
                      PDF • 1.1 MB • Pending Review
                    </Text>
                  </View>
                  <Pressable>
                    <Text className="text-lg">👁️</Text>
                  </Pressable>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="border-t border-slate-200 p-4 dark:border-slate-800">
                <Pressable className="mb-2 flex-row items-center justify-center gap-2 rounded-xl bg-primary py-4 shadow-lg shadow-primary/20">
                  <Text className="text-lg">✓</Text>
                  <Text className="text-sm font-bold text-white">Verify This Owner</Text>
                </Pressable>
                <Pressable className="flex-row items-center justify-center rounded-xl py-3 dark:hover:bg-slate-800">
                  <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Request More Info
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
