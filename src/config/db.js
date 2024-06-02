const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./.env" });

/* const mongodbUrl =
  "mongodb+srv://admin:Admin123@cluster0.qovhtft.mongodb.net/?retryWrites=true&w=majority"; */

const connectDb = async () => {
  return await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => console.log(error));
};

module.exports = { connectDb };
