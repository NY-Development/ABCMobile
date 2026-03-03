import React, { useEffect } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useThemeStore } from '../../store/themeStore';
import { useOwnerStore } from '../../store/ownerStore';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthProvider';
import { useAppAlert } from '../../providers/AppRuntimeProvider';
import type { OwnerStackParamList } from '../../types/navigation';

type OwnerNavigation = NativeStackNavigationProp<OwnerStackParamList>;

type AutoLocationData =
  | {
      latitude: number;
      longitude: number;
      city: string;
      country: string;
      formattedAddress: string;
      googleLink: string;
    }
  | {
      error: string;
      blocked?: boolean;
    }
  | null;

const additionalInfoSchema = z.object({
  companyName: z.string().trim().min(2, 'Company name is required'),
  branches: z
    .string()
    .trim()
    .min(1, 'Branches is required')
    .refine((value) => Number.isFinite(Number(value)) && Number(value) > 0, {
      message: 'Branches must be greater than 0',
    }),
  accountNumber: z.string().trim().min(4, 'Account number is required'),
  location: z.string().trim().min(2, 'Location is required'),
  address: z.string().trim().min(2, 'Address is required'),
  mapLink: z.string().trim().url('Please enter a valid map link'),
  companyImageUri: z.string().optional(),
  companyImageName: z.string().optional(),
  companyImageMimeType: z.string().optional(),
  tradingLicenseUri: z.string().optional(),
  tradingLicenseName: z.string().optional(),
  tradingLicenseMimeType: z.string().optional(),
  tradingLicenseIsPdf: z.boolean(),
  loadingLocation: z.boolean(),
  useAutoLocation: z.boolean(),
  locationData: z.custom<AutoLocationData>().nullable(),
});

type AdditionalInfoFormValues = z.infer<typeof additionalInfoSchema>;

