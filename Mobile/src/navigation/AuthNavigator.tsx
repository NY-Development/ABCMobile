import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes';
import type { AuthStackParamList } from '../types/navigation';
import { LandingScreen } from '../screens/public/LandingScreen';
import { LoginScreen } from '../screens/public/LoginScreen';
import { RegisterScreen } from '../screens/public/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/public/ForgotPasswordScreen';
import { ResetPasswordScreen } from '../screens/public/ResetPasswordScreen';
import { PasswordResetSuccessScreen } from '../screens/public/PasswordResetSuccessScreen';
import { OTPVerificationScreen } from '../screens/public/OTPVerificationScreen';
import { OAuthSuccessScreen } from '../screens/public/OAuthSuccessScreen';
import { SettingsScreen } from '../screens/public/SettingsScreen';
import { ContactScreen } from '../screens/public/ContactScreen';
import { CustomRequest } from '../screens/public/CustomRequest';
import { PrivacyPolicyScreen } from '../screens/public/PrivacyPolicyScreen';
import { TermsOfServiceScreen } from '../screens/public/TermsOfServiceScreen';
import { EulaScreen } from '../screens/public/EulaScreen';
import { AboutScreen } from '../screens/customer/AboutScreen';

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
      <Stack.Screen name={ROUTES.PasswordResetSuccess} component={PasswordResetSuccessScreen} />
      <Stack.Screen name={ROUTES.OTPVerification} component={OTPVerificationScreen} />
      <Stack.Screen name={ROUTES.OAuthSuccess} component={OAuthSuccessScreen} />
      <Stack.Screen name={ROUTES.Settings} component={SettingsScreen} />
      <Stack.Screen name={ROUTES.About} component={AboutScreen} />
      <Stack.Screen name={ROUTES.Contact} component={ContactScreen} />
      <Stack.Screen name={ROUTES.CustomRequest} component={CustomRequest} />
      <Stack.Screen name={ROUTES.PrivacyPolicy} component={PrivacyPolicyScreen} />
      <Stack.Screen name={ROUTES.TermsOfService} component={TermsOfServiceScreen} />
      <Stack.Screen name={ROUTES.Eula} component={EulaScreen} />
    </Stack.Navigator>
  );
};
