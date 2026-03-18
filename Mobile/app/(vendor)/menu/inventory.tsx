import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Pencil, Trash2, Plus, Boxes } from 'lucide-react-native';

const categories = ['All Products', 'Cakes', 'Breads', 'Pastries', 'Seasonal'];

const products = [
  { id: '1', name: 'Chocolate Fudge Cake', price: '$25.00', stock: '15 in stock' },
  { id: '2', name: 'Strawberry Shortcake', price: '$22.00', stock: '8 in stock' },
  { id: '3', name: 'Artisan Sourdough', price: '$12.00', stock: '24 in stock' },
  { id: '4', name: 'Butter Croissants (4pk)', price: '$15.50', stock: '12 in stock' },
];

export default function ProductInventoryScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All Products');

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1">
        <View className="border-b border-border px-4 py-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Boxes size={18} color="#ec5b13" />
              </View>
              <View>
                <Text className="text-lg font-bold text-foreground">Adama Bakery</Text>
                <Text className="text-xs text-muted-foreground">Inventory Management</Text>
              </View>
            </View>
            <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Search size={18} color="#6b7280" />
            </Pressable>
          </View>
        </View>

        <ScrollView
          horizontal
          className="border-b border-border px-4"
          showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-6">
            {categories.map((cat) => (
              <Pressable
                key={cat}
                onPress={() => setActiveCategory(cat)}
                className={`border-b-2 pb-3 pt-4 ${activeCategory === cat ? 'border-primary' : 'border-transparent'}`}>
                <Text
                  className={`text-sm font-bold ${activeCategory === cat ? 'text-primary' : 'text-muted-foreground'}`}>
                  {cat}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
          {products.map((item) => (
            <View
              key={item.id}
              className="mb-3 flex-row rounded-xl border border-border bg-card p-3">
              <View className="h-20 w-20 rounded-lg bg-muted" />
              <View className="ml-3 flex-1">
                <Text className="font-bold text-foreground">{item.name}</Text>
                <View className="mt-1 flex-row items-center gap-2">
                  <Text className="font-bold text-primary">{item.price}</Text>
                  <View className="h-1 w-1 rounded-full bg-border" />
                  <Text className="text-xs text-muted-foreground">{item.stock}</Text>
                </View>
                <View className="mt-2 flex-row gap-2">
                  <Pressable className="flex-row items-center gap-1 rounded-lg bg-muted px-3 py-1.5">
                    <Pencil size={13} color="#6b7280" />
                    <Text className="text-xs font-semibold text-foreground">Edit</Text>
                  </Pressable>
                  <Pressable className="flex-row items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5">
                    <Trash2 size={13} color="#dc2626" />
                    <Text className="text-xs font-semibold text-red-600">Delete</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
          <View className="h-8" />
        </ScrollView>

        <Pressable
          onPress={() => router.push('/(vendor)/menu')}
          className="absolute bottom-20 right-5 flex-row items-center gap-2 rounded-full bg-primary px-4 py-3 shadow-lg">
          <Plus size={16} color="#fff" />
          <Text className="font-bold text-white">Add Product</Text>
        </Pressable>
      </View>
    </View>
  );
}
