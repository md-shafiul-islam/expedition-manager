const { default: mongoose } = require("mongoose");

class UtilServices {
  responseFormat = (status = false, message = "Not found", data = null) => {
    return {
      status,
      message,
      data,
    };
  };

  isEmpty = (obj) => {
    if (obj === undefined || obj === null) {
      return true;
    }

    if (typeof obj === "undefined" || typeof obj === null || obj === "") {
      return true;
    }

    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
      return true;
    }

    if (Array.isArray(obj)) {
      if (obj.length > 0) {
        return false;
      }

      return true;
    }

    return false;
  };

  isValidateId = (id) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return true;
    }
    return false;
  };
}

const utilServices = new UtilServices();
module.exports = utilServices;
