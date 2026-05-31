import React from "react";
import "./HeroSection.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import ExploreBtn from "../buttons/ExploreBtn";

const HeroSection = () => {

  const navigate = useNavigate();

  return (
    <section className="hero-section-main">

      {/* Background Blur */}
      <div className="hero-blur blur-one"></div>
      <div className="hero-blur blur-two"></div>

      {/* Navbar */}
      <div className="navbar-wrapper">
        <Navbar />
      </div>

      {/* Main Hero */}
      <div className="hero-container">

        {/* Left */}
        <div className="hero-left">

          <div className="hero-badge">
            <span></span>
            SCOPE LEARNING PLATFORM
          </div>

          <h1 className="hero-title">
            Crack Placements With
            <span> Smart Preparation</span>
          </h1>

          <p className="hero-description">
            PrepPlus is a premium placement preparation platform
            designed especially for college students. Practice
            interview-level aptitude, coding, and reasoning
            questions while tracking your growth through a
            structured roadmap built for real placements.
          </p>

          {/* Buttons */}
          <div className="hero-actions">

            <div
              onClick={() => navigate("/signup")}
            >
              <ExploreBtn text="Get Started" />
            </div>

            

          </div>

          {/* Stats */}
          <div className="hero-stats">

            <div className="hero-stat-card">
              <h2>10K+</h2>
              <span>Practice Questions</span>
            </div>

            <div className="hero-stat-card">
              <h2>500+</h2>
              <span>Mock Assessments</span>
            </div>

            <div className="hero-stat-card">
              <h2>24/7</h2>
              <span>Learning Access</span>
            </div>

          </div>

        </div>

        {/* Right */}
        <div className="hero-right">

          <div className="glass-hero-card">

            <div className="floating-card small-card">
              Aptitude
            </div>

            <div className="floating-card medium-card">
              DSA
            </div>

            <div className="floating-card large-card">
              Structured Learning
            </div>

            <div className="main-circle">
              <span>🚀</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroSection;