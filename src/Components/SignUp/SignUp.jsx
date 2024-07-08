import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaMale, FaFemale, FaGenderless } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./SignUp.css"; // Make sure to create a Signup.css file for styling

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [subscribeEmails, setSubscribeEmails] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate(); // Create a navigate function using useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if both email and phone number are provided
    if (!email || !phoneNumber) {
      alert("Both Email and Phone Number are required"); // Replace with a more user-friendly message or UI display
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match"); // Replace with a more user-friendly message or UI display
      return;
    }

    // Check if the terms and conditions are accepted
    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions to proceed.");
      return;
    }

    // Proceed with the signup logic
    // ...
  };

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        userData
      );
      console.log(response.data);
      // Handle response or redirect
    } catch (error) {
      console.error("Registration error:", error.response);
      // Handle error
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendOtp = async () => {
    try {
      // Replace with your actual API endpoint for sending OTP
      const response = await axios.post("/api/send-otp", { phoneNumber });
      if (response.data.success) {
        setOtpSent(true);
        toast.success("OTP sent successfully!");
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleResendOtp = async () => {
    try {
      // Replace with your actual API endpoint for resending OTP
      const response = await axios.post("/api/resend-otp", { phoneNumber });
      if (response.data.success) {
        toast.success("OTP resent successfully!");
      } else {
        toast.error("Failed to resend OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  // Function to navigate to login route
  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="left-bar">
          <div className="input-row">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="input-row">
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="input-row">
            <div className="gender-selection">
              <div
                className={`gender-icon ${gender === "male" ? "selected" : ""}`}
                onClick={() => setGender("male")}
              >
                <FaMale /> <span>Male</span>
              </div>
              <div
                className={`gender-icon ${
                  gender === "female" ? "selected" : ""
                }`}
                onClick={() => setGender("female")}
              >
                <FaFemale /> <span>Female</span>
              </div>
              <div
                className={`gender-icon ${
                  gender === "other" ? "selected" : ""
                }`}
                onClick={() => setGender("other")}
              >
                <FaGenderless /> <span>Other</span>
              </div>
            </div>
          </div>
          <div className="input-row">
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>

          <div className="input-row">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="input-row">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="right-bar">
          <div className="profile-photo-section">
            <label htmlFor="profilePic">Profile Picture</label>
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              onChange={handleImageChange}
            />
            {profilePic && (
              <img
                src={profilePic}
                alt="Profile Preview"
                className="profile-preview"
              />
            )}
          </div>

          {/* Checkboxes for terms and newsletter subscription */}
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
              />
              I accept the <a href="/terms">terms and conditions</a> and{" "}
              <a href="/privacy">privacy policy</a>
            </label>
            <label>
              <input
                type="checkbox"
                checked={subscribeEmails}
                onChange={(e) => setSubscribeEmails(e.target.checked)}
              />
              Subscribe to get emails
            </label>
          </div>
          <div className="otp-signup-section">
            {otpSent && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            )}
            {!otpSent ? (
              <button type="button" onClick={handleSendOtp}>
                Send OTP
              </button>
            ) : (
              <button type="submit">Sign Up</button>
            )}
            {otpSent && (
              <p className="resend-otp" onClick={handleResendOtp}>
                Resend OTP
              </p>
            )}
            <p className="login-link">
              Already have an account?{" "}
              <button
                type="button"
                onClick={navigateToLogin}
                className="text-button"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
