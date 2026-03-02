import React, { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type TopBannerNotificationProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
  autoHideMs?: number;
  onPress?: () => void;
};

export const TopBannerNotification = ({
  visible,
  message,
  onClose,
  autoHideMs = 3500,
  onPress,
}: TopBannerNotificationProps) => {
  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(onClose, autoHideMs);
    return () => clearTimeout(timeout);
  }, [autoHideMs, onClose, visible]);

  if (!visible) return null;

  return (
    <View className="absolute left-0 right-0 z-50 items-center px-4" style={{ top: 56 }} pointerEvents="box-none">
      <Pressable
        onPress={onPress}
        className="h-10 w-full max-w-[340px] flex-row items-center gap-3 rounded-[20px] border border-white/20 bg-white/80 px-3 shadow-lg dark:bg-background-dark/80"
      >
        <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
          <MaterialCommunityIcons name="bell-ring" size={14} color="#ecb613" />
        </View>

        <Text className="flex-1 text-sm font-medium text-slate-900 dark:text-slate-100" numberOfLines={1}>
          {message}
        </Text>

        <Pressable onPress={onClose} className="h-5 w-5 items-center justify-center">
          <MaterialCommunityIcons name="close" size={14} color="#94a3b8" />
        </Pressable>
      </Pressable>
    </View>
  );
};
