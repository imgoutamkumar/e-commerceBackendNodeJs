const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("categories", categorySchema);
module.exports = Category;
