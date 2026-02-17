import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { CustomerStackParamList, CustomerTabsParamList } from '../types/navigation';
import { ROUTES } from '../constants/routes';
import { HomeScreen } from '../screens/customer/HomeScreen';
import { AboutScreen } from '../screens/customer/AboutScreen';
import { SettingsScreen } from '../screens/public/SettingsScreen';
import { CustomerStorefrontScreen } from '../screens/customer/CustomerStorefrontScreen';
import { ProductDetailScreen } from '../screens/customer/ProductDetailScreen';

const Tab = createBottomTabNavigator<CustomerTabsParamList>();
const Stack = createNativeStackNavigator<CustomerStackParamList>();

const CustomerTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: Boolean(false),
      tabBarActiveTintColor: '#EA580C',
      tabBarInactiveTintColor: '#9CA3AF',
    }}
  >
    <Tab.Screen
      name={ROUTES.Home}
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home-variant" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name={ROUTES.About}
      component={AboutScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="information" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name={ROUTES.Settings}
      component={SettingsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cog" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export const CustomerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: Boolean(false),
        animation: 'fade',
        animationDuration: 260,
      }}
    >
      <Stack.Screen name="CustomerTabs" component={CustomerTabs} />
      <Stack.Screen name={ROUTES.CustomerStorefront} component={CustomerStorefrontScreen} />
      <Stack.Screen name={ROUTES.BakeryDetail} component={CustomerStorefrontScreen} />
      <Stack.Screen name={ROUTES.ProductDetail} component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};
