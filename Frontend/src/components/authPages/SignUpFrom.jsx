import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './SignUpForms.css';

const SignUpForm = () => {

  const [otpg, setotpg] = useState(false);
  const navigate = useNavigate();

  // SIGNUP
  const handleSignUp = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        'http://localhost:3000/signup',
        {
          email: e.target.email.value,
          name: e.target.name.value,
          password: e.target.password.value
        },
        {
          withCredentials: true
        }
      );

      setotpg(true);

    } catch (error) {

      console.error(
        'SignUp failed:',
        error.response?.data || error.message
      );
    }
  };

  // VERIFY OTP
  const handleCreation = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        'http://localhost:3000/verify-otp',
        {
          email: e.target.email.value,
          otp: e.target.otp.value
        }
      );
       const user = response.data.user;

      sessionStorage.setItem(
        'user',
        JSON.stringify(user)
      );
      alert("Account Created Successfully");
       
      navigate("/");

    } catch (error) {

      console.error(
        'OTP verification failed:',
        error.response?.data || error.message
      );
    }
  };

  return (

    <div className='signup-main'>

      <div className='signup-card'>

        <h1>PrepPlus</h1>
        <p>Create your account</p>

        <form
          onSubmit={otpg ? handleCreation : handleSignUp}
          className='signup-form'
        >

          <input
            type="email"
            name="email"
            placeholder='Email Address'
            required
          />

          <input
            type="text"
            name="name"
            placeholder='Full Name'
            required
          />

          <input
            type="password"
            name="password"
            placeholder='Password'
            required
          />

          {otpg && (
            <input
              type="text"
              name="otp"
              placeholder='Enter OTP'
              required
            />
          )}

          <button type="submit">
            {otpg ? "Verify OTP" : "Create Account"}
          </button>

        </form>
        <div className='bottom-text'>
  Already have an account?
  
  <span onClick={() => navigate("/login")}>
    Login
  </span>
</div>

      </div>

    </div>
  );
};

export default SignUpForm;