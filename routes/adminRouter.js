const express = require("express");
const auth = require("../middlewares/auth");
const adminController = require("../controllers/adminController");

const adminRouter = express.Router();

adminRouter.post(
  "/organisers",
  auth.verifyLogin,
  auth.allowRoles(["admin"]),
  adminController.createOrganiser
);

adminRouter.put(
  "/organisers",
  auth.verifyLogin,
  auth.allowRoles(["admin"]),
  adminController.updateOrganiser
);

adminRouter.delete(
  "/organisers",
  auth.verifyLogin,
  auth.allowRoles(["admin"]),
  adminController.deleteOrganiser
);

adminRouter.put(
  "/event/:eventId/assign-Organiser/:organiserId",
  auth.verifyLogin,
  auth.allowRoles(["admin"]),
  adminController.assignOrganiser
);

adminRouter.put(
  "/event/:eventId/remove-Organiser/:organiserId",
  auth.verifyLogin,
  auth.allowRoles(["admin"]),
  adminController.unassignOrganiser
);

adminRouter.post(
  "/companies",
  auth.verifyLogin,
  auth.allowRoles(["admin"]),
  adminController.createCompany
);

adminRouter.put(
  "/companies/:id",
  auth.verifyLogin,
  auth.allowRoles(["admin"]),
  adminController.updateCompany
);

adminRouter.delete(
  "/companies/:id",
  auth.verifyLogin,
  auth.allowRoles(["admin"]),
  adminController.deleteCompany
);

adminRouter.get(
  "/users",
  auth.verifyLogin,
  auth.allowRoles(["admin"]),
  adminController.viewAllUser
);

adminRouter.get(
  "/events",
  auth.verifyLogin,
  auth.allowRoles(["admin"]),
  adminController.viewEvents
);

adminRouter.get("/tickets",
  auth.verifyLogin,
  auth.allowRoles(["admin"]),
  adminController.viewAllTickets
)

// adminRouter.post(
//   "/jobs",
//   auth.verifyLogin,
//   auth.allowRoles(["admin"]),
//   adminController.createJob
// );

// adminRouter.put(
//   "/jobs/:id",
//   auth.verifyLogin,
//   auth.allowRoles(["admin"]),
//   adminController.updateJob
// );

// adminRouter.delete(
//   "/jobs/:id",
//   auth.verifyLogin,
//   auth.allowRoles(["admin"]),
//   adminController.deleteJob
// );

// adminRouter.get(
//   "/jobs",
//   auth.verifyLogin,
//   auth.allowRoles(["admin"]),
//   adminController.viewAllJobs
// );

// adminRouter.get(
//   "/users",
//   auth.verifyLogin,
//   auth.allowRoles(["admin"]),
//   adminController.viewAllUser
// );

// adminRouter.put(
//   "/users/:id",
//   auth.verifyLogin,
//   auth.allowRoles(["admin"]),
//   adminController.updateUser
// );

// adminRouter.delete(
//   "/users/:id",
//   auth.verifyLogin,
//   auth.allowRoles(["admin"]),
//   adminController.deleteUser
// );

module.exports = adminRouter;
