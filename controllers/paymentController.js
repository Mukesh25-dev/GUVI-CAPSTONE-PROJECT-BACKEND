const Razorpay = require("razorpay");
const { RAZORPAY_KEY_ID, RAZORPAY_SECRET_KEY } = require("../utils/config");
const Ticket = require("../models/Ticket");
const mongoose = require("mongoose");
const { sendConfirmationEmail } = require("../emailService");
const { ObjectId } = require("mongoose").Types;
const { performance } = require("perf_hooks"); // In Node.js for timing
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_SECRET_KEY,
});

const paymentController = {
  createOrder: async (req, res) => {
    console.log("Incoming Request Body:", req.body);
    const { ticketPrice, eventId, email } = req.body;

    if (!ticketPrice || !eventId || !email) {
      return res.status(400).json({
        message: "Missing required fields: ticketPrice, eventId, or userEmail",
      });
    }

    try {
      const order = await razorpay.orders.create({
        amount: ticketPrice * 100, // Ensure correct conversion to paise
        currency: "INR",
        receipt: `receipt_order_${Math.random()}`,
      });

      console.log("Razorpay Order Created:", order);

      return res.status(200).json({
        orderId: order.id,
      });
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      return res.status(500).json({
        message: "Failed to create order",
        error: error.message,
      });
    }
  },

  handlePaymentSuccess: async (req, res) => {
    try {
      // Extract data from the request body
      const {
        paymentId,
        orderId,
        signature,
        eventId,
        email,
        userId,
        ticketType,
      } = req.body;

      // Check if the required payment data exists
      if (
        !paymentId ||
        !orderId ||
        !signature ||
        !eventId ||
        !email ||
        !userId
      ) {
        return res.status(400).json({
          message: "Missing required payment or user data",
        });
      }

      // Create a new ticket
      const ticket = new Ticket({
        userId,
        eventId,
        email,
        ticketType,
        orderId,
        paymentId,
      });

      // Save the ticket to the database
      await ticket.save(); // Here we're explicitly saving the ticket

      // Ensure ticket was created and saved successfully
      if (!ticket) {
        return res.status(500).json({ message: "Ticket creation failed" });
      }

      // Send confirmation email after successful ticket creation
      await sendConfirmationEmail(email, ticket);

      return res.status(200).json({
        message: "Payment successful and ticket created.",
        ticket,
      });
    } catch (error) {
      console.error("Error handling payment success:", error);
      return res.status(500).json({
        message: "Ticket creation failed",
        error: error.message,
      });
    }
  },
};

module.exports = paymentController;
