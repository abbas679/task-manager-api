const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Task Manager" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

module.exports = sendEmail;
