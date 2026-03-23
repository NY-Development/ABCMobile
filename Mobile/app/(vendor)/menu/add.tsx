import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function VendorAddMenuItemScreen() {
  const router = useRouter();

  useEffect(() => {
    // Reuse the already-built "Add / Edit Product" form screen.
    router.replace('/(vendor)/menu');
  }, [router]);

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-muted-foreground">Redirecting...</Text>
    </View>
  );
}
