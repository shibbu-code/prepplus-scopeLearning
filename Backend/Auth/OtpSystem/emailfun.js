const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
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


module.exports = SendEmail;