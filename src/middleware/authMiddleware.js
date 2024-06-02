const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];

    const decodeToken = jwt.verify(
      token,
      "gfgfdgdgetfae4eetrhbhgyhgkjkoiojhdgshghgng"
    );
    if (decodeToken.userId == null) {
      throw new Error("something went wrong");
    }
    req.userId = decodeToken.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isAuthenticated };
