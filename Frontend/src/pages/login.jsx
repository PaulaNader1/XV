// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const backend_url = "http://localhost:3000/api/v1";

const Login = () => {
  const navigate = useNavigate();
  //const location = useLocation();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;



  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // const userModel = require('../../../Backend/Models/userModel');
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend_url}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      // const token = response.cookie.token;
      // localStorage.setItem('token', token);
      const { status, data } = response;
      if (status === 200) {
        if (data.message === "OTP sent to email for verification") {
          // Redirect to MFA page if MFA is enabled
          navigate("/mfa", {
            state: {
              // email,  // Include the email in the state
              message: "Please enter the OTP sent to your email for verification.",
            },
          });
        } else {
          localStorage.setItem("userId", response.data.user._id);
          localStorage.setItem("role", response.data.user.role);
          if (response.data.user.role === "manager") {
            navigate("/homemanager");
          } else if (response.data.user.role === "admin") {
            navigate("/homeadmin");
          } else if (response.data.user.role === "user") {
            navigate("/home");
          }else if (response.data.user.role === "agent"){
            navigate("/homeagent");
          }
        }
      } else {
        // Handle other cases (e.g., incorrect password, email not found)
        console.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // Handle other errors
    }
  };

  // Check if the user was redirected from the signup page
  // useEffect(() => {
  //   if (location.state && location.state.message) {
  //     console.log(location.state.message);
  //   }
  // }, [location.state]);

  return (
    <div className="form_container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Don't have an account? <Link to={"/signup"}>Sign up</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
