import { router } from 'expo-router';
import { View, Text, ScrollView, Pressable, Image, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { useState } from 'react';

export default function OurProductsScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  const categories = ['All', 'Cakes', 'Bread', 'Pastry', 'Donuts'];

  const products = [
    {
      id: '1',
      name: 'Chocolate Fudge Cake',
      price: '$25.00',
      image: require('@/assets/images/placeholder.png'),
    },
    {
      id: '2',
      name: 'Strawberry Shortcake',
      price: '$22.00',
      image: require('@/assets/images/placeholder.png'),
    },
    {
      id: '3',
      name: 'Fresh Baguette',
      price: '$3.50',
      image: require('@/assets/images/placeholder.png'),
    },
    {
      id: '4',
      name: 'Classic Croissant',
      price: '$2.75',
      image: require('@/assets/images/placeholder.png'),
    },
    {
      id: '5',
      name: 'Red Velvet Cupcake',
      price: '$4.00',
      image: require('@/assets/images/placeholder.png'),
    },
    {
      id: '6',
      name: 'Artisan Cookie Box',
      price: '$12.50',
      image: require('@/assets/images/placeholder.png'),
    },
  ];

  const renderProductCard = ({ item }) => (
    <Pressable
      onPress={() =>
        router.push(
          `/(customer)/restaurants/product/${item.id}?name=${item.name}&price=${item.price}`
        )
      }
      className={`margin-2 flex-1 flex-col overflow-hidden rounded-xl shadow-sm ${isDark ? 'bg-slate-800/50' : 'bg-white'}`}>
      <View className="relative aspect-square w-full bg-slate-200">
        <Image source={item.image} className="h-full w-full" />
        <Pressable className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/90 dark:bg-slate-900/90">
          <Text className="text-lg">🤍</Text>
        </Pressable>
      </View>
      <View className="flex-1 flex-col justify-between p-3">
        <Text
          className={`line-clamp-2 text-sm font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
          {item.name}
        </Text>
        <View className="mt-1 flex-row items-center justify-between">
          <Text className="text-base font-bold text-primary">{item.price}</Text>
          <Pressable className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <Text className="text-lg text-white">+</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
      {/* Header Section */}
      <View
        className={`border-b ${isDark ? 'bg-background-dark/80 border-primary/10' : 'bg-background-light/80 border-primary/10'} flex-row items-center justify-between p-4`}>
        <View className="flex-row items-center gap-3">
          <Pressable
            className="flex size-10 items-center justify-center rounded-full hover:bg-primary/10"
            onPress={() => router.back()}>
            <Text className="text-xl">←</Text>
          </Pressable>
          <Text className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            Adama Bakery & Cake
          </Text>
        </View>
        <Pressable className="relative flex size-10 items-center justify-center rounded-full hover:bg-primary/10">
          <Text className="text-xl">🛒</Text>
          <View className="absolute right-1 top-1 h-4 w-4 items-center justify-center rounded-full bg-primary">
            <Text className="text-[10px] font-bold text-white">3</Text>
          </View>
        </Pressable>
      </View>

      {/* Search Bar */}
      <View className="px-4 pb-4 pt-2">
        <View
          className={`h-12 flex-row items-center rounded-xl pl-4 ${isDark ? 'bg-primary/10' : 'bg-primary/5'}`}>
          <Text className="text-xl text-primary">🔍</Text>
          <TextInput
            className={`flex-1 px-2 text-base ${isDark ? 'text-slate-100' : 'text-slate-900'} placeholder:text-slate-500 dark:placeholder:text-slate-400`}
            placeholder="Search for breads, cakes, or pastries"
            placeholderTextColor={isDark ? '#94a3b8' : '#cbd5e1'}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="border-b border-primary/5">
        <View className="flex-row px-4">
          {categories.map((category) => (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              className={`border-b-2 px-2 pb-3 pt-4 ${
                selectedCategory === category ? 'border-primary' : 'border-transparent'
              }`}>
              <Text
                className={`text-sm font-bold ${
                  selectedCategory === category
                    ? 'text-primary'
                    : isDark
                      ? 'text-slate-400'
                      : 'text-slate-500'
                }`}>
                {category}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Product Grid */}
      <FlatList
        data={products}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 8, paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingVertical: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation Bar */}
      <View
        className={`fixed bottom-0 left-0 right-0 border-t ${isDark ? 'border-primary/10 bg-slate-900' : 'border-primary/10 bg-white'} px-4 pb-6 pt-2`}>
        <View className="flex-row items-center justify-around">
          <Pressable
            onPress={() => router.push('/(customer)/home')}
            className="flex-col items-center gap-1">
            <Text className="text-2xl">🏠</Text>
            <Text className="text-xs font-medium uppercase tracking-tighter text-primary">
              Home
            </Text>
          </Pressable>
          <Pressable className="flex-col items-center gap-1">
            <Text className="text-2xl">📊</Text>
            <Text
              className={`text-xs font-medium uppercase tracking-tighter ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Menu
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(customer)/orders/history')}
            className="flex-col items-center gap-1">
            <Text className="text-2xl">📋</Text>
            <Text
              className={`text-xs font-medium uppercase tracking-tighter ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Orders
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(customer)/profile')}
            className="flex-col items-center gap-1">
            <Text className="text-2xl">👤</Text>
            <Text
              className={`text-xs font-medium uppercase tracking-tighter ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Profile
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
