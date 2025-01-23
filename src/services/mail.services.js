const nodemailer = require("nodemailer");
const dotEnv = require("dotenv");
const utilServices = require("./util.services");
dotEnv.config();
class MailService {
  constructor() {
    this.initTransporter();
  }

  initTransporter() {
    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT) || 465,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    } catch (error) {
      console.log("Error creating transporter: ", error.message);
    }
  }

  sendMail = async ({ email, subject, html }) => {
    let status = false,
      message = "Error sending email",
      response = null;
    try {
      const mail = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html,
      });

      if (mail.messageId) {
        response = mail.messageId;
        status = true;
        message = `Email sent to ${email}`;
      }
      return mail;
    } catch (error) {
      console.log("Error sending email: ", error);
      status = false;
      message = error.message;
    } finally {
      return utilServices.responseFormat(true, message, response);
    }
  };
}

const mailService = new MailService();
module.exports = mailService;
