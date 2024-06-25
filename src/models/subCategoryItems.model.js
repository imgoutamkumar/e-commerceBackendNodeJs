const mongoose = require("mongoose");

const SubcategoryItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  subCategory: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const SubCategoryItems = mongoose.model(
  "subCategoryItems",
  SubcategoryItemsSchema
);
module.exports = SubCategoryItems;
