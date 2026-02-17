import React from 'react';
import { Image, Text, View } from 'react-native';

type ProductCardProps = {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
};

export const ProductCard = ({ title, description, price, imageUrl }: ProductCardProps) => {
  return (
    <View className="w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-neutral-dark dark:bg-surface-dark">
      <Image source={{ uri: imageUrl }} className="h-36 w-full" />
      <View className="p-4">
        <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100" numberOfLines={1}>
          {title}
        </Text>
        <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400" numberOfLines={2}>
          {description}
        </Text>
        <Text className="mt-3 text-base font-bold text-orange-600 dark:text-orange-400">{price}</Text>
      </View>
    </View>
  );
};
