const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/config");

const authController = {
  register: async (request, response) => {
    try {
      const { name, email, password } = request.body;

      const user = await User.findOne({ email });

      if (user) {
        return response.json({ message: "user already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ name, email, password: hashedPassword });

      await newUser.save();

      response.status(201).json({ message: "user registered successfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  completeRegistration: async (request, response) => {
    try {
      const { email } = request.body;

      if (!email) {
        return response.status(400).json({ message: "Email is required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      if (user.registration_complete) {
        return response.status(400).json({
          message: "Registration is already complete. You can log in.",
        });
      }

      user.registration_complete = true;
      await user.save();

      return response.status(200).json({
        message: "Registration completed successfully. You can now log in.",
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  },
  login: async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      return response.json({ message: "user not found" });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return response.status(400).json({ message: "invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY);

    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      domain: "http://localhost:5173",
    });

    response.status(200).json({ message: "user logged in successfully" });
    try {
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  logout: async (request, response) => {
    try {
      response.clearCookie("token");

      response.status(200).json({ message: "logout successfull" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  me: async (request, response) => {
    try {
      // get the user id from the middleware
      const userId = request.userId;

      // find the user in the db by the id
      const user = await User.findById(userId).select("-password -v");

      //show the details of the user
      response.status(200).json(user);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
