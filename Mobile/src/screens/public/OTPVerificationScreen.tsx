import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../context/AuthProvider';
import type { AuthStackParamList } from '../../types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'OTPVerification'>;
type ScreenRoute = RouteProp<AuthStackParamList, 'OTPVerification'>;

const otpSchema = z.object({
  email: z.string().trim().email('Please enter a valid email'),
  otp: z.string().trim().min(4, 'OTP code is required'),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export const OTPVerificationScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRoute>();
  const { verifyOtp, resendOtp, loading, error } = useAuth();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: route.params?.email ?? '',
      otp: '',
    },
  });
  const [message, setMessage] = useState('');

  const onVerify = async (values: OtpFormValues) => {
    try {
      const result = await verifyOtp({ email: values.email, code: values.otp });
      setMessage(result.message ?? 'OTP verified.');
      navigation.navigate('Login');
    } catch (err) {
      console.log(err);
    }
  };

  const onResend = async () => {
    try {
      const email = getValues('email');
      const parsed = otpSchema.shape.email.safeParse(email);
      if (!parsed.success) {
        setMessage(parsed.error.issues[0]?.message || 'Please enter a valid email.');
        return;
      }
      const result = await resendOtp({ email });
      setMessage(result.message ?? 'OTP sent again.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-6 py-10"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets
        >
          <Text className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Verify OTP</Text>
          <Text className="mt-2 text-base text-gray-600 dark:text-gray-400">
            Enter the one-time code sent to your email.
          </Text>

          <View className="mt-8 space-y-5">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                  placeholder="you@example.com"
                  keyboardType="email-address"
                />
              )}
            />
            {errors.email?.message ? <Text className="text-sm text-red-500">{errors.email.message}</Text> : null}

            <Controller
              control={control}
              name="otp"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="OTP code"
                  value={value}
                  onChangeText={onChange}
                  placeholder="123456"
                  keyboardType="numeric"
                />
              )}
            />
            {errors.otp?.message ? <Text className="text-sm text-red-500">{errors.otp.message}</Text> : null}
          </View>

          {error ? <Text className="mt-4 text-sm text-red-500">{error}</Text> : null}
          {message ? <Text className="mt-2 text-sm text-green-600">{message}</Text> : null}

          <View className="mt-6 space-y-4">
            <Button title="Verify OTP" onPress={handleSubmit(onVerify)} loading={Boolean(loading)} />
            <Button title="Resend OTP" variant="outline" onPress={onResend} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};