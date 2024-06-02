const jwt = require("jsonwebtoken");

const SECRET_KEY = "gfgfdgdgetfae4eetrhbhgyhgkjkoiojhdgshghgng";
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
  console.log("genereted token : ", token);
  return token;
};

const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  req.userId = decodedToken.userId;
  return decodedToken.userId;
};

module.exports = { generateToken, getUserIdFromToken };
