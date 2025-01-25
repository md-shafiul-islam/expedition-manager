const bookingServices = require("../services/booking.services");
const utilServices = require("../services/util.services");

class BookingController {
  getAll = async (req, res) => {
    let bookAllResp = utilServices.responseFormat(false, "Booking not found");
    try {
      bookAllResp = await bookingServices.getAll();
    } catch (error) {
      bookAllResp.message = error.message;
    } finally {
      res.status(200).send(bookAllResp);
    }
  };

  getOne = async (req, res) => {
    let bookingResp = utilServices.responseFormat(false, "Booking not found");
    try {
      bookingResp = await bookingServices.getOne(req.params.id);
      res.status(200).send(bookingResp);
    } catch (error) {
      bookingResp.message = error.message;
      res.status(200).send(bookingResp);
    }
  };

  addOne = async (req, res) => {
    let addResp = utilServices.responseFormat(false, "Booking add failed");
    try {
      addResp = await bookingServices.add(req.body);
      res.status(200).send(addResp);
    } catch (error) {
      console.log("Add Expedition Error, ", error);
      respAll.message = error.message;
      res.status(200).send(addResp);
    }
  };

  updateOne = async (req, res) => {
    let respUpdate = utilServices.responseFormat(
      false,
      "Booking update failed"
    );
    try {
      respUpdate = await bookingServices.update(req.body);
      res.status(200).send(respUpdate);
    } catch (error) {
      console.log("Add Expedition Error, ", error);
      respUpdate.message = error.message;
      res.status(200).send(respUpdate);
    }
  };

  updateStatus = async (req, res) => {
    let respUpdate = utilServices.responseFormat(
      false,
      "Booking update status failed"
    );
    try {
      respUpdate = await bookingServices.updateStatus(req.body);
      res.status(200).send(respUpdate);
    } catch (error) {
      console.log("Booking Update Status Error, ", error);
      respUpdate.message = error.message;
      res.status(200).send(respUpdate);
    }
  };

  deleteOne = async (req, res) => {
    let respDelete = utilServices.responseFormat(
      false,
      "Booking Remove failed"
    );
    try {
      respDelete = await bookingServices.remove(req.params.id);
      res.status(200).send(respDelete);
    } catch (error) {
      console.log("Remove Expedition Error, ", error);
      respUpdate.message = error.message;
      res.status(200).send(respDelete);
    }
  };
}

const bookingController = new BookingController();
module.exports = bookingController;
