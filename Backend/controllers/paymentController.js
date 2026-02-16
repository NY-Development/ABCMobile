import Order from "../models/Order.js";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

/** =============== CUSTOMER UPLOADS PAYMENT (with Image Upload) =============== */
export const uploadPaymentScreenshot = async (req, res) => {
  try {
    const { orderId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Please upload a screenshot." });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found." });

    // Only customer can upload payment
    if (String(order.customer) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized." });
    }

    // Upload image to ImageKit
    const uploadResponse = await imagekit.upload({
      file: file.buffer, // file data from multer memoryStorage
      fileName: `payment_${orderId}_${Date.now()}.jpg`,
      folder: "/order-payments",
    });

    // Update order payment info
    order.payment = {
      screenshotUrl: uploadResponse.url,
      isPaid: true,
      paidAt: new Date(),
      confirmedByOwner: false,
    };
    order.status = "in-progress"; // update order status after payment
    await order.save();

    res.status(200).json({
      message: "✅ Payment screenshot uploaded successfully.",
      order,
    });
  } catch (error) {
    console.error("❌ uploadPaymentScreenshot error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};


/** =============== OWNER: GET ALL PAYMENTS RECEIVED =============== */
export const getPaymentsForOwner = async (req, res) => {
  try {
    const ownerId = req.user._id; // from JWT
    const role = req.user.role;

    if (role !== "owner") {
      return res.status(403).json({ message: "Only owners can view payments." });
    }

    // Find all orders where this owner was paid
    const paidOrders = await Order.find({
      owner: ownerId,
      "payment.isPaid": true,
    })
      .populate("customer", "name email phone")
      .populate("product", "name price image")
      .sort({ "payment.paidAt": -1 });

    if (paidOrders.length === 0) {
      return res.status(200).json({ message: "No completed payments yet.", payments: [] });
    }

    // Prepare structured data for response
    const payments = paidOrders.map((order) => ({
      orderId: order._id,
      productName: order.product?.name,
      productImage: order.product?.image,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      customerName: order.customer?.name,
      customerEmail: order.customer?.email,
      customerPhone: order.customer?.phone,
      paymentScreenshot: order.payment.screenshotUrl,
      paidAt: order.payment.paidAt,
      orderStatus: order.status,
    }));

    res.status(200).json({
      message: "Payments retrieved successfully.",
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.error("❌ getPaymentsForOwner error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/** =============== CUSTOMER: GET ALL PAYMENTS MADE =============== */
export const getPaymentsForCustomer = async (req, res) => {
  try {
    const customerId = req.user._id; // from JWT
    const role = req.user.role;

    if (role !== "customer") {
      return res.status(403).json({ message: "Only customers can view their payments." });
    }

    // Find all orders where this customer has paid
    const paidOrders = await Order.find({
      customer: customerId,
      "payment.isPaid": true,
    })
      .populate("owner", "name email phone")
      .populate("product", "name price image")
      .sort({ "payment.paidAt": -1 });

    if (paidOrders.length === 0) {
      return res.status(200).json({ message: "No payments found.", payments: [] });
    }

    // Prepare structured response
    const payments = paidOrders.map((order) => ({
      orderId: order._id,
      productName: order.product?.name,
      productImage: order.product?.image,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      ownerName: order.owner?.name,
      ownerEmail: order.owner?.email,
      ownerPhone: order.owner?.phone,
      paymentScreenshot: order.payment.screenshotUrl,
      paidAt: order.payment.paidAt,
      orderStatus: order.status,
      estimatedCompletionTime: order.estimatedCompletionTime,
      customerAgreementTime: order.customerAgreementTime,
      pickupLocation: order.pickupLocation,
    }));

    res.status(200).json({
      message: "Payments retrieved successfully.",
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.error("❌ getPaymentsForCustomer error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
