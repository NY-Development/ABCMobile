import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { Text, View, ScrollView, Pressable, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRegisterMutation, registerSchema, type RegisterFormData } from '@/src/features/auth';
import { useThemeStore } from '@/src/features/theme';
import { FormInput, PrimaryButton } from '@/src/components/FormComponents';
import { Mail, Lock, Phone, User, Eye, EyeOff } from 'lucide-react-native';
import { zodResolver } from '@hookform/resolvers/zod';

export default function RegisterScreen() {
  const { isDark } = useThemeStore();
  const registerMutation = useRegisterMutation();
  const [selectedRole, setSelectedRole] = useState<'customer' | 'owner'>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const textClass = isDark ? 'text-slate-400' : 'text-slate-600';
  const selectedCountry = { code: 'ET', dial_code: '+251', name: 'Ethiopia' };

  const formatPhoneInput = (text: string) => {
    // Remove all non-digits
    const cleanedText = text.replace(/\D/g, '');

    // Limit to reasonable length for Ethiopian phone numbers
    if (cleanedText.length > 12) {
      return cleanedText.slice(0, 12);
    }

    return cleanedText;
  };

  const getFullPhoneNumber = (): string => {
    if (!phoneInput.trim()) return '';

    // Remove all non-digits from phone input
    const cleanedPhone = phoneInput.replace(/\D/g, '');
    if (!cleanedPhone) return '';

    // Combine with country code for E.164 format
    const fullNumber = selectedCountry.dial_code + cleanedPhone;
    return fullNumber;
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      role: 'customer',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const fullPhoneNumber = getFullPhoneNumber();

      // Validate phone number is not empty
      if (!fullPhoneNumber) {
        setPhoneError('Please enter a valid phone number');
        return;
      }

      // Call register mutation
      await registerMutation.mutateAsync({
        name: data.name,
        email: data.email,
        phone: fullPhoneNumber,
        password: data.password,
        role: data.role,
      });
      Alert.alert(
        'Registration Successful',
        'Please check your email for the OTP to verify your account.'
      );
      // If successful, redirect to verify-otp
      router.push({
        pathname: '/(global)/verify-otp',
        params: { email: data.email },
      });
    } catch (error: any) {
      Alert.alert('Registration Failed', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View className="mx-4 my-6 overflow-hidden rounded-xl bg-card shadow-xl">
          {/* Header Branding */}
          <View className="items-center justify-center bg-primary/10 py-8">
            <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-primary shadow-lg">
              <Text className="text-4xl">🍰</Text>
            </View>
            <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Create Account
            </Text>
            <Text className={`mt-1 text-sm ${textClass}`}>Join Adama Bakery today</Text>
          </View>

          {/* Role Selection */}
          <View className="my-6 gap-3 px-6">
            <Text
              className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Select Role
            </Text>
            <View className={`flex-row rounded-xl p-1 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
              {['customer', 'owner'].map((role) => (
                <Pressable
                  key={role}
                  onPress={() => {
                    const r = role as 'customer' | 'owner';
                    setSelectedRole(r);
                    setValue('role', r);
                  }}
                  style={{ cursor: 'pointer' }}
                  className={`flex-1 rounded-lg py-2.5 ${
                    selectedRole === role ? 'bg-primary' : ''
                  }`}>
                  <Text
                    className={`text-center text-sm font-bold capitalize ${
                      selectedRole === role ? 'text-white' : textClass
                    }`}>
                    {role}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Form Fields */}
          <View className="gap-5 px-6">
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label="Full Name"
                  placeholder="John Doe"
                  value={value}
                  onChangeText={onChange}
                  error={errors.name?.message}
                  icon={<User size={20} color="#ec5b13" />}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label="Email Address"
                  placeholder="john@example.com"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                  error={errors.email?.message}
                  icon={<Mail size={20} color="#ec5b13" />}
                />
              )}
            />

            <View className="gap-2">
              <Text
                className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Phone Number
              </Text>

              {/* Phone Input Section */}
              <View
                className={`h-14 flex-row items-center rounded-xl border px-4 ${
                  isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
                } ${phoneError ? (isDark ? 'border-red-600' : 'border-red-300') : ''}`}>
                <Text
                  className={`mr-2 text-lg font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {selectedCountry.dial_code}
                </Text>
                <TextInput
                  className={`flex-1 text-base font-normal ${isDark ? 'text-white' : 'text-slate-900'}`}
                  placeholder="9XX XXX XXX"
                  placeholderTextColor={isDark ? '#94a3b8' : '#cbd5e1'}
                  value={phoneInput}
                  onChangeText={(text) => {
                    const formatted = formatPhoneInput(text);
                    setPhoneInput(formatted);
                    // Update form field value for validation
                    setValue('phone', formatted);
                  }}
                  keyboardType="phone-pad"
                  maxLength={20}
                />
              </View>

              {phoneError && <Text className="text-xs text-red-500">{phoneError}</Text>}

              {phoneInput && !phoneError && (
                <Text className="text-xs text-green-500">Full number: {getFullPhoneNumber()}</Text>
              )}
            </View>

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
                    className={`h-14 flex-row items-center rounded-xl border px-4 ${
                      isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
                    }`}>
                    <Lock size={20} color="#ec5b13" />
                    <TextInput
                      className={`flex-1 text-base font-normal ${isDark ? 'text-white' : 'text-slate-900'}`}
                      placeholder="Enter your password"
                      placeholderTextColor={isDark ? '#94a3b8' : '#cbd5e1'}
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={!showPassword}
                    />
                    <Pressable
                      onPress={() => setShowPassword(!showPassword)}
                      className="p-2"
                      style={{ cursor: 'pointer' }}>
                      {showPassword ? (
                        <Eye size={20} color={isDark ? '#94a3b8' : '#cbd5e1'} />
                      ) : (
                        <EyeOff size={20} color={isDark ? '#94a3b8' : '#cbd5e1'} />
                      )}
                    </Pressable>
                  </View>
                  {errors.password && (
                    <Text className="text-xs text-red-500">{errors.password.message}</Text>
                  )}
                </View>
              )}
            />

            <PrimaryButton
              label={registerMutation.isPending ? 'Registering...' : 'Register Account'}
              onPress={handleSubmit(onSubmit)}
              loading={registerMutation.isPending}
            />
          </View>

          {/* Login Link */}
          <View className="mb-8 mt-6 items-center">
            <Text className={`text-sm ${textClass}`}>
              Already have an account?{' '}
              <Text
                className="font-bold text-primary"
                style={{ cursor: 'pointer' }}
                onPress={() => router.push('/(global)/login')}>
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
