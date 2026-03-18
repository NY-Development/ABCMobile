import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useThemeStore } from '@/src/features/theme';
import { Moon, Sun } from 'lucide-react-native';

interface ScreenHeaderProps {
  showThemeToggle?: boolean;
  title?: string;
  subtitle?: string;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  showThemeToggle = true,
  title,
  subtitle,
}) => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <View
      className={`flex-row items-center justify-between px-4 py-3 ${
        isDark ? 'bg-background-dark' : 'bg-background-light'
      }`}>
      <View className="flex-1">
        {title && (
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {subtitle}
          </Text>
        )}
      </View>

      {showThemeToggle && (
        <Pressable
          onPress={toggleTheme}
          className="rounded-lg p-2 active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          {isDark ? (
            <Sun size={24} color="#ec5b13" strokeWidth={2} />
          ) : (
            <Moon size={24} color="#ec5b13" strokeWidth={2} />
          )}
        </Pressable>
      )}
    </View>
  );
};
