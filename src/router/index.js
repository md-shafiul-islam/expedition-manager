const express = require("express");
const userRouter = require("./user.router");
const expeditionController = require("../controller/expedition.controller");
const bookingController = require("../controller/booking.controller");
const expeditionRouter = require("./expedition.router");
const bookingRouter = require("./booking.router");
const mailRouter = require("./mail.router");

const router = express.Router();

router.use("/users", userRouter);
router.use("/expeditions", expeditionRouter);
router.use("/bookings", bookingRouter);
router.use("/mail", mailRouter);

router.use("/health-check", (req, resp) => {
  resp.send("ok");
});

module.exports = router;
