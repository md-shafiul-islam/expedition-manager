const express = require("express");
const expeditionController = require("../controller/expedition.controller");

const expeditionRouter = express.Router();

expeditionRouter.get("/", expeditionController.getAll);
expeditionRouter.get("/:id", expeditionController.getOne);
expeditionRouter.post("/", expeditionController.getOne);
expeditionRouter.put("/", expeditionController.getOne);
expeditionRouter.delete("/", expeditionController.getOne);
expeditionRouter.post("/all", expeditionController.addAll);

module.exports = expeditionRouter;
