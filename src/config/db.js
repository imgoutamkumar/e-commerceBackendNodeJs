const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./.env" });
const Product = require("../models/product.model");
/* const mongodbUrl =
  "mongodb+srv://admin:Admin123@cluster0.qovhtft.mongodb.net/?retryWrites=true&w=majority"; */

/* const createIndex = async () => {
  try {
    await Product.index({ title: "text" }, (err, result) => {
      if (err) console.error(err);
      console.log("Text index created:", result);
    });
  } catch (error) {
    console.log(error);
  }
}; */

const connectDb = async () => {
  return await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      // createIndex();
      console.log("Database Connected");
    })
    .catch((error) => console.log(error));
};

module.exports = { connectDb };
