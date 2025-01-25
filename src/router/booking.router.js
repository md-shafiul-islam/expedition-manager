const express = require("express");
const bookingController = require("../controller/booking.controller");
const accessLevel = require("../middleware/auth.middleware");

const bookingRouter = express.Router();

bookingRouter.get(
  "/",
  accessLevel(["admin", "user"]),
  bookingController.getAll
);
bookingRouter.get(
  "/:id",
  accessLevel(["admin", "user"]),
  bookingController.getOne
);
bookingRouter.post(
  "/",
  accessLevel(["admin", "user"]),
  bookingController.addOne
);
bookingRouter.put(
  "/",
  accessLevel(["admin", "user"]),
  bookingController.updateOne
);
bookingRouter.patch(
  "/",
  accessLevel(["admin", "user"]),
  bookingController.updateStatus
);
bookingRouter.delete("/", accessLevel(["admin"]), bookingController.deleteOne);

module.exports = bookingRouter;
