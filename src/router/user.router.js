const express = require("express");
const userController = require("../controller/user.controller");

const userRouter = express.Router();

userRouter.get("/", userController.getAll);
userRouter.get("/:id", userController.get);
userRouter.post("/", userController.get);
userRouter.put("/", userController.get);
userRouter.delete("/", userController.get);

module.exports = userRouter;
