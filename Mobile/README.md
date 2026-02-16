# ABC Mobile

React Native app for the ABC project.

## Prerequisites
- Node.js LTS
- Yarn or npm
- Android Studio (Android) and/or Xcode (iOS)
- Expo Go (if using Expo)

## Setup
```bash
cd Mobile
npm install
```

## Run
```bash
# Expo (if configured)
npx expo start

# React Native CLI (if configured)
npx react-native start
npx react-native run-android
npx react-native run-ios
```

## Environment
Create a `.env` file in `Mobile/` if required by the app (example keys):
```
API_BASE_URL=https://your.api
```

## Scripts (typical)
```bash
npm run lint
npm run test
npm run typecheck
```

## Project Structure
- `src/screens` — App screens
- `src/components` — Reusable UI components
- `src/context` — Context providers
- `src/constants` — App constants
- `src/types` — TypeScript types

## Notes for Contributors
- Keep UI consistent with existing styles.
- Prefer `Boolean()` for boolean props.
- Add/Update tests for new logic where applicable.