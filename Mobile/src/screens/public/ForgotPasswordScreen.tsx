import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ROUTES } from '../../constants/routes';
import type { AuthStackParamList } from '../../types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../context/AuthProvider';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { requestPasswordReset, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

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
    <ScrollView className="flex-1 bg-background-light dark:bg-background-dark" contentContainerClassName="px-6 py-10">
      <Text className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Forgot password</Text>
      <Text className="mt-2 text-base text-gray-600 dark:text-gray-400">
        We will send a reset code to your email.
      </Text>

      <View className="mt-8 space-y-5">
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
        />
      </View>

      {error ? <Text className="mt-4 text-sm text-red-500">{error}</Text> : null}
      {message ? <Text className="mt-2 text-sm text-green-600">{message}</Text> : null}

      <View className="mt-6">
        <Button title="Send reset code" onPress={handleSubmit} loading={loading} />
      </View>
    </ScrollView>
  );
};