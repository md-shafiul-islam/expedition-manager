const jwt = require("jsonwebtoken");

const accessLevel = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;

      if (!roles.includes(decode.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = accessLevel;
