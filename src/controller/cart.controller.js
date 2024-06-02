const cartService = require("../services/cart.service");
const { redis } = require("../config/redis");
const addToCart = async (req, res) => {
  const cart = await cartService.addItemToCart(req.userId, req.body);
  redis.del("cart");
  res.send(cart);
};

const getUserCart = async (req, res) => {
  const cart = await redis.get("cart");
  if (cart) {
    return res.json(JSON.parse(cart));
  } else {
    const cart = await cartService.findUserCartById(req.userId);
    await redis.set("cart", JSON.stringify(cart));
    res.json(cart);
  }
};

module.exports = { addToCart, getUserCart };
