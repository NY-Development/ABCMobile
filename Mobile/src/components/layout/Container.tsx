import React from 'react';
import { View } from 'react-native';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const Container = ({ children, className }: ContainerProps) => {
  return <View className={`px-5 ${className ?? ''}`}>{children}</View>;
};
