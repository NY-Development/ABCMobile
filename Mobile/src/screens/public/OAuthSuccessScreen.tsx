import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Button } from '../../components/ui/Button';
import { ROUTES } from '../../constants/routes';
import type { AuthStackParamList } from '../../types/navigation';
import { useAuth } from '../../context/AuthProvider';

type ScreenRoute = RouteProp<AuthStackParamList, 'OAuthSuccess'>;

export const OAuthSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ScreenRoute>();
  const { setTokenAndFetchUser, user, loading } = useAuth();
  const [countdown, setCountdown] = useState(3);
  const hasStarted = useRef(false);

  useEffect(() => {
    const token = route.params?.token;
    if (!token) {
      navigation.navigate(ROUTES.Login as never);
      return;
    }
    setTokenAndFetchUser(token);
  }, [navigation, route.params?.token, setTokenAndFetchUser]);

  useEffect(() => {
    if (!loading && user && !hasStarted.current) {
      hasStarted.current = true;
      const interval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      const timer = setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: ROUTES.Home as never }],
        });
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [loading, navigation, user]);

  return (
    <View className="flex-1 items-center justify-center bg-background-light px-6 dark:bg-background-dark">
      <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {loading ? 'Authenticating...' : 'Login successful'}
      </Text>
      <Text className="mt-3 text-base text-gray-600 dark:text-gray-400">
        Redirecting in {countdown} seconds
      </Text>
      <View className="mt-6 w-full">
        <Button
          title="Go to home now"
          onPress={() => navigation.navigate(ROUTES.Home as never)}
        />
      </View>
    </View>
  );
};
