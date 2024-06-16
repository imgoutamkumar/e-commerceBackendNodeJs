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
      //type: mongoose.Types.Decimal128,
      type: Number,
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
productSchema.index({ title: "text" });
/* productSchema.index({ title: "text" }, (err, result) => {
  if (err) console.error(err);
  console.log("Text index created:", result);
}); */
const Product = mongoose.model("products", productSchema);
module.exports = Product;
