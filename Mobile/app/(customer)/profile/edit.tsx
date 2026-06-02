import React, { useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Save, User as UserIcon, Phone, Mail } from 'lucide-react-native';
import { Icon as UiIcon } from '@/components/ui/icon';
import { useMeQuery, useUpdateProfileMutation } from '@/src/features/auth/auth.hooks';
import { useThemeStore } from '@/src/features/theme/theme.store';

const editProfileSchema = z.object({
  firstname: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(9, 'Phone number must be at least 9 characters'),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

export default function EditProfileScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const { data: profileResponse, isLoading: isProfileLoading } = useMeQuery();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfileMutation();

  const user = profileResponse;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstname: user?.firstname || user?.name || '',
      phone: user?.phone || '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstname: user.firstname || user.name || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const onSubmit = (data: EditProfileFormData) => {
    updateProfile(
      {
        name: data.firstname,
        phone: data.phone,
      },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Profile updated successfully!', [
            { text: 'OK', onPress: () => router.back() }
          ]);
        },
      }
    );
  };

  if (isProfileLoading) {
    return (
      <SafeAreaView className={`flex-1 items-center justify-center ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
        <ActivityIndicator size="large" color="#f97015" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center border-b border-border bg-card px-4 py-4">
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-xl bg-muted">
          <UiIcon as={ChevronLeft} size={20} className="text-primary" />
        </Pressable>
        <Text className="flex-1 text-center text-lg font-bold text-foreground">Edit Profile</Text>
        <View className="w-10" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
        <View className="gap-6">
          {/* First Name Field */}
          <View className="gap-2">
            <Text className="text-xs font-black text-muted-foreground uppercase tracking-widest px-1">Full Name</Text>
            <View className="flex-row items-center gap-3 bg-card px-4 h-14 rounded-2xl border border-border">
              <UiIcon as={UserIcon} size={18} className="text-muted-foreground" />
              <Controller
                control={control}
                name="firstname"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your name"
                    placeholderTextColor="#94a3b8"
                    className="flex-1 text-foreground font-bold"
                  />
                )}
              />
            </View>
            {errors.firstname && (
              <Text className="text-xs text-red-500 px-1 font-bold">{errors.firstname.message}</Text>
            )}
          </View>

          {/* Email Field (Disabled) */}
          <View className="gap-2 opacity-60">
            <Text className="text-xs font-black text-muted-foreground uppercase tracking-widest px-1">Email (Read Only)</Text>
            <View className="flex-row items-center gap-3 bg-muted px-4 h-14 rounded-2xl border border-border">
              <UiIcon as={Mail} size={18} className="text-muted-foreground" />
              <TextInput
                value={user?.email}
                editable={false}
                className="flex-1 text-muted-foreground font-bold"
              />
            </View>
          </View>

          {/* Phone Field */}
          <View className="gap-2">
            <Text className="text-xs font-black text-muted-foreground uppercase tracking-widest px-1">Phone Number</Text>
            <View className="flex-row items-center gap-3 bg-card px-4 h-14 rounded-2xl border border-border">
              <UiIcon as={Phone} size={18} className="text-muted-foreground" />
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter phone number"
                    placeholderTextColor="#94a3b8"
                    keyboardType="phone-pad"
                    className="flex-1 text-foreground font-bold"
                  />
                )}
              />
            </View>
            {errors.phone && (
              <Text className="text-xs text-red-500 px-1 font-bold">{errors.phone.message}</Text>
            )}
          </View>
        </View>

        <View className="mt-12">
          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={isUpdating}
            className={`h-16 flex-row items-center justify-center gap-3 rounded-2xl bg-primary shadow-lg shadow-primary/30 active:opacity-90 ${
              isUpdating ? 'opacity-70' : ''
            }`}>
            {isUpdating ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <UiIcon as={Save} size={20} className="text-white" />
                <Text className="text-sm font-black uppercase tracking-[2px] text-white">Save Changes</Text>
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
