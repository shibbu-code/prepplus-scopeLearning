const nodemailer = require("nodemailer");
require("dotenv").config();
const dns = require("dns");

dns.lookup("smtp.gmail.com", { all: true }, (err, addresses) => {
  if (err) {
    console.error("DNS Lookup Error:", err);
  } else {
    console.log("SMTP addresses:", addresses);
  }
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Verify Error:", error);
  } else {
    console.log("SMTP Ready");
  }
});

const SendEmail = async (email, otp) => {
  try {
    console.log("Inside SendEmail function");
    console.log("Sending email to:", email);

    const info = await transporter.sendMail({
      from: `"Prepplus Organization" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Email Verification",
      html: `<h2>Your OTP is: ${otp}</h2>`,
    });

    console.log("Message sent:", info.messageId);
    return info;

  } catch (error) {
    console.error("SendEmail Error:", error);
    throw error;
  }
};

module.exports = SendEmail;