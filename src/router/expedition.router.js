const express = require("express");
const expeditionController = require("../controller/expedition.controller");

const expeditionRouter = express.Router();

expeditionRouter.get("/", expeditionController.getAll);
expeditionRouter.get("/:id", expeditionController.get);
expeditionRouter.post("/", expeditionController.get);
expeditionRouter.put("/", expeditionController.get);
expeditionRouter.delete("/", expeditionController.get);

module.exports = expeditionRouter;
