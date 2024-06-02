const wishlistService = require("../services/wishlist.service");
const { redis } = require("../config/redis");
const addToWishlist = async (req, res) => {
  const message = await wishlistService.addItemToWishlist(req.userId, req.body);
  redis.del("wishlist");
  res.send(message);
};

/* const getUserWishlist = async (req, res) => {
  const wishlist = await wishlistService.findUserWishlistById(req.userId);
  res.json(wishlist);
}; */

//using redis cache
const getUserWishlist = async (req, res) => {
  const wishlist = await redis.get("wishlist");
  if (wishlist) {
    return res.json(JSON.parse(wishlist));
  } else {
    const wishlist = await wishlistService.findUserWishlistById(req.userId);
    await redis.set("wishlist", JSON.stringify(wishlist));
    res.json(wishlist);
  }
};

const removeWishlistItem = async (req, res) => {
  console.log("removeWishlistItem controller called");
  const message = await wishlistService.removeItemFromWishlist(
    req.userId,
    req.params.ProductId
  );
  res.send(message);
};

module.exports = { addToWishlist, getUserWishlist, removeWishlistItem };
