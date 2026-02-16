

import express from "express";
import upload from "../middlewares/upload.js";
import { protect } from "../middlewares/auth.js";
import {  addProduct, deleteProduct, getAllProducts, getOwnerProducts, reduceStockOnOrder, updateOwnerAdditionalInfo, updateProduct } from "../controllers/ownerController.js";

const router = express.Router();

// Update additional info (after registration)
router.post(
  "/additional-info",
  protect,
  upload.fields([
    { name: "companyImage", maxCount: 1 },
    { name: "tradingLicense", maxCount: 1 },
  ]),
  updateOwnerAdditionalInfo
);
router.post("/add",protect, upload.single("image"), addProduct);
router.put("/update/:productId", protect, upload.single("image"), updateProduct);
router.post("/reduce-stock", reduceStockOnOrder);// Reduce stock when order placed by customer
router.get("/all", getAllProducts);// Get all products of owners 
router.get("/my/:ownerId",protect, getOwnerProducts);
router.delete("/:productId",protect, deleteProduct);



export default router;
