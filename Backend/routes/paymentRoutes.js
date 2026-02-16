import express from "express";

import { protect } from "../middlewares/auth.js"; 
import upload from "../middlewares/upload.js";
import { getPaymentsForCustomer, getPaymentsForOwner, uploadPaymentScreenshot } from "../controllers/paymentController.js";

const router = express.Router();

// Customer uploads payment screenshot
router.post("/:orderId/payment", protect,upload.single("screenshoot"),uploadPaymentScreenshot);
router.get("/my-payments", protect, getPaymentsForOwner);
router.get("/my", protect, getPaymentsForCustomer);// get payments for logged in customer


export default router;
