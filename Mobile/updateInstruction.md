App Update & Version Control Instructions
Overview
This document defines the standard procedure for handling Force Updates and Version Comparisons within this React Native (Expo) application. The AI should refer to this logic when modifying the root layout, navigation, or update-related screens.

1. Versioning Strategy
We use Semantic Versioning (SemVer): MAJOR.MINOR.PATCH.

Local Version: Retreived via expo-constants.

Remote Version: Fetched from a remote configuration/API.

2. Implementation Logic (Root Level)
The update check must occur at the highest level (e.g., app/_layout.tsx or App.tsx) before the user can interact with the main application state.

Version Comparison Helper
Use this logic to compare string-based versions (e.g., "1.2.1" vs "1.3.0"):

TypeScript
/**
 * Returns true if the remote version is higher than the current local version.
 */
export const isUpdateRequired = (current: string, required: string): boolean => {
  const cur = current.split('.').map(Number);
  const req = required.split('.').map(Number);

  for (let i = 0; i < 3; i++) {
    if (req[i] > cur[i]) return true;
    if (req[i] < cur[i]) return false;
  }
  return false;
};
3. Integrated Update Flow
When a mismatch is detected, the app must transition to the UpdateScreen or trigger the UpdateModal.

Check Script
TypeScript
import * as Linking from 'expo-linking';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const APP_VERSION = Constants.expoConfig?.version || "1.0.0";

const performVersionCheck = async () => {
  try {
    // Replace with actual API endpoint
    const response = await fetch('https://api.yourdomain.com/v1/config');
    const { minRequiredVersion, storeUrls } = await response.json();

    if (isUpdateRequired(APP_VERSION, minRequiredVersion)) {
      const url = Platform.OS === 'ios' ? storeUrls.ios : storeUrls.android;
      
      // AI IMPLEMENTATION: 
      // 1. Navigate to UpdateScreen
      // 2. Pass the store URL as a parameter
      navigation.replace('UpdateScreen', { url });
    }
  } catch (error) {
    console.error("Version check failed", error);
  }
};
4. Redirecting to Stores
When the user interacts with the "Update Now" button, use Deep Linking to open the native Store app directly rather than a browser.

iOS Protocol: itms-apps://itunes.apple.com/app/id{APP_ID}

Android Protocol: market://details?id={PACKAGE_NAME}

TypeScript
const handleStoreRedirect = (url: string) => {
  Linking.openURL(url).catch(() => {
    // Fallback to https if the protocol fails
    Linking.openURL(url.replace('itms-apps://', 'https://').replace('market://', 'https://play.google.com/store/apps/'));
  });
};
5. UI Guidelines for AI
Forced Update: If the update is "Critical," use navigation.replace to prevent the user from going back to the Home screen.

Optional Update: Use the UpdateModal. Allow the user to dismiss it by storing a "Remind Me Later" timestamp in AsyncStorage.

Haptics: Always trigger Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning) when the Update Screen appears.

Instructions for AI Agent:
"When asked to modify the update flow or the UpdateScreen, always ensure compliance with the logic defined in updateInstruction.md. Do not bypass the version comparison helper. If adding new native modules, remind the user that a Store Update (Binary) is required over an OTA update."