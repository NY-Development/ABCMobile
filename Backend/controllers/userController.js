import User from "../models/Users.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Review from "../models/Review.js";
import Owner from "../models/Owner.js";
import Product from "../models/Product.js";


// DELETE account (customer or owner)
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle CUSTOMER deletion
    if (user.role === "customer") {
      const activeOrders = await Order.find({
        customer: userId,
        status: { $in: ["pending", "in-progress"] },
      });

      if (activeOrders.length > 0) {
        return res.status(400).json({
          message:
            "You cannot delete your account while you have active or in-progress orders.",
        });
      }

      await Promise.all([
        Cart.deleteMany({ customer: userId }),
        Review.deleteMany({ customer: userId }),
        Order.deleteMany({ customer: userId }),
      ]);

      await User.findByIdAndDelete(userId);

      return res.status(200).json({
        success: true,
        message:
          "Your customer account and related data have been deleted successfully.",
      });
    }

    // Handle OWNER deletion
    if (user.role === "owner") {
      // Check for active or in-progress orders tied to this owner
      const activeOwnerOrders = await Order.find({
        owner: userId,
        status: { $in: ["pending", "in-progress"] },
      });

      if (activeOwnerOrders.length > 0) {
        return res.status(400).json({
          message:
            "You cannot delete your account while you have active or in-progress orders.",
        });
      }

      // Check if the owner has active products
      const activeProducts = await Product.find({
        owner: userId,
        isActive: true,
      });

      if (activeProducts.length > 0) {
        return res.status(400).json({
          message:
            "You cannot delete your account while you have active products. Please deactivate or remove them first.",
        });
      }

      // Delete related data safely
      await Promise.all([
        Product.deleteMany({ owner: userId }),
        Review.deleteMany({ owner: userId }),
        Order.deleteMany({ owner: userId }),
        Owner.deleteMany({ user: userId }),
      ]);

      await User.findByIdAndDelete(userId);

      return res.status(200).json({
        success: true,
        message:
          "Your owner account and related data have been deleted successfully.",
      });
    }

    // Other roles (admin, delivery)
    return res.status(403).json({
      message: "Only customers or owners can delete their accounts.",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({
      message: "Server error while deleting account",
      error: error.message,
    });
  }
};