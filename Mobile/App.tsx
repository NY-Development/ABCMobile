import './global.css';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

import { RootNavigator } from './src/navigation';
import { AuthProvider } from './src/context/AuthProvider';
import { useThemeStore } from './src/store/themeStore';

// Prevent the splash screen from hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

const paperTheme = { ...MD3LightTheme, dark: false };

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const initializeTheme = useThemeStore((state) => state.initialize);
  const mode = useThemeStore((state) => state.mode);
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts/icons to stop the "6000ms timeout" error
        await Font.loadAsync(MaterialCommunityIcons.font);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  useEffect(() => {
    setColorScheme(mode);
  }, [mode, setColorScheme]);

  // Use a callback to hide splash screen once the navigation is ready
  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <PaperProvider theme={paperTheme}>
        <AuthProvider>
          <NavigationContainer>
            <StatusBar barStyle={mode === 'dark' ? 'light-content' : 'dark-content'} />
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}