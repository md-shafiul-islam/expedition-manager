class ExpeditionController {
  getAll = async (req, res) => {
    res.send("Get user");
  };

  get = async (req, res) => {
    res.send("Get user");
  };
}

const expeditionController = new ExpeditionController();
module.exports = expeditionController;
