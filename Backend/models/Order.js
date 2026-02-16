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
      screenshotUrl: { type: String, default: "" },
      isPaid: { type: Boolean, default: false },
      paidAt: { type: Date },
      //confirmedByOwner: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
