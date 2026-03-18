import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';
import { Text, View, ScrollView, Alert, Pressable } from 'react-native';
import { useThemeStore } from '@/src/features/theme';
import { ScreenLayout } from '@/src/components/ScreenLayout';
import { PrimaryButton } from '@/src/components/FormComponents';
import { Lock, Eye, EyeOff } from 'lucide-react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordScreen() {
  const { isDark } = useThemeStore();
  const { token } = useLocalSearchParams();
  const [resetting, setResetting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const textClass = isDark ? 'text-slate-400' : 'text-slate-600';

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setResetting(true);
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      Alert.alert('Success', 'Password reset successfully!', [
        {
          text: 'OK',
          onPress: () => router.replace('/(global)/login'),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred');
    } finally {
      setResetting(false);
    }
  };

  return (
    <ScreenLayout title="Reset Password" showBackButton={true} showThemeToggle={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="gap-6 px-6">
          <Text
            className={`text-center text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Create a New Password
          </Text>
          <Text className={`text-center text-sm ${textClass}`}>
            Your new password must be different from your previous passwords.
          </Text>

          {/* Password Field */}
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <View className="gap-2">
                <Text
                  className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Password
                </Text>
                <View
                  className={`flex-row items-center rounded-xl border px-4 ${
                    isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
                  } ${errors.password ? (isDark ? 'border-red-600' : 'border-red-400') : ''}`}>
                  <Lock size={20} color="#ec5b13" />
                  <View className="flex-1" />
                  <Pressable onPress={() => setShowPassword(!showPassword)} className="p-2">
                    {showPassword ? (
                      <Eye size={20} color={isDark ? '#94a3b8' : '#cbd5e1'} />
                    ) : (
                      <EyeOff size={20} color={isDark ? '#94a3b8' : '#cbd5e1'} />
                    )}
                  </Pressable>
                </View>
                {errors.password && (
                  <Text className="text-xs font-semibold text-red-500">
                    {errors.password.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Confirm Password Field */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { value, onChange } }) => (
              <View className="gap-2">
                <Text
                  className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Confirm Password
                </Text>
                <View
                  className={`flex-row items-center rounded-xl border px-4 ${
                    isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
                  } ${errors.confirmPassword ? (isDark ? 'border-red-600' : 'border-red-400') : ''}`}>
                  <Lock size={20} color="#ec5b13" />
                  <View className="flex-1" />
                  <Pressable
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="p-2">
                    {showConfirmPassword ? (
                      <Eye size={20} color={isDark ? '#94a3b8' : '#cbd5e1'} />
                    ) : (
                      <EyeOff size={20} color={isDark ? '#94a3b8' : '#cbd5e1'} />
                    )}
                  </Pressable>
                </View>
                {errors.confirmPassword && (
                  <Text className="text-xs font-semibold text-red-500">
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Security Notice */}
          <View className={`rounded-lg p-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <Text className={`text-xs ${textClass}`}>
              💡 Your password should be at least 6 characters long and contain a mix of uppercase,
              lowercase, and numbers.
            </Text>
          </View>

          {/* Reset Button */}
          <PrimaryButton
            label="Update Password"
            onPress={handleSubmit(onSubmit)}
            loading={resetting}
          />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
