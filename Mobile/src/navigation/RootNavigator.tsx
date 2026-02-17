import React, { useState } from 'react';
import { AuthNavigator } from './AuthNavigator';
import { CustomerNavigator } from './CustomerNavigator';
import { useAuth } from '../context/AuthProvider';
import { SplashScreen } from '../screens/public/SplashScreen';

export const RootNavigator = () => {
  const { user, initialized } = useAuth();
  const [splashHidden, setSplashHidden] = useState(false);

  if (!splashHidden) {
    return (
      <SplashScreen
        shouldExit={Boolean(initialized)}
        onFinish={() => setSplashHidden(true)}
      />
    );
  }

  return Boolean(user) ? <CustomerNavigator /> : <AuthNavigator />;
};
