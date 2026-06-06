import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    deliveryOption: {
      type: String,
      enum: ["delivery", "without-delivery"],
      default: "without-delivery",
    },
    delivery: {
      provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      address: { type: String, default: "" },
      recipientName: { type: String, default: "" },
      recipientPhone: { type: String, default: "" },
      note: { type: String, default: "" },
      feeRate: { type: Number, default: 0 },
      feeAmount: { type: Number, default: 0 },
      totalPayable: { type: Number, default: 0 },
      assignedAt: { type: Date },
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "delivered", "cancelled"],
      default: "pending",
    },
    estimatedCompletionTime: { type: Date },
    customerAgreementTime: { type: Date },
    pickupLocation: { type: String },
    mapUrl: { type: String },
    readyAt: { type: Date },

    //  Payment fields
    payment: {
      screenshotUrl: {
        type: String,
        default: "",
      },

      transactionId: {
        type: String,
        default: "",
      },

      verificationStatus: {
        type: String,
        enum: ["pending", "verified", "failed"],
        default: "pending",
      },

      verificationProvider: {
        type: String,
        default: "",
      },

      method: {
        type: String,
        enum: ["telebirr"],
        default: "telebirr",
      },

      amountPaid: {
        type: Number,
        default: 0,
      },

      isPaid: {
        type: Boolean,
        default: false,
      },

      paidAt: Date,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
