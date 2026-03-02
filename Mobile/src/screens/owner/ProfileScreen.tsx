import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthProvider';
import { useThemeStore } from '../../store/themeStore';

type ProfileAction = {
  title: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
};

const ACTIONS: ProfileAction[] = [
  { title: 'Store Settings', icon: 'cog-outline' },
  { title: 'Bank & Payments', icon: 'bank-outline' },
  { title: 'Business Documents', icon: 'file-document-outline' },
  { title: 'Operating Hours', icon: 'clock-time-four-outline' },
  { title: 'Security', icon: 'shield-outline' },
  { title: 'Help Center', icon: 'help-circle-outline' },
];

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const { mode, toggle } = useThemeStore();
  const insets = useSafeAreaInsets();
  const isDark = mode === 'dark';

  const ownerName = user?.name ?? 'Sweet Delights Bakery';
  const ownerEmail = user?.email ?? 'owner@example.com';
  const ownerImage =
    user?.image ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBFIJw_c5hSAzrGcvfGUMxPEXKnWKD1Z9j1Y9cCTM618dVCGIGHG4ER7NuqwKrp0PqS7crZ_LOR95Csoqz4A0mmrwxkr-0yA-wR-NitbPVHMGETYSoK9aDyLWgzvDseXKjbJ2R8EwyKjwVDPsZdIGXMbDStAXTVJLYrhO-k-86PKCynNuDOyRKQbqrpr-PyfHDiI9v5dVSAOXox2qkb2JQFquuF60THvPOi-ETyNiMdmhO8Zx4L5OtpagpgzBk06RZza0uD-UKsSCa4';

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top']}>
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 28, 56) }}
          showsVerticalScrollIndicator={false}
        >
          <View className="relative h-64 w-full overflow-visible">
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLDlzkHSyty5xAwGcAOx56u8eHee9YJ3zq0eFkqO4locL88MBLo2YFaNj-M_E5I0Z1yvBzroLbH8vT2XYJfAiL3jrd9bH95VUaLN3nG-3qxOg01UEZFWK7NxB36CsZML_gQSyD7yJexp-b9u4pZG23zV-CSwb5ql7vF27npPeM7T8SbVZHOOmZx9Ah_lvU4MddQQ3Md6Qzkg-_6YmY82Q8IHep2O5wJu_ziGH9KTlj7ijhbmpPtoo6f7awUVEfso6OEpUPSFh5j-dE',
              }}
              className="h-full w-full"
              resizeMode="cover"
            />

            <View className="absolute left-4 right-4 top-4 z-20 flex-row items-center justify-between">
              <Pressable
                onPress={() => {
                  if (navigation.canGoBack()) navigation.goBack();
                }}
                className="h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20"
              >
                <MaterialCommunityIcons name="chevron-left" size={22} color="#ffffff" />
              </Pressable>

              <Pressable
                onPress={toggle}
                className="h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20"
              >
                <MaterialCommunityIcons
                  name={isDark ? 'white-balance-sunny' : 'weather-night'}
                  size={20}
                  color="#ffffff"
                />
              </Pressable>
            </View>

            <View className="absolute -bottom-12 left-6 z-10">
              <View className="relative">
                <Image
                  source={{ uri: ownerImage }}
                  className="h-24 w-24 rounded-2xl border-4 border-background-light dark:border-background-dark"
                  resizeMode="cover"
                />
                <View className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-background-light bg-green-500 dark:border-background-dark" />
              </View>
            </View>
          </View>

          <View className="mt-16 px-6">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-2xl font-extrabold tracking-tight text-charcoal dark:text-white">{ownerName}</Text>
                <View className="mt-1 flex-row items-center gap-2">
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons name="star" size={14} color="#ecb613" />
                    <Text className="ml-1 font-bold text-primary">4.8</Text>
                  </View>
                  <Text className="text-sm text-gray-400">•</Text>
                  <Text className="text-sm font-medium text-gray-500 dark:text-gray-400">Adama, Ethiopia</Text>
                </View>
                <Text className="mt-1 text-xs text-text-muted dark:text-gray-400">{ownerEmail}</Text>
              </View>

              <View className="flex-row items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5">
                <MaterialCommunityIcons name="check-decagram" size={14} color="#ecb613" />
                <Text className="text-[10px] font-black uppercase tracking-widest text-primary">Premier Partner</Text>
              </View>
            </View>
          </View>

          <View className="mt-8 flex-row justify-between gap-3 px-4">
            <View className="flex-1 items-center rounded-lg border border-primary/10 bg-surface-light p-4 dark:bg-surface-dark">
              <Text className="mb-1 text-xs font-semibold uppercase tracking-tight text-gray-400">Orders</Text>
              <Text className="text-xl font-bold text-charcoal dark:text-white">1,284</Text>
              <View className="mt-2 h-1 w-6 rounded-full bg-primary/30" />
            </View>
            <View className="flex-1 items-center rounded-lg border border-primary/10 bg-surface-light p-4 dark:bg-surface-dark">
              <Text className="mb-1 text-xs font-semibold uppercase tracking-tight text-gray-400">Revenue</Text>
              <Text className="text-xl font-bold text-charcoal dark:text-white">$12.4k</Text>
              <View className="mt-2 h-1 w-6 rounded-full bg-primary/30" />
            </View>
            <View className="flex-1 items-center rounded-lg border border-primary/10 bg-surface-light p-4 dark:bg-surface-dark">
              <Text className="mb-1 text-xs font-semibold uppercase tracking-tight text-gray-400">Rating</Text>
              <Text className="text-xl font-bold text-charcoal dark:text-white">4.8</Text>
              <View className="mt-2 h-1 w-6 rounded-full bg-primary/30" />
            </View>
          </View>

          <View className="mt-8 gap-2 px-4">
            {ACTIONS.map((action) => (
              <Pressable
                key={action.title}
                className="w-full flex-row items-center justify-between rounded-lg bg-surface-light px-5 py-4 shadow-sm dark:bg-surface-dark"
              >
                <View className="flex-row items-center gap-4">
                  <View className="h-10 w-10 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800">
                    <MaterialCommunityIcons
                      name={action.icon}
                      size={20}
                      color={isDark ? '#a1a1aa' : '#6b7280'}
                    />
                  </View>
                  <Text className="font-bold text-gray-700 dark:text-gray-200">{action.title}</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color={isDark ? '#71717a' : '#d1d5db'} />
              </Pressable>
            ))}
          </View>

          <View className="mt-10 items-center gap-6 px-6">
            <Pressable className="w-full rounded-full border-2 border-primary py-4">
              <Text className="text-center font-bold text-primary">Switch to Customer View</Text>
            </Pressable>

            <Pressable onPress={logout} className="flex-row items-center gap-2">
              <MaterialCommunityIcons name="logout" size={18} color="#ef4444" />
              <Text className="text-sm font-semibold text-red-500">Log Out</Text>
            </Pressable>
          </View>
        </ScrollView>
        </View>
    </SafeAreaView>
  );
};
