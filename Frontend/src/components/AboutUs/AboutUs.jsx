import React from "react";
import "./AboutUs.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong , faCode , faBrain} from '@fortawesome/free-solid-svg-icons'
const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <section className="about">
      <div className="about-container">

        <div className="about-left">
          <span className="about-tag">ABOUT US</span>

          <h1>
            Empowering Students To Crack Placements
            <span> Smarter & Faster</span>
          </h1>

          <p>
            PrepPlus is a modern preparation platform designed for students who
            want to excel in placements, aptitude, coding rounds, interviews,
            and career growth. We combine structured learning, practice, and
            progress tracking into one seamless experience.
          </p>

          <div className="about-stats">
            <div className="stat-card">
              <h2>100+</h2>
              <span>Practice Questions</span>
            </div>

            <div className="stat-card">
              <h2>10+</h2>
              <span>Aptitude Modules</span>
            </div>

            <div className="stat-card">
              <h2>24/7</h2>
              <span>Learning Access</span>
            </div>
          </div>

          <button className='ftr-btn feature-btn abt-exp'
           onClick={() => navigate("/signup")}
          >Explore
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </button>
        </div>

        <div className="about-right">
          <div className="glass-card">
            <div className="circle one"></div>
            <div className="circle two"></div>

            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="students"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;