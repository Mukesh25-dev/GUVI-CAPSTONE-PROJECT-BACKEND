const express = require("express");
const paymentRoutes = express.Router();
const paymentController = require("../controllers/paymentController");

paymentRoutes.post("/create-order", paymentController.createOrder);
paymentRoutes.post("/payment-success", paymentController.handlePaymentSuccess);

module.exports = paymentRoutes;
