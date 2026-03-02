import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type OrderConfirmationModalProps = {
  visible: boolean;
  onTrackOrder: () => void;
  onClose: () => void;
};

export const OrderConfirmationModal = ({
  visible,
  onTrackOrder,
  onClose,
}: OrderConfirmationModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-slate-900/60 p-6">
        <View className="w-full max-w-sm items-center rounded-xl bg-white p-8 dark:bg-slate-900">
          <View className="mb-6 h-32 w-32 items-center justify-center">
            <View className="absolute inset-0 rounded-full bg-primary/20" />
            <MaterialCommunityIcons name="cake-variant" size={40} color="#ecb613" />
          </View>

          <Text className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100">Order Confirmed!</Text>
          <Text className="mb-8 text-center text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Your baker has started preparing your fresh delights! Get ready for something special.
          </Text>

          <View className="w-full gap-3">
            <Pressable
              onPress={onTrackOrder}
              className="w-full rounded-lg bg-primary py-4"
            >
              <Text className="text-center font-bold text-white">Track Order</Text>
            </Pressable>

            <Pressable
              onPress={onClose}
              className="w-full rounded-lg border-2 border-primary/20 py-4"
            >
              <Text className="text-center font-semibold text-primary">Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
