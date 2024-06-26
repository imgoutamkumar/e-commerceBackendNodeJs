const categoryService = require("../services/category.service");
const subCategoryService = require("../services/subCategory.service");
const subCategoryItemService = require("../services/subCategoryItems.service");

const createNewCategory = async (req, res) => {
  try {
    const newCategory = await categoryService.createCategory(req.body);
    return res.status(200).json({ message: "New Category Created" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const allCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategory();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const createNewSubCategory = async (req, res) => {
  try {
    console.log("createNewCategory working");
    const newSubCategory = await subCategoryService.createSubCategory(req.body);
    return res.status(200).json(newSubCategory);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getSubCategoriesByCategory = async (req, res) => {
  try {
    const subCategories =
      await subCategoryService.getSubCategoryByParentCategory(
        req.params.category
      );
    return res.status(200).json(subCategories);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const createNewSubCategoryItem = async (req, res) => {
  try {
    console.log("createNewSubCategoryItem working");
    const newSubCategoryItem =
      await subCategoryItemService.createSubCategoryItem(req.body);
    return res.status(200).json(newSubCategoryItem);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getSubCategoryItemsBySubCategory = async (req, res) => {
  try {
    const subCategoryItems =
      await subCategoryItemService.getSubCategoryItemsBySubCategory(
        req.params.subCategory
      );
    return res.status(200).send(subCategoryItems);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  allCategories,
  createNewCategory,
  createNewSubCategory,
  getSubCategoriesByCategory,
  createNewSubCategoryItem,
  getSubCategoryItemsBySubCategory,
};
