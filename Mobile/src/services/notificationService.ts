import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import API from './api';
import { pushTokenStorage } from '../utils/storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const ANDROID_CHANNEL_ID = 'abc-order-updates';

const configureAndroidChannel = async () => {
  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
    name: 'Order Updates',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#f97316',
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    sound: 'default',
  });
};

const getProjectId = (): string | undefined => {
  const maybeProjectId =
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId;

  return typeof maybeProjectId === 'string' ? maybeProjectId : undefined;
};

const syncPushTokenToBackend = async (expoPushToken: string) => {
  try {
    await API.patch('/auth/profile', { expoPushToken });
  } catch {
    try {
      await API.post('/auth/push-token', { expoPushToken });
    } catch {
      // best-effort sync; token remains cached locally for retry later
    }
  }
};

export const registerForPushNotificationsAsync = async (): Promise<string | null> => {
  if (Constants.appOwnership === 'expo') {
    return null;
  }

  if (!Device.isDevice) {
    return null;
  }

  if (Device.osName === 'Android') {
    await configureAndroidChannel();
  }

  const existingStatus = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus.status;

  if (finalStatus !== 'granted') {
    const requestResult = await Notifications.requestPermissionsAsync();
    finalStatus = requestResult.status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  const projectId = getProjectId();
  let tokenResult: Notifications.ExpoPushToken;

  try {
    tokenResult = await Notifications.getExpoPushTokenAsync(
      projectId ? { projectId } : undefined
    );
  } catch {
    return null;
  }

  const expoPushToken = tokenResult.data;
  const cachedToken = await pushTokenStorage.get();

  if (expoPushToken && expoPushToken !== cachedToken) {
    await pushTokenStorage.set(expoPushToken);
    await syncPushTokenToBackend(expoPushToken);
  }

  return expoPushToken ?? null;
};

export const scheduleBakingTimerNotification = async (secondsFromNow: number, body: string) => {
  const safeSeconds = Math.max(1, Math.floor(secondsFromNow));
  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'Baking Timer',
      body,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      channelId: ANDROID_CHANNEL_ID,
      seconds: safeSeconds,
    },
  });
};

export const scheduleReminderNotification = async (date: Date, body: string) => {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'Reminder',
      body,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      channelId: ANDROID_CHANNEL_ID,
      date,
    },
  });
};

export const cancelLocalNotification = async (identifier: string) => {
  await Notifications.cancelScheduledNotificationAsync(identifier);
};
