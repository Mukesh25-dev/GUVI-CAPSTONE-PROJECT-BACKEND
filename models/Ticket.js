// models/Ticket.js
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event", // Reference to Event model
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  ticketType: String,
  orderId: String,
  paymentId: String,
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
