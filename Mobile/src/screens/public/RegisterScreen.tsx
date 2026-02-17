import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  FadeInLeft,
  FadeInRight,
  LinearTransition,
} from 'react-native-reanimated';
import type { AuthStackParamList } from '../../types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../context/AuthProvider';
import { ROUTES } from '../../constants/routes';
import { useThemeStore } from '../../store/themeStore';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const STEP_1_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBiz80cvNvnGy0vpofYtfqrhh8UxNCF_s_mUCy0FNZrsxN9Y5y3t8xwHUIGHrS2mMNvzdJ74qm2UsVNX-arC7z5IkwqiepCI9J_h3NlPaQj2__k0dcgy6EpDusw54tGOn-o1c-1glv3dNrkZoJdtZmtnyD3m0QayCRlQyp8ey3rp2ZvLaDENTN0z-QL0a0GHqO8zvKpfqha8AwXN-CKyKe-QXgbCRJTyxQdsKWdG66hYoV5FbT0qQwMvxxo8eeVosyL3V21gS45RszS';

export const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { register, loading, error } = useAuth();
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';
  const toggleIconColor = isDark ? '#f5d67d' : '#374151';
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'customer' | 'owner' | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'back'>( 'forward');

  const goNext = () => {
    setDirection('forward');
    if (step < 3) setStep((s) => s + 1);
  };
  const goBack = () => {
    setDirection('back');
    if (step > 1) setStep((s) => s - 1);
    else navigation.goBack();
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) return;
    try {
      await register({ name, email, password, phone, role: role || 'customer' });
      navigation.navigate('OTPVerification', { email });
    } catch {
      // error from useAuth
    }
  };

  const progress = step / 3;
  const canProceedStep1 = role !== null;
  const canProceedStep2 = Boolean(name.trim() && email.trim() && phone.trim());
  const canProceedStep3 =
    Boolean(password.length >= 8 && password === confirmPassword);

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pb-2 pt-2">
          <Pressable onPress={goBack} className="h-10 w-10 items-center justify-center rounded-full">
            <MaterialCommunityIcons name="arrow-left" size={24} color="#1b180d" />
          </Pressable>
          <Text className="text-base font-bold tracking-tight text-text-main dark:text-gray-100">
            Step {step} of 3
          </Text>
          <Pressable className="h-10 w-10 items-center justify-center rounded-full" onPress={toggle}>
            <MaterialCommunityIcons name={toggleIconName} size={24} color={toggleIconColor} />
          </Pressable>
        </View>

        {/* Progress bar */}
        <View className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-light px-4 dark:bg-neutral-dark">
          <Animated.View
            layout={LinearTransition.springify()}
            className="h-full rounded-full bg-primary"
            style={{ width: `${progress * 100}%` }}
          />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 24,
            paddingBottom: 24, // Reduced because button is no longer absolute
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Step 1: Role selection */}
          {step === 1 && (
            <Animated.View
              key="step1"
              entering={direction === 'forward' ? FadeInRight.duration(280).springify() : FadeInLeft.duration(280).springify()}
              className="max-w-md flex-1"
            >
              <View className="mb-8 gap-2">
                <Text className="text-3xl font-extrabold leading-tight tracking-tight text-text-main dark:text-gray-100">
                  Welcome to Adama
                </Text>
                <Text className="text-base leading-relaxed text-text-main/60 dark:text-gray-400">
                  To give you the best experience, tell us how you'll use the app.
                </Text>
              </View>

              <View className="gap-5">
                <Pressable
                  onPress={() => setRole('customer')}
                  className="overflow-hidden rounded-3xl border-2 bg-surface-light p-5 dark:bg-surface-dark"
                  style={{
                    borderColor: role === 'customer' ? '#f97316' : 'transparent',
                    backgroundColor: role === 'customer'
                      ? 'rgba(236,182,19,0.08)'
                      : isDark
                      ? '#2d2616'
                      : '#ffffff',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.04,
                    shadowRadius: 8,
                    elevation: 2,
                  }}
                >
                  <View className="flex-row items-center">
                    <View className="mr-5 h-16 w-16 items-center justify-center rounded-full bg-primary-light dark:bg-neutral-dark">
                      <Image source={require('../../../assets/icon.png')} className="h-8 w-8 rounded-full" resizeMode="contain" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-text-main dark:text-gray-100">I am a Customer</Text>
                      <Text className="text-sm font-medium text-text-main/50 dark:text-gray-400">
                        Find & Order local pastries
                      </Text>
                    </View>
                    {role === 'customer' && (
                      <View className="absolute right-5 top-5 h-6 w-6 items-center justify-center rounded-full bg-primary">
                        <MaterialCommunityIcons name="check" size={16} color="#fff" />
                      </View>
                    )}
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => setRole('owner')}
                  className="overflow-hidden rounded-3xl border-2 bg-surface-light p-5 dark:bg-surface-dark"
                  style={{
                    borderColor: role === 'owner' ? '#f97316' : 'transparent',
                    backgroundColor: role === 'owner'
                      ? 'rgba(236,182,19,0.08)'
                      : isDark
                      ? '#2d2616'
                      : '#ffffff',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.04,
                    shadowRadius: 8,
                    elevation: 2,
                  }}
                >
                  <View className="flex-row items-center">
                    <View className="mr-5 h-16 w-16 items-center justify-center rounded-full bg-neutral-light dark:bg-neutral-dark">
                      <MaterialCommunityIcons name="storefront" size={32} color="#1b180d" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-text-main dark:text-gray-100">I am a Bakery Owner</Text>
                      <Text className="text-sm font-medium text-text-main/50 dark:text-gray-400">
                        Sell & Grow your business
                      </Text>
                    </View>
                    {role === 'owner' && (
                      <View className="absolute right-5 top-5 h-6 w-6 items-center justify-center rounded-full bg-primary">
                        <MaterialCommunityIcons name="check" size={16} color="#fff" />
                      </View>
                    )}
                  </View>
                </Pressable>
              </View>

              <View className="mt-8 h-32 w-full overflow-hidden rounded-2xl">
                <Image
                  source={{ uri: STEP_1_IMAGE }}
                  className="h-full w-full"
                  resizeMode="cover"
                />
                <View className="absolute bottom-3 left-4 rounded bg-white/80 px-2 py-1 dark:bg-neutral-dark/80">
                  <Text className="text-xs font-bold uppercase tracking-widest text-text-main dark:text-gray-100">
                    Community
                  </Text>
                </View>
              </View>
            </Animated.View>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <Animated.View
              key="step2"
              entering={direction === 'forward' ? FadeInRight.duration(280).springify() : FadeInLeft.duration(280).springify()}
              className="max-w-md flex-1"
            >
              <View className="mb-10 mt-2 gap-3">
                <Text className="text-3xl font-bold tracking-tight text-text-charcoal dark:text-gray-100">
                  Tell us about{'\n'}
                  <Text className="text-primary">yourself</Text>
                </Text>
                <Text className="max-w-xs text-base font-medium leading-relaxed text-text-muted dark:text-gray-400">
                  Please enter your details to create your secure account and start ordering.
                </Text>
              </View>

              <View className="gap-6">
                <View className="gap-2">
                  <Text className="ml-4 text-sm font-semibold text-text-charcoal dark:text-gray-300">
                    Full Name
                  </Text>
                  <View className="flex-row items-center rounded-2xl border border-input-border bg-surface-light px-4 dark:border-neutral-dark dark:bg-surface-dark">
                    <TextInput
                      value={name}
                      onChangeText={setName}
                      placeholder="e.g. Sarah Baker"
                      placeholderTextColor={isDark ? '#9aa0a6' : '#9ca3af'}
                      className="h-14 flex-1 text-text-charcoal dark:text-gray-100"
                    />
                    <MaterialCommunityIcons name="account-outline" size={22} color="#6b6356" />
                  </View>
                </View>
                <View className="gap-2">
                  <Text className="ml-4 text-sm font-semibold text-text-charcoal dark:text-gray-300">
                    Email Address
                  </Text>
                  <View className="flex-row items-center rounded-2xl border border-input-border bg-surface-light px-4 dark:border-neutral-dark dark:bg-surface-dark">
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      placeholder="name@example.com"
                      placeholderTextColor={isDark ? '#9aa0a6' : '#9ca3af'}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      className="h-14 flex-1 text-text-charcoal dark:text-gray-100"
                    />
                    <MaterialCommunityIcons name="email-outline" size={22} color="#6b6356" />
                  </View>
                </View>
                <View className="gap-2">
                  <Text className="ml-4 text-sm font-semibold text-text-charcoal dark:text-gray-300">
                    Phone Number
                  </Text>
                  <View className="flex-row items-center gap-3">
                    <View className="w-28 rounded-2xl border border-input-border bg-surface-light px-3 py-3 dark:border-neutral-dark dark:bg-surface-dark">
                      <Text className="text-sm font-medium text-text-charcoal dark:text-gray-100">🇪🇹 +251</Text>
                    </View>
                    <View className="flex-1 flex-row items-center rounded-2xl border border-input-border bg-surface-light px-4 dark:border-neutral-dark dark:bg-surface-dark">
                      <TextInput
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="911 234 567"
                        placeholderTextColor={isDark ? '#9aa0a6' : '#9ca3af'}
                        keyboardType="phone-pad"
                        className="h-14 flex-1 text-text-charcoal dark:text-gray-100"
                      />
                      <MaterialCommunityIcons name="phone-outline" size={22} color="#6b6356" />
                    </View>
                  </View>
                </View>
              </View>
            </Animated.View>
          )}

          {/* Step 3: Security */}
          {step === 3 && (
            <Animated.View
              key="step3"
              entering={direction === 'forward' ? FadeInRight.duration(280).springify() : FadeInLeft.duration(280).springify()}
              className="max-w-md flex-1"
            >
              <View className="mb-8 gap-2">
                <Text className="text-3xl font-bold leading-tight text-text-main dark:text-gray-100">
                  Secure Account
                </Text>
                <Text className="text-base text-text-muted dark:text-gray-400">
                  Create a strong password to protect your bakery order history.
                </Text>
              </View>

              <View className="gap-5">
                <View className="gap-2">
                  <Text className="ml-1 text-sm font-semibold text-text-main dark:text-gray-300">Password</Text>
                  <View className="flex-row items-center rounded-full border border-neutral-light bg-background-light px-4 dark:border-neutral-dark dark:bg-surface-dark">
                    <View className="absolute left-4">
                      <MaterialCommunityIcons name="lock-outline" size={20} color="#6b6248" />
                    </View>
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Enter your password"
                      placeholderTextColor={isDark ? '#9aa0a6' : '#9ca3af'}
                      secureTextEntry={Boolean(!showPassword)}
                      className="flex-1 py-4 pl-12 pr-12 text-text-main dark:text-gray-100"
                    />
                    <Pressable
                      onPress={() => setShowPassword((p) => !p)}
                      className="absolute right-4"
                      hitSlop={8}
                    >
                      <MaterialCommunityIcons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#6b6248"
                      />
                    </Pressable>
                  </View>
                  <View className="flex-row flex-wrap gap-x-4 gap-y-1 pl-2 pt-1">
                    <View className="flex-row items-center gap-1.5">
                      <MaterialCommunityIcons
                        name={password.length >= 8 ? 'check-circle' : 'checkbox-blank-circle-outline'}
                        size={16}
                        color={password.length >= 8 ? '#22c55e' : '#d1d5db'}
                      />
                      <Text className="text-xs text-text-muted dark:text-gray-400">8+ characters</Text>
                    </View>
                    <View className="flex-row items-center gap-1.5">
                      <MaterialCommunityIcons
                        name={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'check-circle' : 'checkbox-blank-circle-outline'}
                        size={16}
                        color={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? '#22c55e' : '#d1d5db'}
                      />
                      <Text className="text-xs text-text-muted dark:text-gray-400">1 Special char</Text>
                    </View>
                  </View>
                </View>
                <View className="gap-2">
                  <Text className="ml-1 text-sm font-semibold text-text-main dark:text-gray-300">
                    Confirm Password
                  </Text>
                  <View className="flex-row items-center rounded-full border border-neutral-light bg-background-light px-4 dark:border-neutral-dark dark:bg-surface-dark">
                    <View className="absolute left-4">
                      <MaterialCommunityIcons name="lock-reset" size={20} color="#6b6248" />
                    </View>
                    <TextInput
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      placeholder="Re-enter your password"
                      placeholderTextColor={isDark ? '#9aa0a6' : '#9ca3af'}
                      secureTextEntry={Boolean(!showConfirmPassword)}
                      className="flex-1 py-4 pl-12 pr-12 text-text-main dark:text-gray-100"
                    />
                    <Pressable
                      onPress={() => setShowConfirmPassword((p) => !p)}
                      className="absolute right-4"
                      hitSlop={8}
                    >
                      <MaterialCommunityIcons
                        name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#6b6248"
                      />
                    </Pressable>
                  </View>
                </View>
              </View>

              {error ? (
                <Text className="mt-4 text-center text-sm text-red-500">{error}</Text>
              ) : null}
            </Animated.View>
          )}
        </ScrollView>

        {/* Fixed bottom bar - REMOVED ABSOLUTE POSITIONING to prevent it from being "covered" */}
        <View
          className="border-t border-gray-200 bg-background-light px-6 pt-4 dark:border-neutral-dark dark:bg-background-dark"
          style={{
            paddingBottom: Math.max(insets.bottom, 16),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: 20, // Keep it visually on top
          }}
        >
          <View className="mx-auto w-full max-w-md gap-4">
            {step < 3 ? (
              <Pressable
                onPress={goNext}
                disabled={Boolean((step === 2 && !canProceedStep2) || (step === 1 && !canProceedStep1))}
                className="flex-row items-center justify-center gap-2 rounded-full bg-primary py-4"
                style={{
                  shadowColor: '#f97316',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.4,
                  shadowRadius: 14,
                  elevation: 6,
                  opacity: (step === 2 && !canProceedStep2) || (step === 1 && !canProceedStep1) ? 0.6 : 1,
                }}
              >
                <Text className="text-lg font-bold text-primary-content">
                  {step === 1 ? 'Continue' : 'Next Step'}
                </Text>
                <MaterialCommunityIcons name="arrow-right" size={22} color="#1b180d" />
              </Pressable>
            ) : (
              <Pressable
                onPress={handleSubmit}
                disabled={Boolean(loading || !canProceedStep3)}
                className="flex-row items-center justify-center gap-2 rounded-full bg-primary py-4"
                style={{
                  shadowColor: '#f97316',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 4,
                  opacity: !canProceedStep3 ? 0.6 : 1,
                }}
              >
                <Text className="text-lg font-bold text-primary-content">
                  {loading ? 'Creating...' : 'Create Account'}
                </Text>
                {!loading && (
                  <MaterialCommunityIcons name="arrow-right" size={22} color="#1b180d" />
                )}
              </Pressable>
            )}
            <Text className="mb-2 text-center text-sm font-medium text-text-main/60 dark:text-gray-400">
              {step < 3 ? (
                <>
                  Already have an account?{' '}
                  <Text
                    className="font-bold text-primary underline"
                    onPress={() => navigation.navigate('Login')}
                  >
                    Log in
                  </Text>
                </>
              ) : (
                <>
                  By creating an account, you agree to our{' '}
                  <Text className="underline">Terms of Service</Text> and{' '}
                  <Text className="underline">Privacy Policy</Text>.
                </>
              )}
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};