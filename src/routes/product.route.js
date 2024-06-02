const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");

router.post("/product", productController.createNewProduct);
router.get("/products/:category", productController.getAllProductByCategory);
router.get("/products", productController.getAllProduct);
router.get("/product/:productId", productController.getProductById);
router.get("/allProducts/search", productController.getSearchFilterProduct);
module.exports = router;
