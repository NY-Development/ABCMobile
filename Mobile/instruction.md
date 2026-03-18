You are an AI developer working inside a React Native project built with Expo and Expo Router.

Your task is to IMPLEMENT the UI designs located in the `Design/` folder into the actual application screens inside the `app/` directory.

You must NOT delete or restructure the existing project. Only implement the screens and update them according to the designs.

---

PROJECT STACK

Framework: Expo React Native
Routing: Expo Router (file-based routing)
Styling: NativeWind (Tailwind for React Native)
State Management: Zustand
Forms: React Hook Form + Zod
Language: TypeScript

---

IMPORTANT RULES

1. Use Expo Router file-based routing inside the `app/` folder.
2. Do NOT remove existing folders or navigation logic.
3. Translate HTML UI from the Design folder into React Native components.
4. Use NativeWind classes for styling.
5. Convert HTML elements as follows:

div → View
span / p → Text
img → Image (expo-image if used)
button → Pressable or TouchableOpacity
input → TextInput

6. Follow the layout shown in `screen.png` if something in the HTML is unclear.
7. Use reusable components from:

src/components/

Example components already available:

FoodCard
RestaurantCard
OrderCard
PrimaryButton
InputField

Reuse them instead of rewriting UI.

---

DESIGN IMPLEMENTATION SOURCE

The UI designs are stored in:

Design/

Each design folder contains:

code.html → HTML UI layout
screen.png → Visual reference of the screen

You must read the HTML and recreate it in React Native.

---

ROUTE IMPLEMENTATION MAP

Implement the following mappings.

GLOBAL SCREENS

Design/Global/splash_screen → app/(global)/splash.tsx
Design/Global/landing_page → app/(global)/landing.tsx
Design/Global/login_screen → app/(global)/login.tsx
Design/Global/register_screen → app/(global)/register.tsx
Design/Global/forgot_password → app/(global)/forgot-password.tsx
Design/Global/reset_password → app/(global)/reset-password.tsx
Design/Global/verify_otp → app/(global)/verify-otp.tsx
Design/Global/settings → app/(global)/settings.tsx
Design/Global/about_abc → app/(global)/about.tsx
Design/Global/privacy_policy → app/(global)/privacy-policy.tsx
Design/Global/terms_eula → app/(global)/terms.tsx

---

CUSTOMER SCREENS

Design/Customer/explore_bakeries → app/(customer)/home/index.tsx
Design/Customer/all_bakeries → app/(customer)/restaurants/index.tsx
Design/Customer/bakery_details → app/(customer)/restaurants/[bakeryId].tsx
Design/Customer/our_products → app/(customer)/restaurants/products.tsx
Design/Customer/product_details → app/(customer)/restaurants/product/[productId].tsx

Design/Customer/shopping_cart → app/(customer)/cart/index.tsx
Design/Customer/checkout → app/(customer)/checkout/index.tsx
Design/Customer/payment_method → app/(customer)/checkout/payment.tsx

Design/Customer/order_history → app/(customer)/orders/history.tsx
Design/Customer/track_order → app/(customer)/orders/tracking.tsx

Design/Customer/my_profile → app/(customer)/profile/index.tsx

---

DELIVERY SCREENS

Design/Delivery/delivery_partner_application → app/(driver)/apply.tsx
Design/Delivery/delivery_requests → app/(driver)/orders/available.tsx
Design/Delivery/active_delivery_tracking → app/(driver)/delivery/active.tsx
Design/Delivery/delivery_provider_selection → app/(driver)/orders/select-provider.tsx
Design/Delivery/delivery_provider_profile → app/(driver)/profile/index.tsx

---

OWNER / VENDOR SCREENS

Design/Owner/owner_dashboard → app/(vendor)/dashboard/index.tsx

Design/Owner/incoming_orders → app/(vendor)/orders/index.tsx
Design/Owner/order_details → app/(vendor)/orders/[orderId].tsx

Design/Owner/manage_product → app/(vendor)/menu/index.tsx
Design/Owner/product_inventory → app/(vendor)/menu/inventory.tsx

Design/Owner/abc_pro_subscription → app/(vendor)/subscription.tsx

Verification Flow

Design/Owner/owner_verification_step_1 → app/(vendor)/verification/step1.tsx
Design/Owner/owner_verification_step_2 → app/(vendor)/verification/step2.tsx
Design/Owner/owner_verification_step_3 → app/(vendor)/verification/step3.tsx
Design/Owner/owner_verification_step_4 → app/(vendor)/verification/step4.tsx
Design/Owner/owner_verification_step_5 → app/(vendor)/verification/step5.tsx
Design/Owner/owner_verification_success → app/(vendor)/verification/success.tsx

---

IMPLEMENTATION PROCESS

For each design screen:

1. Read the `code.html` file.
2. Translate HTML structure to React Native JSX.
3. Use NativeWind classes to replicate styling.
4. Use reusable components where appropriate.
5. Place the resulting screen in the mapped route inside `app/`.

---

FINAL GOAL

All screens inside the `Design/` directory must be fully implemented as working Expo Router screens in the `app/` directory, following the mapping above.

The UI should visually match the `screen.png` references as closely as possible while using React Native best practices.
