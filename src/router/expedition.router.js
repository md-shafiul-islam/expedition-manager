const express = require("express");
const expeditionController = require("../controller/expedition.controller");

const expeditionRouter = express.Router();

expeditionRouter.get("/", expeditionController.getAll);
expeditionRouter.get("/:id", expeditionController.getOne);
expeditionRouter.post("/", expeditionController.addOne);
expeditionRouter.put("/", expeditionController.updateOne);
expeditionRouter.delete("/:id", expeditionController.deleteOne);
expeditionRouter.post("/all", expeditionController.addAll);

module.exports = expeditionRouter;
