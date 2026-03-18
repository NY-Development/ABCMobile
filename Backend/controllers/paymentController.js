import Order from "../models/Order.js";
import ImageKit from "imagekit";

const DELIVERY_FEE_RATE = 0.03;

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const getAmountBreakdown = (order) => {
  const productAmount = Number(order.totalPrice || 0);
  const deliveryFee =
    order.deliveryOption === "delivery"
      ? Number(
          (
            order.delivery?.feeAmount ??
            Number((productAmount * DELIVERY_FEE_RATE).toFixed(2))
          ).toFixed(2),
        )
      : 0;
  const payableAmount =
    order.deliveryOption === "delivery"
      ? Number(
          (
            order.delivery?.totalPayable ??
            Number((productAmount + deliveryFee).toFixed(2))
          ).toFixed(2),
        )
      : productAmount;

  return { productAmount, deliveryFee, payableAmount };
};

/** =============== CUSTOMER UPLOADS TELEBIRR PAYMENT (with Image Upload) =============== */
export const uploadPaymentScreenshot = async (req, res) => {
  try {
    const { orderId } = req.params;
    const file =
      req.file || req.files?.screenshoot?.[0] || req.files?.screenshot?.[0];

    if (!file) {
      return res
        .status(400)
        .json({ message: "Please upload a payment screenshot." });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found." });

    if (String(order.customer) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized." });
    }

    if (order.deliveryOption === "delivery" && !order.delivery?.provider) {
      return res.status(400).json({
        message: "Please select a delivery provider before Telebirr payment.",
      });
    }

    const uploadResponse = await imagekit.upload({
      file: file.buffer,
      fileName: `payment_${orderId}_${Date.now()}.jpg`,
      folder: "/order-payments",
    });

    const { productAmount, deliveryFee, payableAmount } =
      getAmountBreakdown(order);

    order.payment = {
      screenshotUrl: uploadResponse.url,
      method: "telebirr",
      amountPaid: payableAmount,
      isPaid: true,
      paidAt: new Date(),
    };
    order.status = "in-progress";
    await order.save();

    return res.status(200).json({
      message: "Telebirr payment screenshot uploaded successfully.",
      amount: {
        productAmount,
        deliveryFee,
        payableAmount,
      },
      order,
    });
  } catch (error) {
    console.error("uploadPaymentScreenshot error:", error);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

/** =============== OWNER: GET ALL PAYMENTS RECEIVED =============== */
export const getPaymentsForOwner = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const role = req.user.role;

    if (role !== "owner") {
      return res
        .status(403)
        .json({ message: "Only owners can view payments." });
    }

    const paidOrders = await Order.find({
      owner: ownerId,
      "payment.isPaid": true,
    })
      .populate("customer", "name email phone")
      .populate("product", "name price image")
      .populate("delivery.provider", "name phone image")
      .sort({ "payment.paidAt": -1 });

    if (paidOrders.length === 0) {
      return res
        .status(200)
        .json({ message: "No completed payments yet.", payments: [] });
    }

    const payments = paidOrders.map((order) => {
      const amount = getAmountBreakdown(order);
      return {
        orderId: order._id,
        productName: order.product?.name,
        productImage: order.product?.image,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        deliveryOption: order.deliveryOption,
        deliveryProvider: order.delivery?.provider || null,
        customerName: order.customer?.name,
        customerEmail: order.customer?.email,
        customerPhone: order.customer?.phone,
        paymentScreenshot: order.payment?.screenshotUrl || "",
        paymentMethod: order.payment?.method || "telebirr",
        amountPaid: order.payment?.amountPaid || amount.payableAmount,
        paidAt: order.payment?.paidAt,
        orderStatus: order.status,
        ...amount,
      };
    });

    return res.status(200).json({
      message: "Payments retrieved successfully.",
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.error("getPaymentsForOwner error:", error);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

/** =============== CUSTOMER: GET ALL PAYMENTS MADE =============== */
export const getPaymentsForCustomer = async (req, res) => {
  try {
    const customerId = req.user._id;
    const role = req.user.role;

    if (role !== "customer") {
      return res
        .status(403)
        .json({ message: "Only customers can view their payments." });
    }

    const paidOrders = await Order.find({
      customer: customerId,
      "payment.isPaid": true,
    })
      .populate("owner", "name email phone")
      .populate("product", "name price image")
      .populate("delivery.provider", "name phone image")
      .sort({ "payment.paidAt": -1 });

    if (paidOrders.length === 0) {
      return res
        .status(200)
        .json({ message: "No payments found.", payments: [] });
    }

    const payments = paidOrders.map((order) => {
      const amount = getAmountBreakdown(order);
      return {
        orderId: order._id,
        productName: order.product?.name,
        productImage: order.product?.image,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        deliveryOption: order.deliveryOption,
        deliveryProvider: order.delivery?.provider || null,
        ownerName: order.owner?.name,
        ownerEmail: order.owner?.email,
        ownerPhone: order.owner?.phone,
        paymentScreenshot: order.payment?.screenshotUrl || "",
        paymentMethod: order.payment?.method || "telebirr",
        amountPaid: order.payment?.amountPaid || amount.payableAmount,
        paidAt: order.payment?.paidAt,
        orderStatus: order.status,
        estimatedCompletionTime: order.estimatedCompletionTime,
        customerAgreementTime: order.customerAgreementTime,
        pickupLocation: order.pickupLocation,
        ...amount,
      };
    });

    return res.status(200).json({
      message: "Payments retrieved successfully.",
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.error("getPaymentsForCustomer error:", error);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};
