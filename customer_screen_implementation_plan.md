# Real-Data End-to-End Integration Plan

Replace all hardcoded mock data in the ABC-Mobile customer screens with live API calls via TanStack Query v5 hooks, connected to the running Express backend.

## Proposed Changes

### Infrastructure

#### [MODIFY] [queryClient.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/config/queryClient.ts)
Add global `onError` handler for mutations to show `Alert.alert` on failure, per TanStack v5 best practices.

---

### Feature: Products / Restaurants

#### [MODIFY] [restaurants.types.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.types.ts)
Add [Product](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.types.ts#1-9) and [Owner](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.api.ts#80-85) interfaces matching backend models. Keep existing verification types.

#### [MODIFY] [restaurants.api.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.api.ts)
Add API functions:
- [getAllProducts()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/controllers/ownerController.js#209-218) → `GET /api/owners/all` (returns products with populated owner)
- `getProductById(id)` → `GET /api/owners/all` then filter client-side (no dedicated endpoint)
- [getOwnerProducts(ownerId)](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/controllers/ownerController.js#219-229) → `GET /api/owners/my/:ownerId`

#### [MODIFY] [restaurants.hooks.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.hooks.ts)
Add hooks: `useAllProducts()`, `useProductById(id)`, `useOwnerProducts(ownerId)`. Keep existing verification hooks.

---

### Feature: Cart

#### [MODIFY] [cart.types.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.types.ts)
Align [CartItem](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.types.ts#10-13) and `CartResponse` with backend Cart model (populated product fields: `name`, `price`, `image`, `availableQuantity`, `description`).

#### [MODIFY] [cart.api.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.api.ts)
Fix endpoint paths to match [server.js](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/server.js) route prefix `/api/carts/`:
- `POST /carts/add`, `GET /carts/my`, `PUT /carts/update`, `DELETE /carts/remove/:productId`, `DELETE /carts/clear`

#### [MODIFY] [cart.hooks.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.hooks.ts)
Add `queryClient.invalidateQueries({ queryKey: CART_KEYS.all })` to `onSuccess` of every mutation hook.

---

### Feature: Orders

#### [MODIFY] [orders.types.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.types.ts)
Define [Order](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/controllers/orderController.js#169-216) interface matching backend model — single product per order, statuses: `pending | in-progress | delivered | cancelled`, payment with screenshot.

#### [MODIFY] [orders.api.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.api.ts)
Implement:
- [placeOrder(data)](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/controllers/orderController.js#5-52) → `POST /api/orders/place`
- [getOrders()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/controllers/orderController.js#169-216) → `GET /api/orders/`
- [cancelOrder(orderId)](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/controllers/orderController.js#217-272) → `PUT /api/orders/cancel/:orderId`
- [uploadPayment(orderId, screenshot)](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/controllers/paymentController.js#36-97) → `POST /api/payments/:orderId/payment`
- [getPayments()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/controllers/paymentController.js#98-159) → `GET /api/payments/my`

#### [MODIFY] [orders.hooks.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.hooks.ts)
Implement: `useOrders()`, `usePlaceOrder()`, `useCancelOrder()`, `useUploadPayment()`, `usePayments()`.

---

### Customer Screens — Replace Mock Data

#### [MODIFY] [index.tsx (home)](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(customer)/home/index.tsx)
Replace `featuredBakeries`, `signatureCakes`, `popularProducts` mock arrays with `useAllProducts()` hook. Derive categories from product `category` field. Show real product images, names, prices in ETB.

#### [MODIFY] [index.tsx (restaurants)](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(customer)/restaurants/index.tsx)
Replace mock `bakeries` array with real products grouped by owner (using populated `owner` field from `GET /api/owners/all`). Each "bakery card" shows the owner name, product count, and owner image.

#### [MODIFY] [products.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(customer)/restaurants/products.tsx)
Replace mock `products` array with `useAllProducts()`. Wire category filter with actual backend categories (`Cookies | Waffles | Macarons | Snacks | Beverages | Cake`). Wire search filter. Wire add-to-cart (`+`) button with [useAddToCartMutation](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.hooks.ts#9-15).

#### [MODIFY] [[productId].tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(customer)/restaurants/product/[productId].tsx)
Replace mock `productDetails` with `useProductById(productId)`. Wire "Add to Cart" button with [useAddToCartMutation](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.hooks.ts#9-15).

#### [MODIFY] [index.tsx (cart)](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(customer)/cart/index.tsx)
Replace mock `cartItems` with [useGetCartQuery()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.hooks.ts#35-41). Wire `+`/`−` buttons with [useUpdateCartMutation()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.hooks.ts#22-28). Wire trash icon with [useClearCartMutation()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.hooks.ts#29-34). Calculate subtotal/total from real cart data.

#### [MODIFY] [history.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(customer)/orders/history.tsx)
Replace mock `activeOrders`/`pastOrders` with `useOrders()`. Split into active (pending/in-progress) and past (delivered/cancelled) automatically.

#### [MODIFY] [index.tsx (checkout)](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/(customer)/checkout/index.tsx)
Pull real cart data via [useGetCartQuery()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.hooks.ts#35-41), show real line items. Wire "Proceed to Payment" to `usePlaceOrder()` mutation.

---

## Verification Plan

### Automated
No existing test suite found. Since this is a React Native/Expo project with no test runner configured, automated tests are not applicable here.

### Manual Verification
1. **Start backend**: `npm run dev` in `Backend/` (already running)
2. **Start mobile**: `npm run dev` in `Mobile/` — open in Expo
3. **Login** as a customer user
4. **Home screen**: Verify real products appear (not "Red Velvet Bliss", "Butter Croissant" etc.)
5. **Products screen**: Verify grid shows real products with images from backend; category filter works
6. **Product details**: Tap a product, verify real name/price/description show; tap "Add to Cart" and verify it succeeds
7. **Cart screen**: Verify items from backend cart appear; +/− buttons update quantity; trash clears cart
8. **Order history**: Verify real orders show; active vs past tabs filter correctly
9. **Checkout**: Verify cart total is calculated from real data; "Place Order" calls backend
