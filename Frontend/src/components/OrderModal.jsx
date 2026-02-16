import React, { useState } from "react";
import { X, Loader2, ShoppingBag } from "lucide-react";
import { toast } from "react-hot-toast";
import { useOrderStore } from "../store/orderStore";
import { useAuth } from "../context/AuthContext"; // Assuming you have an Auth context for user details
import {useCartStore} from "../store/cartStore";
import { useNavigate } from "react-router-dom";

const OrderModal = ({ isOpen, onClose, product, ownerId }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    quantity: 1,
    deliveryOption: "pickup",
    notes: "",
    phoneNumber: "", // Add phone number state
  });
  const [loading, setLoading] = useState(false);
  const { placeOrder } = useOrderStore();
  const {addToCart} = useCartStore();
  const { user } = useAuth(); // Get user info from Auth context

  if (!isOpen || !product) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        productId: product._id,
        ownerId,
        customerId: user._id, // Assuming user ID is stored in context
        quantity: Number(form.quantity),
        message: form.notes.trim(), // Use 'message' instead of 'notes'
        date: new Date().toISOString(), // Current date in ISO format
        phoneNumber: form.phoneNumber.trim(), // Phone number
      };

      const cartData = {
        productId: product._id,
        quantity: Number(form.quantity),
      }

      const res = await placeOrder(orderData);
      await addToCart(product._id, Number(form.quantity));
      toast.success(res?.message || "Order placed successfully!");

      setLoading(false);
      onClose(); // Close modal
      setTimeout(() => {navigate('/clientorder'), 10000})
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
      setLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50 p-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
              <ShoppingBag className="text-orange-600" size={22} />
              Place Your Order
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X size={22} />
            </button>
          </div>

          {/* Product Details */}
          <div className="px-6 py-4 border-b border-gray-100 flex gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg border border-gray-200"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description || "No description available."}
              </p>
              <p className="text-orange-600 font-semibold mt-2">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={form.quantity}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                required
              />
            </div>

            {/* Delivery Option */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Option
              </label>
              <select
                name="deliveryOption"
                value={form.deliveryOption}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="pickup">Pickup</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                required
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (optional)
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Add any special request..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="cp w-full flex justify-center items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Order"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default OrderModal;