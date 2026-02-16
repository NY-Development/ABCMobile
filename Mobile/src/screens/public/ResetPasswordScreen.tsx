import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthProvider';
import type { AuthStackParamList } from '../../types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ResetPassword'>;
type ScreenRoute = RouteProp<AuthStackParamList, 'ResetPassword'>;

export const ResetPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRoute>();
  const { resetPassword, loading, error } = useAuth();
  const [email, setEmail] = useState(route.params?.email ?? '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const result = await resetPassword({ email, code: otp, newPassword });
      setMessage(result.message ?? 'Password reset successfully.');
      navigation.navigate('Login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="px-6 py-10">
      <Text className="text-3xl font-extrabold text-gray-900">Reset password</Text>
      <Text className="mt-2 text-base text-gray-600">
        Enter the code from your email and a new password.
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
        <Input
          label="New password"
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New password"
          secureTextEntry
        />
        <Input
          label="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm password"
          secureTextEntry
        />
      </View>

      {error ? <Text className="mt-4 text-sm text-red-500">{error}</Text> : null}
      {message ? <Text className="mt-2 text-sm text-green-600">{message}</Text> : null}

      <View className="mt-6">
        <Button title="Reset password" onPress={handleSubmit} loading={loading} />
      </View>
    </ScrollView>
  );
};