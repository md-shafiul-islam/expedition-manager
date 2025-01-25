const analyticsServices = require("../services/analytics.services");
const authService = require("../services/auth.services");
const mailService = require("../services/mail.services");
const userServices = require("../services/user.services");
const utilServices = require("../services/util.services");
const userController = require("./user.controller");

class AnalyticsController {
  getPopularDestinations = async () => {
    let resp = utilServices.responseFormat(
      false,
      "Not found any Popular Destinations"
    );
    try {
      resp = analyticsServices.getPopularDestinations();
    } catch (error) {
      console.log("CN getPopularDestinations Error , ", error);
      resp.status = false;
      return resp;
    }
  };

  getBookingsPerMonth = async () => {
    let resp = utilServices.responseFormat(
      false,
      "Bookings Not found by Month"
    );
    try {
      resp = await analyticsServices.getBookingsPerMonth();
    } catch (error) {
      console.log("CN getBookingsPerMonth Error , ", error);

      resp.status = false;
      return resp;
    }
  };

  getPopularDestinationsPerMonth = async () => {
    const resp = utilServices.responseFormat(
      false,
      "Not found any Popular Destinations By Month"
    );

    try {
      resp = await analyticsServices.getPopularDestinationsPerMonth();
    } catch (error) {
      console.log("CN Error: Popular Destinations By Month, ", error);
      resp.status = false;
      return resp;
    }
  };
}

const analyticsController = new AnalyticsController();
module.exports = analyticsController;
