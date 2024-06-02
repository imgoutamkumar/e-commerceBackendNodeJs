const app = require("./index");
const Db = require("./config/db");
const dotenv = require("dotenv").config({ path: "./.env" });
const Razorpay = require("razorpay");

app.listen(process.env.PORT, async () => {
  await Db.connectDb();
  console.log(`ecommerce api listening om port: ${process.env.PORT}`);
});
