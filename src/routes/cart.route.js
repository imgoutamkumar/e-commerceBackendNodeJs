const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware.isAuthenticated, cartController.addToCart);
router.get("/", authMiddleware.isAuthenticated, cartController.getUserCart);

module.exports = router;
