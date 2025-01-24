const expeditionServices = require("../services/expedition.services");
const utilServices = require("../services/util.services");

class ExpeditionController {
  getAll = async (req, res) => {
    res.send("Get user");
  };

  getOne = async (req, res) => {
    res.send("Get user");
  };

  addAll = async (req, res) => {
    let respAll = utilServices.responseFormat(
      false,
      "All Expedition add failed"
    );
    try {
      respAll = await expeditionServices.addAll(req.body);
      if (respAll != null) {
        res.status(200).send(respAll);
      }
    } catch (error) {
      console.log("Add All, ", error);
      respAll.message = error.message;
      res.status(200).send(respAll);
    }
  };
}

const expeditionController = new ExpeditionController();
module.exports = expeditionController;
