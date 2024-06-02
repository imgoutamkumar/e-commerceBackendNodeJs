const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    productNo: {
      type: Number,
      required: false,
    },

    discountPercent: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
    },
    brand: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
    sizes: [
      {
        size: { type: String },
        quantity: { type: Number },
      },
    ],
    images: [
      {
        type: String,
        required: true,
      },
    ],
    rating: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ratings",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews",
      },
    ],
    numRatings: {
      type: String,
      default: 0,
    },
    category: {
      type: String,
    },
    subCategory: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("products", productSchema);
module.exports = Product;
