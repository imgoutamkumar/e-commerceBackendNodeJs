const productService = require("../services/product.service");
const { redis } = require("../config/redis");
const { json } = require("body-parser");

const createNewProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    return res.status(200).json({ message: "New Product Created" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllProductByCategory = async (req, res) => {
  try {
    const products = await productService.getProductByCategory(
      req.params.category
    );
    console.log("products count : ", products.length);
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getProductByCategoryAndRating = async (req, res) => {
  try {
    const popularProducts = await productService.getProductByCategoryAndRating(
      req.params.category,
      req.params.rating
    );
    console.log("popularProducts count : ", popularProducts.length);
    res.status(200).json(popularProducts);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const isExist = await redis.exists("products");
    console.log("isExist:", isExist);

    if (isExist) {
      console.log("get data from cache");
      const products = await redis.get("products");
      const productData = JSON.parse(products);
      return res.json(productData);
    } else {
      console.log("get data from database");
      const products = await productService.getAllProducts();
      await redis.set("products", JSON.stringify(products));
      return res.json(products);
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await productService.findProductbyId(req.params.productId);
    res.json(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getSearchFilterProduct = async (req, res) => {
  console.log("getSearchFilterSortAndPaginateProduct controller called");
  try {
    const product = await productService.searchFilterAndPaginateProduct(
      req.query
    );
    return res.send({
      productCount: product.length,
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewProduct,
  getAllProductByCategory,
  getAllProduct,
  getProductById,
  getSearchFilterProduct,
  getProductByCategoryAndRating,
};
