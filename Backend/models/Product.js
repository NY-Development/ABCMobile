import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Cookies", "Waffles", "Macarons", "Snacks", "Beverages", "Cake"],
    },
    size: { type: String },
    color: { type: String },
    shape: { type: String },
    availableQuantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;