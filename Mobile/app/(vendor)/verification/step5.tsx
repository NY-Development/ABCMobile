import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  step5Schema,
  type Step5FormData,
  CompleteVerificationData,
} from '@/src/features/restaurants';
import { useVerificationStore } from '@/src/features/restaurants/restaurants.store';
import { useSubmitVerificationMutation } from '@/src/features/restaurants/restaurants.hooks';
import { ArrowLeft, CheckCircle } from 'lucide-react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { InAppAlert } from '@/src/components/InAppAlert';

export default function OwnerVerificationStep5Screen() {
  const router = useRouter();
  const { step1, step2, step3, step4, setStep5 } = useVerificationStore();
  const submitMutation = useSubmitVerificationMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [banner, setBanner] = useState<{
    visible: boolean;
    type: 'success' | 'error' | 'warning';
    title: string;
    message: string;
  }>({ visible: false, type: 'warning', title: '', message: '' });

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace('/(vendor)/verification/step4' as any);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step5FormData>({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: Step5FormData) => {
    if (!step1 || !step2 || !step3 || !step4) {
      setBanner({
        visible: true,
        type: 'warning',
        title: 'Incomplete steps',
        message: 'Please complete all previous steps',
      });
      return;
    }

    setIsLoading(true);
    setStep5(data);

    const completeData: CompleteVerificationData = {
      bakeryName: step1.bakeryName,
      businessEmail: step1.businessEmail,
      businessPhone: step1.businessPhone,
      formattedAddress: step2.formattedAddress,
      city: step2.city,
      country: step2.country,
      latitude: step2.latitude,
      longitude: step2.longitude,
      street: step2.street,
      building: step2.building,
      postalCode: step2.postalCode,
      companyImage: step3.companyImage,
      tradingLicense: step4.tradingLicense,
      termsAccepted: data.termsAccepted,
    };

    try {
      const res: any = await submitMutation.mutateAsync(completeData);
      setIsLoading(false);
      if (res.success) {
        const { clearVerification } = useVerificationStore.getState();
        clearVerification();

        // Invalidate queries here if needed, or rely on layout refetch
        setBanner({
          visible: true,
          type: 'success',
          title: 'Submitted',
          message: 'Application submitted successfully!',
        });
        router.push('/(vendor)/verification/success');
      }
    } catch (error: any) {
      setIsLoading(false);
      setBanner({
        visible: true,
        type: 'error',
        title: 'Submission failed',
        message: error.message || 'Failed to submit verification',
      });
    }
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-row items-center justify-between border-b border-border bg-background px-4 py-3">
          <Pressable
            onPress={handleBack}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <ArrowLeft size={20} color="#ec5b13" />
          </Pressable>
          <Text className="flex-1 text-center text-lg font-bold leading-tight text-foreground">
            Review & Submit
          </Text>
        </View>

        <View className="flex-col gap-3 px-4 py-4">
          <InAppAlert
            visible={banner.visible}
            type={banner.type}
            title={banner.title}
            message={banner.message}
            onClose={() => setBanner((s) => ({ ...s, visible: false }))}
          />
          <View className="flex-row items-end justify-between gap-6">
            <View>
              <Text className="text-base font-semibold leading-normal text-foreground">
                Step 5 of 5
              </Text>
              <Text className="text-sm font-normal leading-normal text-muted-foreground">
                Review & Submit
              </Text>
            </View>
            <Text className="text-lg font-bold leading-normal text-primary">100%</Text>
          </View>
          <View className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <View className="h-2.5 w-full rounded-full bg-primary" />
          </View>
        </View>

        <View className="px-4 py-6">
          <Text className="mb-2 text-2xl font-bold leading-tight tracking-tight text-foreground">
            Review Your Information
          </Text>
          <Text className="mb-6 text-base font-normal leading-normal text-muted-foreground">
            Please verify all information before submitting your application.
          </Text>

          {/* Business Info */}
          <View className="mb-4 rounded-xl border border-border bg-card p-4">
            <View className="mb-3 flex-row items-center gap-2">
              <Text className="text-xl">🏪</Text>
              <Text className="text-base font-bold text-foreground">Business Information</Text>
            </View>
            <View className="space-y-2">
              <View className="flex-row justify-between border-b border-border pb-2">
                <Text className="text-sm text-muted-foreground">Bakery Name</Text>
                <Text className="text-sm font-semibold text-foreground">{step1?.bakeryName}</Text>
              </View>
              <View className="flex-row justify-between border-b border-border pb-2">
                <Text className="text-sm text-muted-foreground">Email</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {step1?.businessEmail}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted-foreground">Phone</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {step1?.businessPhone}
                </Text>
              </View>
            </View>
          </View>

          {/* Location Info */}
          <View className="mb-4 rounded-xl border border-border bg-card p-4">
            <View className="mb-3 flex-row items-center gap-2">
              <Text className="text-xl">📍</Text>
              <Text className="text-base font-bold text-foreground">Location</Text>
            </View>
            <View className="space-y-2">
              <View className="flex-row justify-between border-b border-border pb-2">
                <Text className="text-sm text-muted-foreground">Address</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {step2?.city}, {step2?.country}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted-foreground">Full Address</Text>
                <Text className="text-xs font-semibold text-foreground">
                  {step2?.formattedAddress}
                </Text>
              </View>
            </View>
          </View>

          {/* Documents Info */}
          <View className="mb-4 rounded-xl border border-border bg-card p-4">
            <View className="mb-3 flex-row items-center gap-2">
              <Text className="text-xl">📄</Text>
              <Text className="text-base font-bold text-foreground">Documents</Text>
            </View>
            <View className="space-y-2">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted-foreground">Company Image</Text>
                <CheckCircle size={20} color="#10b981" />
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted-foreground">Trading License</Text>
                <CheckCircle size={20} color="#10b981" />
              </View>
            </View>
          </View>

          {/* Terms Section */}
          <View className="mb-6 rounded-xl border border-border bg-primary/5 p-4">
            <View className="flex-row items-start gap-3">
              <Controller
                control={control}
                name="termsAccepted"
                render={({ field: { value, onChange } }) => (
                  <Pressable
                    onPress={() => onChange(!value)}
                    className={`mt-1 h-5 w-5 rounded border-2 ${
                      value ? 'border-primary bg-primary' : 'border-border'
                    }`}>
                    {value && <CheckCircle size={20} color="#fff" />}
                  </Pressable>
                )}
              />
              <View className="flex-1">
                <Text className="text-sm font-medium text-foreground">I agree to the terms</Text>
                <Text className="mt-1 text-xs text-muted-foreground">
                  I confirm that all information provided is accurate and complete. I understand
                  that false information may result in rejection.
                </Text>
              </View>
            </View>
            {errors.termsAccepted && (
              <Text className="mt-2 text-xs text-red-500">{errors.termsAccepted.message}</Text>
            )}
          </View>

          <View className="h-6" />
        </View>
      </ScrollView>

      <View className="border-t border-border bg-background px-4 py-4">
        <View className="gap-3">
          <Pressable
            disabled={isLoading}
            onPress={handleSubmit(onSubmit)}
            className={`flex-row items-center justify-center gap-2 rounded-xl px-6 py-4 ${
              isLoading ? 'bg-primary/50' : 'bg-primary'
            }`}>
            <Text className="text-lg font-bold text-white">
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </Text>
          </Pressable>
          <Pressable
            disabled={isLoading}
            onPress={handleBack}
            className="rounded-xl border border-primary bg-transparent px-4 py-3">
            <Text className="text-center font-semibold text-primary">Back to Edit</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
