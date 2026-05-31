import React from "react";
import "./AptiTopic.css";
import { useNavigate, useLocation } from "react-router-dom";

const AptiTopic = () => {
  const selectedTopic = JSON.parse(
    sessionStorage.getItem("selectedTopic")
  );

  const navigate = useNavigate();
  const location = useLocation();

  if (!selectedTopic)
    return (
      <div className="empty-state">
        <h1>No Topic Selected</h1>
        <p>Please go back and choose a topic.</p>
      </div>
    );

  const totalFormulas = selectedTopic.formulas?.length || 0;
  const totalScenarios = selectedTopic.scenarios?.length || 0;

  return (
    <div className="apti-page">

      {/* Background Glow */}
      <div className="bg-blur blur-1"></div>
      <div className="bg-blur blur-2"></div>

      {/* Hero Section */}
      <section className="hero-section">

        <div className="hero-left">
          <span className="topic-badge">APTITUDE MODULE</span>

          <h1>{selectedTopic.name}</h1>

          <p>{selectedTopic.intro}</p>

          <div className="topic-stats">

            <div className="stat-box">
              <h2>{totalFormulas}</h2>
              <span>Formulas</span>
            </div>

            <div className="stat-box">
              <h2>{totalScenarios}</h2>
              <span>Scenarios</span>
            </div>

            <div className="stat-box">
              <h2>100+</h2>
              <span>Practice MCQs</span>
            </div>

          </div>

          <button
            className="practice-btn"
            onClick={() => {
              navigate(location.pathname + "/practice");
            }}
          >
            Start Practice
          </button>
        </div>

        <div className="hero-right">
          <div className="glass-circle">
            <span>📘</span>
          </div>
        </div>
      </section>

      {/* Formulas */}
      <section className="content-section">
        <div className="section-header">
          <h2>📐 Important Formulas</h2>
          <p>Quick revision formulas for faster solving.</p>
        </div>

        <div className="card-grid">
          {selectedTopic.formulas.map((f, index) => (
            <div className="topic-card formula-card" key={f._id || index}>
              <div className="card-glow"></div>

              <h3>{f.title}</h3>

              <div className="formula-text">
                {f.formula}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scenarios */}
      <section className="content-section">
        <div className="section-header">
          <h2>🧠 Real Problem Scenarios</h2>
          <p>Understand practical usage and logic building.</p>
        </div>

        <div className="scenario-wrapper">
          {selectedTopic.scenarios.map((s, index) => (
            <div className="scenario-card" key={s._id || index}>

              <div className="scenario-number">
                {index + 1}
              </div>

              <div className="scenario-content">
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AptiTopic;