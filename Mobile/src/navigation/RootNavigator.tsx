import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthNavigator } from './AuthNavigator';
import { CustomerNavigator } from './CustomerNavigator';
import { useAuth } from '../context/AuthProvider';

export const RootNavigator = () => {
  const { user, initialized } = useAuth();

  if (!Boolean(initialized)) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#EA580C" />
      </View>
    );
  }

  return Boolean(user) ? <CustomerNavigator /> : <AuthNavigator />;
};
