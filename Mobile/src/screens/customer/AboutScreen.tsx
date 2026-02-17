import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Container } from '../../components/layout/Container';

const heroImage =
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop';

const features = [
  {
    icon: 'chef-hat',
    title: 'Local excellence',
    description: 'Baked daily in Adama by trusted artisans.',
  },
  {
    icon: 'clock-fast',
    title: 'Real-time updates',
    description: 'Track orders from the oven to pickup.',
  },
  {
    icon: 'credit-card',
    title: 'Secure payments',
    description: 'Easy and safe checkout every time.',
  },
  {
    icon: 'map-marker-radius',
    title: 'Easy pickup',
    description: 'Find nearby bakeries and schedule pickup.',
  },
];

export const AboutScreen = () => {
  return (
    <ScrollView className="flex-1 bg-background-light dark:bg-background-dark">
      <Image source={{ uri: heroImage }} className="h-64 w-full" />
      <Container className="py-6">
        <Text className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">About ABC</Text>
        <Text className="mt-3 text-base text-gray-600 dark:text-gray-400">
          Adama Bakery & Cake connects customers and local bakers with curated
          collections, custom orders, and a smooth pickup experience.
        </Text>

        <View className="mt-8 space-y-4">
          {features.map((feature) => (
            <View
              key={feature.title}
              className="flex-row items-start rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-neutral-dark dark:bg-surface-dark"
            >
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-neutral-dark">
                <MaterialCommunityIcons
                  name={feature.icon as never}
                  size={22}
                  color="#EA580C"
                />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  {feature.title}
                </Text>
                <Text className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Container>
    </ScrollView>
  );
};
