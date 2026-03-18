import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { Text, View, ScrollView, Pressable, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoginMutation, loginSchema, type LoginFormData } from '@/src/features/auth';
import { useThemeStore } from '@/src/features/theme';
import { FormInput, PrimaryButton } from '@/src/components/FormComponents';
import { Mail, Lock, Eye, EyeOff, ChevronRight } from 'lucide-react-native';
import { zodResolver } from '@hookform/resolvers/zod';

export default function LoginScreen() {
  const { isDark } = useThemeStore();
  const loginMutation = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginMutation.mutateAsync(data);
      const loggedInUser = res?.user;

      // Validate user and role
      if (!loggedInUser || !loggedInUser.role) {
        Alert.alert('Login Failed', 'Invalid user credentials - missing role in response');
        return;
      }

      // Check for stored navigation link for customers
      if (loggedInUser.role === 'customer') {
        try {
          const homeOrderLink = await AsyncStorage.getItem('homeOrderLink');
          if (homeOrderLink) {
            Alert.alert('Welcome', `Welcome back, ${loggedInUser.name || 'User'}!`);
            router.replace(homeOrderLink);
            await AsyncStorage.removeItem('homeOrderLink');
            return;
          }
        } catch (storageError) {
          console.error('Error reading storage:', storageError);
        }
      }

      // Conditional navigation based on role
      let destination: string;

      if (loggedInUser.role === 'owner') {
        // Check if it's first login for owner
        destination =
          loggedInUser.firstLogin === true ? '/(vendor)/verification/step1' : '/(vendor)/dashboard';
      } else if (loggedInUser.role === 'admin') {
        destination = '/(admin)/dashboard'; // Adjust based on your admin routes
      } else {
        // Default customer
        destination = '/(customer)/home';
      }

      Alert.alert('Welcome', `Welcome back, ${loggedInUser.name || 'User'}!`);
      router.replace(destination as any);
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'An error occurred during login';
      Alert.alert('Login Failed', errorMsg);
    }
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-background' : 'bg-background'}`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        className={`${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
        <View
          className={`mx-4 my-8 overflow-hidden rounded-xl shadow-xl ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
          {/* Header with Logo */}
          <View
            className={`relative h-48 w-full items-center justify-center ${isDark ? 'bg-slate-800/50' : 'bg-primary/10'}`}>
            <View className="flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-lg">
              <Text className="text-5xl">🍰</Text>
            </View>
          </View>

          {/* Form Content */}
          <View className="px-8 pb-10 pt-6">
            <View className="mb-8 text-center">
              <Text
                className={`text-3xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                Adama Bakery & Cake
              </Text>
              <Text className={`mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Welcome back! Please login to your account.
              </Text>
            </View>

            {/* Email Field */}
            <View className="gap-4">
              <View className="flex-col gap-2">
                <Text
                  className={`ml-1 text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Email Address
                </Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { value, onChange } }) => (
                    <View
                      className={`flex-row items-center rounded-xl py-4 pl-4 pr-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                      <Mail size={20} color="#ec5b13" style={{ marginRight: 12 }} />
                      <TextInput
                        className={`flex-1 text-base font-normal ${isDark ? 'text-slate-100' : 'text-slate-900'}`}
                        placeholder="name@example.com"
                        placeholderTextColor={isDark ? '#64748b' : '#a8b5bc'}
                        value={value}
                        onChangeText={onChange}
                        keyboardType="email-address"
                      />
                    </View>
                  )}
                />
                {errors.email && (
                  <Text className="ml-1 text-xs text-red-500">{errors.email.message}</Text>
                )}
              </View>

              {/* Password Field */}
              <View className="flex-col gap-2">
                <View className="flex-row items-center justify-between">
                  <Text
                    className={`ml-1 text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Password
                  </Text>
                  <Pressable
                    onPress={() => router.push('/(global)/forgot-password')}
                    style={{ cursor: 'pointer' }}>
                    <Text className="text-xs font-semibold text-primary">Forgot Password?</Text>
                  </Pressable>
                </View>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { value, onChange } }) => (
                    <View
                      className={`flex-row items-center rounded-xl py-4 pl-4 pr-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                      <Lock size={20} color="#ec5b13" style={{ marginRight: 12 }} />
                      <TextInput
                        className={`flex-1 text-base font-normal ${isDark ? 'text-slate-100' : 'text-slate-900'}`}
                        placeholder="Enter your password"
                        placeholderTextColor={isDark ? '#64748b' : '#a8b5bc'}
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={!showPassword}
                      />
                      <Pressable
                        onPress={() => setShowPassword(!showPassword)}
                        style={{ cursor: 'pointer' }}>
                        {showPassword ? (
                          <Eye size={20} color={isDark ? '#94a3b8' : '#cbd5e1'} />
                        ) : (
                          <EyeOff size={20} color={isDark ? '#94a3b8' : '#cbd5e1'} />
                        )}
                      </Pressable>
                    </View>
                  )}
                />
                {errors.password && (
                  <Text className="ml-1 text-xs text-red-500">{errors.password.message}</Text>
                )}
              </View>

              {/* Login Button */}
              <PrimaryButton
                label="Login"
                onPress={handleSubmit(onSubmit)}
                loading={loginMutation.isPending}
              />
            </View>

            {/* Social/Register Section */}
            <View className="mt-8 items-center">
              <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Don't have an account?{' '}
                <Text
                  className="font-bold text-primary"
                  onPress={() => router.push('/(global)/register')}>
                  Register now
                </Text>
              </Text>
            </View>

            {/* Viewider */}
            <View className="mt-8 flex-row items-center gap-4">
              <View className={`h-px flex-1 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
              <Text
                className={`text-xs uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                or continue with
              </Text>
              <View className={`h-px flex-1 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
            </View>

            {/* Social Buttons */}
            <View className="mt-6 gap-3">
              <Pressable
                className={`flex-row items-center justify-center gap-2 rounded-xl border py-3 ${
                  isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'
                }`}>
                <Text className="text-2xl">🔵</Text>
                <Text className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  Google
                </Text>
              </Pressable>
              <Pressable
                className={`flex-row items-center justify-center gap-2 rounded-xl border py-3 ${
                  isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'
                }`}>
                <Text className="text-2xl">👤</Text>
                <Text className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  Facebook
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
