
import express from "express";
import { cancelOrder, confirmAgreement, getOrders, getWishlist, markAsReady, placeOrder, toggleWishlist, updateOrderStatus } from "../controllers/orderController.js";
import { protect } from "../middlewares/auth.js";


const router = express.Router();

router.post("/place", protect, placeOrder);
router.put("/:orderId/status", protect, updateOrderStatus);
router.put("/:orderId/confirm", protect, confirmAgreement); //by customer
router.put("/cancel/:orderId", protect, cancelOrder); //by customer
router.put("/:orderId/ready", protect, markAsReady); //by owner
router.post("/:productId", protect, toggleWishlist);
router.get("/", protect, getOrders);// get orders for logged in user both customer and owner
router.get("/wishlist", protect, getWishlist);



export default router;
