const dbClient = require("../db/db.client");
const Booking = require("../model/Booking");
const utilServices = require("./util.services");
const ValidationError = require("../error/ValidationError");
const NotFoundError = require("../error/NotFoundError");

class AnalyticsServices {
  getPopularDestinations = async () => {
    const resp = utilServices.responseFormat(
      false,
      "Not found any Popular Destinations"
    );
    try {
      const pipeline = [
        { $match: { deleted: false, status: { $in: ["Confirmed"] } } },
        {
          $lookup: {
            from: "expeditions",
            localField: "expedition",
            foreignField: "_id",
            as: "expeditionDetails",
          },
        },
        { $unwind: "$expeditionDetails" },
        {
          $group: {
            _id: "$expeditionDetails.destination",
            totalBooking: { $sum: 1 },
            totalSeatsBooked: { $sum: "$seats" },
            revenueGenerated: {
              $sum: { $multiply: ["$seats", "$pricePerSeat"] },
            },
          },
        },
        {
          $project: {
            _id: 0, // Exclude _id field
            destination: "$_id",
            totalBooking: 1,
            totalSeatsBooked: 1,
            revenueGenerated: 1,
          },
        },
        { $sort: { totalBooking: -1 } },
      ];
      await dbClient.dbConnect();
      const result = await Booking.aggregate(pipeline);
      if (!utilServices.isEmpty(result)) {
        resp.data = result;
        resp.message = `${result.length} Popular Destinations found`;
        resp.status = true;
      }
    } catch (error) {
      console.log("getPopularDestinations Error , ", error);
    } finally {
      return resp;
    }
  };

  getBookingsPerMonth = async () => {
    const resp = utilServices.responseFormat(
      false,
      "Bookings Not found by Month"
    );
    try {
      const pipeline = [
        { $match: { deleted: false, status: { $in: ["Confirmed"] } } },
        {
          $addFields: {
            yearMonth: {
              $dateToString: { format: "%Y-%m", date: "$bookingDate" },
            },
          },
        },
        {
          $group: {
            _id: "$yearMonth",
            totalBooking: { $sum: 1 },
            totalSeatsBooked: { $sum: "$seats" },
            revenueGenerated: {
              $sum: { $multiply: ["$seats", "$pricePerSeat"] },
            },
          },
        },

        {
          $project: {
            _id: 0, // Exclude _id field
            yearMonth: "$_id",
            totalBooking: 1,
            totalSeatsBooked: 1,
            revenueGenerated: 1,
          },
        },

        { $sort: { yearMonth: 1 } },
      ];

      await dbClient.dbConnect();
      const result = await Booking.aggregate(pipeline);

      if (!utilServices.isEmpty(result)) {
        resp.data = result;
        resp.message = `${result.length} Bookings found By Month`;
        resp.status = true;
      }
    } catch (error) {
      console.log("getBookingsPerMonth, Error, ", error);
    } finally {
      return resp;
    }
  };

  getPopularDestinationsPerMonth = async () => {
    const resp = utilServices.responseFormat(
      false,
      "Not found any Popular Destinations By Month"
    );

    try {
      // await dbClient.dbConnect();

      const pipeline = [
        { $match: { deleted: false, status: { $in: ["Confirmed"] } } },
        {
          $lookup: {
            from: "expeditions",
            localField: "expedition",
            foreignField: "_id",
            as: "expeditionDetails",
          },
        },

        { $unwind: "$expeditionDetails" },

        {
          $addFields: {
            yearMonth: {
              $dateToString: { format: "%Y-%m", date: "$bookingDate" },
            },
          },
        },

        {
          $group: {
            _id: {
              yearMonth: "$yearMonth",
              destination: "$expeditionDetails.destination",
            },
            totalBooking: { $sum: 1 },
            totalSeatsBooked: { $sum: "$seats" },
            revenueGenerated: {
              $sum: { $multiply: ["$seats", "$pricePerSeat"] },
            },
          },
        },
        {
          $project: {
            _id: 0, // Exclude _id field
            yearMonth: "$_id.yearMonth", // Flatten yearMonth
            destination: "$_id.destination", // Flatten destination
            totalBooking: 1,
            totalSeatsBooked: 1,
            revenueGenerated: 1,
          },
        },
        { $sort: { yearMonth: 1, totalBooking: -1 } },
      ];
      const result = await Booking.aggregate(pipeline);
      if (!utilServices.isEmpty(result)) {
        resp.data = result;
        resp.message = `${result.length} Popular Destinations By Month`;
        resp.status = true;
      }
    } catch (error) {
      console.log("Error: Popular Destinations By Month, ", error);
    } finally {
      return resp;
    }
  };
}

const analyticsServices = new AnalyticsServices();
module.exports = analyticsServices;
