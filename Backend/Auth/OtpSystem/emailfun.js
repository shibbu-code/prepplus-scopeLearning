const nodemailer = require("nodemailer");
require("dotenv").config();
const dns = require("dns");

dns.lookup("smtp.gmail.com", { all: true }, (err, addresses) => {
  console.log("SMTP addresses:", addresses);
});
const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  family: 4, // Use IPv4
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

const SendEmail = async (email, otp) => {



  const info = await transporter.sendMail({
    from: `"Prepplus Organization" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Email Verification",
    html: `<h2>Your OTP is: ${otp}</h2>`
  });
 console.log("Message sent:", info.messageId);
};
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Error:", error);
  } else {
    console.log("SMTP Ready");
  }
});

module.exports = SendEmail;