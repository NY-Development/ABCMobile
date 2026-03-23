import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Slot, usePathname, useRouter } from 'expo-router';
import {
  LayoutDashboard,
  Boxes,
  ClipboardList,
  Settings,
  CircleUserRound,
  LucideIcon,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/src/features/auth';
import { Icon as UiIcon } from '@/components/ui/icon';

export default function VendorLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (!user || !token) {
      router.replace('/(global)/landing');
    }
  }, [user, token, router]);

  // Check if user is in verification flow
  const isInVerification = pathname.startsWith('/(vendor)/verification');
  const isFirstLogin = user?.firstLogin === true;
  const shouldHideNav2 = isInVerification || isFirstLogin;
  const shouldHideNav = isInVerification
  const isDashboard = pathname.startsWith('/(vendor)/dashboard');
  const isInventory = pathname.startsWith('/(vendor)/menu/inventory');
  const isOrders = pathname.startsWith('/(vendor)/orders');
  const isSettings = pathname.startsWith('/(vendor)/settings');
  const isProfile = pathname.startsWith('/(vendor)/profile');

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
      disabled={shouldHideNav}
      className={`flex-1 items-center gap-1 rounded-lg py-2 ${
        isActive ? 'bg-primary/10' : ''
      } ${shouldHideNav ? 'opacity-50' : ''}`}>
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

      {!shouldHideNav && (
        <View className="flex-row gap-1 border-t border-border bg-card px-2 pb-2 pt-2">
          <NavButton
            icon={LayoutDashboard}
            label="Dashboard"
            isActive={isDashboard}
            onPress={() => router.push('/(vendor)/dashboard')}
          />
          <NavButton
            icon={Boxes}
            label="Inventory"
            isActive={isInventory}
            onPress={() => router.push('/(vendor)/menu/inventory')}
          />
          <NavButton
            icon={ClipboardList}
            label="Orders"
            isActive={isOrders}
            onPress={() => router.push('/(vendor)/orders')}
          />
          <NavButton
            icon={CircleUserRound}
            label="Profile"
            isActive={isProfile}
            onPress={() => router.push('/(vendor)/profile')}
          />
          <NavButton
            icon={Settings}
            label="Settings"
            isActive={isSettings}
            onPress={() => router.push('/(vendor)/settings' as any)}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
