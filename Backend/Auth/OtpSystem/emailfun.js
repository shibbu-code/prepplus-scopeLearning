const https = require("https");
require("dotenv").config();

const SendEmail = async (email, otp) => {
  const data = JSON.stringify({
    sender: { name: "Prepplus", email: process.env.SENDER_EMAIL },
    to: [{ email: email }],
    subject: "Email Verification",
    htmlContent: `<h2>Your OTP is: ${otp}</h2>`,
  });

  const options = {
    hostname: "api.brevo.com",
    path: "/v3/smtp/email",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        console.log("Email sent! Status:", res.statusCode);
        resolve(body);
      });
    });

    req.on("error", (error) => {
      console.error("SendEmail Error:", error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
};

module.exports = SendEmail;