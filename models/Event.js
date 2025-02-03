const mongoose = require("mongoose");

const eventSchema = {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    File,
    trim: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  category: {
    type: String,
    default: "other",
  },
  ticketPrices: {
    normal: { type: Number, required: false },
    vip: { type: Number, required: false },
  },
};

module.exports = mongoose.model("Event", eventSchema, "events");
