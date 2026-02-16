import mongoose from "mongoose";

const options = { timestamps: true };

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      match: [/^\+?[1-9]\d{7,14}$/, "Please enter a valid phone number"],
    },
    role: {
      type: String,
      enum: ["customer", "owner", "admin", "delivery"],
      default: "customer",
    },
    googleId: { type: String, unique: true, sparse: true },
    image: { type: String },
    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 },
    subscription: {
      plan: { type: String, enum: ["monthly", "yearly"], default: "monthly" },
      isActive: { type: Boolean, default: false },
      startDate: { type: Date },
      endDate: { type: Date },
      amountPaid: { type: Number },
      paidAt: { type: Date },
      paymentScreenshot: { type: String, default: "" },
    },
    // Wishlist
     wishlist: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      },
     ],
     }, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
