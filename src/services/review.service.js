const Review = require("../models/review.nodel");
const Product = require("../models/product.model");
const createReview = async (reviewData) => {
  try {
    const { review, productId, userId } = reviewData;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const createdReview = await Review.create({
      review: review,
      product: productId,
      user: userId,
    });
    return createdReview;
  } catch (error) {
    return error;
  }
};

const getAllReviewsByProductIdAndUserId = async (paramData) => {
  try {
    const { productId, userId } = paramData;
    const reviews = await Review.find({ product: productId, user: userId });
    return reviews;
  } catch (error) {
    return error;
  }
};
module.exports = { createReview, getAllReviewsByProductIdAndUserId };
