import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { Text, View, ScrollView, Pressable, Alert, TextInput, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoginMutation, loginSchema, type LoginFormData } from '@/src/features/auth';
import { useThemeStore } from '@/src/features/theme';
import { PrimaryButton } from '@/src/components/FormComponents';
import { Mail, Lock, Eye, EyeOff, ChevronRight } from 'lucide-react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { GlobalBottomNav } from '@/src/components/GlobalBottomNav';

const icon = require('@/assets/images/icon.png');

export default function LoginScreen() {
  const { isDark } = useThemeStore();
  const loginMutation = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  
  const textClass = isDark ? 'text-slate-400' : 'text-slate-500';

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
      const ownerInfo = loggedInUser?.ownerInfo as any;

      if (!loggedInUser || !loggedInUser.role) {
        Alert.alert('Login Failed', 'Invalid user credentials - missing role in response');
        return;
      }

      if (loggedInUser.role === 'customer') {
        const homeOrderLink = await AsyncStorage.getItem('homeOrderLink');
        if (homeOrderLink) {
          Alert.alert('Welcome', `Welcome back, ${loggedInUser.name || 'User'}!`);
          router.replace(homeOrderLink as any);
          await AsyncStorage.removeItem('homeOrderLink');
          return;
        }
      }

      // Resume last route if the user got redirected here due to missing/expired token.
      const lastRoute = await AsyncStorage.getItem('lastRoute');
      if (lastRoute) {
        const role = loggedInUser.role;
        const firstLogin = loggedInUser.firstLogin === true;
        const companyVerified = ownerInfo?.companyVerified === true;

        const isAllowed =
          // Never resume into public auth screens.
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
          router.replace(lastRoute as any);
          return;
        }
      }

      let destination: string;
      if (loggedInUser.role === 'owner') {
        if (loggedInUser.firstLogin === true) {
          destination = '/(vendor)/verification/step1';
        } else if (ownerInfo.companyVerified === false) {
          destination = '/(vendor)/verification/success';
        } else {
          destination = '/(vendor)/dashboard';
        }
      } else if (loggedInUser.role === 'admin') {
        destination = '/(admin)/dashboard';
      } else {
        destination = '/(customer)/home';
      }

      Alert.alert('Welcome', `Welcome back, ${loggedInUser.name || 'User'}!`);
      router.replace(destination as any);
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'An error occurred during login';
      Alert.alert('Login Failed', errorMsg);
    }
  };

  const googleLogoUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4MpKmLarlk_36i96K370pO3fBwbr1rYBgptWzTopijCPZT-xYeVgyuAbeoNjZzmELRnxC8lQi9hApPdHkKpV4rDjrj5znSEAB1U7FFnpbIcLRr_LCWUCHlpX6EyOasuKIsWFkR2kJNCwmEbqXqwooSzPhrV92TGr7efgee4bp1OgV2ns7Orn6WSq6XI4aRvylHVXHGuXJZA5RFasiiTxF1cDMkw6w9aymTHFS-zuUimK40NJ-piDVUPs0meo9h5rfV_7MxZ5BgxY';
  const facebookLogoUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9cPRCATBh1hNmyXiBXAHUL1oJidkqM8a1IANdr-sI0yIZ4dLczrDTfQVW8JBIkCmoGam24sViMh8K5RosnRht4j_-WeEXKAIoeEsndQrG5gTdULi72TE-QJn5I0EBZQwLCHrxj1JVEWnfaJHm87WEgBwHOLjjEw7KixEqemXOj-l280Ef2sAUb5_eA2dltfgbJ5eGxaQr2WZ9lSq3M6Qx3cHd4GOp_lTpkSD5JD_Vi-4Wu4H9xpKT5rEVYPTtrCfBrJ7_kx89EM';

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background" edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View className="mx-4 my-6 overflow-hidden rounded-3xl bg-card shadow-2xl shadow-black/10">
          
          {/* BEAUTIFIED HEADER: Full Image Fill */}
          <View className="h-60 w-full relative bg-primary/10">
            <Image 
              source={icon} 
              className="absolute inset-0 w-full h-full" 
              style={{ resizeMode: 'cover' }} 
            />
            {/* Solid Overlay for Text Contrast (No Gradient) */}
            <View className="absolute inset-0 bg-black/40 justify-end p-8">
              <Text className="text-3xl font-black text-white tracking-tight">
                Welcome Back
              </Text>
              <Text className="text-sm font-medium text-white/80 mt-1">
                Adama Bakery & Cake
              </Text>
            </View>
          </View>

          <View className="px-8 py-10 bg-background dark:bg-background">
            <View className="mb-8">
              <Text className={`text-base text-primary-foreground dark:text-primary-foreground font-medium ${textClass}`}>
                Please login to your account to continue
              </Text>
            </View>

            {/* FORM FIELDS */}
            <View className="gap-6">
              {/* Email Field */}
              <View>
                <Text className={`mb-2 ml-1 text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Email Address
                </Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { value, onChange } }) => (
                    <View className={`h-16 flex-row items-center rounded-2xl border-2 px-4 ${
                      isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
                    }`}>
                      <Mail size={18} color="#ec5b13" />
                      <TextInput
                        className={`mx-3 flex-1 text-base font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}
                        placeholder="name@example.com"
                        placeholderTextColor={isDark ? '#475569' : '#94a3b8'}
                        value={value}
                        onChangeText={onChange}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>
                  )}
                />
                {errors.email && <Text className="mt-1 ml-1 text-xs text-destructive font-medium">{errors.email.message}</Text>}
              </View>

              {/* Password Field */}
              <View>
                <View className="flex-row items-center justify-between mb-2 px-1">
                  <Text className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Password
                  </Text>
                  <Pressable onPress={() => router.push('/(global)/forgot-password')}>
                    <Text className="text-xs font-bold text-primary">Forgot Password?</Text>
                  </Pressable>
                </View>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { value, onChange } }) => (
                    <View className={`h-16 flex-row items-center rounded-2xl border-2 px-4 ${
                      isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
                    }`}>
                      <Lock size={18} color="#ec5b13" />
                      <TextInput
                        className={`mx-3 flex-1 text-base font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}
                        placeholder="••••••••"
                        placeholderTextColor={isDark ? '#475569' : '#94a3b8'}
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={!showPassword}
                      />
                      <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={10}>
                        {showPassword ? <Eye size={20} color="#64748b" /> : <EyeOff size={20} color="#64748b" />}
                      </Pressable>
                    </View>
                  )}
                />
                {errors.password && <Text className="mt-1 ml-1 text-xs text-destructive font-medium">{errors.password.message}</Text>}
              </View>

              <View className="mt-2">
                <PrimaryButton
                  label="Login"
                  onPress={handleSubmit(onSubmit)}
                  loading={loginMutation.isPending}
                />
              </View>
            </View>

            {/* Social Divider */}
            <View className="my-10 flex-row items-center gap-4">
              <View className={`h-px flex-1 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
              <Text className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                or continue with
              </Text>
              <View className={`h-px flex-1 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
            </View>

            {/* Social Buttons */}
            <View className="flex-row gap-4">
              <Pressable className={`flex-1 flex-row items-center justify-center gap-3 rounded-2xl border-2 py-4 ${
                isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
              }`}>
                <Image source={{ uri: googleLogoUrl }} className="w-5 h-5" />
                <Text className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Google</Text>
              </Pressable>
              
              <Pressable className={`flex-1 flex-row items-center justify-center gap-3 rounded-2xl border-2 py-4 ${
                isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
              }`}>
                <Image source={{ uri: facebookLogoUrl }} className="w-5 h-5" />
                <Text className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Facebook</Text>
              </Pressable>
            </View>

            {/* Register Link */}
            <Pressable 
              onPress={() => router.push('/(global)/register')}
              className="mt-12 flex-row justify-center items-center"
            >
              <Text className={`text-sm font-medium ${textClass}`}>
                Don't have an account?{' '}
                <Text className="font-black text-primary underline">Register now</Text>
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