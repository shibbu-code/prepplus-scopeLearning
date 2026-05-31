import React, { useState } from "react";
import "./Navbar.css";

import logo from "../../images/prepPluslogo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUserGraduate,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  return (
    <nav className="navbar">

      {/* Logo */}
      <div
        className="navbar-logo"
        onClick={() => navigate("/")}
      >

        <img
          src={logo}
          alt="PrepPlus Logo"
          className="logo-image"
        />

        <div className="logo-text">
          <h2>PrepPlus</h2>
          <span>Scope Learning</span>
        </div>

      </div>

      {/* Links */}
      <ul
        className={`navbar-links ${
          menuOpen ? "active" : ""
        }`}
      >

        <li>
          <a href="/">Home</a>
        </li>

        <li>
          <a href="#features">Features</a>
        </li>

        <li>
          <a href="#about">About</a>
        </li>

        

      </ul>

      {/* Actions */}
      <div className="navbar-right">

        <div className="navbar-right">

  {sessionStorage.getItem("user") ? (

    <div
      className="profile-logo"
      onClick={() => navigate("/profile")}
    >
      {
        JSON.parse(
          sessionStorage.getItem("user")
        )
          ?.name?.charAt(0)
          ?.toUpperCase()
      }
    </div>

  ) : (

    <button
      className="login-btn"
      onClick={() => navigate("/signup")}
    >

      <FontAwesomeIcon
        icon={faUserGraduate}
      />

      Get Started

    </button>

  )}

</div>

        {/* Mobile Toggle */}
        <div
          className="menu-toggle"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >

          <FontAwesomeIcon
            icon={
              menuOpen
                ? faXmark
                : faBars
            }
          />

        </div>

      </div>

    </nav>
  );
};

export default Navbar;