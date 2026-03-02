import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ROUTES } from '../constants/routes';
import type { OwnerStackParamList, OwnerTabParamList } from '../types/navigation';
import { HomeScreen } from '../screens/owner/HomeScreen';
import { ProductsScreen } from '../screens/owner/ProductsScreen';
import { OrdersScreen } from '../screens/owner/OrdersScreen';
import { ProfileScreen } from '../screens/owner/ProfileScreen';
import { OrderDetailScreen } from '../screens/owner/OrderDetailScreen';
import { useThemeStore } from '../store/themeStore';

const Tab = createBottomTabNavigator<OwnerTabParamList>();
const Stack = createNativeStackNavigator<OwnerStackParamList>();

const OwnerTabNavigator = () => {
  const insets = useSafeAreaInsets();
  const { mode } = useThemeStore();
  const isDark = mode === 'dark';

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.OwnerHome}
      screenOptions={({ route }) => ({
        headerShown: Boolean(false),
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: isDark ? '#a1a1aa' : '#9ca3af',
        tabBarStyle: {
          height: 56 + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 8,
          backgroundColor: isDark ? '#25211a' : '#ffffff',
          borderTopColor: isDark ? '#3f3a2f' : '#f1eee7',
          borderTopWidth: 1,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          overflow: 'hidden',
        },
        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === ROUTES.OwnerHome
              ? 'storefront-outline'
              : route.name === ROUTES.OwnerProducts
              ? 'tag-outline'
              : route.name === ROUTES.OwnerOrders
              ? 'receipt-text-outline'
              : 'account-outline';

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={ROUTES.OwnerHome} component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name={ROUTES.OwnerProducts} component={ProductsScreen} options={{ title: 'Products' }} />
      <Tab.Screen name={ROUTES.OwnerOrders} component={OrdersScreen} options={{ title: 'Orders' }} />
      <Tab.Screen name={ROUTES.OwnerProfile} component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

export const OwnerNavigator = () => {
  const { mode } = useThemeStore();
  const isDark = mode === 'dark';
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.OwnerTabs}
      screenOptions={{
        headerShown: Boolean(false),
        animation: 'slide_from_right',
        contentStyle: { flex: 1, backgroundColor: isDark ? '#25211a' : '#ffffff' },
      }}
    >
      <Stack.Screen name={ROUTES.OwnerTabs} component={OwnerTabNavigator} />
      <Stack.Screen name={ROUTES.OwnerOrderDetail} component={OrderDetailScreen} />
    </Stack.Navigator>
  );
};
