import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { router } from 'expo-router';
import {
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRegisterMutation, type RegisterFormData, registerSchema } from '@/src/features/auth';
import { useThemeStore } from '@/src/features/theme';
import { FormInput, PrimaryButton } from '@/src/components/FormComponents';
import { Mail, Lock, Phone, User, Eye, EyeOff, ChevronRight } from 'lucide-react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalBottomNav } from '@/src/components/GlobalBottomNav';

const icon = require('@/assets/images/icon.png');

export default function RegisterScreen() {
  const { isDark } = useThemeStore();
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'customer' | 'owner'>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const textClass = isDark ? 'text-slate-400' : 'text-slate-500';
  const selectedCountry = { code: 'ET', dial_code: '+251', name: 'Ethiopia' };

  const formatPhoneInput = (text: string) => {
    const cleanedText = text.replace(/\D/g, '');
    return cleanedText.length > 12 ? cleanedText.slice(0, 12) : cleanedText;
  };

  const getFullPhoneNumber = (): string => {
    const cleanedPhone = phoneInput.replace(/\D/g, '');
    return cleanedPhone ? selectedCountry.dial_code + cleanedPhone : '';
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', phone: '', password: '', role: 'customer' },
  });

  const { mutate: register, isPending: isRegistering } = useRegisterMutation();

  const onSubmit = async (data: RegisterFormData) => {
    const fullPhoneNumber = getFullPhoneNumber();
    if (!fullPhoneNumber) return setPhoneError('Please enter a valid phone number');
    setPhoneError('');

    register(
      { ...data, phone: fullPhoneNumber },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Check your email for the OTP.');
          router.push({ pathname: '/(global)/verify-otp', params: { email: data.email } });
        },
        onError: (error: any) => {
          Alert.alert('Error', error.response?.data?.message || 'Registration failed !!');
        },
      }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View className="mx-4 my-4 overflow-hidden rounded-3xl bg-card shadow-2xl shadow-black/20">
          {/* BEAUTIFIED HEADER: Full Image with Gradient Overlay */}
          <View className="relative h-64 w-full">
            <Image
              source={icon}
              className="absolute inset-0 h-full w-full"
              style={{ resizeMode: 'cover' }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              className="absolute inset-0 justify-end p-6">
              <View className="flex-row items-end justify-between">
                <View>
                  <Text className="text-3xl font-black tracking-tight text-white">
                    Create Account
                  </Text>
                  <Text className="text-sm font-medium text-white/70">
                    Your journey with Adama Bakery starts here
                  </Text>
                </View>
                <View className="h-12 w-12 items-center justify-center rounded-full border-2 border-white/20 bg-primary shadow-lg">
                  <User size={24} color="white" />
                </View>
              </View>
            </LinearGradient>
          </View>

          <View className="px-6 py-8">
            {/* ROLE SELECTION: Modern Toggle */}
            <View className="mb-8">
              <Text
                className={`mb-3 text-xs font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                Account Type
              </Text>
              <View
                className={`flex-row rounded-2xl p-1.5 ${isDark ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
                {['customer', 'owner'].map((role) => (
                  <Pressable
                    key={role}
                    onPress={() => {
                      const r = role as 'customer' | 'owner';
                      setSelectedRole(r);
                      setValue('role', r);
                    }}
                    className={`flex-1 flex-row items-center justify-center rounded-xl py-3 shadow-sm ${
                      selectedRole === role ? 'bg-primary' : 'bg-transparent'
                    }`}>
                    <Text
                      className={`text-sm font-bold capitalize ${selectedRole === role ? 'text-white' : textClass}`}>
                      {role}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* FORM FIELDS */}
            <View className="gap-6">
              <Controller
                control={control}
                name="name"
                render={({ field: { value, onChange } }) => (
                  <FormInput
                    label="Full Name"
                    placeholder="Enter your name"
                    value={value}
                    onChangeText={onChange}
                    error={errors.name?.message}
                    icon={<User size={18} color="#ec5b13" />}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange } }) => (
                  <FormInput
                    label="Email Address"
                    placeholder="name@example.com"
                    keyboardType="email-address"
                    value={value}
                    onChangeText={onChange}
                    error={errors.email?.message}
                    icon={<Mail size={18} color="#ec5b13" />}
                  />
                )}
              />

              {/* PHONE INPUT: Refined Border and Layout */}
              <View>
                <Text
                  className={`mb-2 text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Phone Number
                </Text>
                <View
                  className={`h-16 flex-row items-center rounded-2xl border-2 px-4 ${
                    isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
                  } ${phoneError ? 'border-destructive/50' : 'focus:border-primary'}`}>
                  <View className="mr-3 rounded-md bg-primary/10 px-2 py-1">
                    <Text className="text-base font-black text-primary">
                      {selectedCountry.dial_code}
                    </Text>
                  </View>
                  <TextInput
                    className={`flex-1 text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}
                    placeholder="9XX XXX XXX"
                    placeholderTextColor={isDark ? '#475569' : '#94a3b8'}
                    value={phoneInput}
                    onChangeText={(text) => {
                      const formatted = formatPhoneInput(text);
                      setPhoneInput(formatted);
                      if (formatted) setPhoneError('');
                      setValue('phone', formatted);
                    }}
                    keyboardType="phone-pad"
                  />
                </View>
                {phoneError && (
                  <Text className="mt-1 text-xs font-medium text-destructive">{phoneError}</Text>
                )}
              </View>

              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange } }) => (
                  <View>
                    <Text
                      className={`mb-2 text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Password
                    </Text>
                    <View
                      className={`h-16 flex-row items-center rounded-2xl border-2 px-4 ${
                        isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
                      }`}>
                      <Lock size={18} color="#ec5b13" />
                      <TextInput
                        className={`mx-3 flex-1 text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}
                        placeholder="••••••••"
                        placeholderTextColor={isDark ? '#475569' : '#94a3b8'}
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={!showPassword}
                      />
                      <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={10}>
                        {showPassword ? (
                          <Eye size={20} color="#64748b" />
                        ) : (
                          <EyeOff size={20} color="#64748b" />
                        )}
                      </Pressable>
                    </View>
                    {errors.password && (
                      <Text className="mt-1 text-xs font-medium text-destructive">
                        {errors.password.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <View className="mt-4">
                <PrimaryButton
                  label={isRegistering ? 'Processing...' : 'Create My Account'}
                  onPress={handleSubmit(onSubmit)}
                  loading={isRegistering}
                />
              </View>
            </View>

            {/* FOOTER: Enhanced Links */}
            <Pressable
              onPress={() => router.push('/(global)/login')}
              className="mt-10 flex-row items-center justify-center">
              <Text className={`text-sm font-medium ${textClass}`}>
                Already have an account?{' '}
                <Text className="font-black text-primary underline">Sign In</Text>
              </Text>
              <ChevronRight size={16} color="#ec5b13" className="ml-1" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
      {/* Bottom Navigation */}
      <GlobalBottomNav />
    </SafeAreaView>
  );
}
