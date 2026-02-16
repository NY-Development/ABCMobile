import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    companyName: { type: String },
    companyImage: { type: String },
    branches: { type: Number },
    location: { type: String },
    address: { type: String },
    tradingLicense: { type: String },
    companyVerified: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    accountNumber: { type: String },
    mapLocation: { type: String },
    firstLogin: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Owner = mongoose.model("Owner", ownerSchema, "owners"); // explicit collection
export default Owner;
