class BookingController {
  getAll = async (req, res) => {
    res.send("Get user");
  };

  get = async (req, res) => {
    res.send("Get user");
  };
}

const bookingController = new BookingController();
module.exports = bookingController;
