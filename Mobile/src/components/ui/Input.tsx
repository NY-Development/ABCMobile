import React from 'react';
import { TextInput, View, Text } from 'react-native';

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
  return (
    <View className="w-full">
      {label ? <Text className="mb-2 text-sm text-gray-600">{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={Boolean(secureTextEntry)}
        keyboardType={keyboardType}
        className={`w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 ${
          className ?? ''
        }`}
      />
    </View>
  );
};
