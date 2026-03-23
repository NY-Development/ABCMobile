import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { step1Schema, type Step1FormData } from '@/src/features/restaurants';
import { useVerificationStore } from '@/src/features/restaurants/restaurants.store';
import { ArrowLeft, ArrowRight, Building2 } from 'lucide-react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { PrimaryButton } from '@/src/components/FormComponents';

export default function OwnerVerificationStep1Screen() {
  const router = useRouter();
  const { setStep1, step1 } = useVerificationStore();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    // If there's no history (reload / deep link), fall back safely.
    router.replace('/(vendor)/dashboard' as any);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: step1 || {
      bakeryName: '',
      businessEmail: '',
      businessPhone: '',
    },
  });

  // Populate form with existing data if available
  useEffect(() => {
    if (step1) {
      setValue('bakeryName', step1.bakeryName);
      setValue('businessEmail', step1.businessEmail);
      setValue('businessPhone', step1.businessPhone);
    }
  }, [step1, setValue]);

  const handleNext = (data: Step1FormData) => {
    setStep1(data);
    router.push('/(vendor)/verification/step2');
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Top Navigation */}
        <View className="flex-row items-center justify-between border-b border-border bg-background px-4 py-3">
          <Pressable
            onPress={handleBack}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <ArrowLeft size={20} color="#ec5b13" />
          </Pressable>
          <Text className="flex-1 text-center text-lg font-bold leading-tight text-foreground">
            Business Verification
          </Text>
        </View>

        {/* Progress Section */}
        <View className="flex-col gap-3 px-4 py-4">
          <View className="flex-row items-end justify-between gap-6">
            <View>
              <Text className="text-base font-bold leading-normal text-foreground">
                Verification Progress
              </Text>
              <Text className="text-sm font-normal leading-normal text-muted-foreground">
                Step 1 of 5
              </Text>
            </View>
            <Text className="text-lg font-bold leading-normal text-primary">20%</Text>
          </View>
          <View className="h-3 w-full overflow-hidden rounded-full bg-muted">
            <View className="h-full w-1/5 rounded-full bg-primary" />
          </View>
        </View>

        {/* Header Content */}
        <View className="px-4 pb-2 pt-6">
          <View className="flex-row items-center gap-2">
            <Building2 size={24} color="#ec5b13" />
            <Text className="text-3xl font-bold leading-tight tracking-tight text-foreground">
              Business Information
            </Text>
          </View>
          <Text className="mt-3 text-base font-normal leading-normal text-muted-foreground">
            Please provide the following details to verify your bakery business on the Adama
            platform.
          </Text>
        </View>

        {/* Form Section */}
        <View className="flex-col gap-6 px-4 py-6">
          {/* Bakery Name Input */}
          <View className="flex-col gap-2">
            <Text className="text-base font-semibold leading-normal text-foreground">
              Bakery Name
            </Text>
            <Controller
              control={control}
              name="bakeryName"
              render={({ field: { value, onChange } }) => (
                <View className="rounded-xl border border-border bg-card">
                  <TextInput
                    className="h-14 px-4 py-3 text-base text-foreground"
                    placeholder="e.g. Golden Crust Delights"
                    placeholderTextColor="#9ca3af"
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
            {errors.bakeryName && (
              <Text className="text-xs text-red-500">{errors.bakeryName.message}</Text>
            )}
          </View>

          {/* Business Email Input */}
          <View className="flex-col gap-2">
            <Text className="text-base font-semibold leading-normal text-foreground">
              Business Email
            </Text>
            <Controller
              control={control}
              name="businessEmail"
              render={({ field: { value, onChange } }) => (
                <View className="rounded-xl border border-border bg-card">
                  <TextInput
                    className="h-14 px-4 py-3 text-base text-foreground"
                    placeholder="contact@bakeryname.com"
                    placeholderTextColor="#9ca3af"
                    keyboardType="email-address"
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
            {errors.businessEmail && (
              <Text className="text-xs text-red-500">{errors.businessEmail.message}</Text>
            )}
          </View>

          {/* Business Phone Input */}
          <View className="flex-col gap-2">
            <Text className="text-base font-semibold leading-normal text-foreground">
              Business Phone
            </Text>
            <Controller
              control={control}
              name="businessPhone"
              render={({ field: { value, onChange } }) => (
                <View className="rounded-xl border border-border bg-card">
                  <TextInput
                    className="h-14 px-4 py-3 text-base text-foreground"
                    placeholder="+251 9 12 345 678"
                    placeholderTextColor="#9ca3af"
                    keyboardType="phone-pad"
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
            {errors.businessPhone && (
              <Text className="text-xs text-red-500">{errors.businessPhone.message}</Text>
            )}
          </View>
        </View>

        {/* Space for bottom button */}
        <View className="h-6" />
      </ScrollView>

      {/* Action Section */}
      <View className="border-t border-border bg-background px-4 py-4">
        <Pressable
          onPress={handleSubmit(handleNext)}
          className="flex-row items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4">
          <Text className="text-lg font-bold text-white">Next Step</Text>
          <ArrowRight size={18} color="#fff" />
        </Pressable>
        <Text className="mt-4 text-center text-xs text-muted-foreground">
          Your information is securely encrypted and only used for verification purposes.
        </Text>
      </View>
    </View>
  );
}
