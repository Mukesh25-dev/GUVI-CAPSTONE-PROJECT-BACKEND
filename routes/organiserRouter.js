const express = require("express");
const auth = require("../middlewares/auth");
const organiserController = require("../controllers/organiserController");
const organiserRouter = express.Router();

organiserRouter.post(
  "/events",
  auth.verifyLogin,
  auth.allowRoles(["organiser"]),
  organiserController.createEvent
);

organiserRouter.put(
  "/events/:eventId",
  auth.verifyLogin,
  auth.allowRoles(["organiser"]),
  organiserController.updateEvent
);

organiserRouter.delete(
  "/events/:id",
  auth.verifyLogin,
  auth.allowRoles(["organiser"]),
  organiserController.deleteEvent
);

organiserRouter.get(
  "/events",
  auth.verifyLogin,
  auth.allowRoles(["organiser", "admin"]),
  organiserController.viewEvents
);

organiserRouter.get(
  "/attendees/:id",
  auth.verifyLogin,
  auth.allowRoles(["organiser"]),
  organiserController.viewAttendeeProfile
);

organiserRouter.get(
  "/applications",
  auth.verifyLogin,
  auth.allowRoles(["organiser"]),
  organiserController.viewApplications
);

module.exports = organiserRouter;
