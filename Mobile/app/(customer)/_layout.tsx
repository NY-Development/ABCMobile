import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLogoutMutation } from '@/src/features/auth/auth.hooks';
import { Pressable } from 'react-native';

const CustomerLayout = () => {
  const router = useRouter();
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Customer Navigation
        </Text>
        <Pressable
          onPress={() => router.push('/(customer)/home')}
          className="mb-4 w-full rounded-xl border border-primary bg-background px-4 py-3">
          <Text className="text-center font-bold text-primary">Go to Customer Home</Text>
        </Pressable>
        <Pressable
          onPress={handleLogout}
          className="w-full rounded-xl border border-red-500 bg-background px-4 py-3">
          <Text className="text-center font-bold text-red-500">Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CustomerLayout;
