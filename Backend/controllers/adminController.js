import mongoose from "mongoose";
import User from "../models/Users.js";
import Owner from "../models/Owner.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Review from "../models/Review.js";
import Advert from "../models/Advert.js";
import { sendEmail } from "../utils/email.js";
import { sendSms } from "../utils/sendSms.js";

export const getAdminDashboardStats = async (req, res) => {
  try {
    // 🧾 Verify admin role
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    // 🧍 Total users and owners
    const [totalUsers, totalOwners, totalProducts, totalOrders, totalReviews] = await Promise.all([
      User.countDocuments(),
      Owner.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Review.countDocuments(),
    ]);

    // 💰 Total revenue from paid orders
    const paidOrders = await Order.find({ "payment.isPaid": true }).select("totalPrice");
    const totalRevenue = paidOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

    // 📈 Monthly sales stats (last 6 months)
    const monthlySales = await Order.aggregate([
      {
        $match: {
          "payment.isPaid": true,
          createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalRevenue: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    // 🥇 Top 5 selling products
    const topProducts = await Order.aggregate([
      { $match: { "payment.isPaid": true } },
      {
        $group: {
          _id: "$product",
          totalSold: { $sum: "$quantity" },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          name: { $arrayElemAt: ["$product.name", 0] },
          image: { $arrayElemAt: ["$product.image", 0] },
          totalSold: 1,
          totalRevenue: 1,
        },
      },
    ]);

    // 🧾 Recent Orders (latest 5)
    const recentOrders = await Order.find()
      .populate("customer", "name email")
      .populate("owner", "name email")
      .populate("product", "name price image")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // ✅ Response
    res.status(200).json({
      message: "✅ Admin dashboard stats fetched successfully.",
      stats: {
        totalUsers,
        totalOwners,
        totalProducts,
        totalOrders,
        totalReviews,
        totalRevenue,
        monthlySales,
        topProducts,
        recentOrders,
      },
    });
  } catch (error) {
    console.error("❌ getAdminDashboardStats error:", error);
    res.status(500).json({ message: "Server error fetching dashboard stats.", error: error.message });
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -__v"); 
    // exclude password & version key for safety
    res.status(200).json(users);
  } catch (err) {
    console.error("getAllUsers error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/** =============== ADMIN: GET USER AND ALL RELATED DATA =============== */
export const getUserAndRelatedData = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password").lean();

    if (!user) return res.status(404).json({ message: "User not found" });

    let relatedData = {};

    // 🏢 If user is an owner
    if (user.role === "owner") {
      const ownerProfile = await Owner.findOne({ user: user._id }).lean();
      const products = await Product.find({ owner: user._id }).lean();
      const orders = await Order.find({ owner: user._id })
        .populate("customer", "name email phone")
        .populate("product", "name price image")
        .lean();
      const reviews = await Review.find({ owner: user._id })
        .populate("customer", "name email")
        .lean();

      relatedData = {
        ownerProfile,
        products,
        orders,
        reviews,
      };
    }

    // 🧍 If user is a customer
    else if (user.role === "customer") {
      const orders = await Order.find({ customer: user._id })
        .populate("owner", "name email phone")
        .populate("product", "name price image")
        .lean();
      const cart = await Cart.findOne({ customer: user._id })
        .populate("items.product", "name price image")
        .lean();
      const reviews = await Review.find({ customer: user._id })
        .populate("owner", "name email")
        .lean();

      relatedData = {
        orders,
        cart,
        reviews,
      };
    }

    // 👑 If admin or delivery role
    else {
      relatedData = { message: "No specific related data for this role." };
    }

    res.status(200).json({
      message: "✅ User and related data retrieved successfully.",
      user,
      relatedData,
    });
  } catch (error) {
    console.error("❌ getUserAndRelatedData error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all owners (includes User + Owner fields)
export const getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.find().select("-password -__v"); 
    // exclude sensitive fields like password
    res.status(200).json(owners);
  } catch (err) {
    console.error("getAllOwners error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single owner by ID
export const getOwnerById = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id).select("-password -__v");
    if (!owner) return res.status(404).json({ message: "Owner not found" });

    res.status(200).json(owner);
  } catch (err) {
    console.error("getOwnerById error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Delete user and all related data
export const deleteUserAndRelatedData = async (req, res) => {
  const { userId } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId).session(session);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 1️⃣ If user is an owner, delete related Owner info
    if (user.role === "owner") {
      await Owner.deleteOne({ user: user._id }).session(session);

      // Delete all products by this owner
      const products = await Product.find({ owner: user._id }).session(session);
      const productIds = products.map((p) => p._id);

      await Product.deleteMany({ owner: user._id }).session(session);

      // Delete all orders related to these products
      await Order.deleteMany({ product: { $in: productIds } }).session(session);

      // Delete reviews for these products
      await Review.deleteMany({ product: { $in: productIds } }).session(session);
    }

    // 2️⃣ If user is a customer, delete orders, carts, and reviews
    if (user.role === "customer") {
      await Order.deleteMany({ customer: user._id }).session(session);
      await Cart.deleteMany({ customer: user._id }).session(session);
      await Review.deleteMany({ customer: user._id }).session(session);
    }

    // 3️⃣ Delete reviews where the user is the owner
    await Review.deleteMany({ owner: user._id }).session(session);

    // 4️⃣ Finally, delete the user
    await User.deleteOne({ _id: user._id }).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "User and all related data deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteAllUsersAndRelatedData = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Get all users
    const users = await User.find().session(session);

    for (const user of users) {
      // 1️⃣ Delete owner-specific data
      if (user.role === "owner") {
        await Owner.deleteOne({ user: user._id }).session(session);

        const products = await Product.find({ owner: user._id }).session(session);
        const productIds = products.map((p) => p._id);

        await Product.deleteMany({ owner: user._id }).session(session);
        await Order.deleteMany({ product: { $in: productIds } }).session(session);
        await Review.deleteMany({ product: { $in: productIds } }).session(session);
      }

      // 2️⃣ Delete customer-specific data
      if (user.role === "customer") {
        await Order.deleteMany({ customer: user._id }).session(session);
        await Cart.deleteMany({ customer: user._id }).session(session);
        await Review.deleteMany({ customer: user._id }).session(session);
      }

      // 3️⃣ Delete reviews where the user is owner
      await Review.deleteMany({ owner: user._id }).session(session);

      // 4️⃣ Delete the user
      await User.deleteOne({ _id: user._id }).session(session);
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "All users and their related data deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify owner's company license
export const verifyCompany = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const updated = await Owner.findByIdAndUpdate(
      ownerId,
      { companyVerified: true },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Owner not found" });

    res.status(200).json({ message: "Company verified successfully", owner: updated });
  } catch (error) {
    console.error("verifyCompany error:", error);
    res.status(500).json({ message: "Server error during verification" });
  }
};


/** =============== ADMIN: GET ALL PAYMENTS =============== */
export const getAllPaymentsForAdmin = async (req, res) => {
  try {
    const role = req.user.role;

    if (role !== "admin") {
      return res.status(403).json({ message: "Only admins can view all payments." });
    }

    // Find all paid orders
    const paidOrders = await Order.find({ "payment.isPaid": true })
      .populate("customer", "name email phone")
      .populate("owner", "name email phone")
      .populate("product", "name price image")
      .sort({ "payment.paidAt": -1 });

    if (paidOrders.length === 0) {
      return res.status(200).json({ message: "No payments found.", payments: [] });
    }

    // Format structured payment data
    const payments = paidOrders.map((order) => ({
      orderId: order._id,
      productName: order.product?.name,
      productImage: order.product?.image,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      customerName: order.customer?.name,
      customerEmail: order.customer?.email,
      customerPhone: order.customer?.phone,
      ownerName: order.owner?.name,
      ownerEmail: order.owner?.email,
      ownerPhone: order.owner?.phone,
      paymentScreenshot: order.payment?.screenshotUrl,
      paidAt: order.payment?.paidAt,
      orderStatus: order.status,
    }));

    res.status(200).json({
      message: "✅ All payments retrieved successfully.",
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.error("❌ getAllPaymentsForAdmin error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};


/* ============================================================
   1️⃣  ADMIN: VERIFY COMPANY LICENSE (Owner)
=============================================================== */
export const verifyCompanyLicense = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const owner = await Owner.findById(ownerId);
    if (!owner) return res.status(404).json({ message: "Owner not found" });

    owner.companyVerified = true;
    await owner.save();

    res.status(200).json({
      message: "Company license verified successfully.",
      owner
    });
  } catch (error) {
    console.error("verifyCompanyLicense error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


/* ============================================================
   2️⃣  ADMIN: APPROVE OR REJECT SUBSCRIPTION PAYMENT
=============================================================== */
export const updateSubscriptionStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body; // true = approve, false = deactivate

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.subscription.isActive = isActive;
    user.subscription.paidAt = isActive ? new Date() : null;

    // Optionally extend subscription time
    if (isActive) {
      const now = new Date();
      user.subscription.startDate = now;

      if (user.subscription.plan === "monthly") {
        user.subscription.endDate = new Date(now.setMonth(now.getMonth() + 1));
      } else {
        user.subscription.endDate = new Date(now.setFullYear(now.getFullYear() + 1));
      }
    } else {
      user.subscription.endDate = null;
    }

    await user.save();

    res.status(200).json({
      message: `Subscription ${isActive ? "activated" : "deactivated"} successfully.`,
      subscription: user.subscription,
    });

  } catch (error) {
    console.error("updateSubscriptionStatus error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


/* ============================================================
   3️⃣  ADMIN: MARK ORDER PAYMENT AS PAID
=============================================================== */
export const approveOrderPayment = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.payment.isPaid = true;
    order.payment.paidAt = new Date();
    await order.save();

    res.status(200).json({
      message: "Order payment marked as paid.",
      order,
    });

  } catch (error) {
    console.error("approveOrderPayment error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


/* ============================================================
   4️⃣  ADMIN: SEND CUSTOM EMAIL OR SMS MESSAGE
=============================================================== */
export const sendCustomMessage = async (req, res) => {
  try {
    const { userId } = req.params;
    const { subject, message, type } = req.body;
    // type = "email" | "sms"

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (type === "email") {
      await sendEmail(user.email, subject, message);
      return res.status(200).json({ message: "Email sent successfully." });
    }

    if (type === "sms") {
      if (!user.phone) {
        return res.status(400).json({ message: "User has no phone number." });
      }
      await sendSms(user.phone, message);
      return res.status(200).json({ message: "SMS sent successfully." });
    }

    res.status(400).json({ message: "Invalid message type (email or sms required)." });

  } catch (error) {
    console.error("sendCustomMessage error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ADMIN APPROVES PAYMENT FOR ADVERTISEMENT
export const adminApproveAdvert = async (req, res) => {
  try {
    const { advertId } = req.params;

    const advert = await Advert.findById(advertId);
    if (!advert) return res.status(404).json({ message: "Advert not found." });

    advert.adminVerified = true;
    advert.isActive = true;

    await advert.save();

    return res.status(200).json({ success: true, message: "Advertisement approved.", advert });

  } catch (err) {
    console.error("adminApproveAdvert error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

// ADMIN DECLINES ADVERTISEMENT
export const adminDeclineAdvert = async (req, res) => {
  try {
    const { advertId } = req.params;
    const { reason } = req.body; // optional decline reason

    const advert = await Advert.findById(advertId);
    if (!advert) return res.status(404).json({ message: "Advert not found." });

    advert.adminVerified = false;
    advert.isActive = false;
    advert.status = "declined";
    advert.declineReason = reason || "Not specified";

    await advert.save();

    return res.status(200).json({
      success: true,
      message: "Advertisement has been declined.",
      advert
    });

  } catch (err) {
    console.error("adminDeclineAdvert error:", err);
    res.status(500).json({ message: "Server error." });
  }
};