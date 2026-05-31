import React from "react";
import { useNavigate } from "react-router-dom";
import "./Aptimodules.css";

const Aptimodules = () => {

  const modules =
    JSON.parse(sessionStorage.getItem("modules")) || [];

  const navigate = useNavigate();

  const getGradient = (index) => {
    const gradients = [
      "linear-gradient(135deg,#5db8ff,#7ce0ff)",
      "linear-gradient(135deg,#7c5cff,#5db8ff)",
      "linear-gradient(135deg,#00c6ff,#0072ff)",
      "linear-gradient(135deg,#6a11cb,#2575fc)",
    ];

    return gradients[index % gradients.length];
  };

  return (
    <div className="modules-page">

      {/* Background Effects */}
      <div className="blur blur-one"></div>
      <div className="blur blur-two"></div>

      {/* Hero */}
      <section className="modules-hero">

        <span className="hero-tag">
          PREPPLUS APTITUDE
        </span>

        <h1>
          Master Aptitude With
          <span> Smart Learning</span>
        </h1>

        <p>
          Practice formulas, concepts, shortcuts, and
          real placement-level aptitude questions with
          an immersive learning experience.
        </p>

      </section>

      {/* Cards */}
      <div className="modules-grid">

        {modules.map((module, index) => (

          <div
            className="module-card"
            key={module._id || index}
            onClick={() => {

              sessionStorage.setItem(
                "selectedTopic",
                JSON.stringify(module)
              );

              navigate(`/aptimodules/${module.name}`);
            }}
          >

            {/* Floating Glow */}
            <div
              className="card-light"
              style={{
                background: getGradient(index),
              }}
            ></div>

            {/* Top */}
            <div className="card-top">

              <div
                className="module-icon"
                style={{
                  background: getGradient(index),
                }}
              >
                📘
              </div>

              <span className="module-number">
                0{index + 1}
              </span>

            </div>

            {/* Content */}
            <div className="module-content">

              <h2>{module.name}</h2>

              <p>
                {module.intro.length > 120
                  ? module.intro.slice(0, 120) + "..."
                  : module.intro}
              </p>

            </div>

            {/* Bottom */}
            <div className="card-footer">

              <span>Explore Module</span>

              <div className="arrow">
                →
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Aptimodules;