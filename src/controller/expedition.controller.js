const expeditionServices = require("../services/expedition.services");
const utilServices = require("../services/util.services");

class ExpeditionController {
  getAll = async (req, res) => {
    let expAllResp = utilServices.responseFormat(false, "Expedition not found");
    try {
      expAllResp = await expeditionServices.getAll();
    } catch (error) {
      expAllResp.message = error.message;
    } finally {
      res.status(200).send(expAllResp);
    }
  };

  getOne = async (req, res) => {
    let expResp = utilServices.responseFormat(false, "Expedition not found");
    try {
      expResp = await expeditionServices.getOne(req.params.id);
      res.status(200).send(expResp);
    } catch (error) {
      expResp.message = error.message;
      res.status(200).send(expResp);
    }
  };

  addOne = async (req, res) => {
    let respAll = utilServices.responseFormat(false, "Expedition add failed");
    try {
      respAll = await expeditionServices.add(req.body);
      if (respAll != null) {
        res.status(200).send(respAll);
      }
    } catch (error) {
      console.log("Add Expedition Error, ", error);
      respAll.message = error.message;
      res.status(200).send(respAll);
    }
  };

  updateOne = async (req, res) => {
    let respUpdate = utilServices.responseFormat(
      false,
      "Expedition update failed"
    );
    try {
      respUpdate = await expeditionServices.update(req.body);
      res.status(200).send(respUpdate);
    } catch (error) {
      console.log("Add Expedition Error, ", error);
      respUpdate.message = error.message;
      res.status(200).send(respUpdate);
    }
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

  deleteOne = async (req, res) => {
    let respDelete = utilServices.responseFormat(
      false,
      "Expedition Remove failed"
    );
    try {
      respDelete = await expeditionServices.remove(req.params.id);
      res.status(200).send(respDelete);
    } catch (error) {
      console.log("Remove Expedition Error, ", error);
      respUpdate.message = error.message;
      res.status(200).send(respDelete);
    }
  };
}

const expeditionController = new ExpeditionController();
module.exports = expeditionController;