export const AdditionalInfoScreen = () => {
  const navigation = useNavigation<OwnerNavigation>();
  const { fetchProfile } = useAuth();
  const { showAlert } = useAppAlert();
  const { mode } = useThemeStore();
  const { loading: submitting, submitAdditionalInfo } = useOwnerStore();
  const isDark = mode === 'dark';

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AdditionalInfoFormValues>({
    resolver: zodResolver(additionalInfoSchema),
    defaultValues: {
      companyName: '',
      branches: '',
      accountNumber: '',
      location: '',
      address: '',
      mapLink: '',
      companyImageUri: undefined,
      companyImageName: undefined,
      companyImageMimeType: undefined,
      tradingLicenseUri: undefined,
      tradingLicenseName: undefined,
      tradingLicenseMimeType: undefined,
      tradingLicenseIsPdf: false,
      loadingLocation: false,
      useAutoLocation: false,
      locationData: null,
    },
    mode: 'onChange',
  });

  const companyImageUri = watch('companyImageUri');
  const tradingLicenseUri = watch('tradingLicenseUri');
  const tradingLicenseName = watch('tradingLicenseName');
  const tradingLicenseIsPdf = watch('tradingLicenseIsPdf');
  const loadingLocation = watch('loadingLocation');
  const useAutoLocation = watch('useAutoLocation');
  const locationData = watch('locationData');

  const fetchDeviceLocation = async () => {
    setValue('loadingLocation', true);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== 'granted') {
        setValue('locationData', {
          error: 'Location permission denied. Please fill location fields manually.',
        });
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const reverse = await Location.reverseGeocodeAsync({ latitude, longitude });
      const place = reverse?.[0];
      const city = place?.city || place?.subregion || place?.region || 'Unknown City';
      const country = place?.country || 'Unknown Country';
      const formattedAddress = [place?.name, place?.street, city, place?.region, country]
        .filter(Boolean)
        .join(', ');
      const googleLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

      if (country.toLowerCase() !== 'ethiopia') {
        setValue('useAutoLocation', false);
        setValue('locationData', {
          error:
            'Detected country is not Ethiopia. Please turn off VPN/proxy and retry automatic location detection.',
          blocked: true,
        });
        return;
      }

      setValue('locationData', {
        latitude,
        longitude,
        city,
        country,
        formattedAddress,
        googleLink,
      });
    } catch {
      setValue('locationData', {
        error: 'Failed to fetch device location. Please fill fields manually.',
      });
    } finally {
      setValue('loadingLocation', false);
    }
  };

  useEffect(() => {
    fetchDeviceLocation();
  }, []);

  const applyAutoLocation = () => {
    if (!locationData || 'error' in locationData) return;
    setValue('useAutoLocation', true, { shouldValidate: true });
    setValue('mapLink', locationData.googleLink, { shouldValidate: true });
    setValue('location', locationData.country, { shouldValidate: true });
    setValue('address', locationData.city, { shouldValidate: true });
  };

  const enableManualLocationEdit = () => {
    setValue('useAutoLocation', false, { shouldValidate: true });
  };

  const pickCompanyImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      showAlert({
        title: 'Permission required',
        message: 'Please allow gallery access to upload images.',
        variant: 'warning',
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selected = result.assets[0];
      setValue('companyImageUri', selected.uri);
      setValue('companyImageName', selected.fileName || `company-${Date.now()}.jpg`);
      setValue('companyImageMimeType', selected.mimeType || 'image/jpeg');
    }
  };

  const pickTradingLicense = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*'],
      multiple: false,
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const selected = result.assets?.[0];
    if (!selected?.uri) return;

    const lowerName = (selected.name || '').toLowerCase();
    const mime = selected.mimeType || (lowerName.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg');

    setValue('tradingLicenseUri', selected.uri);
    setValue('tradingLicenseName', selected.name || `license-${Date.now()}`);
    setValue('tradingLicenseMimeType', mime);
    setValue('tradingLicenseIsPdf', mime === 'application/pdf' || lowerName.endsWith('.pdf'));
  };

  const openMapLink = async () => {
    if (!locationData || 'error' in locationData) return;
    try {
      await Linking.openURL(locationData.googleLink);
    } catch {
      showAlert({
        title: 'Unable to open map',
        message: 'Please copy and open the map link manually.',
        variant: 'info',
      });
    }
  };

  const renderFieldError = (message?: string) => {
    if (!message) return null;
    return (
      <View className="mt-1 flex-row items-center gap-1">
        <MaterialCommunityIcons name="alert-circle-outline" size={14} color="#ef4444" />
        <Text className="text-xs text-red-500">* {message}</Text>
      </View>
    );
  };

  const onSubmit = async (values: AdditionalInfoFormValues) => {
    try {
      const response = await submitAdditionalInfo({
        companyName: values.companyName,
        branches: values.branches,
        accountNumber: values.accountNumber,
        location: values.location,
        address: values.address,
        mapLink: values.mapLink,
        companyImageUri: values.companyImageUri,
        companyImageName: values.companyImageName,
        companyImageMimeType: values.companyImageMimeType,
        tradingLicenseUri: values.tradingLicenseUri,
        tradingLicenseName: values.tradingLicenseName,
        tradingLicenseMimeType: values.tradingLicenseMimeType,
      });

      if (!response?.success) {
        showAlert({
          title: 'Failed',
          message: response?.message || 'Unable to save additional info.',
          variant: 'error',
        });
        return;
      }

      await fetchProfile();
      showAlert({
        title: 'Success',
        message: response?.message || 'Business profile saved.',
        variant: 'success',
      });
      navigation.replace(ROUTES.OwnerTabs);
    } catch (error: any) {
      const message = error?.message || error?.response?.data?.message || 'Unable to save additional info.';
      showAlert({
        title: 'Error',
        message,
        variant: 'error',
      });
    }
  };

  const autoBlocked = Boolean(locationData && 'error' in locationData && locationData.blocked);

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-6">
            <Text className="text-3xl font-extrabold text-text-main dark:text-gray-100">Complete Business Profile</Text>
            <Text className="mt-2 text-sm text-text-muted dark:text-gray-400">
              Finish your owner setup before entering your dashboard.
            </Text>
          </View>

          <View className="gap-4">
            <View className="rounded-xl border border-input-border bg-surface-light p-4 dark:border-neutral-dark dark:bg-surface-dark">
              <View className="mb-2 flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <MaterialCommunityIcons name="crosshairs-gps" size={18} color={isDark ? '#f3f0e7' : '#1b180d'} />
                  <Text className="text-sm font-semibold text-text-main dark:text-gray-200">Automatic Location Detection</Text>
                </View>
                <Pressable
                  onPress={fetchDeviceLocation}
                  disabled={loadingLocation || autoBlocked}
                  className="h-8 w-8 items-center justify-center rounded-full bg-primary/10"
                >
                  <MaterialCommunityIcons
                    name={loadingLocation ? 'loading' : 'refresh'}
                    size={16}
                    color={isDark ? '#f3f0e7' : '#1b180d'}
                  />
                </Pressable>
              </View>

              {loadingLocation ? (
                <View className="flex-row items-center gap-2 py-2">
                  <MaterialCommunityIcons name="loading" size={16} color="#f97316" />
                  <Text className="text-sm text-orange-600">Fetching your current location...</Text>
                </View>
              ) : locationData && 'error' in locationData ? (
                <View className="flex-row items-center gap-2 rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
                  <MaterialCommunityIcons name="alert-outline" size={16} color="#dc2626" />
                  <View className="flex-1">
                    <Text className="text-sm text-red-600 dark:text-red-400">{locationData.error}</Text>
                    {locationData.blocked ? (
                      <Text className="mt-1 text-xs font-semibold text-red-600 dark:text-red-400">
                        Automatic detection is disabled. Turn off VPN/proxy, then retry.
                      </Text>
                    ) : null}
                  </View>
                </View>
              ) : locationData ? (
                <View className="gap-2 rounded-lg border border-input-border bg-white p-3 dark:border-neutral-dark dark:bg-background-dark">
                  <Text className="text-xs text-text-muted dark:text-gray-400">Address: {locationData.formattedAddress}</Text>
                  <Text className="text-xs text-text-muted dark:text-gray-400">City: {locationData.city}</Text>
                  <Text className="text-xs text-text-muted dark:text-gray-400">Country: {locationData.country}</Text>
                  <Pressable onPress={openMapLink} className="flex-row items-center gap-1 self-start">
                    <MaterialCommunityIcons name="map-marker" size={14} color="#f97316" />
                    <Text className="text-xs font-semibold text-orange-600">View on Google Maps</Text>
                  </Pressable>

                  <View className="mt-2 flex-row items-center gap-2">
                    <Pressable
                      onPress={applyAutoLocation}
                      disabled={autoBlocked}
                      className={`rounded-lg px-3 py-1.5 ${useAutoLocation ? 'bg-green-500' : 'bg-green-100'}`}
                    >
                      <Text className={`text-sm font-semibold ${useAutoLocation ? 'text-white' : 'text-green-700'}`}>
                        {useAutoLocation ? 'Approved' : 'Approve'}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={enableManualLocationEdit}
                      disabled={autoBlocked}
                      className={`rounded-lg px-3 py-1.5 ${!useAutoLocation ? 'bg-red-500' : 'bg-red-100'}`}
                    >
                      <Text className={`text-sm font-semibold ${!useAutoLocation ? 'text-white' : 'text-red-700'}`}>
                        {!useAutoLocation ? 'Editing' : 'Edit'}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ) : null}
            </View>

            <View>
              <Text className="mb-2 text-sm font-semibold text-text-main dark:text-gray-300">Company Name</Text>
              <Controller
                control={control}
                name="companyName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Official Company Name"
                    placeholderTextColor={isDark ? '#9aa0a6' : '#9ca3af'}
                    className="rounded-xl border border-input-border bg-surface-light px-4 py-3 text-text-main dark:border-neutral-dark dark:bg-surface-dark dark:text-gray-100"
                  />
                )}
              />
              {renderFieldError(errors.companyName?.message)}
            </View>

            <View>
              <Text className="mb-2 text-sm font-semibold text-text-main dark:text-gray-300">Branches</Text>
              <Controller
                control={control}
                name="branches"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Number of Branches"
                    placeholderTextColor={isDark ? '#9aa0a6' : '#9ca3af'}
                    keyboardType="number-pad"
                    className="rounded-xl border border-input-border bg-surface-light px-4 py-3 text-text-main dark:border-neutral-dark dark:bg-surface-dark dark:text-gray-100"
                  />
                )}
              />
              {renderFieldError(errors.branches?.message)}
            </View>

            <View>
              <Text className="mb-2 text-sm font-semibold text-text-main dark:text-gray-300">Account Number</Text>
              <Controller
                control={control}
                name="accountNumber"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Business Bank Account Number"
                    placeholderTextColor={isDark ? '#9aa0a6' : '#9ca3af'}
                    className="rounded-xl border border-input-border bg-surface-light px-4 py-3 text-text-main dark:border-neutral-dark dark:bg-surface-dark dark:text-gray-100"
                  />
                )}
              />
              {renderFieldError(errors.accountNumber?.message)}
            </View>

            <View>
              <Text className="mb-2 text-sm font-semibold text-text-main dark:text-gray-300">Location</Text>
              <Controller
                control={control}
                name="location"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="City / Primary Location"
                    placeholderTextColor={isDark ? '#9aa0a6' : '#9ca3af'}
                    editable={!useAutoLocation}
                    className="rounded-xl border border-input-border bg-surface-light px-4 py-3 text-text-main dark:border-neutral-dark dark:bg-surface-dark dark:text-gray-100"
                  />
                )}
              />
              {renderFieldError(errors.location?.message)}
            </View>

            <View>
              <Text className="mb-2 text-sm font-semibold text-text-main dark:text-gray-300">Address</Text>
              <Controller
                control={control}
                name="address"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Street / Village"
                    placeholderTextColor={isDark ? '#9aa0a6' : '#9ca3af'}
                    editable={!useAutoLocation}
                    className="rounded-xl border border-input-border bg-surface-light px-4 py-3 text-text-main dark:border-neutral-dark dark:bg-surface-dark dark:text-gray-100"
                  />
                )}
              />
              {renderFieldError(errors.address?.message)}
            </View>

            <View>
              <Text className="mb-2 text-sm font-semibold text-text-main dark:text-gray-300">Google Map Link</Text>
              <Controller
                control={control}
                name="mapLink"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="https://maps.google.com/..."
                    placeholderTextColor={isDark ? '#9aa0a6' : '#9ca3af'}
                    autoCapitalize="none"
                    editable={!useAutoLocation}
                    className="rounded-xl border border-input-border bg-surface-light px-4 py-3 text-text-main dark:border-neutral-dark dark:bg-surface-dark dark:text-gray-100"
                  />
                )}
              />
              {renderFieldError(errors.mapLink?.message)}
            </View>

            <Pressable
              onPress={pickCompanyImage}
              className="flex-row items-center justify-between rounded-xl border border-input-border bg-surface-light px-4 py-3 dark:border-neutral-dark dark:bg-surface-dark"
            >
              <Text className="font-medium text-text-main dark:text-gray-200">
                {companyImageUri ? 'Company image selected' : 'Upload Company Image (optional)'}
              </Text>
              <MaterialCommunityIcons name="image-outline" size={20} color={isDark ? '#f3f0e7' : '#1b180d'} />
            </Pressable>
            {companyImageUri ? (
              <View className="self-start rounded-xl border border-input-border p-1 dark:border-neutral-dark">
                <Image source={{ uri: companyImageUri }} className="h-20 w-20 rounded-lg" resizeMode="cover" />
              </View>
            ) : null}

            <Pressable
              onPress={pickTradingLicense}
              className="flex-row items-center justify-between rounded-xl border border-input-border bg-surface-light px-4 py-3 dark:border-neutral-dark dark:bg-surface-dark"
            >
              <Text className="font-medium text-text-main dark:text-gray-200">
                {tradingLicenseUri
                  ? `Trading license selected (${tradingLicenseIsPdf ? 'PDF' : 'Image'})`
                  : 'Upload Trading License (Image or PDF)'}
              </Text>
              <MaterialCommunityIcons name="file-document-outline" size={20} color={isDark ? '#f3f0e7' : '#1b180d'} />
            </Pressable>
            {tradingLicenseUri ? (
              <View className="self-start rounded-xl border border-input-border p-1 dark:border-neutral-dark">
                {tradingLicenseIsPdf ? (
                  <View className="h-20 w-40 flex-row items-center gap-2 rounded-lg px-2">
                    <MaterialCommunityIcons name="file-pdf-box" size={26} color="#dc2626" />
                    <Text className="flex-1 text-xs text-text-main dark:text-gray-200" numberOfLines={2}>
                      {tradingLicenseName || 'Trading License.pdf'}
                    </Text>
                  </View>
                ) : (
                  <Image source={{ uri: tradingLicenseUri }} className="h-20 w-20 rounded-lg" resizeMode="cover" />
                )}
              </View>
            ) : null}

            <Pressable
              onPress={handleSubmit(onSubmit)}
              disabled={submitting}
              className="mt-3 flex-row items-center justify-center rounded-xl bg-primary py-4"
            >
              <Text className="text-base font-bold text-primary-content">
                {submitting ? 'Saving...' : 'Save Information'}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
