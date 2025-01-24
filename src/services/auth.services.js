const jwt = require("jsonwebtoken");
const ValidationError = require("../error/ValidationError");

class AuthService {
  constructor() {}

  signBearerToken(payload) {
    console.log("signBearerToken payload, ", payload);
    return `Bearer ${this.signToken(payload)}`;
  }

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

  validateAndDecode = (token) => {
    console.log("validateAndDecode", token);
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log("Error, ", error);
      throw new ValidationError("Token validate failed");
    }
  };
}

const authService = new AuthService();
module.exports = authService;
