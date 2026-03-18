import mongoose from "mongoose";
import Order from "../models/Order.js";
import User from "../models/Users.js";

const DELIVERY_FEE_RATE = 0.03;

const calculateDeliveryFee = (amount) =>
  Number((amount * DELIVERY_FEE_RATE).toFixed(2));

/** =============== CUSTOMER: GET REGISTERED DELIVERY PROVIDERS =============== */
export const getRegisteredDeliveryProviders = async (req, res) => {
  try {
    const role = req.user?.role;
    if (role !== "customer" && role !== "owner") {
      return res
        .status(403)
        .json({ message: "Only customer/owner can view delivery providers." });
    }

    const productAmount = Number(req.query.productAmount || 0);
    const hasAmount = Number.isFinite(productAmount) && productAmount > 0;
    const estimatedFee = hasAmount ? calculateDeliveryFee(productAmount) : null;

    const providers = await User.find({
      role: "delivery",
      isAccountVerified: true,
    })
      .select("name email phone image deliveryProfile")
      .sort({ "deliveryProfile.rating": -1, createdAt: -1 });

    return res.status(200).json({
      message: "Registered delivery providers fetched successfully.",
      feeRate: DELIVERY_FEE_RATE,
      count: providers.length,
      providers: providers.map((provider) => ({
        _id: provider._id,
        name: provider.name,
        email: provider.email,
        phone: provider.phone || "",
        image: provider.image || "",
        deliveryProfile: provider.deliveryProfile || {},
        estimatedFee,
      })),
    });
  } catch (error) {
    console.error("getRegisteredDeliveryProviders error:", error);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

/** =============== GET SINGLE DELIVERY PROVIDER PROFILE =============== */
export const getDeliveryProviderProfile = async (req, res) => {
  try {
    const { deliveryId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(deliveryId)) {
      return res.status(400).json({ message: "Invalid delivery provider id." });
    }

    const provider = await User.findOne({
      _id: deliveryId,
      role: "delivery",
    }).select("name email phone image deliveryProfile");
    if (!provider) {
      return res.status(404).json({ message: "Delivery provider not found." });
    }

    return res.status(200).json({
      message: "Delivery provider profile fetched successfully.",
      provider,
      feeRate: DELIVERY_FEE_RATE,
    });
  } catch (error) {
    console.error("getDeliveryProviderProfile error:", error);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

/** =============== CUSTOMER: SELECT DELIVERY PROVIDER FOR ORDER =============== */
export const selectDeliveryProviderForOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const {
      deliveryProviderId,
      deliveryAddress,
      recipientName,
      recipientPhone,
      note,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order id." });
    }
    if (!mongoose.Types.ObjectId.isValid(deliveryProviderId)) {
      return res.status(400).json({ message: "Invalid delivery provider id." });
    }
    if (!deliveryAddress) {
      return res.status(400).json({ message: "Delivery address is required." });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found." });

    if (String(order.customer) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ message: "Not authorized to select delivery provider." });
    }
    if (order.deliveryOption !== "delivery") {
      return res.status(400).json({
        message:
          "This order is not a delivery order. Update order with delivery option.",
      });
    }

    const provider = await User.findOne({
      _id: deliveryProviderId,
      role: "delivery",
    }).select("name email phone image deliveryProfile");
    if (!provider) {
      return res.status(404).json({ message: "Delivery provider not found." });
    }
    if (provider.deliveryProfile?.isAvailable === false) {
      return res
        .status(400)
        .json({ message: "Selected delivery provider is not available." });
    }

    const feeAmount = calculateDeliveryFee(order.totalPrice || 0);
    const totalPayable = Number(
      ((order.totalPrice || 0) + feeAmount).toFixed(2),
    );

    order.delivery = {
      ...(order.delivery || {}),
      provider: provider._id,
      address: deliveryAddress,
      recipientName: recipientName || "",
      recipientPhone: recipientPhone || "",
      note: note || "",
      feeRate: DELIVERY_FEE_RATE,
      feeAmount,
      totalPayable,
      assignedAt: new Date(),
    };

    await order.save();
    await order.populate(
      "delivery.provider",
      "name email phone image deliveryProfile",
    );

    return res.status(200).json({
      message: "Delivery provider selected successfully.",
      order,
    });
  } catch (error) {
    console.error("selectDeliveryProviderForOrder error:", error);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

/** =============== DELIVERY: UPDATE OWN PROFILE DETAILS =============== */
export const upsertMyDeliveryProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || user.role !== "delivery") {
      return res
        .status(403)
        .json({ message: "Only delivery users can update delivery profile." });
    }

    const {
      vehicleType,
      plateNumber,
      region,
      city,
      isAvailable,
      rating,
      totalDeliveries,
    } = req.body;

    user.deliveryProfile = {
      ...(user.deliveryProfile || {}),
      ...(vehicleType !== undefined ? { vehicleType } : {}),
      ...(plateNumber !== undefined ? { plateNumber } : {}),
      ...(region !== undefined ? { region } : {}),
      ...(city !== undefined ? { city } : {}),
      ...(isAvailable !== undefined ? { isAvailable } : {}),
      ...(rating !== undefined ? { rating } : {}),
      ...(totalDeliveries !== undefined ? { totalDeliveries } : {}),
    };

    await user.save();

    return res.status(200).json({
      message: "Delivery profile updated successfully.",
      deliveryProfile: user.deliveryProfile,
    });
  } catch (error) {
    console.error("upsertMyDeliveryProfile error:", error);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

/** =============== DELIVERY: GET MY ASSIGNED ORDERS =============== */
export const getMyAssignedDeliveries = async (req, res) => {
  try {
    if (req.user.role !== "delivery") {
      return res
        .status(403)
        .json({ message: "Only delivery users can view assigned deliveries." });
    }

    const orders = await Order.find({
      "delivery.provider": req.user._id,
      deliveryOption: "delivery",
    })
      .populate("product", "name price image")
      .populate("owner", "name email phone")
      .populate("customer", "name email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Assigned deliveries fetched successfully.",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("getMyAssignedDeliveries error:", error);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};
