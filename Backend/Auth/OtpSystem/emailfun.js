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
      "Content-Length": Buffer.byteLength(data),
      "api-key": process.env.BREVO_API_KEY,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        console.log("Status:", res.statusCode);
        console.log("Response:", body); // ← this will show exact error
        if (res.statusCode === 201) {
          console.log("Email sent successfully to:", email);
          resolve(body);
        } else {
          reject(new Error(`Failed: ${body}`));
        }
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