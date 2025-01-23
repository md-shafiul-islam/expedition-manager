const express = require("express");
const userRouter = require("./user.router");

const router = express.Router();

console.log("routers.....");
router.use("/users", userRouter);

router.use("/health-check", (req, resp) => {
  resp.send("ok");
});

module.exports = router;
