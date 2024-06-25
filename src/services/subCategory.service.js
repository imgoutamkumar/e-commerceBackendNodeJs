const SubCategory = require("../models/subCategory.model");

const createSubCategory = async (reqData) => {
  try {
    let { name, parentCategory, description } = reqData;
    const isSubCategoryExist = await SubCategory.findOne({
      $and: [{ name: name }, { parentCategory: parentCategory }],
    });
    if (isSubCategoryExist) {
      throw new Error("SubCategory already exist with this name : ", name);
    }
    const createSubCategory = await SubCategory.create({
      name,
      parentCategory,
      description,
    });
    return createSubCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSubCategoryByParentCategory = async (categoryName) => {
  try {
    const allSubCategoriesByParentCategory = await SubCategory.find({
      parentCategory: categoryName,
    });
    return allSubCategoriesByParentCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createSubCategory, getSubCategoryByParentCategory };
