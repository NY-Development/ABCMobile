# Technical Specification: Android Keyboard Avoiding Fix

## 1. Purpose
Resolve the critical UI bug where the Android system keyboard overlaps `TextInput` components. The current behavior fails to push the view up or resize the container, leading to a poor user experience where users cannot see what they are typing.

## 2. Goal
Ensure the active input is always visible above the keyboard (automatic scroll-to-focus). The screen must "pull back" (restore its original layout) immediately upon keyboard dismissal without layout "jitter" or "jumps."

## 3. Configuration Requirements (Root Level)
**File:** `app.json`
Set the Android soft input mode to `resize`. This allows the window to shrink its height when the keyboard appears, giving the layout engine a defined space to recalculate.

```json
{
  "expo": {
    "android": {
      "softwareKeyboardLayoutMode": "resize"
    }
  }
}
4. Implementation Methods
Method A: Native Controller (Recommended / 2026 Standard)
Use react-native-keyboard-controller for native-level synchronization.

Install: npx expo install react-native-keyboard-controller

Component: Replace KeyboardAvoidingView + ScrollView with KeyboardAwareScrollView.

Implementation Example:

TypeScript
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export const FormScreen = () => (
  <KeyboardAwareScrollView 
    bottomOffset={20} 
    style={{ flex: 1 }}
    contentContainerStyle={{ flexGrow: 1 }}
  >
    {/* Inputs go here */}
  </KeyboardAwareScrollView>
);
Method B: Standard KeyboardAvoidingView (Legacy/Alternative)
If external libraries are restricted, use the following platform-specific logic:

iOS: Use behavior="padding"

Android: Use behavior="height" (Never use padding on Android with softwareKeyboardLayoutMode: "resize" as it causes "double-jumping").

Implementation Example:

TypeScript
<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={{ flex: 1 }}
  keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
>
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    {/* Content */}
  </ScrollView>
</KeyboardAvoidingView>
5. Summary Checklist for AI Agent
[ ] Check app.json for softwareKeyboardLayoutMode: "resize".

[ ] Wrap inputs in a scrollable container (KeyboardAwareScrollView or ScrollView).

[ ] Set flex: 1 on the outermost container to allow the "resize" event to trigger layout changes.

[ ] Verify that keyboardVerticalOffset accounts for any absolute headers or tab bars.