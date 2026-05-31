import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

import {
  faEnvelope,
  faCircleCheck,
  faChartLine,
  faBrain,
  faCode,
  faFire,
  faTrophy,
  faLayerGroup,
  faArrowTrendUp,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

import "./ProfilePage.css";

const ProfilePage = () => {

  const navigate = useNavigate();

  const [profile, setProfile] =
    useState(null);

    //logout 

    const handleLogout = async () => {

  try {

    const response = await fetch(
      "http://localhost:3000/signout",
      {
        method: "POST",
        credentials: "include"
      }
    );

    const data =
      await response.json();

    console.log(data);

    // clear frontend storage
    sessionStorage.clear();

    // redirect
    navigate("/", {
      replace: true
    });

  } catch (error) {

    console.log(
      "Logout Error:",
      error
    );
  }
};
  // Fetch Profile
  const fetchProfile = async () => {

    try {

      const response = await fetch(
        "http://localhost:3000/profile",
        {
          method: "GET",
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials: "include",
        }
      );

      if (response.status === 401) {

        sessionStorage.clear();

        alert(
          "Please login to proceed."
        );

        navigate("/", {
          replace: true,
        });

        return;
      }

      const result =
        await response.json();

      console.log(
        "Profile data:",
        result
      );

      setProfile(result);

    } catch (error) {

      console.error(
        "Error fetching profile:",
        error
      );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {

    return (
      <div className="loading-page">
        <div className="loader"></div>
      </div>
    );
  }

  // Calculations
  const totalModules =
    profile?.solvedModules?.length || 0;

  const totalQuestions =
    profile?.solvedQuestions?.length || 0;

  const easySolved =
    profile?.difficultySolved?.easy || 0;

  const mediumSolved =
    profile?.difficultySolved?.medium || 0;

  const hardSolved =
    profile?.difficultySolved?.hard || 0;

  const totalDifficulty =
    easySolved +
    mediumSolved +
    hardSolved;

  return (

    <section className="profile-page">

      {/* Background Glow */}
      <div className="profile-blur blur1"></div>
      <div className="profile-blur blur2"></div>

      {/* Top Profile */}
      <div className="profile-top-card">

        <div className="profile-left">

          <div className="profile-avatar">

            {
              profile?.name
                ?.charAt(0)
                ?.toUpperCase()
            }

          </div>

          <div className="profile-info">

            <h1>{profile.name}</h1>

            <div className="profile-email">

              <FontAwesomeIcon
                icon={faEnvelope}
              />

              {profile.email}

            </div>

            <div className="verified-badge">

              <FontAwesomeIcon
                icon={faCircleCheck}
              />

              Verified Account

            </div>

          </div>

        </div>

        <div className="profile-right">

          <div className="level-card">

            <span>Progress</span>

            <h2>
              {totalQuestions * 12} XP
            </h2>

            <p>
              Keep solving problems
              daily
            </p>

          </div>
          <button
    className="logout-btn"
    onClick={handleLogout}
  >

    <FontAwesomeIcon
      icon={faRightFromBracket}
    />

    Logout

  </button>

        </div>

      </div>

      {/* Analytics */}
      <div className="analytics-grid">

        {/* Card */}
        <div className="analytics-card">

          <div className="analytics-icon">
            <FontAwesomeIcon
              icon={faLayerGroup}
            />
          </div>

          <h2>{totalModules}</h2>

          <p>Modules Completed</p>

        </div>

        {/* Card */}
        <div className="analytics-card">

          <div className="analytics-icon">
            <FontAwesomeIcon
              icon={faCode}
            />
          </div>

          <h2>{totalQuestions}</h2>

          <p>Questions Solved</p>

        </div>

        {/* Card */}
        <div className="analytics-card">

          <div className="analytics-icon">
            <FontAwesomeIcon
              icon={faBrain}
            />
          </div>

          <h2>{easySolved}</h2>

          <p>Easy Solved</p>

        </div>

        {/* Card */}
        <div className="analytics-card">

          <div className="analytics-icon">
            <FontAwesomeIcon
              icon={faFire}
            />
          </div>

          <h2>{hardSolved}</h2>

          <p>Hard Solved</p>

        </div>

      </div>

      {/* Main Section */}
      <div className="profile-main-grid">

        {/* Left */}
        <div className="profile-section-card">

          <div className="section-header">

            <h2>
              <FontAwesomeIcon
                icon={faChartLine}
              />

              Difficulty Analytics
            </h2>

          </div>

          {/* Progress */}
          <div className="progress-wrapper">

            <div className="progress-item">

              <div className="progress-top">

                <span>Easy</span>

                <span>{easySolved}</span>

              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill easy"
                  style={{
                    width: `${
                      totalDifficulty
                        ? (easySolved /
                            totalDifficulty) *
                          100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>

            </div>

            <div className="progress-item">

              <div className="progress-top">

                <span>Medium</span>

                <span>{mediumSolved}</span>

              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill medium"
                  style={{
                    width: `${
                      totalDifficulty
                        ? (mediumSolved /
                            totalDifficulty) *
                          100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>

            </div>

            <div className="progress-item">

              <div className="progress-top">

                <span>Hard</span>

                <span>{hardSolved}</span>

              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill hard"
                  style={{
                    width: `${
                      totalDifficulty
                        ? (hardSolved /
                            totalDifficulty) *
                          100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>

            </div>

          </div>

        </div>

        {/* Right */}
        <div className="profile-section-card">

          <div className="section-header">

            <h2>
              <FontAwesomeIcon
                icon={faTrophy}
              />

              Achievements
            </h2>

          </div>

          <div className="achievement-list">

            <div className="achievement-item">
              🚀 Started Placement Journey
            </div>

            <div className="achievement-item">
              🔥 Solved {totalQuestions} 
              Questions
            </div>

            <div className="achievement-item">
              🧠 Completed {totalModules}
              Modules
            </div>

            <div className="achievement-item">
              📈 Improving Daily
            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="profile-bottom-card">

        <div className="bottom-left">

          <h2>
            <FontAwesomeIcon
              icon={faArrowTrendUp}
            />

            Performance Insights
          </h2>

          <p>
            Your preparation journey is
            progressing steadily. Focus on
            medium and hard level
            questions to improve interview
            confidence and problem-solving
            speed.
          </p>

        </div>

        <div className="bottom-right">

          <div className="xp-circle">

            <span>
              {totalQuestions * 12}
            </span>

            XP

          </div>

        </div>

      </div>

    </section>
  );
};

export default ProfilePage;