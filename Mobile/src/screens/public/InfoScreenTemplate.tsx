import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';

type InfoScreenTemplateProps = {
  title: string;
  description: string;
};

export const InfoScreenTemplate = ({ title, description }: InfoScreenTemplateProps) => {
  const navigation = useNavigation();
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';
  const toggleIconName = isDark ? 'white-balance-sunny' : 'weather-night';
  const toggleIconColor = isDark ? '#f5d67d' : '#374151';

  return (
    <ScrollView className="flex-1 bg-background-light dark:bg-background-dark" contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="flex-row items-center justify-between border-b border-gray-100 bg-background-light/95 px-5 py-4 dark:border-white/10 dark:bg-background-dark/95">
        <Pressable
          onPress={() => navigation.goBack()}
          className="h-10 w-10 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark"
        >
          <MaterialCommunityIcons name="arrow-left" size={20} color={toggleIconColor} />
        </Pressable>
        <Text className="text-lg font-bold tracking-tight text-text-main dark:text-gray-100">{title}</Text>
        <Pressable
          onPress={toggle}
          className="h-10 w-10 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark"
        >
          <MaterialCommunityIcons name={toggleIconName} size={20} color={toggleIconColor} />
        </Pressable>
      </View>

      <View className="px-6 pt-6">
        <Text className="text-base leading-7 text-gray-600 dark:text-gray-400">
          {description}
        </Text>
      </View>
    </ScrollView>
  );
};
