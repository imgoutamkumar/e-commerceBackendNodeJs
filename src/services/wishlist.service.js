const Wishlist = require("../models/wishlist.model");

const createWishlist = async (userId) => {
  try {
    let wishlist = new Wishlist({ userId, wishlistItems: [] });
    const createdWishlist = await wishlist.save();
    console.log(createdWishlist);
    return createdWishlist;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserWishlistById = async (userId) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: userId }).populate(
      "wishlistItems.product"
    );
    if (!wishlist) {
      throw new Error("wishlist didn't exist");
    }
    return wishlist;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addItemToWishlist = async (userId, reqData) => {
  const { productId } = reqData;
  try {
    let wishlist = await Wishlist.findOne({ userId: userId });
    if (!wishlist) {
      wishlist = await createWishlist(userId);
    }
    const existingItem = await wishlist.wishlistItems.find(
      (item) => item.product.toString() === productId.toString()
    );
    if (existingItem) {
      return "item already added to wishlist";
    } else {
      await wishlist.wishlistItems.push({
        product: productId.toString(),
      });
      wishlist.save();
      return "Item added successfully";
    }
  } catch (error) {
    console.log(error);
  }
};
const removeItemFromWishlist = async (userId, productId) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: userId });
    if (wishlist) {
      const updatedWishlistItems = await wishlist.wishlistItems.filter(
        (item) => item.product.toString() != productId.toString()
      );
      wishlist.wishlistItems = updatedWishlistItems;
      wishlist.save();
      return "Item removed from wishlist";
    }
    return "something went wrong";
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createWishlist,
  findUserWishlistById,
  addItemToWishlist,
  removeItemFromWishlist,
};
