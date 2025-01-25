const express = require("express");

const accessLevel = require("../middleware/auth.middleware");
const analyticsController = require("../controller/analytics.controller");

const analyticsRouter = express.Router();

analyticsRouter.get(
  "/popular-destinations",
  accessLevel(["admin"]),
  analyticsController.getPopularDestinations
);
analyticsRouter.get(
  "/bookings-per-month",
  accessLevel(["admin"]),
  analyticsController.getBookingsPerMonth
);
analyticsRouter.get(
  "/popular-destinations-per-month",
  accessLevel(["admin"]),
  analyticsController.getPopularDestinationsPerMonth
);

module.exports = analyticsRouter;
