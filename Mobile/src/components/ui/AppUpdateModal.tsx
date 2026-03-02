import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type AppUpdateModalProps = {
  visible: boolean;
  onUpdateNow: () => void;
  onMaybeLater: () => void;
  onClose: () => void;
  title?: string;
  description?: string;
  requiredUpdate?: boolean;
};

export const AppUpdateModal = ({
  visible,
  onUpdateNow,
  onMaybeLater,
  onClose,
  title = 'New Flavors Are Here!',
  description = 'A new version of ABC is available with fresh features and smoother performance for our Adama community.',
  requiredUpdate = false,
}: AppUpdateModalProps) => {
  const handleBackdropPress = () => {
    if (!requiredUpdate) {
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-slate-900/60 p-6">
        <Pressable className="absolute inset-0" onPress={handleBackdropPress} />

        <View className="relative w-full max-w-sm overflow-hidden rounded-[24px] border border-primary/20 bg-background-light shadow-2xl dark:bg-background-dark">
          {!requiredUpdate ? (
            <Pressable
              onPress={onClose}
              className="absolute right-4 top-4 z-10 h-9 w-9 items-center justify-center rounded-full active:opacity-70"
            >
              <MaterialCommunityIcons name="close" size={22} color="#94a3b8" />
            </Pressable>
          ) : null}

          <View className="h-56 w-full items-center justify-center bg-primary/10">
            <View className="items-center">
              <View className="relative h-32 w-32 -rotate-3 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/30">
                <MaterialCommunityIcons name="truck-fast" size={58} color="#ffffff" />
                <MaterialCommunityIcons
                  name="star-four-points"
                  size={22}
                  color="#ecb613"
                  style={{ position: 'absolute', top: -14, right: -14 }}
                />
                <MaterialCommunityIcons
                  name="auto-fix"
                  size={18}
                  color="#d4a311"
                  style={{ position: 'absolute', bottom: -8, left: -12 }}
                />
              </View>
              <View className="mt-4 h-3 w-40 rounded-full bg-slate-900/10 dark:bg-primary/20" />
            </View>
          </View>

          <View className="px-8 pb-8 pt-2">
            <Text className="mb-3 text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {title}
            </Text>
            <Text className="mb-8 text-center text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
              {description}
            </Text>

            <View className="gap-3">
              <Pressable
                onPress={onUpdateNow}
                className="w-full rounded-full bg-primary py-4 shadow-lg shadow-primary/30 active:opacity-90"
              >
                <Text className="text-center font-bold text-white">Update Now</Text>
              </Pressable>

              {!requiredUpdate ? (
                <Pressable
                  onPress={onMaybeLater}
                  className="w-full rounded-full border-2 border-primary/20 py-4 active:opacity-80"
                >
                  <Text className="text-center font-semibold text-primary">Maybe Later</Text>
                </Pressable>
              ) : null}
            </View>
          </View>

          <View className="h-1.5 w-full bg-primary/30" />
        </View>
      </View>
    </Modal>
  );
};
