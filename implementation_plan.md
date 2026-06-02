# Real-Data End-to-End Integration — Full Multi-Role Plan

Replace all mock/dummy data across **all 5 roles** (Customer, Vendor, Driver, Admin, Global) with live API calls via TanStack Query v5 hooks connected to the Express backend. Organized into 6 sequential phases.

---

## Current State Summary

| Role | Screens | Integration Status | Work Needed |
|------|---------|-------------------|-------------|
| **Customer** | 20 files | ❌ All mock data | Full rewrite of data layer |
| **Vendor/Owner** | 20 files | ✅ ~70% integrated | Fill remaining gaps |
| **Driver/Delivery** | 12 files | ❌ All empty stubs | Full build from scratch |
| **Admin** | 8 files | ✅ ~85% integrated | Minor gaps |
| **Global** | 12 files | ✅ ~80% auth works | Verify & fill gaps |

### Backend API Surface (already available)

| Prefix | Endpoints |
|--------|-----------|
| `/api/auth/*` | register, login, verify-otp, resend-otp, password-reset, profile, update-profile, change-password |
| `/api/owners/*` | additional-info, add product, update/delete product, all products, owner products |
| `/api/orders/*` | place, status update, confirm, cancel, mark-ready, get orders, wishlist |
| `/api/carts/*` | add, get my, update, remove, clear |
| `/api/payments/*` | upload screenshot, get-my-payments, get-owner-payments |
| `/api/delivery/*` | providers list, provider profile, select provider, update profile, my-assignments |
| `/api/admin/*` | dashboard, users, owners, user details, verify, payments, approve/decline adverts |
| `/api/reviews/*` | (exists) |
| `/api/advert/*` | (exists) |

---

## Proposed Changes

### [Global] Premium Splash Screen
Implemented a high-end splash screen in `app/(global)/splash.tsx` that mirrors the premium HTML design, featuring smooth animations and a refined brand presence.

#### [MODIFY] [splash.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(global)/splash.tsx)
- **Visuals**: Replaced Material/Lucide symbols with the official logo ([icon.png](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/assets/images/icon.png)). Implemented a linear gradient background with decorative blurred elements.
- **Animations**: Integrated `moti` for smooth entrance and pulse animations.
- **Feedback**: Added a professional-grade loading bar with progress tracking.

---

