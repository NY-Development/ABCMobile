import React, { useMemo } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useAuthStore } from '@/src/features/auth';
import { useQuery } from '@tanstack/react-query';
import { vendorAPI } from '@/src/services/vendor';
import { Icon } from '@/components/ui/icon';

export default function VendorEditMenuItemScreen() {
  const router = useRouter();
  const { menuId } = useLocalSearchParams<{ menuId: string }>();
  const { user } = useAuthStore();
  const ownerId = (user as any)?._id ?? (user as any)?.id;

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['vendor', 'products', 'my'],
    enabled: !!ownerId,
    queryFn: () => vendorAPI.getMyProducts(ownerId),
    staleTime: 1000 * 60,
  });

  const product = useMemo(() => {
    const products = productsData ?? [];
    return products.find((p: any) => String(p?._id) === String(menuId));
  }, [productsData, menuId]);

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-row items-center border-b border-border px-4 py-3">
          <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full">
            <Icon as={ArrowLeft} size={20} className="text-primary" />
          </Pressable>
          <Text className="ml-3 text-lg font-bold text-foreground">Edit Product</Text>
        </View>

        <View className="px-4 py-6">
          {isLoading ? (
            <Text className="text-muted-foreground">Loading product...</Text>
          ) : product ? (
            <View className="rounded-xl border border-border bg-card p-4">
              <Text className="mb-2 text-xl font-bold text-foreground">{product.name}</Text>
              <Text className="text-sm text-muted-foreground">Category: {product.category}</Text>
              <Text className="mt-2 text-sm font-semibold text-foreground">
                Price: ETB {Number(product.price || 0).toLocaleString()}
              </Text>
              <Text className="mt-1 text-sm text-muted-foreground">
                Stock: {Number(product.availableQuantity || 0)} available
              </Text>
              <Text className="mt-1 text-sm text-muted-foreground">
                Status: {product.isActive ? 'Active' : 'Inactive'}
              </Text>
              {product.description ? (
                <Text className="mt-4 text-sm text-muted-foreground">{product.description}</Text>
              ) : null}
            </View>
          ) : (
            <Text className="text-muted-foreground">Product not found</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
