import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { useThemeStore } from '../../store/themeStore';

type InputProps = {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  className?: string;
};

export const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  className,
}: InputProps) => {
  const mode = useThemeStore((state) => state.mode);
  const placeholderColor = mode === 'dark' ? '#9aa0a6' : '#9CA3AF';

  return (
    <View className="w-full">
      {label ? (
        <Text className="mb-2 text-sm text-gray-600 dark:text-gray-300">{label}</Text>
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        secureTextEntry={Boolean(secureTextEntry)}
        keyboardType={keyboardType}
        className={`w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 dark:border-neutral-dark dark:bg-surface-dark dark:text-gray-100 ${
          className ?? ''
        }`}
      />
    </View>
  );
};
