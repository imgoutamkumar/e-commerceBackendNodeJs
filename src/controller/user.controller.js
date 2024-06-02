const userService = require("../services/user.service");

const getUserProfile = async (req, res) => {
  const jwt = req.headers.authorization?.split(" ")[1];
  console.log("jwt token : ", jwt);
  try {
    if (!jwt) {
      return res.status(404).send({ error: "token not found" });
    }
    const user = await userService.getUserProfileByToken(jwt);
    console.log(user);
    return res.status(200).send(user).json(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    console.log("All Users form getAllUser function: ", allUsers);
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { getUserProfile, getAllUser };
