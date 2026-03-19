import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';
import { Text, View, ScrollView, Alert, Pressable, TextInput } from 'react-native';
import { useThemeStore } from '@/src/features/theme';
import PrimaryButton from '@/src/components/PrimaryButton';
import { Lock, Eye, EyeOff, Sun, Moon, ArrowLeft } from 'lucide-react-native';
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
  const { isDark, toggleTheme } = useThemeStore();
  const { token } = useLocalSearchParams();
  const [resetting, setResetting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <View className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
      {/* Header */}
      <View
        className={`flex-row items-center justify-between border-b px-4 py-3 ${isDark ? 'bg-background-dark border-border' : 'bg-background-light border-border'}`}>
        <Pressable
          onPress={() => router.back()}
          className="rounded-full p-2 active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ArrowLeft size={24} color={isDark ? '#ffffff' : '#1e293b'} />
        </Pressable>
        <Text
          className={`flex-1 text-center text-lg font-bold ${isDark ? 'text-card-foreground' : 'text-foreground'}`}>
          Reset Password
        </Text>
        <Pressable onPress={toggleTheme} className="rounded-lg p-2 active:opacity-70">
          {isDark ? <Sun size={24} color="#fbb040" /> : <Moon size={24} color="#64748b" />}
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="gap-6 px-6">
          <Text
            className={`text-center text-lg font-semibold ${isDark ? 'text-card-foreground' : 'text-foreground'}`}>
            Create a New Password
          </Text>
          <Text
            className={`text-center text-sm ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
            Your new password must be different from your previous passwords.
          </Text>

          {/* Password Field */}
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <View className="gap-2">
                <Text
                  className={`text-sm font-semibold ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                  Password
                </Text>
                <View
                  className={`flex-row items-center rounded-xl border px-4 py-3 ${isDark ? 'border-border bg-card/5' : 'border-border bg-card'} ${errors.password ? 'border-destructive' : ''}`}>
                  <Lock size={20} color="#ec5b13" />
                  <TextInput
                    className={`ml-3 flex-1 py-2 text-base font-normal ${isDark ? 'text-card-foreground' : 'text-foreground'}`}
                    placeholder="••••••••••"
                    placeholderTextColor={isDark ? '#94a3b8' : '#cbd5e1'}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)} className="p-2">
                    {showPassword ? (
                      <Eye size={20} color={isDark ? '#94a3b8' : '#cbd5e1'} />
                    ) : (
                      <EyeOff size={20} color={isDark ? '#94a3b8' : '#cbd5e1'} />
                    )}
                  </Pressable>
                </View>
                {errors.password && (
                  <Text className="text-xs font-semibold text-destructive">
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
                  className={`text-sm font-semibold ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                  Confirm Password
                </Text>
                <View
                  className={`flex-row items-center rounded-xl border px-4 py-3 ${isDark ? 'border-border bg-card/5' : 'border-border bg-card'} ${errors.confirmPassword ? 'border-destructive' : ''}`}>
                  <Lock size={20} color="#ec5b13" />
                  <TextInput
                    className={`ml-3 flex-1 py-2 text-base font-normal ${isDark ? 'text-card-foreground' : 'text-foreground'}`}
                    placeholder="••••••••••"
                    placeholderTextColor={isDark ? '#94a3b8' : '#cbd5e1'}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showConfirmPassword}
                  />
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
                  <Text className="text-xs font-semibold text-destructive">
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Security Notice */}
          <View className={`rounded-lg p-3 ${isDark ? 'bg-card/10' : 'bg-secondary'}`}>
            <Text
              className={`text-xs ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
              💡 Your password should be at least 6 characters long and contain a mix of uppercase,
              lowercase, and numbers.
            </Text>
          </View>

          {/* Reset Button */}
          <PrimaryButton label="Update Password" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </View>
  );
}
