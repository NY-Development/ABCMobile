import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function VendorEditMenuItemScreen() {
  const router = useRouter();
  const { menuId } = useLocalSearchParams<{ menuId: string }>();

  useEffect(() => {
    if (!menuId) {
      router.replace('/(vendor)/menu/inventory');
      return;
    }
    router.replace({ pathname: '/(vendor)/menu', params: { menuId } });
  }, [menuId, router]);

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-muted-foreground">Opening product editor...</Text>
    </View>
  );
}
