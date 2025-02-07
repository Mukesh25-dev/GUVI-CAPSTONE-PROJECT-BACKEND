const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASS } = require("./utils/config");

const sendConfirmationEmail = async (email, eventTitle) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from:EMAIL_USER,
      to: email,
      subject: "Ticket Purchase Confirmation",
      text: `Dear User, \n\nThank you for purchasing a ticket to "${eventTitle}". We look forward to seeing you at the event!\n\nWarm Regards, Event Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email delivery failed");
  }
};

module.exports = { sendConfirmationEmail };
