import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { Text, View, ScrollView, Alert, Pressable, TextInput } from 'react-native';
import { useThemeStore } from '@/src/features/theme';
import { ScreenLayout } from '@/src/components/ScreenLayout';
import { PrimaryButton } from '@/src/components/FormComponents';
import { Mail } from 'lucide-react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const { isDark } = useThemeStore();
  const [sending, setSending] = useState(false);
  const textClass = isDark ? 'text-slate-400' : 'text-slate-600';

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const email = watch('email');

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setSending(true);
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset link');
      }

      Alert.alert('Success', 'Password reset link sent to your email!', [
        {
          text: 'OK',
          onPress: () => router.push('/(global)/login'),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred');
    } finally {
      setSending(false);
    }
  };

  return (
    <ScreenLayout title="Forgot Password" showBackButton={true} showThemeToggle={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Icon */}
        <View className="items-center gap-4 px-6 py-8">
          <View
            className={`h-20 w-20 items-center justify-center rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <Mail size={40} color="#ec5b13" />
          </View>
        </View>

        {/* Content */}
        <View className="gap-4 px-6">
          <Text
            className={`text-center text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Reset Your Password
          </Text>
          <Text className={`text-center text-sm ${textClass}`}>
            Enter the email address associated with your account, and we'll send you a link to reset
            your password.
          </Text>

          {/* Email Input */}
          <View className="mt-4 gap-2">
            <Text
              className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Email Address
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <>
                  <View
                    className={`flex-row items-center rounded-xl border px-4 py-3 ${
                      isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
                    } ${errors.email ? (isDark ? 'border-red-600' : 'border-red-400') : ''}`}>
                    <Mail size={20} color="#ec5b13" />
                    <TextInput
                      className={`ml-3 flex-1 py-3 text-base font-normal ${isDark ? 'text-white' : 'text-slate-900'}`}
                      placeholder="name@example.com"
                      placeholderTextColor={isDark ? '#94a3b8' : '#cbd5e1'}
                      value={value}
                      onChangeText={onChange}
                      keyboardType="email-address"
                    />
                  </View>
                  {errors.email && (
                    <Text className="text-xs font-semibold text-red-500">
                      {errors.email.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>

          {/* Send Button */}
          <PrimaryButton
            label="Send Reset Link"
            onPress={handleSubmit(onSubmit)}
            loading={sending}
          />
        </View>

        {/* Back to Login */}
        <View className="mt-6 items-center px-6">
          <Pressable onPress={() => router.back()}>
            <Text className="text-sm font-bold text-primary">Back to Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
