import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthProvider';
import { useThemeStore } from '../../store/themeStore';
import type { AuthStackParamList } from '../../types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { requestPasswordReset, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';
  const toggleIconColor = isDark ? '#f97316' : '#374151';

  const handleSubmit = async () => {
    try {
      const result = await requestPasswordReset({ email });
      setMessage(result.message ?? 'Reset link sent.');
      navigation.navigate('ResetPassword', { email });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-primary/5" />
      <View className="absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-primary/5" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between pb-3 pt-6">
          <Pressable
            onPress={() => navigation.goBack()}
            className="h-10 w-10 items-center justify-center rounded-full"
          >
            <MaterialCommunityIcons name="arrow-left" size={22} color={toggleIconColor} />
          </Pressable>
          <Pressable
            onPress={toggle}
            className="h-10 w-10 items-center justify-center rounded-full"
          >
            <MaterialCommunityIcons name={toggleIconName} size={22} color={toggleIconColor} />
          </Pressable>
        </View>

        <View className="flex-1 items-center justify-center pt-4">
          <View className="relative mb-6 h-32 w-32 items-center justify-center rounded-full bg-primary/10">
            <View className="absolute inset-0 rounded-full border border-primary/20" />
            <View className="absolute inset-0 rounded-full border border-primary/10 scale-110" />
            <MaterialCommunityIcons name="lock-reset" size={52} color="#f97316" />
          </View>

          <Text className="text-center text-3xl font-bold tracking-tight text-text-main dark:text-white">
            Forgot Password?
          </Text>
          <Text className="mt-3 max-w-[280px] text-center text-base text-text-muted dark:text-gray-400">
            Enter your email and we will send you a code to reset your password.
          </Text>
        </View>

        <View className="mt-8 gap-4">
          <View className="gap-2">
            <Text className="ml-2 text-sm font-semibold text-text-main dark:text-gray-100">Email Address</Text>
            <View className="flex-row items-center rounded-xl border border-neutral-light bg-surface-light px-4 dark:border-neutral-dark dark:bg-surface-dark">
              <MaterialCommunityIcons name="email-outline" size={20} color={isDark ? '#b0a690' : '#7e7052'} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="example@email.com"
                placeholderTextColor={isDark ? '#b0a690' : '#7e7052'}
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 px-3 py-4 text-base font-medium text-text-main dark:text-gray-100"
              />
            </View>
          </View>

          {error ? <Text className="text-sm text-red-500">{error}</Text> : null}
          {message ? <Text className="text-sm text-green-600">{message}</Text> : null}

          <Pressable
            onPress={handleSubmit}
            disabled={loading}
            className="mt-2 w-full flex-row items-center justify-center gap-2 rounded-full bg-primary py-4"
            style={{
              shadowColor: '#f97316',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.25,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Text className="text-base font-bold text-white">Send Reset Code</Text>
            <MaterialCommunityIcons name="send" size={18} color="#ffffff" />
          </Pressable>
        </View>

        <Pressable
          onPress={() => navigation.navigate('Login')}
          className="mt-6 flex-row items-center justify-center gap-1"
        >
          <MaterialCommunityIcons name="chevron-left" size={18} color={isDark ? '#b0a690' : '#7e7052'} />
          <Text className="text-sm font-semibold text-text-muted dark:text-gray-400">Back to Login</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};