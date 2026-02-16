import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes';
import type { AuthStackParamList } from '../types/navigation';
import { LandingScreen } from '../screens/public/LandingScreen';
import { LoginScreen } from '../screens/public/LoginScreen';
import { RegisterScreen } from '../screens/public/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/public/ForgotPasswordScreen';
import { ResetPasswordScreen } from '../screens/public/ResetPasswordScreen';
import { OTPVerificationScreen } from '../screens/public/OTPVerificationScreen';
import { OAuthSuccessScreen } from '../screens/public/OAuthSuccessScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: Boolean(false),
        contentStyle: { flex: 1, backgroundColor: '#ffffff' },
      }}
    >
      <Stack.Screen name={ROUTES.Landing} component={LandingScreen} />
      <Stack.Screen name={ROUTES.Login} component={LoginScreen} />
      <Stack.Screen name={ROUTES.Register} component={RegisterScreen} />
      <Stack.Screen name={ROUTES.ForgotPassword} component={ForgotPasswordScreen} />
      <Stack.Screen name={ROUTES.ResetPassword} component={ResetPasswordScreen} />
      <Stack.Screen name={ROUTES.OTPVerification} component={OTPVerificationScreen} />
      <Stack.Screen name={ROUTES.OAuthSuccess} component={OAuthSuccessScreen} />
    </Stack.Navigator>
  );
};
