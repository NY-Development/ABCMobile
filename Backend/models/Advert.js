import mongoose from "mongoose";

const advertiseSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Owner inputs
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  days: { type: Number, required: true },
  totalCost: { type: Number, required: true },

 
  paymentScreenshot: { type: String, default: "" },
  adminVerified: { type: Boolean, default: false },

  // Whether to show on homepage
  isActive: { type: Boolean, default: false },

  status: { type: String,default: "pending",
  enum: ["pending", "approved", "declined"]
   },
  declineReason: { type: String, default: null}
}, {
  timestamps: true
});

export default mongoose.model("Advert", advertiseSchema);
