import express from "express";
import { deleteAccount } from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();


router.delete("/delete-account", protect, deleteAccount);

export default router;
