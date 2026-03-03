import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../context/AuthProvider';
import { useThemeStore } from '../../store/themeStore';
import { ROUTES } from '../../constants/routes';
import type { AuthStackParamList } from '../../types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ResetPassword'>;
type ScreenRoute = RouteProp<AuthStackParamList, 'ResetPassword'>;

const resetSchema = z
  .object({
    otp: z.string().trim().min(4, 'Reset code is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type ResetFormValues = z.infer<typeof resetSchema>;

export const ResetPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRoute>();
  const { resetPassword, loading, error } = useAuth();
  const email = route.params?.email ?? '';
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      otp: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const [message, setMessage] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';
  const toggleIconColor = isDark ? '#f97316' : '#374151';

  const watchedNewPassword = watch('newPassword');

  const strength = useMemo(() => {
    const length = watchedNewPassword.length;
    if (!length) {
      return { label: '', level: 0 };
    }
    if (length >= 12) {
      return { label: 'Strong', level: 4 };
    }
    if (length >= 8) {
      return { label: 'Medium', level: 3 };
    }
    if (length >= 4) {
      return { label: 'Weak', level: 2 };
    }
    return { label: 'Weak', level: 1 };
  }, [watchedNewPassword]);

  const onSubmit = async (values: ResetFormValues) => {
    try {
      const result = await resetPassword({ email, code: values.otp, newPassword: values.newPassword });
      setMessage(result.message ?? 'Password reset successfully.');
      navigation.navigate(ROUTES.PasswordResetSuccess as never);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets
        >
        <View className="flex-row items-center justify-between px-4 pb-2 pt-6">
          <Pressable
            onPress={() => navigation.goBack()}
            className="h-10 w-10 items-center justify-center rounded-full"
          >
            <MaterialCommunityIcons name="arrow-left" size={22} color={toggleIconColor} />
          </Pressable>
          <Text className="text-lg font-bold tracking-tight text-text-main dark:text-gray-100">
            Reset Password
          </Text>
          <Pressable
            onPress={toggle}
            className="h-10 w-10 items-center justify-center rounded-full"
          >
            <MaterialCommunityIcons name={toggleIconName} size={22} color={toggleIconColor} />
          </Pressable>
        </View>

        <View className="px-6 pt-4">
          <View className="items-center text-center">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <MaterialCommunityIcons name="lock-reset" size={30} color="#f97316" />
            </View>
            <Text className="text-2xl font-extrabold text-text-main dark:text-gray-100">
              Create new password
            </Text>
            <Text className="mt-2 text-center text-sm text-text-muted dark:text-gray-400">
              Your new password must be unique from those previously used.
            </Text>
            {email ? (
              <Text className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-500">
                Reset code sent to {email}
              </Text>
            ) : null}
          </View>

          <View className="mt-8 gap-6">
            <View className="gap-2">
              <Text className="ml-1 text-sm font-semibold text-text-main dark:text-gray-100">
                Reset Code
              </Text>
              <View className="flex-row items-center rounded-xl border border-neutral-light bg-surface-light px-4 dark:border-neutral-dark dark:bg-surface-dark">
                <MaterialCommunityIcons name="key-outline" size={18} color={isDark ? '#d1c49e' : '#9a864c'} />
                <Controller
                  control={control}
                  name="otp"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      placeholder="123456"
                      placeholderTextColor={isDark ? '#d1c49e' : '#9a864c'}
                      keyboardType="numeric"
                      className="flex-1 px-3 py-4 text-base font-medium text-text-main dark:text-gray-100"
                    />
                  )}
                />
              </View>
              {errors.otp?.message ? <Text className="text-xs text-red-500">{errors.otp.message}</Text> : null}
            </View>

            <View className="gap-2">
              <Text className="ml-1 text-sm font-semibold text-text-main dark:text-gray-100">
                New Password
              </Text>
              <View className="flex-row items-center rounded-xl border border-neutral-light bg-surface-light px-4 dark:border-neutral-dark dark:bg-surface-dark">
                <MaterialCommunityIcons name="lock" size={18} color={isDark ? '#d1c49e' : '#9a864c'} />
                <Controller
                  control={control}
                  name="newPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      placeholder="••••••••"
                      placeholderTextColor={isDark ? '#d1c49e' : '#9a864c'}
                      secureTextEntry={!showNewPassword}
                      className="flex-1 px-3 py-4 text-base font-medium text-text-main dark:text-gray-100"
                    />
                  )}
                />
                <Pressable onPress={() => setShowNewPassword((prev) => !prev)}>
                  <MaterialCommunityIcons
                    name={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color={isDark ? '#d1c49e' : '#9a864c'}
                  />
                </Pressable>
              </View>
              <View className="mt-1 px-1">
                <View className="mb-2 flex-row items-center justify-between">
                  <Text className="text-xs font-medium text-text-muted dark:text-gray-400">Strength</Text>
                  {strength.label ? (
                    <Text className="text-xs font-bold text-primary">{strength.label}</Text>
                  ) : null}
                </View>
                <View className="flex-row gap-2">
                  {Array.from({ length: 4 }).map((_, index) => {
                    const isActive = index < strength.level;
                    const inactiveClass = isDark ? 'bg-white/10' : 'bg-border-light';
                    return (
                      <View
                        key={`strength-${index}`}
                        className={`h-1.5 flex-1 rounded-full ${isActive ? 'bg-primary' : inactiveClass}`}
                      />
                    );
                  })}
                </View>
                <View className="mt-2 flex-row items-center gap-1">
                  <MaterialCommunityIcons name="information-outline" size={14} color={isDark ? '#d1c49e' : '#9a864c'} />
                  <Text className="text-xs text-text-muted dark:text-gray-400">
                    Must contain at least 8 characters.
                  </Text>
                </View>
              </View>
              {errors.newPassword?.message ? <Text className="text-xs text-red-500">{errors.newPassword.message}</Text> : null}
            </View>

            <View className="gap-2">
              <Text className="ml-1 text-sm font-semibold text-text-main dark:text-gray-100">
                Confirm New Password
              </Text>
              <View className="flex-row items-center rounded-xl border border-neutral-light bg-surface-light px-4 dark:border-neutral-dark dark:bg-surface-dark">
                <MaterialCommunityIcons name="lock-clock" size={18} color={isDark ? '#d1c49e' : '#9a864c'} />
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      placeholder="••••••••"
                      placeholderTextColor={isDark ? '#d1c49e' : '#9a864c'}
                      secureTextEntry={!showConfirmPassword}
                      className="flex-1 px-3 py-4 text-base font-medium text-text-main dark:text-gray-100"
                    />
                  )}
                />
                <Pressable onPress={() => setShowConfirmPassword((prev) => !prev)}>
                  <MaterialCommunityIcons
                    name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color={isDark ? '#d1c49e' : '#9a864c'}
                  />
                </Pressable>
              </View>
              {errors.confirmPassword?.message ? <Text className="text-xs text-red-500">{errors.confirmPassword.message}</Text> : null}
            </View>
          </View>

          {error ? <Text className="mt-4 text-sm text-red-500">{error}</Text> : null}
          {message ? <Text className="mt-2 text-sm text-green-600">{message}</Text> : null}

          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={Boolean(loading)}
            className="mt-8 h-14 w-full items-center justify-center rounded-xl bg-primary"
            style={{
              shadowColor: '#f97316',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.25,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Text className="text-base font-bold text-primary-content">Reset Password</Text>
          </Pressable>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};