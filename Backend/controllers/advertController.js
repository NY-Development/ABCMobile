import Advert from "../models/Advert.js";
import Product from "../models/Product.js";
import imagekit from "../configs/imageKit.js";

const uploadToImageKit = async (file) => {
  if (!file) return null;
  const uploadResponse = await imagekit.upload({
    file: file.buffer,
    fileName: `${Date.now()}-${file.originalname}`,
  });
  return uploadResponse.url;
};

// OWNER REQUEST ADVERTISEMENT
export const requestAdvertiseInfo = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const { productId, endDate } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found." });

    const startDate = new Date();
    const end = new Date(endDate);
    const diffDays = Math.ceil((end - startDate) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return res.status(400).json({ message: "End date must be greater than today." });
    }

    const costPerDay = product.price * 0.02;
    const totalCost = costPerDay * diffDays;

   
    const advert = new Advert({
      owner: ownerId,
      product: productId,
      startDate,
      endDate,
      days: diffDays,
      totalCost,
      paymentScreenshot: null,
      adminVerified: false,
      isActive: false,
    });

    await advert.save();

    res.status(201).json({
      success: true,
      message: "Advert request created. Please upload payment screenshot.",
      advertId: advert._id,
      days: diffDays,
      totalCost
    });

  } catch (err) {
    console.error("requestAdvertiseInfo error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

// OWNER: Fetch a single advert request by ID
export const getAdvertRequestInfo = async (req, res) => {
  try {
    const { advertId } = req.params;
    const ownerId = req.user._id;

    const advert = await Advert.findOne({ _id: advertId, owner: ownerId })
      .populate("product", "name price");

    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }

    res.status(200).json({
      success: true,
      advert: {
        advertId: advert._id,
        product: advert.product,
        days: advert.days,
        totalCost: advert.totalCost,
        paymentScreenshot: advert.paymentScreenshot,
        adminVerified: advert.adminVerified,
        isActive: advert.isActive
      }
    });

  } catch (err) {
    console.error("getAdvertRequestInfo error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// UPLOAD PAYMENT SCREENSHOT
export const uploadAdvertPayment = async (req, res) => {
  try {
    const { advertId } = req.params;

    const advert = await Advert.findById(advertId);
    if (!advert) return res.status(404).json({ message: "Advert not found" });

    if (!req.file) {
      return res.status(400).json({ message: "Payment screenshot is required" });
    }

  
    const screenshotUrl = await uploadToImageKit(req.file);

    advert.paymentScreenshot = screenshotUrl;
    await advert.save();

    res.status(200).json({
      success: true,
      message: "Payment screenshot uploaded successfully.",
      advert
    });

  } catch (err) {
    console.error("uploadAdvertPayment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// FETCH ALL ACTIVE ADS FOR HOMEPAGE
export const getActiveAds = async (req, res) => {
  try {
    const today = new Date();

    // Auto-disable expired ads
    await Advert.updateMany(
      { endDate: { $lt: today } },
      { isActive: false }
    );

    const ads = await Advert.find({ isActive: true })
      .populate("product")
      .populate("owner", "name email");

    res.status(200).json(ads);

  } catch (err) {
    console.error("getActiveAds error:", err);
    res.status(500).json({ message: "Server error." });
  }
};