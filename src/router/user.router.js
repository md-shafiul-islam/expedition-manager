const express = require("express");
const userController = require("../controller/user.controller");

const userRouter = express.Router();

userRouter.get("/", userController.getAll);
userRouter.get("/:id", userController.getOne);
userRouter.post("/", userController.addOne);
userRouter.put("/", userController.updateOne);
userRouter.delete("/", userController.deleteOne);

module.exports = userRouter;
