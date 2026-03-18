import { router } from 'expo-router';
import { View, Text, ScrollView, Pressable, Image, FlatList } from 'react-native';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context'

export default function AllBakeriesScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const [selectedFilter, setSelectedFilter] = useState('nearby');

  // Mock bakery data
  const bakeries = [
    {
      id: '1',
      name: 'Golden Crust Bakery',
      rating: 4.8,
      distance: '1.2 km away',
      location: 'Downtown District',
      description:
        'Artisan bakery famous for traditional sourdough, flaky croissants, and seasonal pastries.',
      status: 'Open Until 8:00 PM',
      isOpen: true,
      image: '../../assets/images/placeholder.png',
    },
    {
      id: '2',
      name: 'Sweet Treats Patisserie',
      rating: 4.5,
      distance: '0.8 km away',
      location: 'Central Mall',
      description:
        'Specializing in custom celebration cakes, designer cupcakes, and delicate french macarons.',
      status: 'Open Now',
      isOpen: true,
      image: '../../assets/images/placeholder.png',
    },
    {
      id: '3',
      name: 'The Oven Door',
      rating: 4.2,
      distance: '2.5 km away',
      location: 'West Garden',
      description: 'Authentic brick oven baking for crusty breads and savory breakfast rolls.',
      status: 'Opens at 6:00 AM',
      isOpen: false,
      image: '../../assets/images/placeholder.png',
    },
  ];

  const filters = [
    { id: 'nearby', label: 'Nearby', icon: 'near_me' },
    { id: 'toprated', label: 'Top Rated', icon: 'star' },
    { id: 'opennow', label: 'Open Now', icon: 'schedule' },
  ];

  const renderBakeryCard = ({ item }) => (
    <View
      className={`flex-col rounded-2xl ${isDark ? 'bg-slate-900' : 'bg-white'} border shadow-sm ${isDark ? 'border-slate-800' : 'border-slate-100'} mb-6 overflow-hidden`}>
      {/* Image Section */}
      <View className="relative aspect-[16/9] w-full bg-slate-200">
        <Image source={item.image} className="h-full w-full" />
        {!item.isOpen && (
          <View className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Text className="text-lg font-bold text-white">Closed</Text>
          </View>
        )}
        {/* Rating Badge */}
        <View className="absolute right-3 top-3 flex-row items-center gap-1 rounded-lg bg-white/90 px-2 py-1 dark:bg-slate-900/90">
          <Text className="text-xs font-bold text-primary">⭐ {item.rating}</Text>
        </View>
      </View>

      {/* Content Section */}
      <View className={`flex-col gap-3 p-4 ${!item.isOpen ? 'opacity-60' : ''}`}>
        <View>
          <Text className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            {item.name}
          </Text>
          <View className="mt-1 flex-row items-center gap-1">
            <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              📍 {item.distance} • {item.location}
            </Text>
          </View>
        </View>

        <Text className={`line-clamp-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {item.description}
        </Text>

        {/* Footer */}
        <View
          className={`flex-row items-center justify-between border-t pt-2 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <Text
            className={`text-xs font-bold uppercase tracking-wider ${item.isOpen ? 'text-primary' : 'text-slate-400'}`}>
            {item.status}
          </Text>
          <Pressable
            className={`rounded-xl px-4 py-2 ${item.isOpen ? 'bg-primary' : 'bg-slate-200'}`}
            disabled={!item.isOpen}
            onPress={() => router.push(`/(customer)/restaurants/${item.id}`)}>
            <Text className={`text-sm font-bold ${item.isOpen ? 'text-white' : 'text-slate-400'}`}>
              View Details
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
      {/* Header */}
      <View
        className={`flex-row items-center justify-between ${isDark ? 'bg-background-dark/80' : 'bg-background-light/80'} border-b p-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <View className="flex-row items-center gap-3">
          <Pressable
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
            onPress={() => router.goBack()}>
            <Text className="text-xl text-primary">←</Text>
          </Pressable>
          <Text className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            Adama Bakeries
          </Text>
        </View>
        <Pressable>
          <Text className="text-xl">🔍</Text>
        </Pressable>
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row gap-3 p-4 py-4">
        {filters.map((filter) => (
          <Pressable
            key={filter.id}
            className={`h-10 flex-row items-center justify-center gap-2 rounded-xl px-4 ${
              selectedFilter === filter.id
                ? 'bg-primary shadow-lg'
                : `${isDark ? 'border border-slate-700 bg-slate-800' : 'border border-slate-200 bg-white'}`
            }`}
            onPress={() => setSelectedFilter(filter.id)}>
            <Text
              className={
                selectedFilter === filter.id
                  ? 'text-lg text-white'
                  : 'text-lg text-slate-700 dark:text-slate-200'
              }>
              {filter.icon === 'near_me' && '📍'}
              {filter.icon === 'star' && '⭐'}
              {filter.icon === 'schedule' && '⏰'}
            </Text>
            <Text
              className={`text-sm font-${selectedFilter === filter.id ? 'bold' : 'medium'} ${selectedFilter === filter.id ? 'text-white' : isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              {filter.label}
            </Text>
            <Text
              className={`text-lg ${selectedFilter === filter.id ? 'text-white' : isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              ▼
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Bakery List */}
      <FlatList
        data={bakeries}
        renderItem={renderBakeryCard}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation */}
      <View
        className={`absolute bottom-0 left-0 right-0 ${isDark ? 'bg-background-dark' : 'bg-background-light'} border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} px-4 pb-6 pt-2`}>
        <View className="flex-row justify-between gap-2">
          <Pressable
            className="flex flex-1 flex-col items-center justify-center gap-1"
            onPress={() => router.push('/(customer)/home')}>
            <Text className="text-xl text-slate-400">🏠</Text>
            <Text className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Home
            </Text>
          </Pressable>
          <Pressable
            className="flex flex-1 flex-col items-center justify-center gap-1"
            onPress={() => router.push('/(customer)/restaurants')}>
            <Text className="text-xl text-primary">🥖</Text>
            <Text className="text-xs font-bold text-primary">Bakeries</Text>
          </Pressable>
          <Pressable
            className="flex flex-1 flex-col items-center justify-center gap-1"
            onPress={() => router.push('/(customer)/orders/history')}>
            <Text className="text-xl text-slate-400">📋</Text>
            <Text className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Orders
            </Text>
          </Pressable>
          <Pressable
            className="flex flex-1 flex-col items-center justify-center gap-1"
            onPress={() => router.push('/(customer)/profile')}>
            <Text className="text-xl text-slate-400">👤</Text>
            <Text className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Profile
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
