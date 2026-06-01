import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

export function App() {
  // Explicitly forces Metro to scan your root app directory 
  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);