const dbClient = require("../db/db.client");
const Booking = require("../model/Booking");
const Expedition = require("../model/Expedition");
const utilServices = require("./util.services");
const ValidationError = require("../error/ValidationError");
const NotFoundError = require("../error/NotFoundError");

class BookingServices {
  getAll = async () => {
    const allResp = utilServices.responseFormat(false, "Booking not found");
    try {
      await dbClient.dbConnect();
      const bookings = await Booking.find({}).select(["-__v"]);
      console.log("getAll, ", bookings);

      allResp.data = bookings;
      allResp.status = true;
      allResp.message = `${bookings?.length} Booking found`;
    } catch (error) {
      allResp.message = error.message;
    } finally {
      return allResp;
    }
  };
  getOne = async (id) => {
    const bookResp = utilServices.responseFormat(
      false,
      "Booking not found by ID"
    );

    try {
      if (!utilServices.isValidateId(id)) {
        throw new NotFoundError("Booking id is not valid");
      }

      const booking = await Booking.findById(id);
      if (!utilServices.isEmpty(booking)) {
        bookResp.data = booking;
        bookResp.status = true;
        bookResp.message = "Booking found successfully";
      }
    } catch (error) {
      bookResp.message = error.message;
    } finally {
      return bookResp;
    }
  };

  add = async (booking) => {
    const addResp = utilServices.responseFormat(
      false,
      "Booking add failed",
      null
    );

    try {
      if (
        !booking.user ||
        !booking.expedition ||
        !booking.seats ||
        !booking.paymentInfo
      ) {
        throw new ValidationError(
          "Missing required fields (user, expedition, seats, paymentInfo)"
        );
      }

      const nBooking = await Booking.createBooking(booking);
      if (utilServices.isEmpty(nBooking)) {
        throw new Error(`Error saving booking: ${error.message}`);
      }
    } catch (error) {
      console.log("Booking Error, ", error);
      addResp.message = error.message;
    } finally {
      return addResp;
    }
  };

  update = async (uBooking) => {
    const updateResp = utilServices.responseFormat(
      false,
      "Booking Update failed"
    );
    try {
      if (utilServices.isEmpty(uBooking)) {
        throw new ValidationError("Booking is empty");
      }

      const { _id, seats, status, deleted, ...booking } = uBooking;

      if (!utilServices.isValidateId(_id)) {
        throw new Error("Booking id is not valid");
      }

      const updateBooking = await Booking.updateOne({ _id }, { $set: booking });

      console.log("update Booking, ", updateBooking);
      if (updateBooking) {
        updateResp.status = true;
        updateResp.message = "Booking update successfully";
      }
    } catch (error) {
      updateResp.status = false;
      updateResp.message = error.message;
    } finally {
      return updateResp;
    }
  };

  updateStatus = async (uBookingReq) => {
    const updateResp = utilServices.responseFormat(
      false,
      "Booking Status update failed"
    );
    try {
      const { status, id } = uBookingReq;
      if (!["Pending", "Confirmed", "Cancelled"].includes(status)) {
        throw new ValidationError("Invalid status value");
      }
      const booking = await this.findBookingById(id);

      const update = await booking.updateStatus(status); // Uses the model's instance method
      if (utilServices.isEmpty(update)) {
        throw new Error(`Error updating booking status: ${error.message}`);
      }
      updateResp.status = true;
      updateResp.message = "Booking Status updated :)";
    } catch (error) {
      updateResp.status = false;
      updateResp.message = "Booking Status updated :)";
    } finally {
      return updateResp;
    }
  };

  remove = async (id) => {
    const resp = utilServices.responseFormat(false, "Remove failed");
    try {
      if (!utilServices.isValidateId(id)) {
        throw new ValidationError("Booking id is not valid");
      }

      const booking = await Booking.findById(id);

      booking.deleted = true;
      booking.save();
      resp.message = "Booking successfully marked as deleted";
      resp.status = true;
    } catch (error) {
      console.log("Error Delete Booking, ", error);
      resp.message = error.message;
    } finally {
      return resp;
    }
  };
}

const bookingServices = new BookingServices();
module.exports = bookingServices;
