class UserServices {
  getUserByEmail = async (email) => {
    try {
      let user = null;
    } catch (error) {
      console.log("GetUserByEmail Error ", error);
    }
  };

  getOne = async (id) => {};
  getAll = async () => {};
  update = async () => {};
  remove = async () => {};
}

const userServices = new userServices();
module.exports = userServices;
