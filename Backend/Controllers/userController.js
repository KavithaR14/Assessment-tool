const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const crypto = require("crypto");
const transporter = require('../Config/emailConfig');

// Generate OTP function
const generateOtp = () => crypto.randomInt(100000, 999999).toString();

// Send OTP via email
exports.sendOtp = async (req, res) => {
  const { name, email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required!" });

  try {
    let user = await User.findOne({ email });
    const otp = generateOtp();
    const otpExpires = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

    if (user) {
      if (user.verified) {
        return res.status(400).json({ error: "User already exists. Please sign in." });
      }
      user.otp = otp;
      user.otpExpires = otpExpires;
    } else {
      user = new User({ name, email, otp, otpExpires });
    }

    await user.save();

    const mailOptions = {
      from: "kavitha31032002@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Hello ${name},\n\nYour OTP code is: ${otp}\n\nThis OTP will expire in 5 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send OTP email" });
      }
      console.log("Email sent successfully:", info.response);
      res.status(200).json({ message: "OTP sent successfully!" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Verify OTP function
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "No signup found for this email. Please signup first." });
    }

    // Check if OTP matches and if the OTP has expired
    if (user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP!" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ error: "OTP has expired!" });
    }

    // OTP is correct and not expired, so proceed with verification
    user.verified = true;
    user.otp = undefined; // Clear OTP
    user.otpExpires = undefined; // Clear expiry time

    await user.save();

    res.status(200).json({ message: "Signup successful! You can now sign in." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Signin function
exports.signin = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found. Please signup first." });
    }

    if (!user.verified) {
      return res.status(400).json({ error: "Email not verified. Please complete signup first." });
    }

    const token = jwt.sign({ userId: user._id }, "secretKey", { expiresIn: "1h" });

    res.status(200).json({ message: "Signin successful!", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};
