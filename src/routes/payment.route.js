const express = require("express");
const router = express.Router();
const paymentController = require("../controller/payment.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", paymentController.checkout);

module.exports = router;
