const express = require("express");
const userController = require("../controller/user.controller");
const accessLevel = require("../middleware/auth.middleware");

const userRouter = express.Router();

userRouter.get("/", accessLevel(["admin"]), userController.getAll);
userRouter.get("/:id", accessLevel(["user", "admin"]), userController.getOne);
userRouter.post("/", userController.addOne);
userRouter.post("/token-login", userController.getLoginViaToken);

userRouter.put("/", accessLevel(["user", "admin"]), userController.updateOne);
userRouter.delete(
  "/",
  accessLevel(["user", "admin"]),
  userController.deleteOne
);

module.exports = userRouter;
