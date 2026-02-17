import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants/routes';
import { useThemeStore } from '../../store/themeStore';

export const PasswordResetSuccessScreen = () => {
  const navigation = useNavigation();
  const { mode } = useThemeStore();
  const isDark = mode === 'dark';

  return (
    <SafeAreaView className="flex-1 bg-background-light px-5 dark:bg-background-dark">
      <View className="flex-1 items-center justify-center">
        <View className="w-full max-w-md rounded-3xl bg-surface-light px-6 py-10 dark:bg-surface-dark">
          <View className="items-center">
            <View className="relative mb-8 h-28 w-28 items-center justify-center">
              <View className="absolute inset-0 rounded-full bg-primary/15" />
              <View className="h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <MaterialCommunityIcons name="check-circle" size={46} color="#f97316" />
              </View>
            </View>

            <Text className="text-center text-3xl font-extrabold tracking-tight text-text-main dark:text-white">
              Password Reset Successful
            </Text>
            <Text className="mt-4 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
              Your password has been updated. You can now log in with your new credentials.
            </Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate(ROUTES.Login as never)}
            className="mt-10 h-14 items-center justify-center rounded-xl bg-primary"
            style={{
              shadowColor: '#f97316',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: isDark ? 0.25 : 0.3,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Text className="text-base font-bold tracking-wide text-white">Back to Login</Text>
          </Pressable>

          <View className="mt-8 items-center">
            <View className="h-2 w-20 rounded-full bg-gray-200 dark:bg-white/10" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
