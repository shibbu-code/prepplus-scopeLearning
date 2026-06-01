const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../DB/Modules/user');
const SendEmail = require('./OtpSystem/emailfun');
const jwt = require("jsonwebtoken");


// ✅ JWT Token Generator
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isVerified: user.isVerified
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


// ================= SIGN UP =================
const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await SendEmail(email, otp);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry
    });

    const token = generateToken(newUser);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
  user: {
    id: newUser._id,
    name: newUser.name
  }
    });

  } catch (err) {
    res.status(500).json({
      message: "Error registering user",
      error: err.message
    });
  }
};


// ================= SIGN IN =================
const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("SignIn Request:", req.body);
    const user = await User.findOne({ email });
    console.log("User found:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    console.log("Generated token:", token);

res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/"
});

console.log("Cookie attached");
    res.status(200).json({
      message: "User signed in successfully",
      token,
  user: {
    id: user._id,
    name: user.name
  }
    });

  } catch (err) {
    res.status(500).json({
      message: "Error signing in",
      error: err.message
    });
  }
};


// ================= VERIFY OTP =================
const VerifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // 🔥 Generate NEW token with updated isVerified
    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "Email verified successfully",
       token,
  user: {
    id: user._id,
    name: user.name
  }
    
    });

  } catch (err) {
    res.status(500).json({
      message: "Error verifying OTP",
      error: err.message
    });
  }
};

// logout

const SignOut = async (req, res) => {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "User signed out successfully",
    });

  } catch (err) {

    res.status(500).json({
      message: "Error signing out",
      error: err.message,
    });
  }
};

module.exports = {
  SignUp,
  SignIn,
  VerifyOTP,
  SignOut
};