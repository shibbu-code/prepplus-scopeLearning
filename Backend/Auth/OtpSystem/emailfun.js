const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const SendEmail = async (email, otp) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Prepplus <onboarding@resend.dev>",
      to: email,
      subject: "Email Verification",
      html: `<h2>Your OTP is: ${otp}</h2>`,
    });

    if (error) throw error;

    console.log("Email sent:", data);
    return data;

  } catch (err) {
    console.error("SendEmail Error:", err);
    throw err;
  }
};

module.exports = SendEmail;