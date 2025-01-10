import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignupPage.css";
import backgroundImage from "../Assets/singupimage.png";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    try {
      const response = await axios.post("http://localhost:5006/api/users/send-otp", { name, email });
      if (response.data && response.data.message) {
        setIsOtpSent(true);
        alert(response.data.message);
      } else {
        alert("Unexpected response from the server.");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Failed to send OTP. Please try again later.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    try {
      const response = await axios.post("http://localhost:5006/api/users/verify-otp", {
        name,
        email,
        otp: enteredOtp,
      });
      alert(response.data.message);
      localStorage.setItem("username", name);
      localStorage.setItem("email", email);
      navigate("/Signin");
    } catch (error) {
      alert(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    
    <div
      className="signup-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="signup-form">
        <h2>Signup</h2>
        <form>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error-message">{emailError}</p>}
            <button
              type="button"
              className="send-otp-button"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </div>
          {isOtpSent && (
            <div className="input-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                placeholder="Enter the OTP sent to your email"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
              />
            </div>
          )}
          <button
            type="submit"
            className="signup-button"
            onClick={handleSignup}
            disabled={!isOtpSent}
          >
            Signup
          </button>
        </form>
        <p>
          Already have an account? <a href="/signin">Signin</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
