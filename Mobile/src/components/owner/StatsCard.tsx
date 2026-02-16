import React from 'react';
import { Text, View } from 'react-native';

type StatsCardProps = {
  title: string;
  value: string;
};

export const StatsCard = ({ title, value }: StatsCardProps) => {
  return (
    <View className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
      <Text className="text-sm text-gray-500">{title}</Text>
      <Text className="text-2xl font-bold text-gray-900 mt-2">{value}</Text>
    </View>
  );
};
