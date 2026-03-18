import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/src/features/theme';
import { ArrowLeft, Moon, Sun } from 'lucide-react-native';

interface ScreenLayoutProps {
  title?: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  showThemeToggle?: boolean;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  title,
  children,
  showBackButton = true,
  showThemeToggle = true,
}) => {
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeStore();
  const bgClass = isDark ? 'bg-background-dark' : 'bg-background-light';
  const textClass = isDark ? 'text-white' : 'text-slate-900';

  return (
    <View className={`flex-1 ${bgClass}`}>
      {/* Header */}
      <View
        className={`flex-row items-center justify-between border-b px-4 py-3 ${
          isDark ? 'bg-background-dark border-slate-800' : 'bg-background-light border-slate-200'
        }`}>
        {showBackButton ? (
          <Pressable
            onPress={() => router.back()}
            className="rounded-full p-2 active:opacity-70"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <ArrowLeft size={24} color={isDark ? '#ffffff' : '#1e293b'} />
          </Pressable>
        ) : (
          <View className="w-10" />
        )}

        {title && (
          <Text className={`text-lg font-bold ${textClass} flex-1 text-center`}>{title}</Text>
        )}

        {showThemeToggle ? (
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
        ) : (
          <View className="w-10" />
        )}
      </View>

      {/* Content */}
      {children}
    </View>
  );
};
