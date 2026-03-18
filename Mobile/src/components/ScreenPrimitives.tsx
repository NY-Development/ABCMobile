import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { type ReactNode } from 'react';

type ScreenShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  scroll?: boolean;
};

export function ScreenShell({ title, subtitle, children, scroll = true }: ScreenShellProps) {
  const content = (
    <View className="flex-1 bg-background px-4 pb-6 pt-4">
      <Text className="text-2xl font-extrabold text-foreground">{title}</Text>
      {subtitle ? <Text className="mt-1 text-sm text-muted-foreground">{subtitle}</Text> : null}
      <View className="mt-5 flex-1">{children}</View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {scroll ? <ScrollView showsVerticalScrollIndicator={false}>{content}</ScrollView> : content}
    </SafeAreaView>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return <View className="mb-4 rounded-2xl border border-border bg-card p-4">{children}</View>;
}
