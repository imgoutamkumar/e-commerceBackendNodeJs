const SubCategoryItems = require("../models/subCategoryItems.model");

const createSubCategoryItem = async (reqData) => {
  try {
    let { name, subCategory, description } = reqData;
    const isSubCategoryItemExist = await SubCategoryItems.findOne({ name });
    if (isSubCategoryItemExist) {
      throw new Error("SubCategoryItem already exist with this name : ", name);
    }
    const subCategoryItem = await SubCategoryItems.create({
      name,
      subCategory,
      description,
    });
    return subCategoryItem;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSubCategoryItemsBySubCategory = async (subCategoryName) => {
  try {
    const allSubCategoryItemsBySubCategory = await SubCategoryItems.find({
      subCategory: subCategoryName,
    });
    return allSubCategoryItemsBySubCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createSubCategoryItem, getSubCategoryItemsBySubCategory };
