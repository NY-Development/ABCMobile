# 🍰 Adama Bakery & Cake (ABC Project)
## Mobile Architecture & Implementation Standard

This document defines the mandatory architectural, technical, and UX standards for the ABC React Native (Expo) mobile application.

This file is the highest authority for all AI-generated and developer-written code.

---

# 1. Core Stack

- React Native (Expo Managed Workflow)
- TypeScript (Strict Mode)
- Expo Router
- @tanstack/react-query
- MongoDB backend (already implemented)

Architecture:
- Feature-based structure
- Functional components only
- Separation of app/ and src/

---

# 2. Notification System (Critical Feature)

## 2.1 Push Notifications (PRIMARY SYSTEM)

Push notifications are the main communication layer.

Use:
- expo-notifications
- Notifications.getExpoPushTokenAsync
- Proper permission handling
- Android notification channels

Rules:
- Must request permission properly
- Must configure Android channel before token request
- Must only request token on physical device
- Must store push token in backend
- Must cache token in MMKV if needed
- Must implement:
  - addNotificationReceivedListener
  - addNotificationResponseReceivedListener
- Foreground notifications must show a beautiful in-app modal

Use Cases:
- Bakery → Customer (Order updates)
- Customer → Bakery (New orders)
- System → All (Announcements)

Push notifications have higher priority than local notifications.

---

## 2.2 Local Notifications (Secondary)

Used only for:
- Baking timers
- Reminder scheduling
- Countdown alerts

Must:
- Work offline
- Be cancelable
- Use scheduleNotificationAsync

---

# 3. SMS & Email (Linking-Based Only)

Implementation must:
- Use Linking.openURL
- Prefill message
- Encode URL properly
- Retrieve recipient data from profile

Never auto-send messages silently.

---

# 4. Storage Rules

## 4.1 MMKV (Mandatory)

Used for:
- Auth tokens
- Preferences
- Push token caching
- Small config data

Rules:
- Initialized globally
- Synchronous usage only
- Never store large datasets

## 4.2 SQLite (Limited Use)

Allowed only for:
- Offline order caching
- Draft storage
- Heavy local relational data

Must use:
- expo-sqlite
- Migration function
- SQLiteProvider

Do not replicate MongoDB logic locally.

---

# 5. AppState & NetInfo (Mandatory Global Setup)

Must integrate:

## AppState
- Refetch queries when active
- Use focusManager

## NetInfo
- Update onlineManager
- Refetch on reconnect
- Offline-first behavior required

Must be configured globally.

---

# 6. Safe Area (Strict Rule)

- Wrap entire app in SafeAreaProvider
- Use safe area insets
- Never allow content under notch or gesture bar

Mandatory across entire app.

---

# 7. Keyboard Handling (Strict Rule)

All input screens MUST:

- Use KeyboardAvoidingView
- iOS: padding
- Android: height
- Ensure no hidden inputs

No exceptions allowed.

---

# 8. Boolean Safety

Always cast booleans:

disabled={Boolean(value)}
visible={!!value}

Never pass undefined or non-boolean values to boolean props.

---

# 9. Installation Rule

For native libraries:

npx expo install <package>

Never use npm install for native modules.

---

# 10. Error Handling Protocol

When debugging:

1. Run:
   npx expo-doctor

2. Clear cache:
   npx expo start -c

3. Verify:
   - SDK compatibility
   - Permissions
   - Android channels
   - Physical device usage
   - Expo Project ID

Always check file structure and imports.

---

# 11. UI/UX Standard

- Premium bakery-themed UI
- Smooth animated modals
- Clear error states
- Graceful offline states
- No silent failures

Notification modal must feel polished and premium.

---

# 12. Priority Order

1. Push Notifications
2. App Stability
3. Safe Area Compliance
4. Keyboard Safety
5. Offline Support
6. Clean Architecture

Any implementation violating these rules must be corrected immediately.