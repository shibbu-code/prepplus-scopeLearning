import React, { useState } from "react";
import "./PracticePage.css";
import { useNavigate } from "react-router-dom";

const PracticePage = () => {

  const navigate = useNavigate();

  const selectedTopic = JSON.parse(
    sessionStorage.getItem("selectedTopic")
  );

  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState({});

  // Progress
  const totalQuestions =
    selectedTopic?.mcqs?.length || 0;

  const attemptedQuestions =
    Object.keys(answers).length;

  const progress =
    (attemptedQuestions / totalQuestions) * 100;

  // Submit
  const handleSubmit = async () => {

    try {

      const response = await fetch(
        "http://localhost:3000/submitModule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userId: JSON.parse(
              sessionStorage.getItem("user")
            ).id,
            topicId: selectedTopic._id,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      alert("Module submitted successfully!");

    } catch (error) {
      console.error(
        "Error submitting module:",
        error
      );
    }
  };

  // Select option
  const handleSelect = (mcqId, option) => {

    setAnswers((prev) => ({
      ...prev,
      [mcqId]: option,
    }));

    setChecked((prev) => ({
      ...prev,
      [mcqId]: false,
    }));
  };

  // Check answer
  const handleCheck = (mcqId) => {

    setChecked((prev) => ({
      ...prev,
      [mcqId]: true,
    }));
  };

  // Option Styling
  const getOptionClass = (mcq, opt) => {

    const isChecked = checked[mcq._id];
    const selected = answers[mcq._id];

    if (!isChecked) {
      return selected === opt
        ? "option selected"
        : "option";
    }

    if (opt === selected) {

      return opt === mcq.answer
        ? "option correct"
        : "option wrong";
    }

    return "option";
  };

  return (
    <div className="practice-page">

      {/* Background Glow */}
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>

      {/* Hero */}
      <section className="practice-hero">

        <div className="hero-content">

          <span className="practice-badge">
            PRACTICE MODE
          </span>

          <h1>
            {selectedTopic?.name}
          </h1>

          <p>
            {selectedTopic?.intro}
          </p>

        </div>

        {/* Progress */}
        <div className="progress-card">

          <h3>Progress</h3>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>

          <span>
            {attemptedQuestions} / {totalQuestions}
            Questions Attempted
          </span>

        </div>
      </section>

      {/* MCQs */}
      <div className="mcq-wrapper">

        {selectedTopic?.mcqs?.map((mcq, index) => (

          <div
            key={mcq._id}
            className="mcq-card"
          >

            <div className="question-top">

              <span className="question-number">
                Q{index + 1}
              </span>

              <span className="question-tag">
                MCQ
              </span>

            </div>

            <h2 className="question">
              {mcq.question}
            </h2>

            {/* Options */}
            <div className="options">

              {mcq.options.map((opt, i) => (

                <label
                  key={i}
                  className={getOptionClass(mcq, opt)}
                >

                  <input
                    type="radio"
                    name={mcq._id}
                    checked={
                      answers[mcq._id] === opt
                    }
                    onChange={() =>
                      handleSelect(mcq._id, opt)
                    }
                  />

                  <span className="custom-radio"></span>

                  <span className="option-text">
                    {opt}
                  </span>

                </label>
              ))}
            </div>

            {/* Action */}
            <button
              className="check-btn"
              onClick={() =>
                handleCheck(mcq._id)
              }
              disabled={!answers[mcq._id]}
            >
              Check Answer
            </button>

          </div>
        ))}
      </div>

      {/* Submit */}
      <div className="submit-section">

        <button
          className="submit-btn"
          onClick={handleSubmit}
        >
          Submit Module
        </button>

      </div>

    </div>
  );
};

export default PracticePage;