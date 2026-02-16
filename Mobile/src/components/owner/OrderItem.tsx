import React from 'react';
import { Text, View } from 'react-native';

type OrderItemProps = {
  title: string;
  status: string;
  total: string;
};

export const OrderItem = ({ title, status, total }: OrderItemProps) => {
  return (
    <View className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
      <Text className="text-base font-semibold text-gray-900">{title}</Text>
      <Text className="text-sm text-gray-500 mt-1">{status}</Text>
      <Text className="text-sm text-orange-600 mt-2">{total}</Text>
    </View>
  );
};
