const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

const SendEmail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Prepplus" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Email Verification",
      html: `<h2>Your OTP is: ${otp}</h2>`,
    });

    console.log("Email sent:", info.messageId);
    return info;

  } catch (error) {
    console.error("SendEmail Error:", error);
    throw error;
  }
};

module.exports = SendEmail;