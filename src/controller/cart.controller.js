const cartService = require("../services/cart.service");
const { redis } = require("../config/redis");

const addToCart = async (req, res) => {
  try {
    const cart = await cartService.addItemToCart(req.userId, req.body);
    redis.del("cart");
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUserCart = async (req, res) => {
  const cart = await redis.get("cart");
  if (cart) {
    console.log("if block executed");
    return res.json(JSON.parse(cart));
  } else {
    console.log("else block executed");
    const cart = await cartService.findUserCartById(req.userId);
    await redis.set("cart", JSON.stringify(cart));
    res.json(cart);
  }
};

const removeCartItem = async (req, res) => {
  console.log("removeCartItem controller called");
  const message = await cartService.removeItemFromCart(
    req.userId,
    req.params.ProductId
  );
  redis.del("cart");
  res.send(message);
};

module.exports = { addToCart, getUserCart, removeCartItem };
