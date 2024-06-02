const Razorpay = require("razorpay");
const dotenv = require("dotenv").config({ path: "./.env" });

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

const checkout = async (req, res) => {
  const { amount } = req.body;
  console.log("amount", amount);
  try {
    const options = {
      amount: amount, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_signature } = req.body;

    const verification = await razorpay.util.verifyPaymentSignature(
      req.body,
      process.env.KEY_SECRET
    );
    if (verification) {
      // Payment successful - handle order fulfillment or other logic
      res.json({ message: "Payment successful" });
    } else {
      // Payment failed - handle error
      res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {}
};

module.exports = { checkout, verifyPayment };
