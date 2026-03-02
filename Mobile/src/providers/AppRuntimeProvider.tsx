import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AppState, Modal, Platform, Pressable, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import * as Notifications from 'expo-notifications';
import { focusManager, onlineManager } from '@tanstack/react-query';
import { registerForPushNotificationsAsync } from '../services/notificationService';

type InAppNotificationState = {
  title: string;
  body: string;
};

type Props = {
  children: React.ReactNode;
};

export const AppRuntimeProvider = ({ children }: Props) => {
  const appState = useRef(AppState.currentState);
  const [inAppNotification, setInAppNotification] = useState<InAppNotificationState | null>(null);

  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      const unsubscribe = NetInfo.addEventListener((state) => {
        const isOnline = Boolean(state.isConnected) && Boolean(state.isInternetReachable ?? true);
        setOnline(isOnline);
      });

      return unsubscribe;
    });

    const appStateSubscription = AppState.addEventListener('change', (nextAppState) => {
      const isActive = nextAppState === 'active';
      focusManager.setFocused(isActive);
      appState.current = nextAppState;
    });

    return () => {
      appStateSubscription.remove();
    };
  }, []);

  useEffect(() => {
    void registerForPushNotificationsAsync().catch(() => null);

    const receivedSubscription = Notifications.addNotificationReceivedListener((notification) => {
      const content = notification.request.content;
      const title = content.title ?? 'ABC Notification';
      const body = content.body ?? 'You have a new update.';
      setInAppNotification({ title, body });
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const content = response.notification.request.content;
      const title = content.title ?? 'ABC Notification';
      const body = content.body ?? 'Notification opened.';
      setInAppNotification({ title, body });
    });

    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, []);

  const closeModal = () => {
    setInAppNotification(null);
  };

  const modalVisible = useMemo(() => Boolean(inAppNotification), [inAppNotification]);

  return (
    <>
      {children}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View className="flex-1 items-center justify-end bg-black/35 px-5 pb-10">
          <View className="w-full rounded-2xl bg-surface-light p-5 dark:bg-surface-dark">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-base font-bold text-text-main dark:text-gray-100">New Notification</Text>
              <Pressable onPress={closeModal} className="rounded-full bg-primary/10 px-3 py-1">
                <Text className="text-xs font-semibold text-primary">Close</Text>
              </Pressable>
            </View>
            <Text className="text-sm font-semibold text-text-main dark:text-gray-100">
              {inAppNotification?.title}
            </Text>
            <Text className="mt-1 text-sm text-text-muted dark:text-gray-300">
              {inAppNotification?.body}
            </Text>
            <Pressable
              onPress={closeModal}
              className="mt-4 items-center rounded-xl bg-primary py-3"
              android_ripple={Platform.OS === 'android' ? { color: 'rgba(255,255,255,0.2)' } : undefined}
            >
              <Text className="text-sm font-bold text-background-dark">Got it</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};
