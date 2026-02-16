import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { CustomerTabsParamList } from '../types/navigation';
import { ROUTES } from '../constants/routes';
import { HomeScreen } from '../screens/customer/HomeScreen';
import { AboutScreen } from '../screens/customer/AboutScreen';

const Tab = createBottomTabNavigator<CustomerTabsParamList>();

export const CustomerNavigator = () => {
  return (
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
    </Tab.Navigator>
  );
};
