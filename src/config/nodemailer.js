const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

(async () => {
  // Your asynchronous code here
  try {
    await transporter.verify();
    console.log("Ready to send mail!");
  } catch (err) {
    console.log(`Error: Unable to connect to mail service: ${err}`);
  }
})();

module.exports = transporter;
