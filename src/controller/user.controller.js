class UserController {
  getAll = async (req, res) => {
    res.send("Get user");
  };
  
  get = async (req, res) => {
    res.send("Get user");
  };
}

const userController = new UserController();
module.exports = userController;
