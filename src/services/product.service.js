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
  console.log("category:", category, "noOfRating:", parseFloat(rating));
  console.log(
    "category",
    category,
    "type :",
    typeof category,
    "rating",
    rating,
    "type :",
    typeof rating
  );
  console.log(parseFloat(rating));
  console.log(typeof parseFloat(rating));
  try {
    const popularProducts = await Product.find({
      $and: [
        { category: category },
        { numRatings: { $gte: parseFloat(rating) } },
      ],
    });
    console.log(popularProducts);
    return popularProducts;
  } catch (error) {
    console.log(error);
  }
};

/* const searchFilterAndPaginateProduct = async (reqData) => {
  try {
    console.log("searchFilterAndPaginateProduct service called");
    const categoryArray = await categoryService.getAllCategory();
    let categories = categoryArray.map((c) => {
      return c.name;
    });
    console.log(categories);
    console.log(reqData);

    const page = parseInt(reqData.page) - 1 || 0;
    const limit = parseInt(reqData.limit) || 15;
    const brand = reqData.brand;
    const search = reqData.search || "";
    let category = reqData.category || "All";

    category === "All"
      ? (category = [...categories])
      : (category = category.split(","));

    const product = await Product.find({
      $text: { $search: search },

      //title: { $regex: search, $options: "i" },
    })
      .sort({ score: { $meta: "textScore" } })
      .where("category")
      .in([...category])
      .skip(page * limit);
    console.log(product);
    console.log("product count : ", product.length);
    return product;
  } catch (error) {
    console.log(error);
  }
}; */

const searchFilterAndPaginateProduct = async (reqData) => {
  try {
    console.log("searchFilterAndPaginateProduct service called");

    //get distinct categories list
    const categoryArray = await categoryService.getAllCategory();
    let categories = categoryArray.map((c) => {
      return c.name;
    });

    const allBrands = await Product.find({}, { brand: 1, _id: 0 })
      .then(async (documents) => {
        const list = documents.map((doc) => doc.brand);
        const brandSet = new Set(list);
        const brandList = [...brandSet];
        return brandList; // Array containing the values of the desired field
      })
      .catch((err) => {
        console.error(err);
      });

    console.log("query:", reqData);

    const page = parseInt(reqData.page) || 1;
    // const limit = parseInt(reqData.limit) || 15;
    let brand = reqData.brand || "All";
    const search = reqData.search || "";
    let category = reqData.category || "All";

    brand === "All" ? (brand = [...allBrands]) : (brand = brand.split(","));
    //console.log(brand);

    category === "All" ? (category = [...categories]) : (category = category);
    //replace special character from search text
    const limit = 15;
    let skip = (page - 1) * limit;
    const filteredProduct = await Product.find({
      $and: [
        { title: { $regex: search, $options: "i" } },
        { brand: { $in: [...brand] } },
        { category: category },
      ],
    });

    const filteredProductPerPage = await Product.find({
      $and: [
        { title: { $regex: search, $options: "i" } },
        { brand: { $in: [...brand] } },
        { category: category },
      ],
    })
      .skip(skip)
      .limit(15);

    return { filteredProduct, filteredProductPerPage };
  } catch (error) {
    console.log(error);
  }
};

/* const searchFilterAndPaginateProduct = async (reqData) => {
  try {
    console.log("searchFilterAndPaginateProduct service called");

    const categoryArray = await categoryService.getAllCategory();
    let categories = categoryArray.map((c) => {
      return c.name;
    });
    console.log(categories);

    const allBrands = await Product.find({}, { brand: 1, _id: 0 })
      .then(async (documents) => {
        const list = documents.map((doc) => doc.brand);
        const brandSet = new Set(list);
        const brandList = [...brandSet];
        console.log("brandList:", brandList);
        return brandList; // Array containing the values of the desired field
      })
      .catch((err) => {
        console.error(err);
      });
    console.log(allBrands);
    console.log(reqData);

    const page = parseInt(reqData.page) - 1 || 0;
    const limit = parseInt(reqData.limit) || 10;
    const brand = reqData.brand;
    const search = reqData.search || "";
    let category = reqData.category || "All";

    // brand === "All" ? (brand = [...allBrands]) : (brand = brand.split(","));
    console.log(brand);
    category === "All"
      ? (category = [...categories])
      : (category = category.split(","));
    //replace special character from search text

    const product = await Product.find({
      $or: [{ title: { $regex: search, $options: "i" } }, { brand: brand }],
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
}; */

module.exports = {
  createProduct,
  getProductByCategory,
  getAllProducts,
  findProductbyId,
  searchFilterAndPaginateProduct,
  getProductByCategoryAndRating,
};
