require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

const PORT = process.env.PORT;

const SECRET_KEY = process.env.SECRET_KEY;

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;

const RAZORPAY_SECRET_KEY = process.env.RAZORPAY_SECRET_KEY;

const EMAIL_USER = process.env.EMAIL_USER;

const EMAIL_PASS = process.env.EMAIL_PASS;

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET_KEY,
  RAZORPAY_KEY_ID,
  RAZORPAY_SECRET_KEY,
  EMAIL_USER,
  EMAIL_PASS,
  NODE_ENV,
};
