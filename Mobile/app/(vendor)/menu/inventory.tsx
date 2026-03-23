import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Pencil, Trash2, Plus, Boxes } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/src/features/auth';
import { vendorAPI } from '@/src/services/vendor';
import { Icon } from '@/components/ui/icon';

const categoryOptions = ['All Products', 'Cookies', 'Waffles', 'Macarons', 'Snacks', 'Beverages', 'Cake'] as const;

export default function ProductInventoryScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const ownerId = (user as any)?._id ?? (user as any)?.id;

  const [activeCategory, setActiveCategory] = useState<(typeof categoryOptions)[number]>('All Products');

  const { data: productsData, isLoading, error, refetch } = useQuery({
    queryKey: ['vendor', 'products', 'my'],
    enabled: !!ownerId,
    queryFn: () => vendorAPI.getMyProducts(ownerId),
    staleTime: 1000 * 60,
  });

  const products = productsData ?? [];

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All Products') return products;
    return products.filter((p: any) => p?.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1">
        <View className="border-b border-border px-4 py-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon as={Boxes} size={18} className="text-primary" />
              </View>
              <View>
                  <Text className="text-lg font-bold text-foreground">Inventory Management</Text>
                <Text className="text-xs text-muted-foreground">Inventory Management</Text>
              </View>
            </View>
            <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Icon as={Search} size={18} className="text-muted-foreground" />
            </Pressable>
          </View>
        </View>

        <ScrollView
          horizontal
          className="border-b border-border px-4"
          showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-6">
            {categoryOptions.map((cat) => (
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
          {isLoading ? (
            <View className="py-10 items-center justify-center">
              <ActivityIndicator size="large" />
            </View>
          ) : error ? (
            <View className="py-10 items-center justify-center">
              <Text className="text-destructive">Error loading products</Text>
            </View>
          ) : filteredProducts.length ? (
            filteredProducts.map((p: any) => (
              <View
                key={p._id}
                className="mb-3 flex-row rounded-xl border border-border bg-card p-3"
              >
                <View className="h-20 w-20 rounded-lg bg-muted" />
                <View className="ml-3 flex-1">
                  <Text className="font-bold text-foreground">{p.name}</Text>
                  <View className="mt-1 flex-row items-center gap-2">
                    <Text className="font-bold text-primary">ETB {Number(p.price || 0).toLocaleString()}</Text>
                    <View className="h-1 w-1 rounded-full bg-border" />
                    <Text className="text-xs text-muted-foreground">
                      {Number(p.availableQuantity || 0)} in stock
                    </Text>
                  </View>
                  <View className="mt-1">
                    <Text className="text-xs text-muted-foreground">{p.category}</Text>
                  </View>
                  <View className="mt-2 flex-row gap-2">
                    <Pressable
                      onPress={() => router.push(`/(vendor)/menu/edit/${p._id}`)}
                      className="flex-row items-center gap-1 rounded-lg bg-muted px-3 py-1.5"
                    >
                      <Icon as={Pencil} size={13} className="text-muted-foreground" />
                      <Text className="text-xs font-semibold text-foreground">Edit</Text>
                    </Pressable>
                    <Pressable
                      onPress={async () => {
                        await vendorAPI.deleteProduct(p._id);
                        await refetch();
                      }}
                      className="flex-row items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1.5"
                    >
                      <Icon as={Trash2} size={13} className="text-destructive" />
                      <Text className="text-xs font-semibold text-destructive">Delete</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View className="items-center justify-center py-10">
              <Text className="text-muted-foreground">No products found</Text>
            </View>
          )}
          <View className="h-8" />
        </ScrollView>

        <Pressable
          onPress={() => router.push('/(vendor)/menu')}
          className="absolute bottom-20 right-5 flex-row items-center gap-2 rounded-full bg-primary px-4 py-3 shadow-lg">
          <Icon as={Plus} size={16} className="text-primary-foreground" />
          <Text className="font-bold text-primary-foreground">Add Product</Text>
        </Pressable>
      </View>
    </View>
  );
}
