# Real-Data End-to-End Integration

## 1. Infrastructure Layer
- [x] Analyze existing [axios.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/services/axios.ts), [queryClient.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/config/queryClient.ts), backend routes/controllers
- [ ] Update [queryClient.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/config/queryClient.ts) with global mutation error handler
- [ ] Fix cart API endpoints to match backend routes (`/api/carts/*` not `/api/cart/*`)

## 2. Feature: Products / Restaurants
- [ ] Update [restaurants.types.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.types.ts) — add [Product](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.types.ts#1-9), [Owner](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.api.ts#80-85) interfaces matching backend models
- [ ] Update [restaurants.api.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.api.ts) — add [getAllProducts()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/controllers/ownerController.js#209-218), [getOwnerProducts()](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Backend/controllers/ownerController.js#219-229), `getProductById()`
- [ ] Update [restaurants.hooks.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/restaurants/restaurants.hooks.ts) — add `useAllProducts()`, `useOwnerProducts()`, `useProductById()`

## 3. Feature: Cart
- [ ] Update [cart.types.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.types.ts) — align with backend Cart model (populated product)
- [ ] Update [cart.api.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.api.ts) — fix endpoints to `/carts/add`, `/carts/my`, `/carts/update`, etc.
- [ ] Update [cart.hooks.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/cart/cart.hooks.ts) — add `queryClient.invalidateQueries` to all mutations

## 4. Feature: Orders
- [ ] Implement [orders.types.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.types.ts) — full Order interface matching backend model
- [ ] Implement [orders.api.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.api.ts) — placeOrder, getOrders, cancelOrder, uploadPayment
- [ ] Implement [orders.hooks.ts](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/src/features/orders/orders.hooks.ts) — useOrders, usePlaceOrder, useCancelOrder, useUploadPayment

## 5. Customer Screens — Replace Mock Data
- [ ] [home/index.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/%28customer%29/home/index.tsx) — fetch real products for Signature Cakes & Popular sections
- [ ] [restaurants/index.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/%28customer%29/restaurants/index.tsx) — show real owners/bakeries from backend (if endpoint exists) or products grouped by owner
- [ ] [restaurants/products.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/%28customer%29/restaurants/products.tsx) — fetch all products, filter by category
- [ ] `restaurants/product/[productId].tsx` — fetch single product, wire add-to-cart
- [ ] [cart/index.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/%28customer%29/cart/index.tsx) — fetch real cart, wire quantity controls, remove, clear
- [ ] [orders/history.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/%28customer%29/orders/history.tsx) — fetch real orders, show active vs past
- [ ] [checkout/index.tsx](file:///c:/Users/yamla/Desktop/NYDev/nyProjects/ABC-Mobile/Mobile/app/%28customer%29/checkout/index.tsx) — pull real cart data, wire place order flow

## 6. Verification
- [ ] Verify app compiles without TypeScript errors
- [ ] Manual testing: navigate through screens, confirm real data renders
