const Category = require("../models/category.model");

const createCategory = async (catData) => {
  try {
    let { name, description } = catData;
    const isCategoryExist = await Category.findOne({ name });

    if (isCategoryExist) {
      throw new Error("Category already exist with this name : ", name);
    }
    const createCategory = await Category.create({ name, description });
    return createCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllCategory = async () => {
  try {
    const allCategories = await Category.find();
    return allCategories;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createCategory, getAllCategory };
