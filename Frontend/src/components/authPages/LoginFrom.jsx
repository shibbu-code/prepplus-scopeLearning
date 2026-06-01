import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import './LoginForm.css';

const LoginForm = () => {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response = await axios.post(
        'https://prepplus-scopelearning-2.onrender.com/signin',
        {
          email: e.target.email.value,
          password: e.target.password.value
        },
        {
          withCredentials: true
        }
      );

      const token = response.data.token;

      sessionStorage.setItem(
        'token',
        token
      );

      const user = response.data.user;

      sessionStorage.setItem(
        'user',
        JSON.stringify(user)
      );

      const decoded =
        jwtDecode(token);

      if (decoded.isVerified) {

        navigate("/");
      }

    } catch (error) {

      console.error(
        "Login failed:",
        error.response?.data ||
        error.message
      );

      setError(
        error.response?.data?.message ||
        "Unable to login. Please try again."
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="login-main">

      <div className="login-card">

        <h1>PrepPlus</h1>

        <p>
          Welcome back. Continue your
          preparation journey.
        </p>

        <form
          onSubmit={handleLogin}
          className="login-form"
        >

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {
              loading
                ? "Logging In..."
                : "Login"
            }
          </button>

        </form>

        <div className="bottom-text">

          Don’t have an account?

          <span
            onClick={() =>
              navigate("/signup")
            }
          >
            Sign Up
          </span>

        </div>

      </div>

    </div>
  );
};

export default LoginForm;