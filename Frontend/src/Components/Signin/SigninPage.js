import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import "./SigninPage.css";
import backgroundImage from "../Assets/sininpage.png";


const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    // Check if fields are empty
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    // Call the backend API for signin
    try {
      const response = await axios.post("http://localhost:5006/api/users/signin", {
        email,
        password,
      });

      // Show success message and navigate
      alert(response.data.message);
      navigate("/Testpage"); // Redirect after successful signin
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Signin failed. Please check your credentials.";

      // Handle "User not found" error and navigate to signup page
      if (errorMessage === "User not found. Please signup first.") {
        alert(errorMessage);
        navigate("/"); // Redirect to signup page
      } else {
        alert(errorMessage);
      }
    }
  };

  return (
    <div
      className="signin-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="signin-form">
        <h2>Signin</h2>
        <form onSubmit={handleSignin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signin-button">
            Signin
          </button>
        </form>
        <p>
          Don't have an account? <a href="/SignupPage">Signup</a>
        </p>
      </div>
    </div>
  );
}  
export default SigninPage;
