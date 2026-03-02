import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';

const updates = [
  {
    id: '1',
    icon: 'basket-outline' as const,
    title: 'Improved custom order flow',
    description: 'Place complex cake orders with our new intuitive step-by-step guide.',
  },
  {
    id: '2',
    icon: 'cloud-upload-outline' as const,
    title: 'Faster image uploads',
    description: 'Optimized compression ensures your bakery photos upload up to 3x faster.',
  },
  {
    id: '3',
    icon: 'magnify' as const,
    title: 'New bakery discovery filters',
    description: 'Find the perfect treats by dietary needs, rating, or delivery time.',
  },
];

export const DetailedUpdateScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top', 'bottom']}>
      <View className="flex-1">
        <View className="flex-row items-center justify-between bg-background-light/80 px-4 pb-2 pt-2 dark:bg-background-dark/80">
          <Pressable onPress={() => navigation.goBack()} className="h-12 w-12 items-center justify-center">
            <MaterialCommunityIcons name="arrow-left" size={22} color={isDark ? '#f1f5f9' : '#0f172a'} />
          </Pressable>

          <Text className="flex-1 text-center text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Update Details
          </Text>

          <Pressable
            onPress={toggle}
            className="h-10 w-10 items-center justify-center rounded-xl active:opacity-80"
          >
            <MaterialCommunityIcons
              name={isDark ? 'white-balance-sunny' : 'weather-night'}
              size={20}
              color={isDark ? '#ecb613' : '#0f172a'}
            />
          </Pressable>
        </View>

        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 120, 140) }}
          showsVerticalScrollIndicator={false}
        >
          <View className="my-4 h-56 w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800">
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMDMf7lVvCcfI2-RXB4V17FrRBux1KFrQot3jXDRbnEyWLS5FDhZc0kULZr0DpxcG3_-57lKAwxWurqBa78mm3Nok77ObiRmYXjv07ozn1ZRjYDnlNfwViPz68DAWtDeE9U2wbqO5W3mJF7P5erlOy15X_nG5vJpfYHLAg7Rn9XYKnAT9b7CS3aqCgvpGTmQbDqgkiJPktg276ecb0-fYeRC6TJG_mYiOxnu8ETd-pEA_si-RWNHqtK0RMQncW0ldzzlH8mXlx2Ems',
              }}
              className="h-full w-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-black/45" />
            <View className="absolute bottom-0 left-0 w-full p-6">
              <Text className="mb-2 self-start rounded-full bg-primary px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-slate-900">
                New Release
              </Text>
              <Text className="text-3xl font-extrabold text-white">System Update v2.0</Text>
              <Text className="mt-1 text-sm text-white/80">Optimized for Adama Market</Text>
            </View>
          </View>

          <View className="mt-4">
            <View className="mb-4 flex-row items-center gap-2 px-1">
              <MaterialCommunityIcons name="auto-fix" size={20} color="#ecb613" />
              <Text className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">What's New</Text>
            </View>

            <View className="gap-3">
              {updates.map((item) => (
                <View
                  key={item.id}
                  className="flex-row items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/50"
                >
                  <View className="mt-1 h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                    <MaterialCommunityIcons name={item.icon} size={16} color="#ecb613" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-slate-900 dark:text-slate-100">{item.title}</Text>
                    <Text className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{item.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View className="mb-6 mt-8">
            <View className="mb-4 flex-row items-center gap-2 px-1">
              <MaterialCommunityIcons name="alert-outline" size={20} color="#f59e0b" />
              <Text className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Critical Warnings</Text>
            </View>

            <View className="gap-4 rounded-xl border border-amber-300/40 bg-amber-100/60 p-5 dark:border-amber-500/30 dark:bg-amber-500/10">
              <View className="flex-row items-start gap-3">
                <MaterialCommunityIcons name="harddisk" size={18} color="#f59e0b" style={{ marginTop: 2 }} />
                <Text className="flex-1 text-sm font-medium leading-relaxed text-amber-900 dark:text-amber-300">
                  Please ensure you have <Text className="font-bold underline">50MB of free space</Text> before initiating the download.
                </Text>
              </View>

              <View className="flex-row items-start gap-3">
                <MaterialCommunityIcons name="restart" size={18} color="#f59e0b" style={{ marginTop: 2 }} />
                <Text className="flex-1 text-sm font-medium leading-relaxed text-amber-900 dark:text-amber-300">
                  The app will automatically <Text className="font-bold underline">restart</Text> once the update process is complete.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          className="absolute bottom-0 left-0 right-0 px-6 pt-10"
          style={{ paddingBottom: Math.max(insets.bottom + 12, 24) }}
        >
          <Pressable className="h-14 flex-row items-center justify-center gap-2 rounded-xl bg-primary shadow-xl shadow-primary/20 active:opacity-90">
            <MaterialCommunityIcons name="download" size={20} color="#1b180d" />
            <Text className="text-lg font-bold text-slate-900">Download & Install</Text>
          </Pressable>
          <Text className="mt-3 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            File size: 34.2 MB • Version 2.0.12
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
