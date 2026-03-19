import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Button, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/src/features/auth';
import { useVerificationStore } from '@/src/features/restaurants/restaurants.store';
import { ArrowLeft, LogOut } from 'lucide-react-native';

export default function OwnerVerificationSuccessScreen() {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();
  const { clearVerification } = useVerificationStore();

  useEffect(() => {
    // If user is not an owner or verification is not pending, redirect
    if (!user || user.role !== 'owner') {
      router.replace('/(global)/login');
    }
  }, [user, router]);

  const handleLogout = async () => {
    await clearAuth();
    clearVerification();
    router.replace('/(global)/login');
  };

  const handleViewStatus = () => {
    router.push('/(vendor)/dashboard');
  };

  if (!user) return null;

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Top App Bar */}
        <View className="flex-row items-center justify-between border-b border-border bg-background px-4 py-3">
          <Pressable
            onPress={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <ArrowLeft size={20} color="#ec5b13" />
          </Pressable>
          <Text className="flex-1 text-center text-lg font-bold leading-tight text-foreground">
            Verification
          </Text>
        </View>

        {/* Main Content */}
        <View className="flex-1 items-center px-6 pb-8 pt-10 text-center">
          {/* Success Graphic */}
          <View className="relative mb-8">
            <View className="flex h-32 w-32 items-center justify-center rounded-full bg-primary/10">
              <View className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/20">
                <View className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg">
                  <Text className="text-4xl font-bold text-white">✓</Text>
                </View>
              </View>
            </View>
            <View className="absolute -right-2 -top-2 text-primary opacity-50">
              <Text className="text-3xl">🍰</Text>
            </View>
            <View className="absolute -bottom-2 -left-2 text-primary opacity-50">
              <Text className="text-3xl">🎂</Text>
            </View>
          </View>

          {/* Headers */}
          <Text className="pb-3 text-3xl font-bold leading-tight tracking-tight text-foreground">
            Verification Application Submitted!
          </Text>
          <Text className="pb-8 text-base font-normal leading-relaxed text-muted-foreground">
            Thank you for applying to join Adama Bakery & Cake. Our team will review your business
            information and documents within{' '}
            <Text className="font-bold text-primary">24-48 hours</Text>.
          </Text>

          {/* Status Card */}
          <View className="w-full">
            <View className="flex-row items-stretch justify-between gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
              <View className="flex-1 flex-col gap-2">
                <View className="flex-row items-center gap-2">
                  <View className="h-2 w-2 rounded-full bg-amber-500" />
                  <Text className="text-xs font-bold uppercase tracking-wider text-amber-600">
                    Status: Pending Review
                  </Text>
                </View>
                <Text className="text-lg font-bold leading-tight text-foreground">
                  Bakery Profile Verification
                </Text>
                <Text className="text-sm font-normal leading-normal text-muted-foreground">
                  Step 5 of 5 Complete
                </Text>
              </View>
              <View className="h-full w-24 shrink-0 rounded-xl bg-primary/10" />
            </View>
          </View>

          {/* Progress Indicator */}
          <View className="mt-4 h-1.5 w-full flex-row gap-1 px-1">
            <View className="flex-1 rounded-full bg-primary" />
            <View className="flex-1 rounded-full bg-primary" />
            <View className="flex-1 rounded-full bg-primary" />
            <View className="flex-1 rounded-full bg-primary" />
            <View className="flex-1 rounded-full bg-primary" />
          </View>

          {/* Information Section */}
          <View className="mt-8 w-full rounded-xl border border-border bg-muted p-4">
            <Text className="mb-3 font-semibold text-foreground">What happens next?</Text>
            <View className="space-y-2">
              <View className="flex-row gap-3">
                <Text className="text-lg font-bold text-primary">1.</Text>
                <Text className="flex-1 text-sm text-muted-foreground">
                  Our team reviews your application
                </Text>
              </View>
              <View className="flex-row gap-3">
                <Text className="text-lg font-bold text-primary">2.</Text>
                <Text className="flex-1 text-sm text-muted-foreground">
                  We verify your business documents
                </Text>
              </View>
              <View className="flex-row gap-3">
                <Text className="text-lg font-bold text-primary">3.</Text>
                <Text className="flex-1 text-sm text-muted-foreground">
                  You'll receive notification once approved
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View className="gap-4 bg-background p-6">
        <Pressable
          onPress={handleViewStatus}
          className="w-full flex-row items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 shadow-lg">
          <Text className="text-lg font-bold text-white">Go to Dashboard</Text>
          <Text className="text-lg">→</Text>
        </Pressable>
        <Pressable
          onPress={handleLogout}
          className="w-full rounded-xl border-2 border-primary bg-transparent px-6 py-3">
          <Text className="text-center font-semibold text-primary">Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}
