const Cart = require("../models/cart.model");
const { findProductbyId } = require("./product.service");
/* const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model"); */

/* const createCart = async (user) => {
  try {
    const cart = new Cart({ user });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserCart = async (userId) => {
  try {
    const cart = Cart.findOne({ user: userId });
    const cartItems = cart.find({ cart: card._id }).populate("product");
    cart.cartItems = cartItems;
    const totalPrice = 0;
    const totaldiscountedPrice = 0;
    const totalItem = 0;

    for (let cartItem of cart.cartItems) {
      totalPrice += cartItem.price;
      totaldiscountedPrice += cartItem.discountedPrice;
      totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totaldiscountedPrice = totaldiscountedPrice;
    cart.totalItem = totalItem;

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addCartItem = async (userId, req) => {
  try {
    const cart = Cart.findOne({ user: userId });
    const product = await Product.findById(req.productId);
    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });
    if (!isPresent) {
      const cartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId: userId,
        price: product.price,
        size: req.size,
        discountedPrice: product.discountedPrice,
      });
    }

    const createdCartItem = await CartItem.save();
    cart.cartItems.push(createdCartItem);
    await cart.save();
    return "item added to cart";
  } catch (error) {
    throw new Error(error.message);
  }
}; */

const createCart = async (userId) => {
  try {
    const cart = new Cart({ userId, cartItems: [] });
    const createdCart = await cart.save();
    console.log(createdCart);
    /* return createdCart; */
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserCartById = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId: userId }).populate(
      "cartItems.product"
    );
    if (!cart) {
      throw Error("cart didn't exist");
    }

    const total = await cart.cartItems.reduce((acc, item) => {
      return (
        acc +
        (item.product.price -
          (item.product.price * item.product.discountPercent) / 100) *
          item.quantity
      );
    }, 0);
    console.log("total:", total);

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};
const addItemToCart = async (userId, reqData) => {
  const { productId, quantity, size } = reqData;
  try {
    const cart = await Cart.findOne({ userId: userId }).populate(
      "cartItems.product"
    );

    if (!cart) {
      cart = await createCart(userId);
    }

    const existingItem = await cart.cartItems.find(
      (item) => item.product._id.toString() === productId.toString()
    );
    console.log("existingItem:", existingItem);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.size = size;
      cart.save();
    } else {
      await cart.cartItems.push({
        product: productId,
        quantity: quantity,
        size: size,
      });
      cart.save();
    }

    const total = cart.cartItems.reduce((acc, item) => {
      return (
        acc +
        (item.product.price -
          (item.product.price * item.product.discountPercent) / 100) *
          item.quantity
      );
    }, 0);
    console.log("total:", total);
    cart.totalPrice = Number(total);

    const totalOriginalPrice = cart.cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    cart.totalSavings = Number(totalOriginalPrice - total);
  } catch (error) {
    console.log(error);
  }
};

const removeItemFromCart = async (userId, productId) => {
  try {
    let cart = await Cart.findOne({ userId: userId });
    if (cart) {
      const updatedCartItems = await cart.cartItems.filter(
        (item) => item.product.toString() != productId.toString()
      );
      cart.cartItems = updatedCartItems;
      cart.save();
      return "Item removed from cart";
    }
    return "something went wrong";
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createCart,
  findUserCartById,
  addItemToCart,
  removeItemFromCart,
};
