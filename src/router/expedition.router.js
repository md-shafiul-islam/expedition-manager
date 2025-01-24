const express = require("express");
const expeditionController = require("../controller/expedition.controller");
const accessLevel = require("../middleware/auth.middleware");

const expeditionRouter = express.Router();

expeditionRouter.get("/", expeditionController.getAll);
expeditionRouter.get("/:id", expeditionController.getOne);
expeditionRouter.post("/", accessLevel(["admin"]), expeditionController.addOne);
expeditionRouter.put(
  "/",
  accessLevel(["admin"]),
  expeditionController.updateOne
);
expeditionRouter.delete(
  "/:id",
  accessLevel(["admin"]),
  expeditionController.deleteOne
);
expeditionRouter.post(
  "/all",
  accessLevel(["admin"]),
  expeditionController.addAll
);

module.exports = expeditionRouter;
