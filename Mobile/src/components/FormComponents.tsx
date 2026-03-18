import React from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useThemeStore } from '@/src/features/theme';

interface FormInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  editable?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  icon?: React.ReactNode;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  editable = true,
  keyboardType = 'default',
  icon,
}) => {
  const { isDark } = useThemeStore();

  return (
    <View className="gap-2">
      <Text className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
        {label}
      </Text>
      <View
        className={`flex-row items-center gap-2 rounded-xl border px-4 ${
          isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
        } ${error ? (isDark ? 'border-red-600' : 'border-red-400') : ''}`}>
        {icon}
        <TextInput
          className={`flex-1 py-3 text-base font-normal ${isDark ? 'text-white' : 'text-slate-900'}`}
          placeholder={placeholder}
          placeholderTextColor={isDark ? '#94a3b8' : '#cbd5e1'}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          editable={editable}
          keyboardType={keyboardType}
        />
      </View>
      {error && <Text className="text-xs font-semibold text-red-500">{error}</Text>}
    </View>
  );
};

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  loading = false,
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`flex-row items-center justify-center gap-2 rounded-xl py-3 ${
        disabled || loading ? 'opacity-50' : 'active:opacity-70'
      } bg-primary transition-opacity hover:opacity-90`}
      style={{ cursor: disabled || loading ? 'not-allowed' : 'pointer' }}>
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <Text className="text-base font-bold text-white">{label}</Text>
      )}
    </Pressable>
  );
};

interface SecondaryButtonProps {
  label: string;
  onPress: () => void;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({ label, onPress }) => {
  const { isDark } = useThemeStore();

  return (
    <Pressable
      onPress={onPress}
      className={`rounded-xl border-2 border-primary py-3 transition-opacity hover:opacity-80 active:opacity-70`}
      style={{ cursor: 'pointer' }}>
      <Text className="text-center text-base font-bold text-primary">{label}</Text>
    </Pressable>
  );
};
