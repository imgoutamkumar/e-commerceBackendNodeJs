const Cart = require("../models/cart.model");
const { findProductbyId } = require("./product.service");

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

    const total = cart.cartItems.reduce((acc, item) => {
      return (
        acc +
        (item.product.price -
          ((item.product.price * item.product.discountPercent) / 100) *
            item.quantity)
      );
    }, 0);
    console.log("total:", total);
    cart.totalPrice = total;

    const totalOriginalPrice = cart.cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
    console.log("totalOriginalPrice:", totalOriginalPrice);
    cart.totalSavings = totalOriginalPrice - total;

    await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};
const addItemToCart = async (userId, reqData) => {
  console.log("addItemToCart called");
  const { productId, quantity, size } = reqData;
  console.log(
    userId,
    typeof userId,
    productId,
    typeof productId,
    quantity,
    typeof quantity,
    size,
    typeof size
  );

  try {
    const cart = await Cart.findOne({ userId: userId }).populate(
      "cartItems.product"
    );
    //console.log(cart);
    /* console.log(cart);
    console.log(cart._id);
    console.log(cart.userId);
    console.log(cart.cartItems[0].product._id);
    console.log(cart.cartItems[0].product.price); */
    if (!cart) {
      console.log("cart doesn't exist. So, new cart has been created");
      cart = await createCart(userId);
    }

    const existingItem = cart.cartItems.find((item) => {
      return item.product._id.toString() === productId.toString();
    });
    // console.log("existingItem : ", existingItem);
    if (existingItem) {
      console.log("Item already exist in the cart");
      if (existingItem.quantity <= 5) {
        console.log("existingItem.quantity : ", existingItem.quantity);
        existingItem.quantity = quantity;
      }
      existingItem.size = size;
      /*  const total = cart.cartItems.reduce((acc, item) => {
        return (
          acc +
          (item.product.price -
            (item.product.price * item.product.discountPercent) / 100) *
            item.quantity
        );
      }, 0);
      console.log("total :", total, "type :", typeof total);
      cart.totalPrice = Number(total);

      const totalOriginalPrice = cart.cartItems.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);
      console.log(
        "totalOriginalPrice :",
        totalOriginalPrice,
        "type : ",
        typeof totalOriginalPrice
      );
      cart.totalSavings = totalOriginalPrice - total; */

      await cart.save();
      return "Item already present in the cart";
    } else {
      console.log("else block executed");
      cart.cartItems.push({
        product: productId,
        quantity: quantity,
        size: size,
      });
      // await cart.save();
      /* console.log(cart);
      console.log(cart.cartItems[1].product._id); */

      cart.cartItems.forEach((item) => {
        //console.log(item.product);
        console.log(item.product._id);
        console.log(item.product.price);
        console.log(item.product.discountPercent);
        console.log(item.quantity);
      });

      /* let total = cart.cartItems.reduce(
        (acc, item) =>
          acc +
          (item.product.price -
            (item.product.price * item.product.discountPercent) / 100) *
            item.quantity,

        0
      );
      console.log("total :", total, "type :", typeof total);
      cart.totalPrice = Number(total);

      let totalOriginalPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      console.log(
        "totalOriginalPrice :",
        totalOriginalPrice,
        "type : ",
        typeof totalOriginalPrice
      );
      cart.totalSavings = totalOriginalPrice - total; */

      await cart.save();
      return "Item added successfully";
    }
  } catch (error) {
    console.log(error);
    return error;
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
      /* const total = cart.cartItems.reduce((acc, item) => {
        return (
          acc +
          (item.product.price -
            (item.product.price * item.product.discountPercent) / 100) *
            item.quantity
        );
      }, 0);
      console.log("total :", total, "type :", typeof total);
      cart.totalPrice = Number(total);

      const totalOriginalPrice = cart.cartItems.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);
      console.log(
        "totalOriginalPrice :",
        totalOriginalPrice,
        "type : ",
        typeof totalOriginalPrice
      );
      cart.totalSavings = totalOriginalPrice - total; */
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
