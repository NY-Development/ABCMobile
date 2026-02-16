import express from "express";
import passport from "passport";
import upload from "../middlewares/upload.js"
import "../configs/passport.js"; // make sure strategy is loaded
import {
  register,
  verifyOtp,
  resendOtp,
  requestPasswordReset,
  resetPassword,
  login,
  profile,
  logout,
  getAllUsers,
  getUserById,
  updateProfile,
  changePassword
} from "../controllers/authController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/profile", protect, profile);
router.get("/", getAllUsers);
router.get("/:id", getUserById);

router.put("/update-profile", protect, upload.single("image"), updateProfile);
router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);
router.post("/login", login);
router.post("/logout", logout)
router.put("/change-password", protect, changePassword);

// Start Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route after Google auth
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { token } = req.user;

    const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
    const redirectURL = `${frontendURL}/oauth-success?token=${token}`;

    return res.redirect(redirectURL);
  }
);


export default router;
