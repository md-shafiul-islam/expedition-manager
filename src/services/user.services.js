const dbClient = require("../db/db.client");
const Expedition = require("../model/Expedition");
const User = require("../model/User");
const utilServices = require("./util.services");

class UserServices {
  getUserByEmail = async (email) => {
    let user = null;
    try {
      user = await User.findOne({ email }).select([
        "-__v",
        "-createdAt",
        "-updatedAt",
      ]);
    } catch (error) {
      console.log("GetUserByEmail Error ", error);
    } finally {
      return user;
    }
  };

  getAll = async () => {
    const allResp = utilServices.responseFormat(false, "User not found");
    try {
      await dbClient.dbConnect();
      const users = await User.find({}).select(["-__v"]);

      allResp.data = users;
      allResp.status = true;
      allResp.message = `${users?.length} User found`;
    } catch (error) {
      allResp.message = error.message;
    } finally {
      return allResp;
    }
  };
  getOne = async (id) => {
    const userResp = utilServices.responseFormat(false, "User not found by ID");

    try {
      if (!utilServices.isValidateId(id)) {
        throw new Error("User id is not valid");
      }

      const user = await User.findById(id);
      if (!utilServices.isEmpty(user)) {
        userResp.data = user;
        userResp.status = true;
        userResp.message = "User found successfully";
      }
    } catch (error) {
      userResp.message = error.message;
    } finally {
      return userResp;
    }
  };

  add = async (user) => {
    const addResp = utilServices.responseFormat(false, "User add failed", null);
    try {
      if (utilServices.isEmpty(user)) {
        throw new Error("User is Empty !!");
      }
      await dbClient.dbConnect();
      const nUser = new User();
      Object.assign(nUser, user);
      const addUser = await nUser.save();

      if (!utilServices.isEmpty(addUser)) {
        addResp.status = true;
        addResp.message = "User added successfully";
      }
    } catch (error) {
      addResp.status = false;
      addResp.message = error.message;
    } finally {
      return addResp;
    }
  };

  addViaMail = async (email) => {
    let user = null;
    try {
      if (utilServices.isEmpty(email)) {
        throw new Error("User Email is Empty !!");
      }
      await dbClient.dbConnect();
      const nUser = new User();
      nUser.email = email;
      nUser.name = email;
      user = await nUser.save();
    } catch (error) {
      console.log("Add User Via mail Error ", error);
    } finally {
      return user;
    }
  };

  update = async (uUser) => {
    const updateResp = utilServices.responseFormat(false, "User Update failed");
    try {
      if (utilServices.isEmpty(uUser)) {
        throw new Error("User is empty");
      }

      const { _id, ...user } = uUser;

      if (!utilServices.isValidateId(_id)) {
        throw new Error("User id is not valid");
      }

      const updateUser = await User.updateOne({ _id }, { $set: user });

      console.log("updateUser, ", updateUser);
      if (updateUser) {
        updateResp.status = true;
        updateResp.message = "User update successfully";
      }
    } catch (error) {
      updateResp.status = false;
      updateResp.message = error.message;
    } finally {
      return updateResp;
    }
  };

  remove = async (id) => {
    const resp = utilServices.responseFormat(false, "Remove failed");
    try {
      if (!utilServices.isValidateId(id)) {
        throw new Error("User id is not valid");
      }

      const removeItem = await User.findByIdAndDelete(id);

      if (!utilServices.isEmpty(removeItem)) {
        resp.message = `'${removeItem?.name}' remove successfully`;
        resp.status = true;
      }
    } catch (error) {
      console.log("Error Delete Expedition, ", error);
      resp.message = error.message;
    } finally {
      return resp;
    }
  };
}

const userServices = new UserServices();
module.exports = userServices;
