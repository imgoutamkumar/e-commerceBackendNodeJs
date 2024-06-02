const cartService = require("../services/cart.service");
const Address = require("../models/address.model");
const OrderItem = require("../models/orderItems.model");
const Order = require("../models/order.model");

const createOrder = async (user, shippAddress) => {
  let address;

  if (shippAddress._id) {
    let existAddrress = Address.findOne(shippAddress._id);
    address = existAddrress;
  } else {
    address = new Address(shippAddress);
    address.user = user;
    await address.save();

    user.addresses.push(shippAddress);
    await user.save();
  }

  const cart = cartService.findUserCart(user._id);
  const orderItems = [];

  for (let item of cart.cartItems) {
    const orderItem = new OrderItem({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });
    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
  }

  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discount: cart.discount,
    totalItem: cart.totalItem,
    shippAddress: address,
  });
  const savedOrder = await createdOrder.save();
  return savedOrder;
};

const placeOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "PLACED";
  order.paymentDetails.paymentStatus = "COMPLETED";
};

const confirmOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "CONFIRMED";
};

const shippOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "SHIPPED";
};

const deliverOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "Delivered";
};

const cancelOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "CANCELLED";
};

const findOrderById = async (orderID) => {
  const order = await Order.findById(orderID)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");
  return order;
};

const userOrderHistory = async (userId) => {
  try {
    const orders = await Order.find({
      user: userId,
      orderStatus: "PLACED",
    })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllOrders = async () => {
  try {
    const allOrders = await Order.find({})
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
    return allOrders;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteOrder = async (orderID) => {
  const order = await findOrderById(orderID);
  await Order.findByIdAndDelete(order._id);
};

module.exports = {
  createOrder,
  confirmOrder,
  placeOrder,
  shippOrder,
  deliverOrder,
  cancelOrder,
  userOrderHistory,
  getAllOrders,
  deleteOrder,
};
