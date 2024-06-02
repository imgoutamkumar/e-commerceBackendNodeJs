const express = require("express");
const router = express.Router();
const wishlistController = require("../controller/wishlist.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/add",
  authMiddleware.isAuthenticated,
  wishlistController.addToWishlist
);
router.get(
  "/",
  authMiddleware.isAuthenticated,
  wishlistController.getUserWishlist
);
router.delete(
  "/remove/:ProductId",
  authMiddleware.isAuthenticated,
  wishlistController.removeWishlistItem
);
module.exports = router;
