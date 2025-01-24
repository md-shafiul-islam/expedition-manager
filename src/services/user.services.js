class UserServices {
  getUserByEmail = async (email) => {
    try {
      let user = null;
    } catch (error) {
      console.log("GetUserByEmail Error ", error);
    }
  };

  getAll = async () => {
    const allResp = utilServices.responseFormat(false, "User not found");
    try {
      await dbClient.dbConnect();
      const expeditions = await User.find({}).select(["-__v"]);
      console.log("getAll, ", expeditions);

      allResp.data = expeditions;
      allResp.status = true;
      allResp.message = `${expeditions?.length} expedition found`;
    } catch (error) {
      allResp.message = error.message;
    } finally {
      return allResp;
    }
  };
  getOne = async (id) => {
    const expResp = utilServices.responseFormat(
      false,
      "User not found by ID"
    );

    try {
      if (!utilServices.isValidateId(id)) {
        throw new Error("User id is not valid");
      }

      const expedition = await Expedition.findById(id);
      if (!utilServices.isEmpty(expedition)) {
        expResp.data = expedition;
        expResp.status = true;
        expResp.message = "User found successfully";
      }
    } catch (error) {
      expResp.message = error.message;
    } finally {
      return expResp;
    }
  };

  add = async (expedition) => {
    const addResp = utilServices.responseFormat(
      false,
      "User add failed",
      null
    );
    try {
      if (utilServices.isEmpty(expedition)) {
        throw new Error("User is Empty !!");
      }
      await dbClient.dbConnect();
      const nExpedition = new Expedition();
      Object.assign(nExpedition, expedition);
      const addExp = await nExpedition.save();
      console.log("User Save ", addExp);

      if (addExp) {
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

  addAll = async (expeditions = []) => {
    try {
      console.log("Users, ", expeditions);
      await dbClient.dbConnect();

      const nExps = [];

      expeditions.forEach((item) => {
        const nExp = new Expedition();
        Object.assign(nExp, item);
        nExps.push(nExp);
      });
      const result = await Expedition.insertMany(nExps, {
        ordered: false,
      });
      console.log("All expeditions Save, ", result);
      if (result) {
        return utilServices.responseFormat(
          true,
          "All expedition are saved",
          result
        );
      }
      throw new Expedition("All expedition saved failed");
    } catch (error) {
      console.log("User add all error ", error);
      return utilServices.responseFormat(
        false,
        "All expedition saved failed",
        null
      );
    }
  };

  update = async (uExpedition) => {
    const updateResp = utilServices.responseFormat(
      false,
      "User Update failed"
    );
    try {
      if (utilServices.isEmpty(uExpedition)) {
        throw new Error("User is empty");
      }

      const { _id, ...expedition } = uExpedition;

      if (!utilServices.isValidateId(_id)) {
        throw new Error("User id is not valid");
      }

      const {
        itinerary,
        startDate,
        endDate,
        price,
        availableSeats,
        totalSeats,
        difficulty,
      } = expedition;

      if (!["Easy", "Medium", "Hard"].includes(difficulty)) {
        throw new Error(
          "Difficulty must be one of 'Easy', 'Medium', or 'Hard'."
        );
      }
      if (
        utilServices.isEmpty(itinerary) ||
        price < 0 ||
        availableSeats < 0 ||
        totalSeats < 0
      ) {
        throw new Error(
          "User format is incorrect. Itinerary must not be empty, price, available seats, and total seats must be non-negative."
        );
      }

      if (totalSeats < availableSeats) {
        throw new Error("Available seats cannot exceed total seats.");
      }

      if (new Date(startDate) >= new Date(endDate)) {
        throw new Error("Start date must be before end date.");
      }
      const updateExp = await Expedition.updateOne(
        { _id },
        { $set: expedition }
      );

      console.log("updateExp, ", updateExp);
      if (updateExp) {
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

      const removeItem = await Expedition.findByIdAndDelete(id);

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

const userServices = new userServices();
module.exports = userServices;
