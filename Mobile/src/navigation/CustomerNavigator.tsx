import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { CustomerStackParamList, CustomerTabParamList } from '../types/navigation';
import { ROUTES } from '../constants/routes';
import { HomeScreen } from '../screens/customer/HomeScreen';
import { ExploreScreen } from '../screens/customer/ExploreScreen';
import { OrdersScreen } from '../screens/customer/OrdersScreen';
import { CartScreen } from '../screens/customer/CartScreen';
import { CheckoutScreen } from '../screens/customer/CheckoutScreen';
import { NotificationScreen } from '../screens/public/NotificationScreen';
import { CustomerStorefrontScreen } from '../screens/customer/CustomerStorefrontScreen';
import { ProductDetailScreen } from '../screens/customer/ProductDetailScreen';
import { CustomerProfileScreen } from '../screens/customer/CustomerProfileScreen';
import { useThemeStore } from '../store/themeStore';

const Stack = createNativeStackNavigator<CustomerStackParamList>();
const Tab = createBottomTabNavigator<CustomerTabParamList>();

const CustomerTabNavigator = () => {
  const insets = useSafeAreaInsets();
  const { mode } = useThemeStore();
  const isDark = mode === 'dark';

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.CustomerHome}
      screenOptions={({ route }) => ({
        headerShown: Boolean(false),
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: isDark ? '#b8ab8d' : '#9a864c',
        tabBarStyle: {
          height: 56 + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 6,
          backgroundColor: isDark ? '#2d2616' : '#ffffff',
          borderTopColor: isDark ? '#3f3a2f' : '#f1eee7',
          borderTopWidth: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        },
        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === ROUTES.CustomerHome
              ? 'home'
              : route.name === ROUTES.Explore
              ? 'magnify'
              : route.name === ROUTES.Orders
              ? 'shopping-outline'
              : 'account';

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={ROUTES.CustomerHome} component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name={ROUTES.Explore} component={ExploreScreen} options={{ title: 'Explore' }} />
      <Tab.Screen name={ROUTES.Orders} component={OrdersScreen} options={{ title: 'Orders' }} />
      <Tab.Screen name={ROUTES.CustomerProfile} component={CustomerProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

export const CustomerNavigator = () => {
  const { mode } = useThemeStore();
  const isDark = mode === 'dark';
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.CustomerTabs}
      screenOptions={{
        headerShown: Boolean(false),
        animation: 'fade',
        animationDuration: 260,
        contentStyle: { 
          flex: 1, 
          backgroundColor: isDark ? '#2d2616' : '#ffffff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
         },
      }}
    >
      <Stack.Screen name={ROUTES.CustomerTabs} component={CustomerTabNavigator} />
      <Stack.Screen name={ROUTES.CustomerStorefront} component={CustomerStorefrontScreen} />
      <Stack.Screen name={ROUTES.BakeryDetail} component={CustomerStorefrontScreen} />
      <Stack.Screen name={ROUTES.ProductDetail} component={ProductDetailScreen} />
      <Stack.Screen name={ROUTES.Cart} component={CartScreen} />
      <Stack.Screen name={ROUTES.Checkout} component={CheckoutScreen} />
      <Stack.Screen name={ROUTES.Notification} component={NotificationScreen} />
    </Stack.Navigator>
  );
};
