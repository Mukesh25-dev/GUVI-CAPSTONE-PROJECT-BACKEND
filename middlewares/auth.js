const User = require("../models/User");
const { SECRET_KEY } = require("../utils/config");
const jwt = require("jsonwebtoken");

const auth = {
  verifyLogin: async (req, res, next) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res
          .status(401)
          .json({ message: "Unauthorized: No token provided" });
      }

      const decoded = jwt.verify(token, SECRET_KEY);
      req.userId = decoded.id;

      next();
    } catch (error) {
      console.error("Token verification error:", error);
      res
        .status(401)
        .json({ message: "Unauthorized: Invalid or expired token" });
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
