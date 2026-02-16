import Review from "../models/Review.js";
import User from "../models/Users.js";
import Order from "../models/Order.js";

/** =============== ADD REVIEW =============== */
export const addReview = async (req, res) => {
  try {
    const { ownerId, productId, rating, comment } = req.body;
    const customerId = req.user._id;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    // Check if the customer's account is verified
    const customer = await User.findById(customerId);
    if (!customer || !customer.isAccountVerified) {
      return res
        .status(403)
        .json({ message: "You must verify your account before submitting a review." });
    }

    // Optional: Ensure the owner exists
    const ownerExists = await User.findById(ownerId);
    if (!ownerExists || ownerExists.role !== "owner") {
      return res.status(404).json({ message: "Owner not found." });
    }

    // Create review
    const newReview = new Review({
      customer: customerId,
      owner: ownerId,
      product: productId || null,
      rating,
      comment,
    });

    await newReview.save();

    res.status(201).json({
      message: "Review added successfully.",
      review: newReview,
    });
  } catch (error) {
    console.error("❌ addReview error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/** =============== GET REVIEWS FOR OWNER =============== */
export const getReviewsForOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const reviews = await Review.find({ owner: ownerId })
      .populate("customer", "name image isAccountVerified")
      .sort({ createdAt: -1 });

    // Calculate average rating
    const avgRating =
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    res.status(200).json({
      message: "Reviews fetched successfully.",
      total: reviews.length,
      averageRating: avgRating,
      reviews: reviews.map((r) => ({
        id: r._id,
        customerName: r.customer?.name,
        customerImage: r.customer?.image,
        isAccountVerified: r.customer?.isAccountVerified,
        comment: r.comment,
        rating: r.rating,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    console.error("❌ getReviewsForOwner error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/** =============== GET ALL REVIEWS (PUBLIC) =============== */
export const getAllReviews = async (req, res) => {
  try {
    // Fetch all reviews with detailed information
    const reviews = await Review.find()
      .populate("customer", "name email isAccountVerified image")
      .populate("owner", "name email role")
      .populate("product", "name price image")
      .sort({ createdAt: -1 });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found." });
    }

    // Calculate overall average rating across all reviews
    const avgRating =
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    // Return all detailed reviews
    res.status(200).json({
      message: "All reviews fetched successfully.",
      total: reviews.length,
      averageRating: avgRating,
      reviews: reviews.map((r) => ({
        id: r._id,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdAt,
        // Customer Info
        customer: {
          id: r.customer?._id,
          name: r.customer?.name,
          email: r.customer?.email,
          image: r.customer?.image,
          isAccountVerified: r.customer?.isAccountVerified,
        },
        // Owner Info
        owner: {
          id: r.owner?._id,
          name: r.owner?.name,
          email: r.owner?.email,
          role: r.owner?.role,
        },
        // Product Info
        product: r.product
          ? {
              id: r.product?._id,
              name: r.product?.name,
              price: r.product?.price,
              image: r.product?.image,
            }
          : null,
      })),
    });
  } catch (error) {
    console.error("❌ getAllReviews error:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
