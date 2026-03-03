import React from 'react';
import { Pressable } from 'react-native';
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
import { AdditionalInfoScreen } from '../screens/owner/AdditionalInfo';
import { DetailedUpdateScreen } from '../screens/public/DetailedUpdateScreen';
import { NotificationScreen } from '../screens/public/NotificationScreen';
import { useAuth } from '../context/AuthProvider';
import { useThemeStore } from '../store/themeStore';

const Tab = createBottomTabNavigator<OwnerTabParamList>();
const Stack = createNativeStackNavigator<OwnerStackParamList>();

const OwnerTabNavigator = () => {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const { mode } = useThemeStore();
  const isDark = mode === 'dark';
  const isOwnerVerified = user?.ownerInfo?.companyVerified === true;

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.OwnerHome}
      screenOptions={({ route }) => ({
        tabBarButton: (props) => {
          const isLocked = !isOwnerVerified && route.name !== ROUTES.OwnerHome;
          const { onPress, style, children, accessibilityState, accessibilityLabel, testID } = props;
          return (
            <Pressable
              onPress={isLocked ? undefined : onPress}
              accessibilityState={accessibilityState}
              accessibilityLabel={accessibilityLabel}
              testID={testID}
              disabled={isLocked}
              style={[style, isLocked ? { opacity: 0.45 } : undefined]}
            >
              {children}
            </Pressable>
          );
        },
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
          const isLocked = !isOwnerVerified && route.name !== ROUTES.OwnerHome;
          const iconName =
            route.name === ROUTES.OwnerHome
              ? 'storefront-outline'
              : route.name === ROUTES.OwnerProducts
              ? 'tag-outline'
              : route.name === ROUTES.OwnerOrders
              ? 'receipt-text-outline'
              : 'account-outline';

          if (isLocked) {
            return <MaterialCommunityIcons name="lock-outline" size={size} color={isDark ? '#78716c' : '#9ca3af'} />;
          }

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

export const OwnerNavigator = ({
  initialRouteName = ROUTES.OwnerTabs,
}: {
  initialRouteName?: keyof OwnerStackParamList;
}) => {
  const { mode } = useThemeStore();
  const isDark = mode === 'dark';
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: Boolean(false),
        animation: 'slide_from_right',
        contentStyle: { flex: 1, backgroundColor: isDark ? '#25211a' : '#ffffff' },
      }}
    >
      <Stack.Screen name={ROUTES.OwnerAdditionalInfo} component={AdditionalInfoScreen} />
      <Stack.Screen name={ROUTES.OwnerTabs} component={OwnerTabNavigator} />
      <Stack.Screen name={ROUTES.OwnerOrderDetail} component={OrderDetailScreen} />
      <Stack.Screen name={ROUTES.Update} component={DetailedUpdateScreen} />
      <Stack.Screen name={ROUTES.Notification} component={NotificationScreen} />
    </Stack.Navigator>
  );
};
