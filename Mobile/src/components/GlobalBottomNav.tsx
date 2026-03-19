import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useThemeStore } from '@/src/features/theme';
import { Home, UserPlus, LogIn, Settings } from 'lucide-react-native';

export const GlobalBottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isDark } = useThemeStore();

  const navItems = [
    { name: 'Home', route: '/(global)/landing', icon: Home },
    { name: 'Register', route: '/(global)/register', icon: UserPlus },
    { name: 'Login', route: '/(global)/login', icon: LogIn },
    { name: 'Settings', route: '/(global)/settings', icon: Settings },
  ];

  const isActive = (route: string) => {
    return pathname === route;
  };

  return (
    <View
      className={`border-t ${
        isDark ? 'bg-background-dark border-border' : 'bg-background-light border-border'
      } flex-row items-center justify-between px-2 py-3`}>
      {navItems.map((item) => {
        const active = isActive(item.route);
        const IconComponent = item.icon;

        return (
          <Pressable
            key={item.route}
            onPress={() => router.push(item.route as any)}
            className={`flex-1 items-center rounded-lg py-2 ${
              active ? 'bg-primary/10' : ''
            } active:opacity-70`}>
            <IconComponent size={24} color={active ? '#ec5b13' : isDark ? '#94a3b8' : '#64748b'} />
            <Text
              className={`mt-1 text-xs font-medium ${
                active ? 'text-primary' : isDark ? 'text-muted-foreground' : 'text-muted-foreground'
              }`}>
              {item.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
