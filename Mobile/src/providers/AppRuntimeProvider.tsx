import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import * as Notifications from 'expo-notifications';
import { focusManager, onlineManager } from '@tanstack/react-query';
import { registerForPushNotificationsAsync } from '../services/notificationService';
import { TopBannerNotification } from '../components/ui/TopBannerNotification';
import { NotificationDropdownModal, type NotificationItem } from '../components/ui/NotificationDropdownModal';
import { ROUTES } from '../constants/routes';
import { navigationRef } from '../navigation/navigationRef';

type AppNotification = NotificationItem & {
  iconColor?: string;
  timeLabel: string;
};

type Props = {
  children: React.ReactNode;
};

type InAppNotificationsContextValue = {
  notifications: AppNotification[];
  showDropdown: () => void;
  hideDropdown: () => void;
  markAllAsRead: () => void;
};

const InAppNotificationsContext = createContext<InAppNotificationsContextValue | null>(null);

const seedNotifications: AppNotification[] = [
  {
    id: 'seed-1',
    title: 'Your cake is ready!',
    description: 'The custom Chocolate Ganache cake is ready for pickup at Adama central branch.',
    time: '2m ago',
    timeLabel: '2m ago',
    icon: 'check-circle',
    unread: true,
  },
  {
    id: 'seed-2',
    title: 'Flash Sale: 20% off',
    description: 'Grab our famous butter croissants at a special price for the next 2 hours only.',
    time: '45m ago',
    timeLabel: '45m ago',
    icon: 'flash',
    unread: true,
  },
  {
    id: 'seed-3',
    title: 'Order Out for Delivery',
    description: 'Abebe is on his way with your breakfast bundle. Estimated arrival: 10 mins.',
    time: '2h ago',
    timeLabel: '2h ago',
    icon: 'truck-fast',
    unread: false,
  },
  {
    id: 'seed-4',
    title: 'New Bakery Alert',
    description: 'Sweet Adama has joined the marketplace! Check out their sourdough collection.',
    time: '1d ago',
    timeLabel: '1d ago',
    icon: 'store',
    unread: false,
  },
  {
    id: 'seed-5',
    title: 'System Update',
    description: 'We improved delivery tracking for more accurate timings.',
    time: '1d ago',
    timeLabel: '1d ago',
    icon: 'information',
    unread: false,
  },
];

export const AppRuntimeProvider = ({ children }: Props) => {
  const appState = useRef(AppState.currentState);
  const [notifications, setNotifications] = useState<AppNotification[]>(seedNotifications);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [bannerMessage, setBannerMessage] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
      const newItem: AppNotification = {
        id: `server-${Date.now()}`,
        title,
        description: body,
        time: 'now',
        timeLabel: 'now',
        icon: 'bell-ring',
        unread: true,
      } as AppNotification;
      setNotifications((prev) => [newItem, ...prev]);
      setBannerMessage(`${title} ${body}`.trim());
      setBannerVisible(true);
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const content = response.notification.request.content;
      const title = content.title ?? 'ABC Notification';
      const body = content.body ?? 'Notification opened.';
      const newItem: AppNotification = {
        id: `response-${Date.now()}`,
        title,
        description: body,
        time: 'now',
        timeLabel: 'now',
        icon: 'bell-ring',
        unread: true,
      } as AppNotification;
      setNotifications((prev) => [newItem, ...prev]);
      setBannerMessage(`${title} ${body}`.trim());
      setBannerVisible(true);
    });

    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const contextValue = useMemo<InAppNotificationsContextValue>(
    () => ({
      notifications,
      showDropdown: () => setDropdownVisible(true),
      hideDropdown: () => setDropdownVisible(false),
      markAllAsRead,
    }),
    [notifications],
  );

  return (
    <InAppNotificationsContext.Provider value={contextValue}>
      {children}

      <TopBannerNotification
        visible={bannerVisible}
        message={bannerMessage || 'New notification'}
        onClose={() => setBannerVisible(false)}
        onPress={() => {
          setDropdownVisible(true);
          setBannerVisible(false);
        }}
      />

      <NotificationDropdownModal
        visible={dropdownVisible}
        onClose={() => setDropdownVisible(false)}
        items={notifications}
        onMarkAllRead={markAllAsRead}
        onViewAll={() => {
          setDropdownVisible(false);
          if (navigationRef.isReady()) {
            navigationRef.navigate(ROUTES.Notification);
          }
        }}
      />
    </InAppNotificationsContext.Provider>
  );
};

export const useInAppNotifications = () => {
  const context = useContext(InAppNotificationsContext);
  if (!context) {
    throw new Error('useInAppNotifications must be used within AppRuntimeProvider');
  }
  return context;
};
