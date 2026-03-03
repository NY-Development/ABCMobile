import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type AppAlertVariant = 'success' | 'error' | 'info' | 'warning';

type AppAlertModalProps = {
  visible: boolean;
  title: string;
  message: string;
  variant: AppAlertVariant;
  buttonText?: string;
  onClose: () => void;
};

const variantStyles: Record<
  AppAlertVariant,
  {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    iconColor: string;
    iconBg: string;
    accent: string;
  }
> = {
  success: {
    icon: 'check-circle',
    iconColor: '#15803d',
    iconBg: 'bg-green-100',
    accent: 'bg-green-500',
  },
  error: {
    icon: 'close-circle',
    iconColor: '#dc2626',
    iconBg: 'bg-red-100',
    accent: 'bg-red-500',
  },
  info: {
    icon: 'information',
    iconColor: '#2563eb',
    iconBg: 'bg-blue-100',
    accent: 'bg-blue-500',
  },
  warning: {
    icon: 'alert',
    iconColor: '#d97706',
    iconBg: 'bg-amber-100',
    accent: 'bg-amber-500',
  },
};

export const AppAlertModal = ({
  visible,
  title,
  message,
  variant,
  buttonText = 'OK',
  onClose,
}: AppAlertModalProps) => {
  const currentStyle = variantStyles[variant];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-slate-900/60 px-6">
        <Pressable className="absolute inset-0" onPress={onClose} />

        <View className="w-full max-w-sm overflow-hidden rounded-2xl border border-input-border bg-background-light dark:border-neutral-dark dark:bg-background-dark">
          <View className={`h-1.5 w-full ${currentStyle.accent}`} />

          <View className="px-5 pb-5 pt-6">
            <View className="mb-4 flex-row items-center gap-3">
              <View className={`h-12 w-12 items-center justify-center rounded-full ${currentStyle.iconBg}`}>
                <MaterialCommunityIcons name={currentStyle.icon} size={26} color={currentStyle.iconColor} />
              </View>
              <Text className="flex-1 text-lg font-bold text-text-main dark:text-gray-100">{title}</Text>
            </View>

            <Text className="mb-5 text-sm leading-5 text-text-muted dark:text-gray-400">{message}</Text>

            <Pressable onPress={onClose} className={`rounded-xl px-4 py-3 ${currentStyle.accent}`}>
              <Text className="text-center text-sm font-bold text-white">{buttonText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
