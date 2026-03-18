import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';

export default function OwnerVerificationStep1Screen() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    bakeryName: '',
    businessEmail: '',
    businessPhone: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    router.push('/(vendor)/verification/step2');
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Top Navigation */}
        <View className="flex-row items-center justify-between border-b border-border bg-background px-4 py-3">
          <Pressable
            onPress={() => router.back()}
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
          <Text className="text-3xl font-bold leading-tight tracking-tight text-foreground">
            Basic Business Information
          </Text>
          <Text className="mt-2 text-base font-normal leading-normal text-muted-foreground">
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
            <TextInput
              className="h-14 w-full rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground"
              placeholder="e.g. Golden Crust Delights"
              placeholderTextColor="#9ca3af"
              value={formData.bakeryName}
              onChangeText={(text) => handleInputChange('bakeryName', text)}
            />
          </View>

          {/* Business Email Input */}
          <View className="flex-col gap-2">
            <Text className="text-base font-semibold leading-normal text-foreground">
              Business Email
            </Text>
            <TextInput
              className="h-14 w-full rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground"
              placeholder="contact@bakeryname.com"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              value={formData.businessEmail}
              onChangeText={(text) => handleInputChange('businessEmail', text)}
            />
          </View>

          {/* Business Phone Input */}
          <View className="flex-col gap-2">
            <Text className="text-base font-semibold leading-normal text-foreground">
              Business Phone
            </Text>
            <TextInput
              className="h-14 w-full rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground"
              placeholder="+1 (555) 000-0000"
              placeholderTextColor="#9ca3af"
              keyboardType="phone-pad"
              value={formData.businessPhone}
              onChangeText={(text) => handleInputChange('businessPhone', text)}
            />
          </View>
        </View>

        {/* Space for bottom button */}
        <View className="h-6" />
      </ScrollView>

      {/* Action Section */}
      <View className="border-t border-border bg-background px-4 py-4">
        <Pressable
          onPress={handleNext}
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
