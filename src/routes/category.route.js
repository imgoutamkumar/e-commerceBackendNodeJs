const express = require("express");
const router = express.Router();
const categoryAndsubcategoryController = require("../controller/categoryAndsubcategory.controller");

router.post("/category", categoryAndsubcategoryController.createNewCategory);
router.get("/allCategories", categoryAndsubcategoryController.allCategories);
router.get(
  "/subCategories/:category",
  categoryAndsubcategoryController.getSubCategoriesByCategory
);
router.post(
  "/subCategory",
  categoryAndsubcategoryController.createNewSubCategory
);
router.get(
  "/subCategoryItems/:subCategory",
  categoryAndsubcategoryController.getSubCategoryItemsBySubCategory
);
router.post(
  "/subCategoryItem",
  categoryAndsubcategoryController.createNewSubCategoryItem
);
module.exports = router;
