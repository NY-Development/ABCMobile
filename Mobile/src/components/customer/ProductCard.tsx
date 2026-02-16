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
    <View className="w-64 rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
      <Image source={{ uri: imageUrl }} className="h-36 w-full" />
      <View className="p-4">
        <Text className="text-lg font-semibold text-gray-900" numberOfLines={1}>
          {title}
        </Text>
        <Text className="text-sm text-gray-500 mt-1" numberOfLines={2}>
          {description}
        </Text>
        <Text className="text-base font-bold text-orange-600 mt-3">{price}</Text>
      </View>
    </View>
  );
};
