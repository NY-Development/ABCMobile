import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthProvider';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      await login({ email, password });
      navigation.navigate(ROUTES.Home as never);
    } catch {
      // Error shown via useAuth error state
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light-alt" edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        {/* Theme toggle - top right */}
        <View className="absolute top-0 right-0 z-10 w-full flex-row justify-end p-4">
          <Pressable className="rounded-full p-2">
            <MaterialCommunityIcons name="weather-night" size={24} color="#374151" />
          </Pressable>
        </View>

        {/* Decorative background circles */}
        <View
          className="absolute left-[-10%] top-[-10%] h-64 w-64 rounded-full bg-primary/10"
          style={{ opacity: 0.9 }}
        />
        <View
          className="absolute bottom-[-10%] right-[-10%] h-80 w-80 rounded-full bg-primary/10"
          style={{ opacity: 0.9 }}
        />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 48,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Main card */}
          <View
            className="w-full max-w-md rounded-3xl bg-surface-light p-8"
            style={{
              shadowColor: '#ecb613',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.15,
              shadowRadius: 20,
              elevation: 8,
            }}
          >
            {/* Header */}
            <View className="items-center gap-4 pt-2">
              <View className="mb-2 h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <MaterialCommunityIcons name="bread-slice" size={32} color="#ecb613" />
              </View>
              <View className="gap-2">
                <Text className="text-center text-3xl font-bold tracking-tight text-gray-900">
                  Welcome Back
                </Text>
                <Text className="text-center text-base font-medium text-gray-500">
                  Login to your ABC account
                </Text>
              </View>
            </View>

            {/* Form */}
            <View className="mt-6 gap-5">
              {/* Email */}
              <View className="gap-2">
                <Text className="ml-1 text-sm font-semibold text-gray-700">
                  Email Address
                </Text>
                <View className="flex-row items-center rounded-xl border border-gray-200 bg-neutral-light/30">
                  <View className="absolute left-4 z-10">
                    <MaterialCommunityIcons name="email-outline" size={20} color="#9ca3af" />
                  </View>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="john@example.com"
                    placeholderTextColor="#9ca3af"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="flex-1 py-3.5 pl-11 pr-4 text-base font-medium text-gray-900"
                  />
                </View>
              </View>

              {/* Password */}
              <View className="gap-2">
                <Text className="ml-1 text-sm font-semibold text-gray-700">Password</Text>
                <View className="flex-row items-center rounded-xl border border-gray-200 bg-neutral-light/30">
                  <View className="absolute left-4 z-10">
                    <MaterialCommunityIcons name="lock-outline" size={20} color="#9ca3af" />
                  </View>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={!showPassword}
                    className="flex-1 py-3.5 pl-11 pr-12 text-base font-medium text-gray-900"
                  />
                  <Pressable
                    onPress={() => setShowPassword((p) => !p)}
                    className="absolute right-4"
                    hitSlop={8}
                  >
                    <MaterialCommunityIcons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="#9ca3af"
                    />
                  </Pressable>
                </View>
              </View>

              {/* Forgot password */}
              <View className="flex-row justify-end">
                <Pressable onPress={() => navigation.navigate(ROUTES.ForgotPassword as never)}>
                  <Text className="text-sm font-semibold text-primary">Forgot Password?</Text>
                </Pressable>
              </View>

              {error ? (
                <Text className="text-center text-sm text-red-500">{error}</Text>
              ) : null}

              {/* Log In button */}
              <Pressable
                onPress={handleSubmit}
                disabled={loading}
                className="mt-2 flex-row items-center justify-center gap-2 rounded-xl bg-primary py-4"
                style={{
                  shadowColor: '#ecb613',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <Text className="text-lg font-bold text-primary-content">
                  {loading ? 'Signing in...' : 'Log In'}
                </Text>
                {!loading && (
                  <MaterialCommunityIcons
                    name="arrow-right"
                    size={20}
                    color="#1b180d"
                  />
                )}
              </Pressable>
            </View>

            {/* Footer */}
            <View className="mt-6 items-center pb-2">
              <Text className="text-center text-sm text-gray-500">
                New to ABC Bakery?{' '}
                <Text
                  className="font-bold text-primary"
                  onPress={() => navigation.navigate(ROUTES.Register as never)}
                >
                  Create Account
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
