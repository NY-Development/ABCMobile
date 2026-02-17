import User from "../models/Users.js";
import Owner from "../models/Owner.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/email.js";
//import { sendSms } from "../utils/sendSms.js";
import { generateOtp } from "../utils/otp.js";
import imagekit from "../configs/imageKit.js";

// Helper to upload file to ImageKit
const uploadToImageKit = async (file) => {
  if (!file) return null;
  const uploadResponse = await imagekit.upload({
    file: file.buffer,
    fileName: `${Date.now()}-${file.originalname}`,
  });
  return uploadResponse.url;
};

// ================== Register ==================
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body; 

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or Phone already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpire = Date.now() + 5 * 60 * 1000; // 5 min expiry

    // SPECIAL CASE: CONSTANT ADMIN 
    if (email === "yamlaknegash96@gmail.com" || email === "ctemesgen85@gmail.com") {
      const user = await User.create({
        name: name || "Admin",
        email,
        password: hashedPassword,
        role: "admin",
        // subscription: {
        //   plan: plan || "yearly",
        //   isActive: true,
        // },
        isAccountVerified: true,
        verifyOtp: null,
        verifyOtpExpireAt: null,
      });

      return res.status(201).json({
        email: user.email,
        role: user.role,
        message: "Admin account created successfully (no verification required).",
      });
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || "customer",  // default to "customer" if not provided
      verifyOtp: otp,
      verifyOtpExpireAt: otpExpire,
    });

    await newUser.save();

    // Send OTP SMS
   // await sendSms(phone, `Your verification OTP is ${otp}`);
    await sendEmail(email, "Verify Your Account", `Your OTP is: ${otp}`);

    res.status(201).json({ message: "User registered. Please check your email for OTP."  });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================== Verify OTP ==================
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, code } = req.body;
    const verificationCode = otp ?? code;

    if (!email || !verificationCode) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email});
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.verifyOtp !== verificationCode || user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    res.json({ message: "Account verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// ================== Resend OTP ==================
export const resendOtp = async (req, res) => {
  try {
    const {email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOtp();
    const otpExpire = Date.now() + 5 * 60 * 1000;

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = otpExpire;
    await user.save();

    //await sendSms(phone, `Your new OTP is ${otp}`);
    await sendEmail(email, "Resend OTP", `Your new OTP is: ${otp}`);

    res.json({ message: "OTP resent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================== Request Password Reset ==================
export const requestPasswordReset = async (req, res) => {
  try {
    const { email} = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOtp();
    const otpExpire = Date.now() + 5 * 60 * 1000;

    user.resetOtp = otp;
    user.resetOtpExpireAt = otpExpire;
    await user.save();

    await sendEmail(email, "Password Reset OTP", `Your password reset OTP is ${otp}`);

    res.json({ message: "Password reset OTP sent" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================== Reset Password ==================
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, code, newPassword } = req.body;
    const resetCode = otp ?? code;

    if (!email || !resetCode || !newPassword) {
      return res.status(400).json({ message: "Email, code, and new password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.resetOtp !== resetCode || user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================== Login ==================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.password) {
      return res.status(400).json({ message: "Password not set. Please reset your password or use social login." });
    }

    if (!user.isAccountVerified) {
      return res.status(400).json({ message: "Please verify your account first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    let ownerInfo = null;
    if (user.role === "owner") {
      ownerInfo = await Owner.findOne({ user: user._id }).lean();
    }

    res.json({ token, user: { ...user.toObject(), ownerInfo } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const logout = async (req, res) => {
  try {
    res.clearCookie('token'); // if token was stored in a cookie
    return res.status(200).json({
      success: true,
      message: 'You have been logged out successfully.',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Logout failed. Please try again.',
    });
  }
};


// ================== Profile ==================

export const profile = async (req, res) => {
  try {
    // Get logged-in user info (without password)
    const user = await User.findById(req.user.id).select("-password").lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let ownerInfo = null;
    if (user.role === "owner") {
      // Fetch related owner details
      ownerInfo = await Owner.findOne({ user: user._id }).lean();
    }

    // Combine and send response
    res.status(200).json({ ...user, ownerInfo });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users with owner info
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().lean();

    // Populate owner info for owner users
    const usersWithOwnerInfo = await Promise.all(
      users.map(async (user) => {
        if (user.role === "owner") {
          const ownerInfo = await Owner.findOne({ user: user._id }).lean();
          return { ...user, ownerInfo };
        }
        return user;
      })
    );

    res.status(200).json(usersWithOwnerInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single user by ID with owner info
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).lean();

    if (!user) return res.status(404).json({ message: "User not found" });

    let ownerInfo = null;
    if (user.role === "owner") {
      ownerInfo = await Owner.findOne({ user: user._id }).lean();
    }

    res.status(200).json({ ...user, ownerInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================== Update Profile ==================
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Upload new image to ImageKit if provided
    let imageUrl;
    if (req.file) {
      imageUrl = await uploadToImageKit(req.file);
    }

    // Update allowed fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (imageUrl) user.image = imageUrl;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        phone: user.phone,
        image: user.image,
        email: user.email,
        subscription: user.subscription || null,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ================== Change Password (Logged-in User) ==================
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: "New password must be different from current password",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // invalidate old reset OTPs
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully. Please login again for security.",
    });
  } catch (error) {
    console.error("❌ changePassword error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
