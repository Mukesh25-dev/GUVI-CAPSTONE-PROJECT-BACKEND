const express = require("express");
const auth = require("../middlewares/auth");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get(
  "/profile",
  auth.verifyLogin,
  auth.allowRoles(["user", "organiser", "admin"]),
  userController.getProfile
);

userRouter.put(
  "/update",
  auth.verifyLogin,
  auth.allowRoles(["user"]),
  userController.updateProfile
);

userRouter.delete(
  "/delete",
  auth.verifyLogin,
  auth.allowRoles(["user"]),
  userController.deleteProfile
);

userRouter.post(
  "/register/:eventId",
  auth.verifyLogin,
  auth.allowRoles(["user"]),
  userController.Register
);

userRouter.get(
  "/applications",
  auth.verifyLogin,
  auth.allowRoles(["user"]),
  userController.myApplication
);

userRouter.get(
  "/events",
  auth.verifyLogin,
  auth.allowRoles(["user"]),
  userController.getEvents
);

userRouter.get(
  "/event/:eventId",
  auth.verifyLogin,
  auth.allowRoles(["user"]),
  userController.getEventById
);

userRouter.get(
  "/tickets/:userId",
  auth.verifyLogin,
  auth.allowRoles(["user"]),
  userController.myTickets
);
module.exports = userRouter;
