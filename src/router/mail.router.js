const express = require("express");
const mailController = require("../controller/mail.controller");

const mailRouter = express.Router();

mailRouter.post("/magic-link", mailController.sendMagicLink);

module.exports = mailRouter;
