const Product = require("../models/product.model");
const categoryService = require("../services/category.service");
const mongoose = require("mongoose");
const createProduct = async (reqData) => {
  try {
    const existProduct = await Product.findOne({
      productNo: reqData.productNo,
    });

    if (existProduct) {
      throw new Error("Product Already Exist");
    }

    const createProduct = await Product.create(reqData);
    console.log("product created");
    return createProduct;
  } catch (error) {
    console.log("product not created. something went wrong");
    throw new Error(error.message);
  }
};

const deleteProduct = async (productId) => {
  const product = await Product.findProductbyId(productId);
  await product.findByIdAndDelete(productId);
  return "product deleted";
};

const updateProduct = async (productId, reqData) => {
  const updatedProduct = await Product.findByIdAndUpdate(productId, reqData);
  return updatedProduct;
};

const findProductbyId = async (productId) => {
  const product = await Product.findOne({ _id: productId });

  try {
    if (!product) {
      throw new Error("Product doesn't exist with id :", productId);
    }
    return product;
  } catch (error) {
    console.log(error);
  }
};

const getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

const getProductByCategory = async (category) => {
  const products = await Product.find({ category: category });
  return products;
};

const getProductByCategoryAndRating = async (category, rating) => {
  const popularProducts = await Product.find({
    $and: [{ category: category }, { numRatings: { $gt: rating } }],
  });
  return popularProducts;
};

const searchFilterAndPaginateProduct = async (reqData) => {
  try {
    console.log("searchFilterAndPaginateProduct service called");
    const categoryArray = await categoryService.getAllCategory();
    let categories = categoryArray.map((c) => {
      return c.name;
    });
    console.log(categories);
    console.log(reqData);

    const page = parseInt(reqData.page) - 1 || 0;
    const limit = parseInt(reqData.limit) || 10;
    const search = reqData.search || "";
    let category = reqData.category || "All";

    category === "All"
      ? (category = [...categories])
      : (category = category.split(","));

    const product = await Product.find({
      title: { $regex: search, $options: "i" },
    })
      .where("category")
      .in([...category])
      .skip(page * limit);
    console.log(product);
    console.log("product count : ", product.length);
    return product;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct,
  getProductByCategory,
  getAllProducts,
  findProductbyId,
  searchFilterAndPaginateProduct,
  getProductByCategoryAndRating,
};
