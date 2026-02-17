import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthProvider';
import type { AuthStackParamList } from '../../types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'OTPVerification'>;
type ScreenRoute = RouteProp<AuthStackParamList, 'OTPVerification'>;

export const OTPVerificationScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRoute>();
  const { verifyOtp, resendOtp, loading, error } = useAuth();
  const [email, setEmail] = useState(route.params?.email ?? '');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    try {
      const result = await verifyOtp({ email, code: otp });
      setMessage(result.message ?? 'OTP verified.');
      navigation.navigate('Login');
    } catch (err) {
      console.log(err);
    }
  };

  const handleResend = async () => {
    try {
      const result = await resendOtp({ email });
      setMessage(result.message ?? 'OTP sent again.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView className="flex-1 bg-background-light dark:bg-background-dark" contentContainerClassName="px-6 py-10">
      <Text className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Verify OTP</Text>
      <Text className="mt-2 text-base text-gray-600 dark:text-gray-400">
        Enter the one-time code sent to your email.
      </Text>

      <View className="mt-8 space-y-5">
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
        />
        <Input
          label="OTP code"
          value={otp}
          onChangeText={setOtp}
          placeholder="123456"
          keyboardType="numeric"
        />
      </View>

      {error ? <Text className="mt-4 text-sm text-red-500">{error}</Text> : null}
      {message ? <Text className="mt-2 text-sm text-green-600">{message}</Text> : null}

      <View className="mt-6 space-y-4">
        <Button title="Verify OTP" onPress={handleVerify} loading={loading} />
        <Button title="Resend OTP" variant="outline" onPress={handleResend} />
      </View>
    </ScrollView>
  );
};