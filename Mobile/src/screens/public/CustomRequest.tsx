import React, { useMemo, useRef, useState } from 'react';
import { Alert, Animated, Image, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useThemeStore } from '../../store/themeStore';

export const CustomRequest = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';
  const toggleIconColor = isDark ? '#f97316' : '#1f2937';

  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [cakeBase, setCakeBase] = useState('Vanilla Bean Supreme');
  const [filling, setFilling] = useState('Signature Buttercream');
  const [showBaseOptions, setShowBaseOptions] = useState(false);
  const [showFillingOptions, setShowFillingOptions] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [instructions, setInstructions] = useState('');
  const [selectedBudgetId, setSelectedBudgetId] = useState('premium');
  const [showToast, setShowToast] = useState(false);
  const toastAnim = useRef(new Animated.Value(0)).current;
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cakeBaseOptions = [
    'Vanilla Bean Supreme',
    'Double Dark Chocolate',
    'Red Velvet & Cream',
    'Lemon Zest Sponge',
    'Carrot & Walnut',
  ];

  const fillingOptions = [
    'Signature Buttercream',
    'Raspberry Coulis',
    'Salted Caramel Ganache',
    'Espresso Cream',
    'Fresh Strawberry Compote',
  ];

  const budgetOptions = [
    { id: 'standard', label: 'Standard', range: 'ETB 2,500 - 4,500', progress: 0.35 },
    { id: 'premium', label: 'Premium', range: 'ETB 4,500 - 8,000', progress: 0.6 },
    { id: 'luxury', label: 'Luxury', range: 'ETB 8,000 - 10,000+', progress: 0.85 },
  ];

  const selectedBudget = useMemo(
    () => budgetOptions.find((option) => option.id === selectedBudgetId) ?? budgetOptions[1],
    [budgetOptions, selectedBudgetId]
  );

  const handlePickImages = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow access to your photo library to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 0.8,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri);
      setImages((prev) => [...prev, ...newImages].slice(0, 5));
    }
  };

  const handleRemoveImage = (uri: string) => {
    setImages((prev) => prev.filter((image) => image !== uri));
  };

  const handleRequestQuote = () => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    setShowToast(true);
    Animated.timing(toastAnim, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();

    toastTimer.current = setTimeout(() => {
      Animated.timing(toastAnim, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start(() => {
        setShowToast(false);
      });
    }, 1800);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="absolute -right-16 top-6 h-48 w-48 rounded-full bg-primary/5" />
      <View className="absolute -left-24 bottom-0 h-48 w-48 rounded-full bg-primary/5" />

      <View className="flex-row items-center justify-between px-6 pb-3 pt-2">
        <View className="w-10">
          <Pressable
            onPress={() => navigation.goBack()}
            className="h-10 w-10 items-center justify-center rounded-full"
          >
            <MaterialCommunityIcons name="arrow-left" size={22} color={toggleIconColor} />
          </Pressable>
        </View>
        <Text className="flex-1 text-center text-xl font-bold tracking-tight text-text-main dark:text-gray-100">
          Custom Request
        </Text>
        <View className="w-10 items-end">
          <Pressable
            onPress={toggle}
            className="h-10 w-10 items-center justify-center rounded-full"
          >
            <MaterialCommunityIcons name={toggleIconName} size={22} color={toggleIconColor} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 140 + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-2 pt-2">
          <Text className="text-xs font-semibold uppercase tracking-wider text-primary">Bespoke Creations</Text>
          <Text className="text-3xl font-bold text-text-main dark:text-gray-100">Design your dream cake.</Text>
          <Text className="text-base text-black/60 dark:text-white/60">
            Tell us about your event and preferences, and we will craft something unique just for you.
          </Text>
        </View>

        <View className="mt-8 gap-4">
          <View className="flex-row items-center gap-2">
            <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
              <Text className="text-xs font-bold text-primary">1</Text>
            </View>
            <Text className="text-lg font-bold text-text-main dark:text-gray-100">Event Details</Text>
          </View>
          <View className="flex-row gap-4">
            <View className="flex-1 gap-2">
              <Text className="ml-1 text-sm font-medium text-black/70 dark:text-white/70">Date</Text>
              <View className="relative">
                <TextInput
                  placeholder="Select date"
                  placeholderTextColor={isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'}
                  value={eventDate}
                  onChangeText={setEventDate}
                  className="h-14 rounded-2xl bg-white px-4 pr-10 text-base text-text-main ring-1 ring-black/10 dark:bg-white/5 dark:text-white dark:ring-white/10"
                />
                <View className="absolute right-3 top-1/2 -translate-y-1/2">
                  <MaterialCommunityIcons name="calendar" size={18} color="#f97316" />
                </View>
              </View>
            </View>
            <View className="flex-1 gap-2">
              <Text className="ml-1 text-sm font-medium text-black/70 dark:text-white/70">Time</Text>
              <View className="relative">
                <TextInput
                  placeholder="Select time"
                  placeholderTextColor={isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'}
                  value={eventTime}
                  onChangeText={setEventTime}
                  className="h-14 rounded-2xl bg-white px-4 pr-10 text-base text-text-main ring-1 ring-black/10 dark:bg-white/5 dark:text-white dark:ring-white/10"
                />
                <View className="absolute right-3 top-1/2 -translate-y-1/2">
                  <MaterialCommunityIcons name="clock-outline" size={18} color="#f97316" />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-8 gap-4">
          <View className="flex-row items-center gap-2">
            <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
              <Text className="text-xs font-bold text-primary">2</Text>
            </View>
            <Text className="text-lg font-bold text-text-main dark:text-gray-100">Flavor & Filling</Text>
          </View>

          <View className="gap-2">
            <Text className="ml-1 text-sm font-medium text-black/70 dark:text-white/70">Cake Base</Text>
            <Pressable
              className="h-14 flex-row items-center justify-between rounded-2xl bg-white px-4 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10"
              onPress={() => setShowBaseOptions(true)}
            >
              <Text className="text-base text-text-main dark:text-white">{cakeBase}</Text>
              <MaterialCommunityIcons name="chevron-down" size={20} color={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'} />
            </Pressable>
          </View>

          <View className="gap-2">
            <Text className="ml-1 text-sm font-medium text-black/70 dark:text-white/70">Premium Filling</Text>
            <Pressable
              className="h-14 flex-row items-center justify-between rounded-2xl bg-white px-4 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10"
              onPress={() => setShowFillingOptions(true)}
            >
              <Text className="text-base text-text-main dark:text-white">{filling}</Text>
              <MaterialCommunityIcons name="chevron-down" size={20} color={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'} />
            </Pressable>
          </View>
        </View>

        <View className="mt-8 gap-4">
          <View className="flex-row items-center gap-2">
            <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
              <Text className="text-xs font-bold text-primary">3</Text>
            </View>
            <Text className="text-lg font-bold text-text-main dark:text-gray-100">Design & Inspiration</Text>
          </View>

          <View className="gap-2">
            <Text className="ml-1 text-sm font-medium text-black/70 dark:text-white/70">Reference Photos</Text>
            <Pressable
              className="h-48 items-center justify-center rounded-3xl border-2 border-dashed border-primary/30 bg-primary/5"
              onPress={handlePickImages}
            >
              <View className="mb-3 h-12 w-12 items-center justify-center rounded-full bg-white/80 dark:bg-white/10">
                <MaterialCommunityIcons name="image-plus" size={24} color="#f97316" />
              </View>
              <Text className="text-sm font-semibold text-primary">Upload Inspiration</Text>
              <Text className="mt-1 text-xs text-black/40 dark:text-white/40">Tap to browse gallery</Text>
            </Pressable>
            {images.length > 0 ? (
              <View className="mt-3 flex-row flex-wrap gap-3">
                {images.map((uri) => (
                  <View key={uri} className="relative">
                    <Image
                      source={{ uri }}
                      className="h-20 w-20 rounded-2xl"
                      resizeMode="cover"
                    />
                    <Pressable
                      onPress={() => handleRemoveImage(uri)}
                      className="absolute -right-2 -top-2 h-6 w-6 items-center justify-center rounded-full bg-black/70"
                    >
                      <MaterialCommunityIcons name="close" size={14} color="#ffffff" />
                    </Pressable>
                  </View>
                ))}
              </View>
            ) : null}
          </View>

          <View className="gap-2">
            <Text className="ml-1 text-sm font-medium text-black/70 dark:text-white/70">Special Instructions</Text>
            <TextInput
              value={instructions}
              onChangeText={setInstructions}
              multiline
              placeholder="Describe the theme, dietary needs, or any personal touches you would like..."
              placeholderTextColor={isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'}
              className="min-h-[120px] rounded-2xl bg-white px-4 py-4 text-base text-text-main ring-1 ring-black/10 dark:bg-white/5 dark:text-white dark:ring-white/10"
              textAlignVertical="top"
            />
          </View>
        </View>

        <View className="mt-8 gap-4">
          <View className="flex-row items-center gap-2">
            <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/20">
              <Text className="text-xs font-bold text-primary">4</Text>
            </View>
            <Text className="text-lg font-bold text-text-main dark:text-gray-100">Estimated Budget</Text>
          </View>

          <View className="rounded-3xl bg-white p-6 ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/5">
            <View className="mb-4 flex-row items-end justify-between">
              <Text className="text-sm font-medium text-black/60 dark:text-white/60">Range</Text>
              <Text className="text-xl font-bold text-primary">{selectedBudget.range}</Text>
            </View>
            <View className="relative h-6 justify-center">
              <View className="h-2 w-full rounded-full bg-black/10 dark:bg-white/10" />
              <View
                className="absolute left-0 h-2 rounded-full bg-primary"
                style={{ width: `${Math.round(selectedBudget.progress * 100)}%` }}
              />
              <View
                className="absolute h-6 w-6 -translate-x-1/2 rounded-full border-4 border-primary bg-white shadow-lg"
                style={{ left: `${Math.round(selectedBudget.progress * 100)}%` }}
              />
            </View>
            <View className="mt-2 flex-row justify-between">
              {budgetOptions.map((option) => {
                const isSelected = option.id === selectedBudgetId;
                return (
                  <Pressable key={option.id} onPress={() => setSelectedBudgetId(option.id)}>
                    <Text className={isSelected ? 'text-xs font-semibold text-primary' : 'text-xs font-medium text-black/40 dark:text-white/40'}>
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        className="absolute left-0 right-0 px-6"
        style={{
          bottom: 0,
          paddingBottom: Math.max(insets.bottom, 16) + 8,
        }}
      >
        {showToast ? (
          <Animated.View
            className="mb-4 flex-row items-center justify-center rounded-full bg-surface-light px-4 py-2 dark:bg-surface-dark"
            style={{
              opacity: toastAnim,
              transform: [
                {
                  translateY: toastAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, 0],
                  }),
                },
              ],
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <MaterialCommunityIcons name="check-circle" size={18} color="#f97316" />
            <Text className="ml-2 text-sm font-semibold text-text-main dark:text-gray-100">
              Request received. We will get back to you soon.
            </Text>
          </Animated.View>
        ) : null}
        <View className="pointer-events-none absolute -bottom-6 left-0 right-0 h-24 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark" />
        <Pressable
          className="h-16 w-full flex-row items-center justify-center gap-2 rounded-2xl bg-primary"
          onPress={handleRequestQuote}
          style={{
            shadowColor: '#f97316',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 8,
          }}
        >
          <Text className="text-lg font-bold text-primary-content">Request Quote</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#431407" />
        </Pressable>
      </View>

      <Modal transparent animationType="fade" visible={showBaseOptions} onRequestClose={() => setShowBaseOptions(false)}>
        <Pressable className="flex-1 justify-end bg-black/40" onPress={() => setShowBaseOptions(false)}>
          <Pressable className="rounded-t-3xl bg-background-light p-6 dark:bg-background-dark">
            <Text className="text-lg font-bold text-text-main dark:text-gray-100">Choose Cake Base</Text>
            <View className="mt-4 gap-2">
              {cakeBaseOptions.map((option) => {
                const isSelected = option === cakeBase;
                return (
                  <Pressable
                    key={option}
                    onPress={() => {
                      setCakeBase(option);
                      setShowBaseOptions(false);
                    }}
                    className={isSelected ? 'rounded-2xl bg-primary/15 px-4 py-3' : 'rounded-2xl px-4 py-3'}
                  >
                    <Text className={isSelected ? 'text-base font-semibold text-primary' : 'text-base text-text-main dark:text-gray-100'}>
                      {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal transparent animationType="fade" visible={showFillingOptions} onRequestClose={() => setShowFillingOptions(false)}>
        <Pressable className="flex-1 justify-end bg-black/40" onPress={() => setShowFillingOptions(false)}>
          <Pressable className="rounded-t-3xl bg-background-light p-6 dark:bg-background-dark">
            <Text className="text-lg font-bold text-text-main dark:text-gray-100">Choose Filling</Text>
            <View className="mt-4 gap-2">
              {fillingOptions.map((option) => {
                const isSelected = option === filling;
                return (
                  <Pressable
                    key={option}
                    onPress={() => {
                      setFilling(option);
                      setShowFillingOptions(false);
                    }}
                    className={isSelected ? 'rounded-2xl bg-primary/15 px-4 py-3' : 'rounded-2xl px-4 py-3'}
                  >
                    <Text className={isSelected ? 'text-base font-semibold text-primary' : 'text-base text-text-main dark:text-gray-100'}>
                      {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};
