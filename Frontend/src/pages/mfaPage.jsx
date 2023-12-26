import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backend_url = "http://localhost:3000/api/v1";

const MFAPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(
        `${backend_url}/verify-otp`,
        {
          email,
          otp,
        },
        { withCredentials: true }
      );
      // const token = response.cookie;
      // localStorage.setItem('token', token);
      const { status, data } = response;
      if (status === 200) {
        localStorage.setItem("userId", response.data.user._id)
        localStorage.setItem("role", response.data.user.role)
        setSuccessMessage("OTP verification successful");
        if (response.data.user.role === "admin") {
          navigate("/homeadmin");
        } else {
          navigate("/home");
        }

      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error during OTP verification");
    }
  };

  return (
    <div className="mfa_container">
      <h2>MFA Verification</h2>
      <div>
        <label htmlFor="email">Enter Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label htmlFor="otp">Enter OTP:</label>
        <input
          type="text"
          name="otp"
          value={otp}
          onChange={handleOtpChange}
          maxLength="6"
        />
      </div>
      <button type="button" onClick={handleVerifyOTP}>
        Verify OTP
      </button>
      <span>
        {errorMessage} {successMessage}
      </span>
    </div>
  );
};

export default MFAPage;
