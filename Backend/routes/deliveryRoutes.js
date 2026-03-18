import express from "express";
import {
  getDeliveryProviderProfile,
  getMyAssignedDeliveries,
  getRegisteredDeliveryProviders,
  selectDeliveryProviderForOrder,
  upsertMyDeliveryProfile,
} from "../controllers/deliveryController.js";
import { authorizeRoles, protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/providers", protect, getRegisteredDeliveryProviders);
router.get("/providers/:deliveryId", protect, getDeliveryProviderProfile);
router.put(
  "/orders/:orderId/select-provider",
  protect,
  authorizeRoles("customer"),
  selectDeliveryProviderForOrder,
);
router.put(
  "/my-profile",
  protect,
  authorizeRoles("delivery"),
  upsertMyDeliveryProfile,
);
router.get(
  "/my-assignments",
  protect,
  authorizeRoles("delivery"),
  getMyAssignedDeliveries,
);

export default router;
