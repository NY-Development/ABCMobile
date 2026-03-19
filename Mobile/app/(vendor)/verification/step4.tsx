import React, { useState, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, ScrollView, Pressable, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import { step4Schema, type Step4FormData } from '@/src/features/restaurants';
import { useVerificationStore } from '@/src/features/restaurants/restaurants.store';
import { ArrowLeft, FileText, Trash2 } from 'lucide-react-native';
import { zodResolver } from '@hookform/resolvers/zod';

export default function OwnerVerificationStep4Screen() {
  const router = useRouter();
  const { setStep4, step4 } = useVerificationStore();
  const [fileSelected, setFileSelected] = useState<boolean>(!!step4?.tradingLicense?.uri);
  const [isPDF, setIsPDF] = useState(step4?.isPDF || false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Step4FormData>({
    resolver: zodResolver(step4Schema),
    defaultValues: step4 || {
      tradingLicense: { uri: '', fileName: '', fileSize: 0 },
      isPDF: false,
    },
  });

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const isPdfFile = asset.mimeType === 'application/pdf';

        setFileSelected(true);
        setIsPDF(isPdfFile);
        setValue('tradingLicense', {
          uri: asset.uri,
          fileName: asset.name,
          fileSize: asset.size,
        });
        setValue('isPDF', isPdfFile);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const removeFile = () => {
    setFileSelected(false);
    setIsPDF(false);
    setValue('tradingLicense', { uri: '', fileName: '', fileSize: 0 });
    setValue('isPDF', false);
  };

  const handleNext = (data: Step4FormData) => {
    if (!data.tradingLicense.uri) {
      Alert.alert('Error', 'Please upload trading license');
      return;
    }
    setStep4(data);
    router.push('/(vendor)/verification/step5');
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-row items-center justify-between border-b border-border bg-background px-4 py-3">
          <Pressable
            onPress={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <ArrowLeft size={20} color="#ec5b13" />
          </Pressable>
          <Text className="flex-1 text-center text-lg font-bold leading-tight text-foreground">
            Trading License
          </Text>
        </View>

        <View className="flex-col gap-3 px-4 py-4">
          <View className="flex-row items-end justify-between gap-6">
            <View>
              <Text className="text-base font-semibold leading-normal text-foreground">
                Step 4 of 5
              </Text>
              <Text className="text-sm font-normal leading-normal text-muted-foreground">
                Official Documentation
              </Text>
            </View>
            <Text className="text-lg font-bold leading-normal text-primary">80%</Text>
          </View>
          <View className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <View className="h-2.5 w-4/5 rounded-full bg-primary" />
          </View>
        </View>

        <View className="px-4 py-6">
          <View className="flex-row items-center gap-3 pb-4">
            <FileText size={24} color="#ec5b13" />
            <Text className="text-2xl font-bold leading-tight tracking-tight text-foreground">
              Trading License
            </Text>
          </View>

          <Text className="mb-6 text-base font-normal leading-normal text-muted-foreground">
            Upload your official trading license to verify your business status.
          </Text>

          <Pressable
            onPress={pickDocument}
            className="mb-6 flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-8">
            <View className="mb-4 items-center justify-center rounded-full bg-primary/20 p-4">
              <FileText size={32} color="#ec5b13" />
            </View>
            <Text className="text-center font-semibold text-foreground">Upload document</Text>
            <Text className="mt-1 text-center text-sm text-muted-foreground">
              PDF or Image file up to 25MB
            </Text>
          </Pressable>

          {fileSelected && (
            <View className="rounded-xl bg-muted p-4">
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-sm font-medium text-foreground">Document</Text>
                <Pressable onPress={removeFile} className="flex-row items-center gap-1">
                  <Trash2 size={16} color="#ec5b13" />
                  <Text className="text-sm font-semibold text-primary">Remove</Text>
                </Pressable>
              </View>

              <View className="flex-row items-center gap-2 rounded-lg bg-primary/10 p-3">
                <FileText size={24} color="#ec5b13" />
                <View className="flex-1">
                  <Text className="text-sm font-medium text-foreground">Trading License</Text>
                  <Text className="text-xs text-muted-foreground">{isPDF ? 'PDF' : 'Image'}</Text>
                </View>
              </View>

              <View className="mt-4 rounded-lg border border-border bg-card p-3">
                <View className="flex-row justify-between">
                  <Text className="text-xs font-semibold text-muted-foreground">Format</Text>
                  <Text className="text-sm font-medium text-foreground">
                    {isPDF ? 'PDF Document' : 'Image File'}
                  </Text>
                </View>
              </View>
            </View>
          )}

          <View className="mt-6 rounded-lg border-l-4 border-primary bg-primary/5 p-4">
            <Text className="mb-2 text-sm font-bold uppercase tracking-wider text-foreground">
              Note
            </Text>
            <Text className="text-sm text-muted-foreground">
              Your trading license must be valid and clearly visible. All information must be
              legible.
            </Text>
          </View>

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
            onPress={() => router.back()}
            className="rounded-xl border border-primary bg-transparent px-4 py-3">
            <Text className="text-center font-semibold text-primary">Back</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
