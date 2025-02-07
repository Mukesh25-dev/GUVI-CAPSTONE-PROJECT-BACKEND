const User = require("../models/User");
const { SECRET_KEY } = require("../utils/config");
const jwt = require("jsonwebtoken");

const auth = {
  verifyLogin: async (req, res, next) => {
    const token = req.cookies.token; // Access cookie from request

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      jwt.verify(token, SECRET_KEY, (error, user) => {
        if (error) {
          return response.status(400).json({ message: "unAuthorized" });
        }

        // set the user to request object
        req.userId = user.id;

        //pass the middleware
        next();
      });
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
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
