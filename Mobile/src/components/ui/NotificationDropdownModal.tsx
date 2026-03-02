import React from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: 'check-circle' | 'flash' | 'store' | 'truck-fast' | 'information' | 'bell-ring';
  unread?: boolean;
};

type NotificationDropdownModalProps = {
  visible: boolean;
  onClose: () => void;
  onViewAll?: () => void;
  onMarkAllRead?: () => void;
  items?: NotificationItem[];
};

const defaultItems: NotificationItem[] = [
  {
    id: '1',
    title: 'Your cake is ready!',
    description: 'Your custom celebration cake is ready for pickup at Adama Central Bakery.',
    time: '10m ago',
    icon: 'check-circle',
  },
  {
    id: '2',
    title: 'Flash Sale: 20% off Croissants',
    description: 'Sweet Adama has 20% off butter and almond croissants for the next 2 hours.',
    time: '1h ago',
    icon: 'flash',
  },
  {
    id: '3',
    title: 'New Bakery Joined: Sweet Adama',
    description: 'Experience authentic French pastries now delivering near you.',
    time: '3h ago',
    icon: 'store',
  },
];

export const NotificationDropdownModal = ({
  visible,
  onClose,
  onViewAll,
  onMarkAllRead,
  items,
}: NotificationDropdownModalProps) => {
  const data = items ?? defaultItems;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 bg-black/20">
        <Pressable className="flex-1" onPress={onClose} />

        <View className="max-h-[70%] rounded-t-3xl border-b border-primary/20 bg-background-light dark:bg-background-dark">
          <View className="flex-row items-center justify-between px-6 pb-4 pt-6">
            <View className="flex-row items-center gap-2">
              <MaterialCommunityIcons name="bell-ring" size={18} color="#ecb613" />
              <Text className="text-lg font-bold text-text-main dark:text-gray-100">Recent Updates</Text>
            </View>
            <Pressable onPress={onMarkAllRead}>
              <Text className="text-sm font-semibold text-primary">Mark all as read</Text>
            </Pressable>
          </View>

          <ScrollView className="max-h-[420px]">
            {data.map((item) => (
              <Pressable
                key={item.id}
                className="flex-row gap-4 border-b border-primary/10 px-6 py-4 last:border-b-0"
              >
                <View className="h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <MaterialCommunityIcons name={item.icon} size={24} color="#ecb613" />
                </View>

                <View className="flex-1">
                  <View className="mb-0.5 flex-row items-start justify-between">
                    <Text className="flex-1 pr-2 text-sm font-bold text-text-main dark:text-gray-100">{item.title}</Text>
                    <Text className="text-[11px] font-medium text-text-muted dark:text-gray-400">{item.time}</Text>
                  </View>
                  <Text className="text-sm leading-relaxed text-text-muted dark:text-gray-400">{item.description}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <View className="items-center bg-primary/5 py-4">
            <Pressable
              onPress={onViewAll}
              className="flex-row items-center gap-2 rounded-full border border-primary/20 bg-background-light px-6 py-2 dark:bg-background-dark"
            >
              <Text className="text-sm font-bold text-text-main dark:text-gray-100">View All Notifications</Text>
              <MaterialCommunityIcons name="chevron-right" size={14} color="#ecb613" />
            </Pressable>
            <View className="mt-4 h-1.5 w-12 rounded-full bg-primary/30" />
          </View>
        </View>
      </View>
    </Modal>
  );
};
