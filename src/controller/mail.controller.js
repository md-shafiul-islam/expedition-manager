const authService = require("../services/auth.services");
const mailService = require("../services/mail.services");
const utilServices = require("../services/util.services");

class MailController {
  sendMagicLink = async (req, res) => {
    let mailResponse = utilServices.responseFormat(
      false,
      "Error sending email",
      null
    );
    try {
      const token = authService.signMagicToken({ email: req.body.email });

      mailResponse = await mailService.sendMail({
        email: req.body.email,
        subject: "Login Link",
        text: "Click the link below to log in",
        html: `<p><a href='${process.env.CLIENT_URL}/auth/link/${token}'>Click to log in</a></p>`,
      });
    } catch (error) {
      console.log(error);
    } finally {
      res.status(200).send(mailResponse);
    }
  };
}

const mailController = new MailController();
module.exports = mailController;
