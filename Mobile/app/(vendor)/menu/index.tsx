import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, PenLine, ChevronDown, Save } from 'lucide-react-native';

export default function ManageProductScreen() {
  const router = useRouter();
  const [featured, setFeatured] = useState(false);

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1">
        <View className="flex-row items-center border-b border-border px-4 py-3">
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full">
            <ArrowLeft size={20} color="#ec5b13" />
          </Pressable>
          <Text className="ml-1 text-xl font-bold text-foreground">Add / Edit Product</Text>
        </View>

        <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
          <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Product Image
          </Text>
          <View className="relative mb-6 h-72 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted">
            <Camera size={30} color="#ec5b13" />
            <Text className="mt-2 text-sm font-semibold text-muted-foreground">
              Tap to upload product photo
            </Text>
            <Pressable className="absolute bottom-4 right-4 h-10 w-10 items-center justify-center rounded-full bg-primary">
              <PenLine size={16} color="#fff" />
            </Pressable>
          </View>

          <Text className="mb-3 text-lg font-bold text-foreground">Product Details</Text>

          <Text className="mb-1 text-sm font-semibold text-foreground">Product Name</Text>
          <TextInput
            className="mb-4 h-12 rounded-xl border border-border bg-card px-4 text-foreground"
            placeholder="e.g. Adama Signature Croissant"
            placeholderTextColor="#9ca3af"
          />

          <Text className="mb-1 text-sm font-semibold text-foreground">Category</Text>
          <Pressable className="mb-4 h-12 flex-row items-center justify-between rounded-xl border border-border bg-card px-4">
            <Text className="text-muted-foreground">Select a category</Text>
            <ChevronDown size={18} color="#6b7280" />
          </Pressable>

          <Text className="mb-1 text-sm font-semibold text-foreground">Description</Text>
          <TextInput
            className="mb-4 rounded-xl border border-border bg-card px-4 py-3 text-foreground"
            placeholder="Describe flavors, ingredients, and allergens..."
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={4}
          />

          <View className="mb-5 flex-row gap-3">
            <View className="flex-1">
              <Text className="mb-1 text-sm font-semibold text-foreground">Price ($)</Text>
              <TextInput
                className="h-12 rounded-xl border border-border bg-card px-4 text-foreground"
                placeholder="0.00"
                placeholderTextColor="#9ca3af"
                keyboardType="decimal-pad"
              />
            </View>
            <View className="flex-1">
              <Text className="mb-1 text-sm font-semibold text-foreground">Initial Stock</Text>
              <TextInput
                className="h-12 rounded-xl border border-border bg-card px-4 text-foreground"
                placeholder="0"
                placeholderTextColor="#9ca3af"
                keyboardType="number-pad"
              />
            </View>
          </View>

          <View className="mb-24 flex-row items-center justify-between rounded-xl border border-primary/20 bg-primary/10 p-4">
            <View>
              <Text className="font-bold text-foreground">Make Featured</Text>
              <Text className="text-xs text-muted-foreground">Show on homepage banner</Text>
            </View>
            <Pressable
              onPress={() => setFeatured((p) => !p)}
              className={`h-6 w-11 rounded-full ${featured ? 'bg-primary' : 'bg-border'}`}>
              <View
                className={`mt-0.5 h-5 w-5 rounded-full bg-white ${featured ? 'ml-5' : 'ml-0.5'}`}
              />
            </Pressable>
          </View>
        </ScrollView>

        <View className="border-t border-border bg-card p-4">
          <Pressable className="flex-row items-center justify-center gap-2 rounded-xl bg-primary py-4">
            <Save size={16} color="#fff" />
            <Text className="font-bold text-white">Save Product</Text>
          </Pressable>
          <Pressable className="mt-2 py-2" onPress={() => router.back()}>
            <Text className="text-center text-sm font-semibold text-muted-foreground">Cancel</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
