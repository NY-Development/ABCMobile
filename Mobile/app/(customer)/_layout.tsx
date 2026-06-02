import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Slot, usePathname, useRouter } from 'expo-router';
import { useAuthStore } from '@/src/features/auth';
import {
  Home,
  Search,
  ShoppingBag,
  CircleUserRound,
  LucideIcon,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon as UiIcon } from '@/components/ui/icon';

export default function CustomerLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!user || !isAuthenticated) {
      router.replace('/(global)/login');
    }
  }, [user, isAuthenticated, router]);

  const isHome = pathname === '/(customer)/home' || pathname === '/(customer)/home/';
  const isExplore = pathname.startsWith('/(customer)/restaurants');
  const isOrders = pathname.startsWith('/(customer)/orders');
  const isProfile = pathname.startsWith('/(customer)/profile');

  const NavButton = ({
    icon: Icon,
    label,
    isActive,
    onPress,
  }: {
    icon: LucideIcon;
    label: string;
    isActive: boolean;
    onPress: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      className={`flex-1 items-center gap-1 rounded-lg py-2 ${
        isActive ? 'bg-primary/10' : ''
      }`}>
      <UiIcon
        as={Icon}
        size={20}
        className={isActive ? 'text-primary' : 'text-muted-foreground'}
      />
      <Text
        className={`text-[10px] font-bold uppercase ${
          isActive ? 'text-primary' : 'text-muted-foreground'
        }`}>
        {label}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <View className="flex-1">
        <Slot />
      </View>

      <View className="flex-row gap-1 border-t border-border bg-card px-2 pb-2 pt-2">
        <NavButton
          icon={Home}
          label="Home"
          isActive={isHome}
          onPress={() => router.push('/(customer)/home')}
        />
        <NavButton
          icon={Search}
          label="Explore"
          isActive={isExplore}
          onPress={() => router.push('/(customer)/restaurants')}
        />
        <NavButton
          icon={ShoppingBag}
          label="Orders"
          isActive={isOrders}
          onPress={() => router.push('/(customer)/orders/history')}
        />
        <NavButton
          icon={CircleUserRound}
          label="Profile"
          isActive={isProfile}
          onPress={() => router.push('/(customer)/profile')}
        />
      </View>
    </SafeAreaView>
  );
}
