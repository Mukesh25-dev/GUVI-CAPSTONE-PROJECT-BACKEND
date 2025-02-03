const mongoose = require("mongoose");

const userSchema = {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "organiser"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  postedAt: {
    type: Date,
    default: Date.now(),
  },
  registration_complete: {
    type: Boolean,
    default: false,
  },
};

module.exports = mongoose.model("User", userSchema, "users");
