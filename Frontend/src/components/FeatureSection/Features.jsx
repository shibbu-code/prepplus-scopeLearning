import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

import {
  faArrowRightLong,
  faCode,
  faBrain,
  faChartLine,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";

import "./Features.css";

const Features = () => {

  const navigate = useNavigate();

  // Fetch Aptitude Modules
  const getModules = async () => {

    try {

      const response = await fetch(
        "http://localhost:3000/aptimodules",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.status === 401) {

        sessionStorage.clear();

        alert("Please login to proceed.");

        navigate("/", {
          replace: true,
        });

        return false;
      }

      const data = await response.json();

      sessionStorage.setItem(
        "modules",
        JSON.stringify(data)
      );

      return true;

    } catch (error) {

      console.error(
        "Error fetching modules:",
        error
      );

      return false;
    }
  };

  // Fetch DSA
  const fetchDataDSA = async () => {

    try {

      const response = await fetch(
        "http://localhost:3000/problemset",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.status === 401) {

        sessionStorage.clear();

        alert("Please login to proceed.");

        navigate("/", {
          replace: true,
        });

        return false;
      }

      const result = await response.json();

      sessionStorage.setItem(
        "dsaQuestions",
        JSON.stringify(result)
      );

      return true;

    } catch (error) {

      console.error(
        "Error fetching DSA questions:",
        error
      );

      return false;
    }
  };

  return (
    <section className="features-section">

      {/* Background Glow */}
      <div className="feature-blur blur-1"></div>
      <div className="feature-blur blur-2"></div>

      {/* Heading */}
      <div className="feature-heading">

        <span className="feature-tag">
          PREPPLUS FEATURES
        </span>

        <h1>
          Structured Learning
          <span> Built For Placements</span>
        </h1>

        <p>
          Master aptitude, reasoning, and DSA
          through a premium learning experience
          designed for college students preparing
          for placements.
        </p>

      </div>

      {/* Feature Cards */}
      <div className="feature-grid">

        {/* DSA */}
        <div className="feature-card">

          <div className="card-glow"></div>

          <div className="feature-icon">
            <FontAwesomeIcon icon={faCode} />
          </div>

          <div className="feature-content">

            <span className="feature-mini">
              DSA TRACK
            </span>

            <h2>
              Data Structures & Algorithms
            </h2>

            <p>
              Learn coding patterns, optimize
              problem-solving, and prepare for
              technical interviews with curated
              practice sets.
            </p>

            <div className="feature-points">

              <div>
                <FontAwesomeIcon icon={faBolt} />
                Pattern Based Learning
              </div>

              <div>
                <FontAwesomeIcon icon={faChartLine} />
                Progress Tracking
              </div>

            </div>

            <button
              className="feature-btn"
              onClick={async () => {

                const success =
                  await fetchDataDSA();

                if (success) {
                  navigate("/problem-set");
                }
              }}
            >
              Explore DSA

              <FontAwesomeIcon
                icon={faArrowRightLong}
              />
            </button>

          </div>

        </div>

        {/* Aptitude */}
        <div className="feature-card">

          <div className="card-glow purple"></div>

          <div className="feature-icon purple-bg">
            <FontAwesomeIcon icon={faBrain} />
          </div>

          <div className="feature-content">

            <span className="feature-mini">
              APTITUDE TRACK
            </span>

            <h2>
              Aptitude & Reasoning
            </h2>

            <p>
              Practice formulas, shortcuts,
              logical reasoning, and placement
              scenarios with structured modules.
            </p>

            <div className="feature-points">

              <div>
                <FontAwesomeIcon icon={faBolt} />
                Scenario Based Questions
              </div>

              <div>
                <FontAwesomeIcon icon={faChartLine} />
                Smart Practice Flow
              </div>

            </div>

            <button
              className="feature-btn"
              onClick={async () => {

                const success =
                  await getModules();

                if (success) {
                  navigate("/aptimodules");
                }
              }}
            >
              Explore Aptitude

              <FontAwesomeIcon
                icon={faArrowRightLong}
              />
            </button>

          </div>

        </div>

      </div>

      {/* Bottom Section */}
      <div className="feature-bottom">

        <div className="bottom-left">

          <span className="feature-tag">
            WHY PREPPLUS
          </span>

          <h2>
            Built By A Student,
            <span> For Students</span>
          </h2>

          <p>
            PrepPlus focuses on clarity,
            structured preparation, and reducing
            confusion during placement season.
            Instead of random preparation, you
            follow a focused path with practical
            learning and real interview patterns.
          </p>

        </div>

        <div className="bottom-right">

          <div className="bottom-glass">

            <div className="floating-box one">
              Smart Practice
            </div>

            <div className="floating-box two">
              Real Preparation
            </div>

            <div className="center-circle">
              🚀
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Features;