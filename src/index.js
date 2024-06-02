const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "welcome to ecommerce api", status: true });
});

const authRouter = require("./routes/auth.route");
app.use("/auth", authRouter);

const userRouter = require("./routes/user.route");
app.use("/api/users", userRouter);

const categoryRouter = require("./routes/category.route");
app.use("/api", categoryRouter);

const productRouter = require("./routes/product.route");
app.use("/api", productRouter);

const cartRouter = require("./routes/cart.route");
app.use("/api/cart", cartRouter);

const wishlistRouter = require("./routes/wishlist.route");
app.use("/api/wishlist", wishlistRouter);

const paymentRouter = require("./routes/payment.route");
app.use("/api/payment", paymentRouter);
module.exports = app;
