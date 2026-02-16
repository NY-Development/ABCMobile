import Owner from "../models/Owner.js";
import imagekit from "../configs/imageKit.js";
import Product from "../models/Product.js";
import User from "../models/Users.js";
import Order from "../models/Order.js";

// Helper to upload file to ImageKit
const uploadToImageKit = async (file) => {
  if (!file) return null;
  const uploadResponse = await imagekit.upload({
    file: file.buffer,
    fileName: `${Date.now()}-${file.originalname}`,
  });
  return uploadResponse.url;
};

// ================== Update Additional Info ==================
export const updateOwnerAdditionalInfo = async (req, res) => {
  try {
    const userId = req.user._id; // protect middleware
    const { branches, location, address, companyName ,accountNumber, mapLink} = req.body;

    // Find Owner document by user reference
    let owner = await Owner.findOne({ user: userId });

    // If not exists, create it
    if (!owner) {
      owner = new Owner({ user: userId });
    }

    // Upload files if provided
    if (req.files?.companyImage?.[0]) {
      owner.companyImage = await uploadToImageKit(req.files.companyImage[0]);
    }
    if (req.files?.tradingLicense?.[0]) {
      owner.tradingLicense = await uploadToImageKit(req.files.tradingLicense[0]);
    }

    // Update fields
    owner.branches = branches ? Number(branches) : owner.branches;
    owner.location = location || owner.location;
    owner.address = address || owner.address;
    owner.companyName = companyName || owner.companyName;
    owner.accountNumber = accountNumber || owner.accountNumber;
    owner.mapLocation = mapLink|| owner.mapLocation;
    owner.completed = true;
    owner.firstLogin = true;

    await owner.save();

    return res.status(200).json({
      success: true,
      message: "Owner additional info updated",
      owner,
    });
  } catch (err) {
    console.error("updateOwnerAdditionalInfo error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


// ================== Add Product ==================
export const addProduct = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const { name, category, size, color, shape, availableQuantity, price, description } = req.body;

    const owner = await User.findById(ownerId);
    if (!owner || owner.role !== "owner") {
      return res.status(403).json({ message: "Only owners can add products." });
    }

    const imageUrl = await uploadToImageKit(req.file);
    const newProduct = new Product({
      owner: ownerId,
      name,
      category,
      image: imageUrl,
      size,
      color,
      shape,
      availableQuantity,
      price,
      description,
      isActive: availableQuantity > 0,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully.", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product." });
  }
};

// Update product (owner can edit image, quantity, etc.) 
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const ownerId = req.user._id
    const { category, image, availableQuantity, name, size, color, shape, price, description } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found." });

    // Verify owner
    if (String(product.owner) !== ownerId) {
      return res.status(403).json({ message: "You are not authorized to edit this product." });
    }

    // Update fields
    const imageUrl = await uploadToImageKit(req.file);
    if (image) product.image = imageUrl;
    if (availableQuantity !== undefined) product.availableQuantity = availableQuantity;
    if (name) product.name = name;
    if (size) product.size = size;
    if (category) product.category = category;
    if (color) product.color = color;
    if (shape) product.shape = shape;
    if (price) product.price = price;
    if (description) product.description = description;

    // Automatically hide product if stock = 0
    product.isActive = product.availableQuantity > 0;

    await product.save();
    res.status(200).json({ message: "Product updated successfully.", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};


/** Reduce stock when customer orders */
export const reduceStockOnOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found." });
    if (!product.isActive) return res.status(400).json({ message: "Product is unavailable." });

    // Check available quantity
    if (product.availableQuantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock." });
    }

    // Reduce quantity
    product.availableQuantity -= quantity;
    if (product.availableQuantity <= 0) {
      product.availableQuantity = 0;
      product.isActive = false; // hide when out of stock
    }

    await product.save();
    res.status(200).json({ message: "Stock updated successfully.", product });
  } catch (error) {
    console.error("Error reducing stock:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/**  Get all active products */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).populate("owner", "name email image");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/** Get all products by owner */
export const getOwnerProducts = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const products = await Product.find({ owner: ownerId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/**  Delete product safely */
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Check for active orders (not delivered/cancelled)
    const activeOrders = await Order.find({
      product: productId,
      status: { $in: ["pending", "in-progress"] },
    });

    if (activeOrders.length > 0) {
      return res.status(400).json({
        status : false,
        message:
          "Cannot delete product. There are active or in-progress orders for this item.",
      });
    }

    // Optional: Delete related delivered/cancelled orders if desired
    await Order.deleteMany({
      product: productId,
      status: { $in: ["delivered", "cancelled"] },
    });

    // Delete the product
    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      status: true,
      message: "Product deleted successfully.",
      productId,
    });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};


