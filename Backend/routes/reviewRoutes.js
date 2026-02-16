import express from "express";
import { protect } from "../middlewares/auth.js";
import {
  addReview,
  getAllReviews,
  getReviewsForOwner,
} from "../controllers/reviewController.js";

const router = express.Router();

router.get("/all" , getAllReviews);

router.post("/", protect, addReview);
router.get("/owner/:ownerId", getReviewsForOwner);


export default router;
