const authService = require("../services/auth.services");
const userServices = require("../services/user.services");
const utilServices = require("../services/util.services");

class UserController {
  getLoginViaToken = async (req, res) => {
    try {
      const decode = authService.validateAndDecode(req.body?.token);
      console.log("decode ", decode);
      const dbUser = await userServices.getUserByEmail(decode.email);
      console.log("getLoginViaToken dbUser, ", dbUser);
      const { _id, email, role, name } = dbUser;
      const token = authService.signBearerToken({
        id: _id?.toString(),
        email,
        role,
        name,
      });
      res
        .status(200)
        .send({ status: true, message: "Login Successfully", token });
    } catch (error) {
      console.log("getLoginViaToken Error, ", error);
      res.status(200).send({
        status: false,
        message: "Login failed token not valid",
        token: null,
      });
    }
  };

  getAll = async (req, res) => {
    let userAllResp = utilServices.responseFormat(false, "User not found");
    try {
      userAllResp = await userServices.getAll();
    } catch (error) {
      userAllResp.message = error.message;
    } finally {
      res.status(200).send(userAllResp);
    }
  };

  getOne = async (req, res) => {
    let useringResp = utilServices.responseFormat(false, "User not found");
    try {
      useringResp = await userServices.getOne(req.params.id);
      res.status(200).send(useringResp);
    } catch (error) {
      useringResp.message = error.message;
      res.status(200).send(useringResp);
    }
  };

  addOne = async (req, res) => {
    let addResp = utilServices.responseFormat(false, "User add failed");
    try {
      addResp = await userServices.add(req.body);
      res.status(200).send(addResp);
    } catch (error) {
      console.log("Add User Error, ", error);
      respAll.message = error.message;
      res.status(200).send(addResp);
    }
  };

  updateOne = async (req, res) => {
    let respUpdate = utilServices.responseFormat(false, "User update failed");
    try {
      respUpdate = await userServices.update(req.body);
      res.status(200).send(respUpdate);
    } catch (error) {
      console.log("Add User Error, ", error);
      respUpdate.message = error.message;
      res.status(200).send(respUpdate);
    }
  };

  deleteOne = async (req, res) => {
    let respDelete = utilServices.responseFormat(false, "User Remove failed");
    try {
      respDelete = await userServices.remove(req.params.id);
      res.status(200).send(respDelete);
    } catch (error) {
      console.log("Remove User Error, ", error);
      respUpdate.message = error.message;
      res.status(200).send(respDelete);
    }
  };
}

const userController = new UserController();
module.exports = userController;
