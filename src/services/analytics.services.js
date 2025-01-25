const dbClient = require("../db/db.client");
const Booking = require("../model/Booking");
const Expedition = require("../model/Expedition");
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
        { $match: { deleted: false }, status: { $in: ["Confirmed"] } },
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
            totalSeatsBooked: { $sum: $seats },
            revenueGenerated: {
              $sum: { $multiply: ["$seats", "$pricePerSeat"] },
            },
          },
        },
        { $sort: { totalBookings: -1 } },
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
        { $match: { deleted: false, $status: { $in: ["Confirmed"] } } },
        {
          $addFields: {
            yearMonth: {
              $dateToString: { format: "%Y-$m", date: "$bookingDate" },
            },
          },
        },
        {
          $group: {
            _id: "$yearMonth",
            totalBookings: { $sum: 1 },
            totalSeatsBooked: { $sum: "$seats" },
            revenueGenerated: {
              $sum: { $multiply: ["$seats", "$pricePerSeat"] },
            },
          },
        },
        { $sort: { _id: 1 } },
      ];

      await dbClient.dbConnect();

      const result = await Booking.aggregate(pipeline);

      if (!utilServices.isEmpty(result)) {
        resp.data = result;
        resp.message = `${result.length} Bookings found By Month`;
        resp.status = true;
      }
    } catch (error) {
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
            revenueGenerated: { $multiply: ["$seats", "$pricePerSeat"] },
          },
        },
        { $sort: { "_id.yearMonth": 1, totalBookings: -1 } },
      ];

      await dbClient.dbConnect();

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
