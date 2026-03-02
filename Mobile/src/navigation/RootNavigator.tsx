import React, { useState } from 'react';
import { AuthNavigator } from './AuthNavigator';
import { CustomerNavigator } from './CustomerNavigator';
import { OwnerNavigator } from './OwnerNavigator';
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

  if (!user) {
    return <AuthNavigator />;
  }

  if (user.role === 'owner') {
    return <OwnerNavigator />;
  }

  return <CustomerNavigator />;
};
