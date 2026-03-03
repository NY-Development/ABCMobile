import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type LogoutConfirmationModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  message?: string;
};

export const LogoutConfirmationModal = ({
  visible,
  onCancel,
  onConfirm,
  loading = false,
  title = 'Confirm Logout',
  message = 'Are you sure you want to log out?',
}: LogoutConfirmationModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View className="flex-1 items-center justify-center bg-slate-900/60 px-6">
        <Pressable className="absolute inset-0" onPress={onCancel} />

        <View className="w-full max-w-sm overflow-hidden rounded-2xl border border-red-200 bg-background-light dark:border-red-500/30 dark:bg-background-dark">
          <View className="h-1.5 w-full bg-red-500" />

          <View className="px-5 pb-5 pt-6">
            <View className="mb-4 flex-row items-center gap-3">
              <View className="h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">
                <MaterialCommunityIcons name="logout" size={24} color="#dc2626" />
              </View>
              <Text className="flex-1 text-lg font-bold text-text-main dark:text-gray-100">{title}</Text>
            </View>

            <Text className="mb-5 text-sm leading-5 text-text-muted dark:text-gray-400">{message}</Text>

            <View className="flex-row gap-2">
              <Pressable
                onPress={onCancel}
                disabled={loading}
                className="flex-1 rounded-xl border border-input-border px-4 py-3 dark:border-neutral-dark"
              >
                <Text className="text-center text-sm font-bold text-text-main dark:text-gray-100">Cancel</Text>
              </Pressable>

              <Pressable
                onPress={onConfirm}
                disabled={loading}
                className="flex-1 rounded-xl bg-red-500 px-4 py-3"
              >
                <Text className="text-center text-sm font-bold text-white">
                  {loading ? 'Logging out...' : 'Log Out'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
