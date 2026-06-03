// ✅ Correct
const { ApiClient, TransactionalEmailsApi } = require("@getbrevo/brevo");
require("dotenv").config();

const client = ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const apiInstance = new TransactionalEmailsApi();

const SendEmail = async (email, otp) => {
  try {
    await apiInstance.sendTransacEmail({
      sender: {
        email: process.env.SENDER_EMAIL,
        name: "Prepplus",
      },
      to: [{ email: email }],
      subject: "Email Verification",
      htmlContent: `<h2>Your OTP is: ${otp}</h2>`,
    });

    console.log("Email sent successfully to:", email);

  } catch (error) {
    console.error("SendEmail Error:", error);
    throw error;
  }
};

module.exports = SendEmail;