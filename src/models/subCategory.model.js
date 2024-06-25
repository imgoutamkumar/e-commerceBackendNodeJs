const mongoose = require("mongoose");

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  parentCategory: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const SubCategory = mongoose.model("subCategories", SubcategorySchema);
module.exports = SubCategory;
