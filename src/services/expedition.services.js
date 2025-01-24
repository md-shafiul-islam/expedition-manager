const dbClient = require("../db/db.client");
const Expedition = require("../model/Expedition");
const utilServices = require("./util.services");
class ExpeditionServices {
  getAll = async () => {

  };
  getOne = async () => {};

  add = async (expedition)=>{
    try {
      
    } catch (error) {
      
    }
  }

  addAll = async (expeditions=[]) => {
    try {
      console.log("expeditions, ", expeditions)
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
      throw new Expedition("All expedition saved failed")
    } catch (error) {
      console.log("Expedition add all error ", error);
      return utilServices.responseFormat(
        false,
        "All expedition saved failed",
        null
      );
    }
  };

  update = async () => {};
  remove = async () => {};
}

const expeditionServices = new ExpeditionServices();
module.exports = expeditionServices;
