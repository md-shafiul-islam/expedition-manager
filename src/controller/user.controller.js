class UserController {
  getAll = async (req, res) => {
    res.send("Get user");
  };
  
  getUserByEmail = async (req, res) => {
    res.send("Get user by email");
  }
  get = async (req, res) => {
    res.send("Get user");
  };


}

const userController = new UserController();
module.exports = userController;
