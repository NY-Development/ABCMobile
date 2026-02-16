import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
};

const baseClasses = 'rounded-xl px-5 py-3 items-center justify-center';

export const Button = ({
  title,
  onPress,
  loading,
  disabled,
  variant = 'primary',
  className,
}: ButtonProps) => {
  const isDisabled = Boolean(disabled) || Boolean(loading);
  const variantClassName =
    variant === 'primary'
      ? 'bg-orange-600'
      : variant === 'secondary'
      ? 'bg-gray-800'
      : 'border border-orange-600';
  const textClassName =
    variant === 'outline' ? 'text-orange-600' : 'text-white';

  return (
    <Pressable
      onPress={onPress}
      disabled={Boolean(isDisabled)}
      className={`${baseClasses} ${variantClassName} ${
        isDisabled ? 'opacity-60' : ''
      } ${className ?? ''}`}
    >
      {Boolean(loading) ? (
        <ActivityIndicator color={variant === 'outline' ? '#EA580C' : '#fff'} />
      ) : (
        <Text className={`text-base font-semibold ${textClassName}`}>{title}</Text>
      )}
    </Pressable>
  );
};
