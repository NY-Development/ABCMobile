import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

/** =============== ADD ITEM TO CART =============== */
export const addToCart = async (req, res) => {
  try {
    const customerId = req.user._id;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found or unavailable." });
    }

    // Find or create cart
    let cart = await Cart.findOne({ customer: customerId });

    if (!cart) {
      cart = new Cart({ customer: customerId, items: [] });
    }

    // Check if product already in cart
    const existingItem = cart.items.find(
      (item) => String(item.product) === String(productId)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).json({
      message: "Product added to cart successfully.",
      cart,
    });
  } catch (error) {
    console.error("❌ addToCart error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/** =============== GET CUSTOMER CART =============== */
export const getCart = async (req, res) => {
  try {
    const customerId = req.user._id;

    const cart = await Cart.findOne({ customer: customerId }).populate({
      path: "items.product",
      select: "name price image availableQuantity description",
    });

    if (!cart) return res.status(200).json({ message: "Cart is empty.", items: [] });

    res.status(200).json({
      message: "Cart fetched successfully.",
      cart,
    });
  } catch (error) {
    console.error("❌ getCart error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/** =============== UPDATE ITEM QUANTITY =============== */
export const updateCartItem = async (req, res) => {
  try {
    const customerId = req.user._id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ customer: customerId });
    if (!cart) return res.status(404).json({ message: "Cart not found." });

    const item = cart.items.find((i) => String(i.product) === String(productId));
    if (!item) return res.status(404).json({ message: "Product not found in cart." });

    if (quantity <= 0) {
      // Remove item
      cart.items = cart.items.filter((i) => String(i.product) !== String(productId));
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    res.status(200).json({ message: "Cart updated successfully.", cart });
  } catch (error) {
    console.error("❌ updateCartItem error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/** =============== REMOVE ITEM FROM CART =============== */
export const removeCartItem = async (req, res) => {
  try {
    const customerId = req.user._id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ customer: customerId });
    if (!cart) return res.status(404).json({ message: "Cart not found." });

    cart.items = cart.items.filter((item) => String(item.product) !== String(productId));
    await cart.save();

    res.status(200).json({ message: "Item removed from cart.", cart });
  } catch (error) {
    console.error("❌ removeCartItem error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/** =============== CLEAR ENTIRE CART =============== */
export const clearCart = async (req, res) => {
  try {
    const customerId = req.user._id;
    await Cart.findOneAndDelete({ customer: customerId });
    res.status(200).json({ message: "Cart cleared successfully." });
  } catch (error) {
    console.error("❌ clearCart error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};