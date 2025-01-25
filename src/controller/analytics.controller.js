const analyticsServices = require("../services/analytics.services");
const utilServices = require("../services/util.services");

class AnalyticsController {
  getPopularDestinations = async (req, res) => {
    let resp = utilServices.responseFormat(
      false,
      "Not found any Popular Destinations"
    );
    try {
      resp = await analyticsServices.getPopularDestinations();
    } catch (error) {
      resp.status = false;
      resp.message = error.message;
    } finally {
      res.status(200).send(resp);
    }
  };

  getBookingsPerMonth = async (req, res) => {
    let resp = utilServices.responseFormat(
      false,
      "Bookings Not found by Month"
    );
    try {
      resp = await analyticsServices.getBookingsPerMonth();
    } catch (error) {
      console.log("CN getBookingsPerMonth Error , ", error);

      resp.status = false;
    } finally {
      res.status(200).send(resp);
    }
  };

  getPopularDestinationsPerMonth = async (req, res) => {
    let resp = utilServices.responseFormat(
      false,
      "Not found any Popular Destinations By Month"
    );

    try {
      resp = await analyticsServices.getPopularDestinationsPerMonth();
    } catch (error) {
      console.log("CN Error: Popular Destinations By Month, ", error);
      resp.status = false;
    } finally {
      res.status(200).send(resp);
    }
  };
}

const analyticsController = new AnalyticsController();
module.exports = analyticsController;
