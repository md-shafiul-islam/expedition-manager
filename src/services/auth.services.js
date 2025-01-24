const jwt = require("jsonwebtoken");


class AuthService {
  constructor() {}

  signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  signMagicToken(payload) {
    console.log("payload ", payload);
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn:
        typeof process.env.JWT_MAGIC_LINK_EXPIRATION === "string"
          ? process.env.JWT_MAGIC_LINK_EXPIRATION
          : "5m",
    });
  }
}

const authService = new AuthService();
module.exports = authService;
