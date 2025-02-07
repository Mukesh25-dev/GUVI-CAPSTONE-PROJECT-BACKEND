const User = require("../models/User");
const { SECRET_KEY } = require("../utils/config");
const jwt = require("jsonwebtoken");

const auth = {
  verifyLogin: async (req, res, next) => {
    const token = req.cookies.token; // Access cookie from request

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
      // Verify the token
      jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if (error) {
          return res
            .status(401)
            .json({ message: "Unauthorized: Invalid token" });
        }

        // Set the user ID from the token to the request object
        req.userId = decoded.id;

        // Proceed to the next middleware or route handler
        next();
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  allowRoles: (roles) => {
    return async (request, response, next) => {
      //get the user id through req obj
      const userId = request.userId;

      // then get the user from db
      const user = await User.findById(userId);

      //check if the user exists
      if (!user) {
        return response.json({ message: "unAuthorized" });
      }

      // themn check the allowed role
      if (!roles.includes(user.role)) {
        return response.json({ message: "forbidden" });
      }

      next();
    };
  },
};

module.exports = auth;
