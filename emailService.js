const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASS } = require("./utils/config");

const sendConfirmationEmail = async (
  email,
  event,
  userName,
  ticketPrice,
  supportEmail
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: `Ticket Purchase Confirmation - ${event.title}`,
      text: `Dear ${userName}, 

Thank you for purchasing a ticket to "${
        event.title
      }"! We're excited to have you join us for this fantastic event. Here's what you need to know:

Event Title: ${event.title}
Description: ${event.description}
Date: ${new Date(event.date).toLocaleString()}
Location: ${event.location}
Category: ${event.category}
Ticket Price: ${ticketPrice ? `$${ticketPrice}` : "N/A"}

What to Expect:
- Engaging sessions, discussions, and interactive activities tailored for "${
        event.category
      }" enthusiasts.

Important Information:
Please arrive at least 30 minutes early for a smooth check-in process. Don't forget to bring this email or your Ticket ID for event access.

Need Assistance? Contact our support team at ${supportEmail}.

Thank you for choosing to spend your valuable time with us. We can't wait to see you there!

Warm Regards,  
Event Team  
${event.company}
`,
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
