const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, NODE_ENV } = require("../utils/config");

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
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required." });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({
          message: "Invalid credentials. Please check your password.",
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ message: "Server error. Please try again." });
    }
  },
  logout: async (request, response) => {
    try {
      // Clear the token with proper cookie attributes
      response.clearCookie("token", {
        httpOnly: true,
        secure: true, // Ensure secure cookie in production
        sameSite: "None", // Support cross-site cookie usage
        path: "/", // Ensure the cookie is cleared across the entire domain
      });

      response.status(200).json({ message: "Logout successful" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  me: async (request, response) => {
    try {
      const userId = request.userId;

      // find the user in the db by the id
      const user = await User.findById(userId).select("-password -v");

      //show the details of the user
      response.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
