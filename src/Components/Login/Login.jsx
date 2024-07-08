import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.css"; // Make sure to create a Login.css file for styling

const Login = () => {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
  };

  // Function to navigate to forgot password route
  const navigateToForgotPassword = () => {
    navigate("/forgot-password");
  };

  // Function to navigate to signup route
  const navigateToSignup = () => {
    navigate("/signup");
  };

  const handleSendOtp = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.post("/api/send-otp", { loginInput });
      if (response.data.success) {
        setOtpSent(true);
        toast.success("OTP sent successfully!");
      } else {
        // Handle any errors, such as OTP not sent
        toast.error("Failed to send OTP");
      }
    } catch (error) {
      // Handle errors, such as network errors, or issues with the request
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleResendOtp = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.post("/api/resend-otp", { loginInput });
      if (response.data.success) {
        toast.success("OTP resent successfully!");
      } else {
        // Handle any errors, such as OTP not sent
        toast.error("Failed to resend OTP");
      }
    } catch (error) {
      // Handle errors, such as network errors, or issues with the request
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Email ID or Phone Number"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {otpSent && (
            <div className="input-group">
              <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-footer">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-button"
            >
              Forgot Password?
            </button>
          </div>
          {!otpSent ? (
            <button type="button" onClick={handleSendOtp}>
              Send OTP
            </button>
          ) : (
            <button type="submit">Login</button>
          )}
          {otpSent && (
            <p className="resend-otp" onClick={handleResendOtp}>
              Resend OTP
            </p>
          )}
          <p className="register-link">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-button"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
