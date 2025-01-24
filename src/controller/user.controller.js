class UserController {
  getAll = async (req, res) => {
    let userAllResp = utilServices.responseFormat(false, "User not found");
    try {
      userAllResp = await useringServices.getAll();
    } catch (error) {
      userAllResp.message = error.message;
    } finally {
      res.status(200).send(userAllResp);
    }
  };

  getOne = async (req, res) => {
    let useringResp = utilServices.responseFormat(false, "User not found");
    try {
      useringResp = await useringServices.getOne(req.params.id);
      res.status(200).send(useringResp);
    } catch (error) {
      useringResp.message = error.message;
      res.status(200).send(useringResp);
    }
  };

  addOne = async (req, res) => {
    let addResp = utilServices.responseFormat(false, "User add failed");
    try {
      addResp = await useringServices.add(req.body);
      res.status(200).send(addResp);
    } catch (error) {
      console.log("Add Expedition Error, ", error);
      respAll.message = error.message;
      res.status(200).send(addResp);
    }
  };

  updateOne = async (req, res) => {
    let respUpdate = utilServices.responseFormat(
      false,
      "User update failed"
    );
    try {
      respUpdate = await useringServices.update(req.body);
      res.status(200).send(respUpdate);
    } catch (error) {
      console.log("Add Expedition Error, ", error);
      respUpdate.message = error.message;
      res.status(200).send(respUpdate);
    }
  };

  deleteOne = async (req, res) => {
    let respDelete = utilServices.responseFormat(
      false,
      "User Remove failed"
    );
    try {
      respDelete = await useringServices.remove(req.params.id);
      res.status(200).send(respDelete);
    } catch (error) {
      console.log("Remove Expedition Error, ", error);
      respUpdate.message = error.message;
      res.status(200).send(respDelete);
    }
  };
}

const userController = new UserController();
module.exports = userController;
