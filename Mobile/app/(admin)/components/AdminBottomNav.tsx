import React from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import type { LucideIcon } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

export interface AdminNavItem {
  label: string;
  icon: LucideIcon;
  route: string;
  active?: boolean;
}

interface AdminBottomNavProps {
  navItems: AdminNavItem[];
  isDark?: boolean;
}

export const AdminBottomNav: React.FC<AdminBottomNavProps> = ({ navItems, isDark: _isDark }) => {
  const router = useRouter();

  return (
    <View
      className="absolute bottom-0 left-0 right-0 flex-row items-center justify-around border-t border-border bg-card px-4 pb-6 pt-2">
      {navItems.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => item.route && router.push(item.route as any)}
          className="flex-1 flex-col items-center gap-1">
          <Icon
            as={item.icon}
            size={24}
            className={
              item.active ? 'text-primary' : 'text-muted-foreground'
            }
          />
          <Text
            className={`text-[10px] font-bold uppercase ${item.active ? 'text-primary' : 'text-muted-foreground'}`}>
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
