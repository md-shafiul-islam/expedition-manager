const dbClient = require("../db/db.client");
const Expedition = require("../model/Expedition");
const utilServices = require("./util.services");

class ExpeditionServices {
  getAll = async () => {
    const allResp = utilServices.responseFormat(false, "Expedition not found");
    try {
      await dbClient.dbConnect();
      const expeditions = await Expedition.find({}).select(["-__v"]);

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
      "Expedition not found by ID"
    );

    try {
      if (!utilServices.isValidateId(id)) {
        throw new Error("Expedition id is not valid");
      }

      const expedition = await Expedition.findById(id);
      if (!utilServices.isEmpty(expedition)) {
        expResp.data = expedition;
        expResp.status = true;
        expResp.message = "Expedition found successfully";
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
      "Expedition add failed",
      null
    );
    try {
      if (utilServices.isEmpty(expedition)) {
        throw new Error("Expedition is Empty !!");
      }
      await dbClient.dbConnect();
      const nExpedition = new Expedition();
      Object.assign(nExpedition, expedition);
      const addExp = await nExpedition.save();
      console.log("Expedition Save ", addExp);

      if (addExp) {
        addResp.status = true;
        addResp.message = "Expedition added successfully";
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
      console.log("expeditions, ", expeditions);
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
      console.log("Expedition add all error ", error);
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
      "Expedition Update failed"
    );
    try {
      if (utilServices.isEmpty(uExpedition)) {
        throw new Error("Expedition is empty");
      }

      const { _id, ...expedition } = uExpedition;

      if (!utilServices.isValidateId(_id)) {
        throw new Error("Expedition id is not valid");
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
          "Expedition format is incorrect. Itinerary must not be empty, price, available seats, and total seats must be non-negative."
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
        updateResp.message = "Expedition update successfully";
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
        throw new Error("Expedition id is not valid");
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

const expeditionServices = new ExpeditionServices();
module.exports = expeditionServices;
