class UtilServices {
  responseFormat(status = false, message = "Not found", data = null) {
    return {
      status,
      message,
      data,
    };
  }
}

const utilServices = new UtilServices();
module.exports = utilServices;