const CartItem = require("../models/cartItem.model");
const userService = require("../services/user.service");

const updateCartItem = async (userId, cartItemId, cartItemData) => {
  try {
    const item = await findCartItemById(cartItemId);
    if (!item) {
      throw new Error("item not found by this id : ", cartItemId);
    }
    const user = await userService.findUserById(userId);
    if (!user) {
      throw new Error("user not found by this id : ", userId);
    }
    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
      const updatedCartItem = await item.save();
    } else {
      throw new Error("you can't update this cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeCartItem = async (userId, cartItemId) => {
  const cartItem = await findCartItemById(cartItemId);
  const user = await userService.findUserById(userId);
  if (user._id.toString() === cartItem.userId.toString()) {
    await cartItem.findbyIdAndDelete(cartItemId);
  } else {
    throw new Error("you can't remove another user's item");
  }
};

const findCartItemById = (cartItemId) => {
  try {
    const item = CartItem.findOne({ cartItemId });
    if (item) {
      return item;
    } else {
      throw new Error("cart item not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { updateCartItem, removeCartItem, findCartItemById };