### [Customer] Navigation & UI Polish (PHASE 1 - COMPLETED)
Simplified the [(customer)/_layout.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/components/ScreenPrimitives.tsx#27-30) using `Slot` for correct navigation hierarchy and standardized icons using `lucide-react-native`.

---

## PHASE 1: Customer Screens

> **Priority**: Highest — customer-facing experience.

### Infrastructure

#### [MODIFY] [queryClient.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/config/queryClient.ts)
Add global [onError](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/config/queryClient.ts#6-10) for mutations using `Alert.alert`.

---

### Feature: Products / Restaurants

#### [MODIFY] [restaurants.types.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.types.ts)
Add [Product](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.types.ts#132-147) and [Owner](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.types.ts#122-131) interfaces matching backend [Product.js](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/models/Product.js) and [Owner.js](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/models/Owner.js) models (keep existing verification types).

```typescript
export interface Product {
  _id: string;
  owner: { _id: string; name: string; email: string; image?: string } | string;
  name: string;
  image: string;
  category: 'Cookies' | 'Waffles' | 'Macarons' | 'Snacks' | 'Beverages' | 'Cake';
  size?: string;
  color?: string;
  shape?: string;
  availableQuantity: number;
  price: number;
  description?: string;
  isActive: boolean;
  createdAt: string;
}
```

#### [MODIFY] [restaurants.api.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.api.ts)
Add: [getAllProducts()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.api.ts#89-97) → `GET /owners/all`, [getOwnerProducts(ownerId)](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.api.ts#98-106) → `GET /owners/my/:ownerId`

#### [MODIFY] [restaurants.hooks.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.hooks.ts)
Add: [useAllProducts()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.hooks.ts#56-65), [useProductById(id)](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.hooks.ts#66-83) (client-side filter), [useOwnerProducts(ownerId)](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.hooks.ts#84-94)

---

### Feature: Cart

#### [MODIFY] [cart.types.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.types.ts)
Align with backend Cart model:
```typescript
export interface CartItem {
  product: { _id: string; name: string; price: number; image: string; availableQuantity: number; description?: string };
  quantity: number;
  addedAt?: string;
  _id?: string;
}
export interface CartResponse {
  _id: string;
  customer: string;
  items: CartItem[];
}
```

#### [MODIFY] [cart.api.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.api.ts)
Fix endpoints: `POST /carts/add`, `GET /carts/my`, `PUT /carts/update`, `DELETE /carts/remove/:productId`, `DELETE /carts/clear`

#### [MODIFY] [cart.hooks.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.hooks.ts)
Add `queryClient.invalidateQueries({ queryKey: CART_KEYS.all })` to [onSuccess](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.hooks.ts#25-28) of all mutation hooks.

---

### Feature: Orders

#### [MODIFY] [orders.types.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.types.ts)
Full [Order](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.types.ts#5-38) interface matching backend [Order.js](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/models/Order.js) model — single product per order, statuses: `pending | in-progress | delivered | cancelled`, payment with telebirr screenshot.

#### [MODIFY] [orders.api.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.api.ts)
- [placeOrder(data)](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.api.ts#5-14) → `POST /orders/place`
- [getOrders()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.api.ts#15-20) → `GET /orders/` (backend filters by role)
- [cancelOrder(orderId)](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/controllers/orderController.js#217-272) → `PUT /orders/cancel/:orderId`
- [confirmAgreement(orderId, agreed)](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.api.ts#27-32) → `PUT /orders/:orderId/confirm`
- [uploadPayment(orderId, screenshot)](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/controllers/paymentController.js#36-97) → `POST /payments/:orderId/payment`
- [getPayments()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/controllers/paymentController.js#98-159) → `GET /payments/my`
- [toggleWishlist(productId)](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.api.ts#33-38) → `POST /orders/:productId`
- [getWishlist()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.api.ts#39-44) → `GET /orders/wishlist`

#### [MODIFY] [orders.hooks.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.hooks.ts)
[useOrders()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.hooks.ts#11-17), [usePlaceOrder()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.hooks.ts#18-28), [useCancelOrder()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.hooks.ts#29-38), [useConfirmAgreement()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.hooks.ts#39-49), `useUploadPayment()`, `usePayments()`, [useToggleWishlist()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.hooks.ts#57-66), [useWishlist()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.hooks.ts#50-56)

---

### Customer Screens — Replace Mock Data

#### [MODIFY] [home/index.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(customer)/home/index.tsx)
Replace `featuredBakeries`, `signatureCakes`, `popularProducts` with [useAllProducts()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.hooks.ts#56-65). Categories derived from product `category` field. Prices in ETB.

#### [MODIFY] [restaurants/index.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(customer)/restaurants/index.tsx)
Replace mock `bakeries` with real products grouped by [owner](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.hooks.ts#10-11) (populated from `GET /owners/all`).

#### [MODIFY] [restaurants/products.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(customer)/restaurants/products.tsx)
Replace mock products with [useAllProducts()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.hooks.ts#56-65). Wire category filter (`Cookies|Waffles|Macarons|Snacks|Beverages|Cake`). Wire `+` button with [useAddToCartMutation](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.hooks.ts#9-19).

#### [MODIFY] [restaurants/product/[productId].tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(customer)/restaurants/product/[productId].tsx)
Replace mock `productDetails` with [useProductById(productId)](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.hooks.ts#66-83). Wire "Add to Cart" + wishlist heart.

#### [MODIFY] [cart/index.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(customer)/cart/index.tsx)
Replace mock `cartItems`. Wire `+`/`−` with [useUpdateCartMutation](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.hooks.ts#31-41). Wire trash with [useClearCartMutation](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.hooks.ts#42-51). Calculate totals from real data.

#### [MODIFY] [orders/history.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(customer)/orders/history.tsx)
Replace mock orders with [useOrders()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.hooks.ts#11-17). Active = `pending|in-progress`, Past = `delivered|cancelled`.

#### [MODIFY] [checkout/index.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(customer)/checkout/index.tsx)
Pull real cart via [useGetCartQuery()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.hooks.ts#52-58). Wire delivery provider selection via `GET /delivery/providers`. Wire "Place Order" with [usePlaceOrder()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.hooks.ts#18-28).

---

## PHASE 2: Vendor/Owner Screens (Remaining Gaps)

> **Current state**: Dashboard, orders list, menu CRUD, and basic analytics already use real data via `vendorAPI` service. Gaps are in secondary screens.

#### [MODIFY] [analytics/earnings.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(vendor)/analytics/earnings.tsx)
Wire real payment data via `GET /payments/my-payments` (owner payments).

#### [MODIFY] [orders/[orderId].tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(vendor)/orders/[orderId].tsx)
Wire order detail view — fetch single order, show customer info, display "Mark as Ready" button via `vendorAPI.markOrderAsReady()`.

#### [MODIFY] [profile/edit.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(vendor)/profile/edit.tsx)
Wire profile editing via `vendorAPI.updateOwnerAdditionalInfo()`.

#### [MODIFY] [profile/index.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(vendor)/profile/index.tsx)
Fetch owner profile via `useQuery` with `adminService.getOwnerById(ownerId)`.

#### [MODIFY] [settings/index.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(vendor)/settings/index.tsx)
Wire account settings — change password via `PUT /auth/change-password`, profile data display.

#### [MODIFY] [subscription.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(vendor)/subscription.tsx)
Wire subscription status display from user profile. Payment submission requires **new backend endpoint** (see Phase 6).

#### [MODIFY] [menu/inventory.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(vendor)/menu/inventory.tsx)
Verify it uses `vendorAPI.getMyProducts()` with delete functionality.

---

## PHASE 3: Delivery/Driver Screens (Full Build)

> **Current state**: All 12 screens are empty stubs. Backend endpoints exist at `/api/delivery/*`.

### New Feature Module

#### [NEW] [delivery.api.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/delivery/delivery.api.ts)
```typescript
export const deliveryApi = {
  getMyAssignments: () => API.get('/delivery/my-assignments'),
  updateMyProfile: (data) => API.put('/delivery/my-profile', data),
  getProviders: (productAmount?) => API.get('/delivery/providers', { params: { productAmount } }),
  getProviderProfile: (id) => API.get(`/delivery/providers/${id}`),
};
```

#### [NEW] [delivery.types.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/delivery/delivery.types.ts)
[DeliveryProfile](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/controllers/deliveryController.js#169-213), `DeliveryAssignment`, [DeliveryProvider](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/controllers/deliveryController.js#53-82) interfaces.

#### [NEW] [delivery.hooks.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/delivery/delivery.hooks.ts)
`useMyAssignments()`, `useUpdateDeliveryProfile()`, `useDeliveryProviders()`

### Driver Screens

#### [MODIFY] [dashboard/index.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(driver)/dashboard/index.tsx)
Build full dashboard: active deliveries count, earnings summary, quick actions. Uses `useMyAssignments()`.

#### [MODIFY] [orders/available.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(driver)/orders/available.tsx)
Replace mock "Order #2026-1043" with real assigned deliveries list.

#### [MODIFY] [orders/accept/[orderId].tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(driver)/orders/accept/[orderId].tsx)
Wire order accept/decline flow with real order data.

#### [MODIFY] [delivery/active.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(driver)/delivery/active.tsx)
Replace mock tracking with real active delivery data + map placeholder.

#### [MODIFY] [delivery/history.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(driver)/delivery/history.tsx)
Show completed deliveries from `useMyAssignments()` filtered by `status === 'delivered'`.

#### [MODIFY] [delivery/navigation.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(driver)/delivery/navigation.tsx)
Map-based navigation view for active delivery.

#### [MODIFY] [earnings/index.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(driver)/earnings/index.tsx)
Calculate earnings from completed deliveries (delivery fee per order).

#### [MODIFY] [profile/index.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(driver)/profile/index.tsx)
Display delivery profile (vehicle type, plate, region, availability).

#### [MODIFY] [profile/edit.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(driver)/profile/edit.tsx)
Wire `useUpdateDeliveryProfile()` mutation for editing vehicle/region/availability.

#### [MODIFY] [apply.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(driver)/apply.tsx)
Wire delivery partner application — register as delivery role or set up delivery profile.

---

## PHASE 4: Admin Screens (Gaps)

> **Current state**: Dashboard, users list, transactions, and verification hub already use real data via `adminService` + [admin/hooks.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/admin/hooks.ts).

#### [MODIFY] [verification/[ownerId].tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(admin)/verification/[ownerId].tsx)
Wire "Verify" button to `adminService.verifyCompany(ownerId)` with cache invalidation. Display owner documents (company image, trading license).

#### [MODIFY] [profile/index.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(admin)/profile/index.tsx)
Fetch admin profile via `GET /auth/profile`.

#### Wire destructive actions in [users/index.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(admin)/users/index.tsx)
Connect "Delete" button to `adminService.deleteUser()` with confirmation `Alert.alert`.

### Admin Mutations (add to hooks.ts)
```typescript
export const useVerifyCompany = () => useMutation({ ... });
export const useDeleteUser = () => useMutation({ ... });
```

---

## PHASE 5: Global Screens (Auth & Onboarding)

> **Current state**: Auth feature module exists ([auth.api.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/auth/auth.api.ts), [auth.hooks.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/auth/auth.hooks.ts), [auth.store.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/auth/auth.store.ts)). Most auth screens likely work but need verification.

#### Verify [login.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(global)/login.tsx)
Confirm it uses [useLoginMutation](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/auth/auth.hooks.ts#19-24) from [auth.hooks.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/auth/auth.hooks.ts) (not direct API calls).

#### Verify [register.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(global)/register.tsx)
Confirm it uses [useRegisterMutation](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/auth/auth.hooks.ts#25-30) and navigates to OTP verification.

#### [MODIFY] [forgot-password.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(global)/forgot-password.tsx)
Wire `POST /auth/request-password-reset` API.

#### [MODIFY] [reset-password.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(global)/reset-password.tsx)
Wire `POST /auth/reset-password` API.

#### [MODIFY] [verify-otp.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(global)/verify-otp.tsx)
Wire `POST /auth/verify-otp` + resend via `POST /auth/resend-otp`.

#### [MODIFY] [settings.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(global)/settings.tsx)
Wire theme toggle (already via zustand), change password via `PUT /auth/change-password`.

---

## PHASE 6: Backend API Gaps (New Endpoints)

> These endpoints are **missing** from the backend and are needed to support the frontend screens.

### Delivery Module

#### [NEW] `GET /api/delivery/my-earnings` (in [deliveryController.js](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/controllers/deliveryController.js))
Calculate delivery earnings from completed assigned orders (sum of `delivery.feeAmount` where `status === 'delivered'`).

#### [NEW] `PUT /api/delivery/orders/:orderId/update-status` (in deliveryController.js)
Allow delivery driver to update delivery status (picked up, in transit, delivered).

### Owner Module

#### [NEW] `GET /api/owners/my-payments` (in [ownerRoutes.js](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/routes/ownerRoutes.js))
Re-expose `GET /payments/my-payments` without needing separate route — or just use existing `/api/payments/my-payments`.

### Subscription

#### [NEW] `POST /api/auth/subscribe`
Submit subscription payment (plan selection + payment screenshot). Currently [updateSubscriptionStatus](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/controllers/adminController.js#410-450) exists in admin but no owner-facing endpoint.

#### [NEW] `GET /api/auth/my-subscription`
Get current user's subscription status.

### Reviews (for Customer product details)

#### [NEW] `GET /api/reviews/product/:productId`
Get reviews for a specific product (for product detail screen).

---

## Verification Plan

### Phase 1 Verification (Customer)
1. Start backend: `npm run dev` in `Backend/`
2. Start mobile: `npm run dev` in `Mobile/`
3. Login as customer → Home shows real products from DB
4. Products grid shows real items with images; category filter works
5. Product detail shows real data; "Add to Cart" succeeds
6. Cart shows real items; +/− works; clear works
7. Order history shows real orders; active/past tabs filter correctly
8. Checkout places real order via backend

### Phase 2 Verification (Vendor)
1. Login as owner → Dashboard shows real stats
2. Earnings page shows real payment data
3. Profile edit saves to backend
4. Order detail shows customer info and action buttons work

### Phase 3 Verification (Driver)
1. Login as delivery user → Dashboard shows assigned deliveries
2. Available orders show real data
3. Profile shows/edits delivery profile
4. Earnings calculated from real delivery fees

### Phase 4 Verification (Admin)
1. Login as admin → Verify owner triggers real API call
2. Delete user works with confirmation
3. All existing screens continue working

### Phase 5 Verification (Global)
1. Registration → OTP → Login flow works end-to-end
2. Forgot password → Reset works
3. Settings page saves changes
