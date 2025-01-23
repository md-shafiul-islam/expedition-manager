const express = require("express");
const bookingController = require("../controller/booking.controller");

const bookingRouter = express.Router();

bookingRouter.get("/", bookingController.getAll);
bookingRouter.get("/:id", bookingController.get);
bookingRouter.post("/", bookingController.get);
bookingRouter.put("/", bookingController.get);
bookingRouter.delete("/", bookingController.get);

module.exports = bookingRouter;
