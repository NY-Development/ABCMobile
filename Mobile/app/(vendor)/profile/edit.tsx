import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Phone, Mail, Image as ImageIcon, Save } from 'lucide-react-native';
import { useAuthStore } from '@/src/features/auth';
import { authAPI } from '@/src/features/auth/auth.api';
import { vendorAPI } from '@/src/services/vendor';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Icon } from '@/components/ui/icon';
import { InAppAlert } from '@/src/components/InAppAlert';
import * as ImagePicker from 'expo-image-picker';

export default function VendorEditProfileScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { data: profileData } = useQuery({
    queryKey: ['auth', 'profile', 'vendor'],
    queryFn: () => authAPI.getProfile(),
    staleTime: 1000 * 60,
  });
  const owner = (profileData as any)?.ownerInfo ?? (user as any)?.ownerInfo;
  const profileUser = (profileData as any) ?? user;

  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [pickedImage, setPickedImage] = useState<{ uri: string; name: string; type: string } | null>(null);
  const [banner, setBanner] = useState<{
    visible: boolean;
    type: 'success' | 'error' | 'warning';
    title: string;
    message: string;
  }>({ visible: false, type: 'warning', title: '', message: '' });

  useEffect(() => {
    setCompanyName(owner?.companyName || '');
    setLocation(owner?.location || '');
    setAddress(owner?.address || '');
    setPhone((profileUser as any)?.phone || '');
    setPreviewImage(owner?.companyImage || null);
  }, [owner, profileUser]);

  const ownerMutation = useMutation({
    mutationFn: () =>
      vendorAPI.updateOwnerAdditionalInfo({
        companyName,
        location,
        address,
        companyImage: pickedImage ?? undefined,
      }),
  });

  const handlePickImage = async () => {
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

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'] as ImagePicker.MediaType[],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });
      const asset = !result.canceled ? result.assets?.[0] : undefined;
      if (!asset?.uri) return;
      const name = asset.fileName || `company-${Date.now()}.jpg`;
      setPickedImage({
        uri: asset.uri,
        name,
        type: asset.mimeType || 'image/jpeg',
      });
      setPreviewImage(asset.uri);
    } catch {
      setBanner({
        visible: true,
        type: 'error',
        title: 'Upload failed',
        message: 'Failed to pick an image. Please try again.',
      });
    }
  };

  const handleSave = async () => {
    try {
      await ownerMutation.mutateAsync();
      if (phone && phone !== (profileUser as any)?.phone) {
        // Keep phone in sync with auth profile.
        try {
          await authAPI.updateProfile({ phone } as any);
        } catch {}
      }

      await queryClient.invalidateQueries({ queryKey: ['auth', 'profile'] });
      await queryClient.invalidateQueries({ queryKey: ['auth', 'profile', 'vendor'] });
      await queryClient.invalidateQueries({ queryKey: ['vendor', 'products', 'my'] });

      setBanner({
        visible: true,
        type: 'success',
        title: 'Saved',
        message: 'Your profile has been updated successfully.',
      });
    } catch (error: any) {
      setBanner({
        visible: true,
        type: 'error',
        title: 'Update failed',
        message: error?.response?.data?.message || 'Failed to update profile.',
      });
    }
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-row items-center border-b border-border px-4 py-3">
          <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full">
            <Icon as={ArrowLeft} size={20} className="text-primary" />
          </Pressable>
          <Text className="ml-3 text-lg font-bold text-foreground">Edit Profile</Text>
        </View>

        <View className="px-4 py-6">
          <InAppAlert
            visible={banner.visible}
            type={banner.type}
            title={banner.title}
            message={banner.message}
            onClose={() => setBanner((s) => ({ ...s, visible: false }))}
          />

          <View className="rounded-xl border border-border bg-card p-4">
            <Text className="mb-4 text-sm font-bold text-foreground">Business Information</Text>

            <Pressable
              onPress={handlePickImage}
              className="mb-4 items-center justify-center rounded-xl border border-border bg-muted p-4">
              {previewImage ? (
                <Image source={{ uri: previewImage }} className="h-24 w-24 rounded-full" />
              ) : (
                <View className="h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                  <Icon as={ImageIcon} size={24} className="text-primary" />
                </View>
              )}
              <Text className="mt-2 text-sm font-semibold text-primary">Change Company Image</Text>
            </Pressable>

            <Text className="mb-1 text-xs text-muted-foreground">Company Name</Text>
            <TextInput
              value={companyName}
              onChangeText={setCompanyName}
              className="mb-3 rounded-xl border border-border bg-background px-3 py-2 text-foreground"
              placeholder="Bakery name"
              placeholderTextColor="#8a8a8a"
            />

            <View className="flex-row items-center gap-3 mb-3">
              <Icon as={Phone} size={18} className="text-muted-foreground" />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">Phone</Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  className="mt-1 rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground"
                  placeholder="Phone"
                  placeholderTextColor="#8a8a8a"
                />
              </View>
            </View>

            <View className="flex-row items-center gap-3 mb-3">
              <Icon as={Mail} size={18} className="text-muted-foreground" />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">Email</Text>
                <Text className="mt-1 text-sm font-semibold text-foreground">{(profileUser as any)?.email || 'N/A'}</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3">
              <Icon as={MapPin} size={18} className="text-muted-foreground" />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">Location</Text>
                <TextInput
                  value={location}
                  onChangeText={setLocation}
                  className="mt-1 rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground"
                  placeholder="Location"
                  placeholderTextColor="#8a8a8a"
                />
              </View>
            </View>

            <View className="mt-3">
              <Text className="text-xs text-muted-foreground">Address</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                className="mt-1 rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground"
                placeholder="Business address"
                placeholderTextColor="#8a8a8a"
                multiline
              />
            </View>

            <Pressable
              onPress={handleSave}
              disabled={ownerMutation.isPending}
              className="mt-4 flex-row items-center justify-center rounded-xl bg-primary py-3">
              <Icon as={Save} size={16} className="text-primary-foreground" />
              <Text className="ml-2 font-bold text-primary-foreground">
                {ownerMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Text>
            </Pressable>

            <View className="mt-4 rounded-lg bg-muted p-3">
              <Text className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Verification</Text>
              <Text className="mt-1 text-sm font-semibold text-foreground">
                {owner?.companyVerified ? 'Verified' : 'Pending'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
