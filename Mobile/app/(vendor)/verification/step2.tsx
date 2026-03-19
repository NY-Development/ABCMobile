import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { step2Schema, type Step2FormData } from '@/src/features/restaurants';
import { useVerificationStore } from '@/src/features/restaurants/restaurants.store';
import { ArrowLeft, MapPin, Globe, AlertTriangle, Loader } from 'lucide-react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import LocationMap from '@/src/components/LocationMap';

interface LocationData {
  ip?: string;
  city?: string;
  country?: string;
  formatted_address?: string;
  latitude?: number;
  longitude?: number;
  googleLink?: string;
  error?: string;
  blocked?: boolean;
}

export default function OwnerVerificationStep2Screen() {
  const router = useRouter();
  const { setStep2, step2 } = useVerificationStore();
  const [autoLocation, setAutoLocation] = useState<LocationData | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [useAutoLink, setUseAutoLink] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: step2 || {
      formattedAddress: '',
      city: '',
      country: '',
      street: '',
      building: '',
      postalCode: '',
    },
  });

  // Fetch location on component mount
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoadingLocation(true);

        // Step 1: Get user's public IP
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        const ip = ipData.ip;
        if (!ip) throw new Error('Unable to fetch IP address');

        // Step 2: Get detailed location info from ip-api
        const locRes = await fetch(`http://ip-api.com/json/${ip}`);
        const locData = await locRes.json();

        if (locData.status === 'success') {
          const { city, country, lat, lon, regionName } = locData;
          const formatted_address = `${city || ''}, ${regionName || ''}, ${country || ''}`.trim();
          const googleLink = `https://www.google.com/maps?q=${lat},${lon}`;

          if (country !== 'Ethiopia') {
            setUseAutoLink(false);
            setAutoLocation({
              error:
                'Detected country is not Ethiopia. Please turn off VPN/proxy and retry automatic location detection.',
              blocked: true,
            });
            return;
          }

          const detected: LocationData = {
            ip,
            city: city || 'Unknown City',
            country: country || 'Unknown Country',
            formatted_address,
            latitude: lat,
            longitude: lon,
            googleLink,
          };

          setAutoLocation(detected);
        } else {
          setAutoLocation({ error: 'Unable to retrieve location data.' });
        }
      } catch (err) {
        console.error(err);
        setAutoLocation({ error: 'Failed to fetch IP-based location.' });
      } finally {
        setLoadingLocation(false);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (step2) {
      setValue('formattedAddress', step2.formattedAddress);
      setValue('city', step2.city);
      setValue('country', step2.country);
      setValue('street', step2.street || '');
      setValue('building', step2.building || '');
      setValue('postalCode', step2.postalCode || '');
    }
  }, [step2, setValue]);

  // LocationStatus Component for React Native
  const LocationStatus = () => {
    if (loadingLocation) {
      return (
        <View className="flex-row items-center gap-2 rounded-lg bg-orange-50 p-4">
          <Loader size={16} color="#ea580c" className="animate-spin" />
          <Text className="text-sm font-medium text-orange-600">Detecting location...</Text>
        </View>
      );
    }

    if (autoLocation?.error) {
      return (
        <View className="gap-2 rounded-lg bg-red-50 p-3">
          <View className="flex-row items-start gap-2">
            <AlertTriangle size={16} color="#dc2626" />
            <View className="flex-1">
              <Text className="text-sm text-red-600">{autoLocation.error}</Text>
              {autoLocation.blocked && (
                <Text className="mt-1 text-xs font-semibold text-red-700">
                  Automatic detection is disabled. Turn off VPN/proxy and retry.
                </Text>
              )}
            </View>
          </View>
        </View>
      );
    }

    if (!autoLocation) {
      return <Text className="p-4 text-sm italic text-gray-400">Detecting location...</Text>;
    }

    // Success State
    return (
      <View className="gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        {/* Address Row */}
        <View className="flex-row gap-3 border-b border-gray-100 pb-3">
          <Text className="w-24 flex-shrink-0 font-semibold text-gray-800">Address:</Text>
          <Text className="flex-1 text-gray-700">{autoLocation.formatted_address}</Text>
        </View>

        {/* City Row */}
        <View className="flex-row gap-3 border-b border-gray-100 pb-3">
          <Text className="w-24 flex-shrink-0 font-semibold text-gray-800">City:</Text>
          <Text className="flex-1 text-gray-700">{autoLocation.city}</Text>
        </View>

        {/* Country Row */}
        <View className="flex-row gap-3 border-b border-gray-100 pb-3">
          <Text className="w-24 flex-shrink-0 font-semibold text-gray-800">Country:</Text>
          <Text className="flex-1 text-gray-700">{autoLocation.country}</Text>
        </View>

        {/* Map Link Section */}
        <View className="pt-2">
          <Text className="mb-1 font-semibold text-gray-800">Map:</Text>
          <Text className="mb-2 animate-pulse text-xs font-bold text-red-500">
            Please verify the map before accepting.
          </Text>
          <Pressable
            onPress={() => {
              if (autoLocation.googleLink) {
                Linking.openURL(autoLocation.googleLink);
              }
            }}>
            <Text className="text-sm font-medium text-orange-600 underline">
              {autoLocation.googleLink ? 'View on Google Maps →' : 'Map link available'}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const handleNext = (data: Step2FormData) => {
    setStep2(data);
    router.push('/(vendor)/verification/step3');
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
            Location & Address
          </Text>
        </View>

        {/* Progress Section */}
        <View className="flex-col gap-3 px-4 py-4">
          <View className="flex-row items-end justify-between gap-6">
            <View>
              <Text className="text-base font-semibold leading-normal text-foreground">
                Step 2 of 5
              </Text>
              <Text className="text-sm font-normal leading-normal text-muted-foreground">
                Location & Address
              </Text>
            </View>
            <Text className="text-lg font-bold leading-normal text-primary">40%</Text>
          </View>
          <View className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <View className="h-2.5 w-2/5 rounded-full bg-primary" />
          </View>
        </View>

        {/* Main Content */}
        <View className="px-4 py-6">
          <View className="flex-row items-center gap-3 pb-4">
            <MapPin size={24} color="#ec5b13" />
            <Text className="text-2xl font-bold leading-tight tracking-tight text-foreground">
              Bakery Location
            </Text>
          </View>

          <Text className="mb-6 text-base font-normal leading-normal text-muted-foreground">
            Please provide your bakery's address and location information.
          </Text>

          {/* Auto Location Detection Section */}
          <View className="mb-6 gap-4">
            <View className="flex-row items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
              <Globe size={18} color="#ec5b13" />
              <Text className="flex-1 text-sm font-semibold text-gray-700">
                Auto-Detected Location (via IP)
              </Text>
            </View>

            <LocationStatus />

            {/* Approve/Edit Buttons */}
            {autoLocation && !autoLocation.error && (
              <View className="flex-row gap-3">
                <Pressable
                  onPress={() => {
                    setUseAutoLink(true);
                    // Auto-fill the fields
                    if (autoLocation.formatted_address)
                      setValue('formattedAddress', autoLocation.formatted_address);
                    if (autoLocation.city) setValue('city', autoLocation.city);
                    if (autoLocation.country) setValue('country', autoLocation.country);
                  }}
                  disabled={autoLocation.blocked}
                  className={`flex-1 rounded-lg px-3 py-2 ${
                    useAutoLink ? 'bg-green-500' : 'bg-green-200'
                  }`}>
                  <Text
                    className={`text-center font-semibold ${useAutoLink ? 'text-white' : 'text-green-600'}`}>
                    {useAutoLink ? '✓ Approved' : 'Approve'}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => setUseAutoLink(false)}
                  disabled={autoLocation.blocked}
                  className={`flex-1 rounded-lg px-3 py-2 ${
                    !useAutoLink ? 'bg-red-500' : 'bg-red-200'
                  }`}>
                  <Text
                    className={`text-center font-semibold ${!useAutoLink ? 'text-white' : 'text-red-600'}`}>
                    {!useAutoLink ? 'Editing' : 'Edit'}
                  </Text>
                </Pressable>
              </View>
            )}

            {useAutoLink && autoLocation && !autoLocation.error && (
              <Text className="px-2 text-xs text-gray-600">
                Approved fields are locked. Click <Text className="font-bold">"Edit"</Text> to make
                changes.
              </Text>
            )}
          </View>

          {/* Form Fields */}
          <View className="gap-6">
            {/* Formatted Address */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Complete Address</Text>
              <Controller
                control={control}
                name="formattedAddress"
                render={({ field: { value, onChange } }) => (
                  <View
                    className={`rounded-xl border ${useAutoLink ? 'border-gray-300 bg-gray-100' : 'border-border bg-card'}`}>
                    <TextInput
                      className={`h-14 px-4 py-3 text-base ${useAutoLink ? 'text-gray-500' : 'text-foreground'}`}
                      placeholder="e.g. 123 Meskel Square, Addis Ababa"
                      placeholderTextColor="#9ca3af"
                      value={value}
                      onChangeText={onChange}
                      editable={!useAutoLink}
                    />
                  </View>
                )}
              />
              {errors.formattedAddress && (
                <Text className="text-xs text-red-500">{errors.formattedAddress.message}</Text>
              )}
            </View>

            {/* City */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">City</Text>
              <Controller
                control={control}
                name="city"
                render={({ field: { value, onChange } }) => (
                  <View
                    className={`rounded-xl border ${useAutoLink ? 'border-gray-300 bg-gray-100' : 'border-border bg-card'}`}>
                    <TextInput
                      className={`h-14 px-4 py-3 text-base ${useAutoLink ? 'text-gray-500' : 'text-foreground'}`}
                      placeholder="e.g. Addis Ababa"
                      placeholderTextColor="#9ca3af"
                      value={value}
                      onChangeText={onChange}
                      editable={!useAutoLink}
                    />
                  </View>
                )}
              />
              {errors.city && <Text className="text-xs text-red-500">{errors.city.message}</Text>}
            </View>

            {/* Country */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Country</Text>
              <Controller
                control={control}
                name="country"
                render={({ field: { value, onChange } }) => (
                  <View
                    className={`rounded-xl border ${useAutoLink ? 'border-gray-300 bg-gray-100' : 'border-border bg-card'}`}>
                    <TextInput
                      className={`h-14 px-4 py-3 text-base ${useAutoLink ? 'text-gray-500' : 'text-foreground'}`}
                      placeholder="e.g. Ethiopia"
                      placeholderTextColor="#9ca3af"
                      value={value}
                      onChangeText={onChange}
                      editable={!useAutoLink}
                    />
                  </View>
                )}
              />
              {errors.country && (
                <Text className="text-xs text-red-500">{errors.country.message}</Text>
              )}
            </View>

            {/* Optional Fields */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Street (Optional)</Text>
              <Controller
                control={control}
                name="street"
                render={({ field: { value, onChange } }) => (
                  <View className="rounded-xl border border-border bg-card">
                    <TextInput
                      className="h-14 px-4 py-3 text-base text-foreground"
                      placeholder="e.g. Churchill Avenue"
                      placeholderTextColor="#9ca3af"
                      value={value}
                      onChangeText={onChange}
                    />
                  </View>
                )}
              />
            </View>

            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">
                Building/Floor (Optional)
              </Text>
              <Controller
                control={control}
                name="building"
                render={({ field: { value, onChange } }) => (
                  <View className="rounded-xl border border-border bg-card">
                    <TextInput
                      className="h-14 px-4 py-3 text-base text-foreground"
                      placeholder="e.g. Building A, Floor 2"
                      placeholderTextColor="#9ca3af"
                      value={value}
                      onChangeText={onChange}
                    />
                  </View>
                )}
              />
            </View>

            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Postal Code (Optional)</Text>
              <Controller
                control={control}
                name="postalCode"
                render={({ field: { value, onChange } }) => (
                  <View className="rounded-xl border border-border bg-card">
                    <TextInput
                      className="h-14 px-4 py-3 text-base text-foreground"
                      placeholder="e.g. 1000"
                      placeholderTextColor="#9ca3af"
                      value={value}
                      onChangeText={onChange}
                    />
                  </View>
                )}
              />
            </View>
          </View>

          {/* Map Placeholder */}
          <View className="mt-8 gap-2">
            <Text className="text-sm font-semibold text-foreground">Location Preview</Text>
            {autoLocation && autoLocation.latitude && autoLocation.longitude ? (
              <LocationMap
                latitude={autoLocation.latitude}
                longitude={autoLocation.longitude}
                label={autoLocation.city || 'Detected Location'}
                height={300}
              />
            ) : (
              <View className="h-80 w-full overflow-hidden rounded-lg bg-muted-foreground/20">
                <Image
                  source={{
                    uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCogcc4KMRaE6sRB_egxtXKFliCmYhHccprxNUriyeBARd0LX8OlpfoKJ0UEuhmG6mjYWMd7Im7F9Lt2bTJpgy9C5bAErbZobvASxY4hZgkDuQV2Mgq0ZHCh4wRXnzy6szshy4tCnIlC15-QCKBFv37J3uCkIqR9QlmiV09SQmW0ZjOyEzx2OGCfYdg1Y-XlNyj5DXG286hncC9JX6frq7eobZ3087lXgWyQofEjqx4hcYSolbjb6gHasaIR37tVXCuGvJ22Yr6v0I',
                  }}
                  className="h-full w-full object-cover"
                />
              </View>
            )}
          </View>

          <View className="h-6" />
        </View>
      </ScrollView>

      {/* Footer Actions */}
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
