import React, { useState, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { step3Schema, type Step3FormData } from '@/src/features/restaurants';
import { useVerificationStore } from '@/src/features/restaurants/restaurants.store';
import { ArrowLeft, Upload, Trash2, Image as ImageIcon } from 'lucide-react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { InAppAlert } from '@/src/components/InAppAlert';

export default function OwnerVerificationStep3Screen() {
  const router = useRouter();
  const { setStep3, step3 } = useVerificationStore();
  const [imagePreview, setImagePreview] = useState<string | null>(step3?.companyImage?.uri || null);
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
    router.replace('/(vendor)/verification/step2' as any);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: step3 || {
      companyImage: { uri: '', fileName: '', fileSize: 0 },
    },
  });

  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        setBanner({
          visible: true,
          type: 'warning',
          title: 'Permission required',
          message: 'Please allow photo library access to upload your company image.',
        });
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        // Use the new `MediaType` string values (lowercase) expected by Expo SDK 17+.
        // `MediaTypeOptions.Images` returns "Images" (capitalized) which crashes on Android.
        mediaTypes: ['images'] as ImagePicker.MediaType[],
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      const asset = !result.canceled ? result.assets?.[0] : undefined;
      if (asset?.uri) {
        setImagePreview(asset.uri);
        setValue('companyImage', {
          uri: asset.uri,
          fileName: asset.fileName || 'company-image.jpg',
          fileSize: asset.fileSize ?? 0,
        });
      }
    } catch (error) {
      setBanner({
        visible: true,
        type: 'error',
        title: 'Upload failed',
        message: 'Failed to pick image',
      });
      console.log('Error picking image', error);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue('companyImage', { uri: '', fileName: '', fileSize: 0 });
  };

  const handleNext = (data: Step3FormData) => {
    if (!data.companyImage.uri) {
      setBanner({
        visible: true,
        type: 'warning',
        title: 'Image required',
        message: 'Please upload a company image',
      });
      return;
    }
    setStep3(data);
    router.push('/(vendor)/verification/step4');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-row items-center justify-between border-b border-border bg-background px-4 py-3">
          <Pressable
            onPress={handleBack}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <ArrowLeft size={20} color="#ec5b13" />
          </Pressable>
          <Text className="flex-1 text-center text-lg font-bold leading-tight text-foreground">
            Business Branding
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
                Step 3 of 5
              </Text>
              <Text className="text-sm font-normal leading-normal text-muted-foreground">
                Company Image
              </Text>
            </View>
            <Text className="text-lg font-bold leading-normal text-primary">60%</Text>
          </View>
          <View className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <View className="h-2.5 w-3/5 rounded-full bg-primary" />
          </View>
        </View>

        <View className="px-4 py-6">
          <View className="flex-row items-center gap-3 pb-4">
            <ImageIcon size={24} color="#ec5b13" />
            <Text className="text-2xl font-bold leading-tight tracking-tight text-foreground">
              Business Branding
            </Text>
          </View>

          <Text className="mb-6 text-base font-normal leading-normal text-muted-foreground">
            Upload your company logo or storefront photo.
          </Text>

          <Pressable
            onPress={pickImage}
            className="mb-6 flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-8">
            <View className="mb-4 items-center justify-center rounded-full bg-primary/20 p-4">
              <Upload size={32} color="#ec5b13" />
            </View>
            <Text className="text-center font-semibold text-foreground">Upload an image</Text>
            <Text className="mt-1 text-center text-sm text-muted-foreground">
              PNG, JPG or WEBP up to 10MB
            </Text>
          </Pressable>

          {imagePreview && (
            <View className="rounded-xl bg-muted p-4">
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-sm font-medium text-foreground">Preview</Text>
                <Pressable onPress={removeImage} className="flex-row items-center gap-1">
                  <Trash2 size={16} color="#ec5b13" />
                  <Text className="text-sm font-semibold text-primary">Remove</Text>
                </Pressable>
              </View>
              <View className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted-foreground/20">
                <Image source={{ uri: imagePreview }} className="h-full w-full object-cover" />
              </View>
            </View>
          )}

          <View className="h-6" />
        </View>
      </ScrollView>

      <View className="border-t border-border bg-background px-4 py-4">
        <View className="gap-3">
          <Pressable
            onPress={handleSubmit(handleNext)}
            className="flex-row items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4">
            <Text className="text-lg font-bold text-white">Next Step</Text>
            <Text className="text-lg">→</Text>
          </Pressable>
          <Pressable
            onPress={handleBack}
            className="rounded-xl border border-primary bg-transparent px-4 py-3">
            <Text className="text-center font-semibold text-primary">Back</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
