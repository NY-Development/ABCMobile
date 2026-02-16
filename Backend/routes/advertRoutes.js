import express from "express";
import upload from "../middlewares/upload.js";
import { protect } from "../middlewares/auth.js";

import {
  getActiveAds,
  getAdvertRequestInfo,
  requestAdvertiseInfo,
  uploadAdvertPayment
} from "../controllers/advertController.js";

const router = express.Router();

router.post("/request-info", protect, requestAdvertiseInfo);

router.get("/request-info/:advertId", protect, getAdvertRequestInfo);

router.put(
  "/upload-payment/:advertId",
  protect,
  upload.single("paymentScreenshot"),
  uploadAdvertPayment
);


// PUBLIC: fetch active ads for homepage
router.get("/active", getActiveAds);

export default router;
