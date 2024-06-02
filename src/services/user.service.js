const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider");

const createUser = async (userData) => {
  try {
    let { firstName, lastName, password, email } = userData;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error("User already exist with email : ", email);
    }

    password = await bcrypt.hash(password, 8);
    const user = await User.create({ firstName, lastName, password, email });
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    //.populate("addresses");
    if (!user) {
      throw new Error("user not found with id : ", userId);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user not found with email : ", email);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileByToken = async (token) => {
  const userId = jwtProvider.getUserIdFromToken(token);

  try {
    const user = await findUserById(userId);
    if (!user) {
      throw new Error("user not found with id : ", userId);
    }
    console.log(user);
    return user;
  } catch (error) {}
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  findUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUsers,
};
