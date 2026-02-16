import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/Users.js";

/** =============== CUSTOMER PLACES AN ORDER =============== */
export const placeOrder = async (req, res) => {
  try {
    const { productId, ownerId, customerId, quantity, message, date, phoneNumber } = req.body;

    // Verify customer and owner exist
    const customer = await User.findById(customerId);
    const owner = await User.findById(ownerId);
    if (!customer || customer.role !== "customer")
      return res.status(403).json({ message: "Invalid customer." });
    if (!owner || owner.role !== "owner")
      return res.status(403).json({ message: "Invalid owner." });

    // Check product availability
    const product = await Product.findById(productId);
    if (!product || product.availableQuantity < quantity)
      return res.status(400).json({ message: "Not enough stock available." });

    const totalPrice = product.price * quantity;

    const newOrder = new Order({
      product: productId,
      owner: ownerId,
      customer: customerId,
      quantity,
      totalPrice,
      message,
      date,
      phoneNumber,
    });

    await newOrder.save();

    // Reduce product stock immediately (optional: only after payment if you want)
    product.availableQuantity -= quantity;
    if (product.availableQuantity <= 0) product.isActive = false;
    await product.save();

    res.status(201).json({
      message: "Order placed successfully. Awaiting owner approval.",
      order: newOrder,
    });
  } catch (error) {
    console.error("❌ placeOrder error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/** =============== OWNER ACCEPTS OR REJECTS AN ORDER =============== */
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, estimatedCompletionTime } = req.body; // status expected: "in-progress" or "rejected"

    const order = await Order.findById(orderId)
      .populate("customer")
      .populate("product");

    if (!order) return res.status(404).json({ message: "Order not found." });

    // Only owner can update this order
    if (String(order.owner) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to update this order." });
    }

    if (status === "in-progress") {
      // Owner accepted the order
      order.status = "in-progress";
    } else {
      // Any other status from owner (like "rejected") is treated as cancelled
      order.status = "cancelled";
    }

    if (estimatedCompletionTime) {
      order.estimatedCompletionTime = new Date(estimatedCompletionTime);
    }

    await order.save();

    res.json({
      message: `Order has been ${order.status === "in-progress" ? "accepted" : "cancelled"} successfully.`,
      order,
    });
  } catch (error) {
    console.error("❌ updateOrderStatus error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};



/** =============== CUSTOMER CONFIRMS AGREEMENT =============== */
export const confirmAgreement = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { agreed } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found." });

    if (String(order.customer) !== String(req.user._id))
      return res.status(403).json({ message: "You are not authorized to confirm this order." });

    if (!agreed) {
      order.status = "cancelled";
      await order.save();
      return res.json({ message: "Order cancelled by customer.", order });
    }

    // Customer agrees
    order.status = "in-progress";
    order.customerAgreementTime = new Date();
    await order.save();

    res.json({
      message: "Customer agreed to the time. Countdown started for payment.",
      order,
    });
  } catch (error) {
    console.error("❌ confirmAgreement error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/** =============== OWNER MARKS ORDER AS READY =============== */
export const markAsReady = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { pickupLocation, mapUrl } = req.body; //  optional map URL

    const order = await Order.findById(orderId).populate("customer").populate("product");
    if (!order) return res.status(404).json({ message: "Order not found." });

    // ✅ Only the owner who owns the order can update it
    if (String(order.owner) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to mark this order as ready." });
    }

    // Ensure the order is in-progress before marking as ready
    if (order.status !== "in-progress") {
      return res
        .status(400)
        .json({ message: "Order must be in progress before it can be marked as ready." });
    }

    //  Update order fields
    order.status = "delivered";
    order.pickupLocation = pickupLocation || "Not specified";
    order.mapUrl = mapUrl || ""; // optional Google Maps link
    order.readyAt = new Date(); //  timestamp when marked ready

    await order.save();

    // 📨 Later: notify customer via email, SMS, or socket.io
    res.json({
      message: "Cake is ready for pickup. Customer notified with location.",
      order,
    });
  } catch (error) {
    console.error("❌ markAsReady error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/** =============== GET ORDERS (for Owner or Customer) =============== */
export const getOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    // Filter based on role
    const filter = role === "owner" ? { owner: userId } : { customer: userId };

    // Fetch and populate product + related user (customer for owner view)
    const orders = await Order.find(filter)
      .populate({
        path: "product",
        select: "name price image description", // minimal info
      })
      .populate({
        path: "customer",
        select: "name email phone", // show to owner
      })
      .populate({
        path: "owner",
        select: "name email", // show to customer
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Orders fetched successfully.",
      total: orders.length,
      orders: orders.map((order) => ({
        _id: order._id,
        product: order.product,
        customer: order.customer,
        owner: order.owner,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        status: order.status,
        pickupLocation: order.pickupLocation || null,
        estimatedDeliveryDate: order.estimatedDeliveryDate || null,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      })),
    });
  } catch (error) {
    console.error("❌ getOrders error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/** =============== CUSTOMER CANCELS AN ORDER =============== */
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("product");
    if (!order) return res.status(404).json({ message: "Order not found." });

    // Only the customer who placed the order can cancel it
    if (String(order.customer) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to cancel this order." });
    }

    // If already delivered or cancelled, cannot cancel
    if (order.status === "delivered") {
      return res.status(400).json({ message: "This order has already been delivered." });
    }
    if (order.status === "cancelled") {
      return res.status(400).json({ message: "Order already cancelled." });
    }

    // Update order status
    order.status = "cancelled";
    order.cancelledAt = new Date();
    await order.save();

    // Restore product stock
    const product = order.product;
    product.availableQuantity += order.quantity;
    if (product.availableQuantity > 0) product.isActive = true;
    await product.save();

    // Notify owner (simple JSON message for now)
    const ownerNotification = {
      message: `Customer cancelled order #${order._id}`,
      owner: order.owner,
      customer: order.customer,
      product: product._id,
      time: new Date(),
    };

  
    // await Notification.create(ownerNotification);

    res.json({
      message: "Order cancelled successfully and owner notified.",
      notification: ownerNotification,
      order,
    });

  } catch (error) {
    console.error("❌ cancelOrder error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};


/** =============== ADD / REMOVE FAVORITE PRODUCT =============== */
export const toggleWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const user = await User.findById(userId);
    if (!user || user.role !== "customer") {
      return res.status(403).json({ message: "Only customers can favorite products." });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const alreadyLiked = user.wishlist.includes(productId);

    if (alreadyLiked) {
      //  Remove from wishlist
      user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== productId
      );
    } else {
      //  Add to wishlist
      user.wishlist.push(productId);
    }

    await user.save();

    res.json({
      message: alreadyLiked
        ? "Product removed from wishlist."
        : "Product added to wishlist.",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("❌ toggleWishlist error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/** =============== GET CUSTOMER WISHLIST =============== */
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate({
      path: "wishlist",
      select: "name price image description isActive",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      message: "Wishlist fetched successfully.",
      total: user.wishlist.length,
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("❌ getWishlist error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};