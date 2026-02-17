import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { CustomerStackParamList } from '../types/navigation';
import { ROUTES } from '../constants/routes';
import { CustomerStorefrontScreen } from '../screens/customer/CustomerStorefrontScreen';
import { ProductDetailScreen } from '../screens/customer/ProductDetailScreen';
import { CustomerProfileScreen } from '../screens/customer/CustomerProfileScreen';

const Stack = createNativeStackNavigator<CustomerStackParamList>();

export const CustomerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: Boolean(false),
        animation: 'fade',
        animationDuration: 260,
      }}
    >
      <Stack.Screen name={ROUTES.CustomerStorefront} component={CustomerStorefrontScreen} />
      <Stack.Screen name={ROUTES.BakeryDetail} component={CustomerStorefrontScreen} />
      <Stack.Screen name={ROUTES.ProductDetail} component={ProductDetailScreen} />
      <Stack.Screen name={ROUTES.CustomerProfile} component={CustomerProfileScreen} />
    </Stack.Navigator>
  );
};
