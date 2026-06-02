import React, { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Text, View, ScrollView, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '@/src/features/theme';
import { useVerifyOTPMutation, useResendOTPMutation, AUTH_KEYS } from '@/src/features/auth';
import { useAuthStore } from '@/src/features/auth/auth.store';
import { useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { ScreenLayout } from '@/src/components/ScreenLayout';
import { PrimaryButton } from '@/src/components/FormComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VerifyOtpScreen() {
  const { isDark } = useThemeStore();
  const params = useLocalSearchParams();
  const email = Array.isArray(params.email) ? params.email[0] : params.email;
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const textClass = isDark ? 'text-slate-400' : 'text-slate-600';

  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();
  const verifyMutation = useVerifyOTPMutation();
  const resendMutation = useResendOTPMutation();

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOtpChange = (text: string) => {
    // Only allow digits and limit to 6
    if (/^\d{0,6}$/.test(text)) {
      setOtp(text);
    }
  };

  const onVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    if (!email) {
      Alert.alert('Error', 'Email is missing');
      return;
    }

    try {
      const data = await verifyMutation.mutateAsync({ email, otp });
      const user = data?.user as any;
      const token = data?.token;
      
      // Ensure token is a string before saving
      const tokenString = typeof token === 'string' ? token : JSON.stringify(token);
      await SecureStore.setItemAsync('token', tokenString);
      setAuth(user, tokenString);
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.profile });

      // Determine destination based on role
      let destination: any = '/(customer)/home'; // default

      if (user?.role === 'owner') {
        destination =
          user?.firstLogin === true ? '/(vendor)/verification/step1' : '/(vendor)/dashboard';
      } else if (user?.role === 'admin') {
        destination = '/(admin)/dashboard';
      } else if (user?.role === 'driver') {
        destination = '/(driver)/dashboard';
      }

      // Resume last route if the user got redirected here due to missing/expired token.
      const lastRoute = await AsyncStorage.getItem('lastRoute');
      if (lastRoute) {
        const role = user?.role;
        const firstLogin = user?.firstLogin === true;
        const ownerInfo = user?.ownerInfo as any;
        const companyVerified = ownerInfo?.companyVerified === true;

        const isAllowed =
          !lastRoute.startsWith('/(global)/') &&
          ((role === 'owner' &&
            lastRoute.startsWith('/(vendor)') &&
            (firstLogin
              ? lastRoute.includes('/(vendor)/verification/step1')
              : !companyVerified
                ? lastRoute.includes('/(vendor)/verification/')
                : true)) ||
            (role === 'admin' && lastRoute.startsWith('/(admin)/')) ||
            (role === 'customer' && lastRoute.startsWith('/(customer)/')));

        if (isAllowed) {
          await AsyncStorage.removeItem('lastRoute').catch(() => {});
          destination = lastRoute;
        }
      }

      Alert.alert('Success', 'Email verified successfully!', [
        {
          text: 'OK',
          onPress: () => router.replace(destination),
        },
      ]);
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || error?.message || 'Invalid OTP';
      Alert.alert('Verification Failed', errorMsg);
    }
  };

  const onResend = async () => {
    if (!email) {
      Alert.alert('Error', 'Email is missing');
      return;
    }

    try {
      await resendMutation.mutateAsync(email);
      setOtp('');
      setResendTimer(60);
      setCanResend(false);
      Alert.alert('Success', 'OTP sent to your email');
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || error?.message || 'Failed to resend OTP';
      Alert.alert('Error', errorMsg);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <ScreenLayout title="Verify Email" showBackButton={true} showThemeToggle={true}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="gap-6 px-6">
            <Text
              className={`text-center text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Verify Your Email
            </Text>
            <Text className={`text-center text-sm ${textClass}`}>
              We sent a verification code to {email}. Please enter it below.
            </Text>

            {/* OTP Input Field */}
            <View className="gap-2 py-6">
              <Text
                className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Enter 6-digit Code
              </Text>
              <TextInput
                value={otp}
                onChangeText={handleOtpChange}
                keyboardType="numeric"
                maxLength={6}
                placeholder="000000"
                placeholderTextColor={isDark ? '#94a3b8' : '#cbd5e1'}
                className={`h-16 rounded-lg border-2 px-4 text-center text-3xl font-bold tracking-widest ${
                  isDark
                    ? 'border-slate-700 bg-slate-800 text-white'
                    : 'border-slate-200 bg-white text-slate-900'
                }`}
              />
            </View>

            {/* Verify Button */}
            <PrimaryButton
              label={verifyMutation.isPending ? 'Verifying...' : 'Verify Email'}
              onPress={onVerify}
              loading={verifyMutation.isPending}
            />

            {/* Resend OTP */}
            <View className="items-center">
              <Text className={`text-sm ${textClass}`}>
                Didn't receive code?{' '}
                <Text
                  className={
                    canResend && !resendMutation.isPending
                      ? 'font-bold text-primary'
                      : 'text-slate-400'
                  }
                  onPress={canResend && !resendMutation.isPending ? onResend : undefined}>
                  {resendMutation.isPending
                    ? 'Resending...'
                    : canResend
                      ? 'Resend'
                      : `Resend in ${resendTimer}s`}
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </ScreenLayout>
    </SafeAreaView>
  );
}
