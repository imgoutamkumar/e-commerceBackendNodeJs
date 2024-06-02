const express = require("express");
const router = express.Router();
const categoryAndsubcategoryController = require("../controller/categoryAndsubcategory.controller");

router.post("/category", categoryAndsubcategoryController.createNewCategory);
router.get("/allCategories", categoryAndsubcategoryController.allCategories);
router.post(
  "/subCategories",
  categoryAndsubcategoryController.getSubCategoriesByCategory
);
router.post(
  "/subCategory",
  categoryAndsubcategoryController.createNewSubCategory
);

module.exports = router;
