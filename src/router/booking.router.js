const express = require("express");
const bookingController = require("../controller/booking.controller");

const bookingRouter = express.Router();

bookingRouter.get("/", bookingController.getAll);
bookingRouter.get("/:id", bookingController.getOne);
bookingRouter.post("/", bookingController.addOne);
bookingRouter.put("/", bookingController.updateOne);
bookingRouter.patch("/", bookingController.updateStatus);
bookingRouter.delete("/", bookingController.deleteOne);

module.exports = bookingRouter;
