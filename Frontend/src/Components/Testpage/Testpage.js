import React from "react";
import { useNavigate } from "react-router-dom";
import "./Testpage.css";
import event1 from "../Assets/job-satisfaction.png";
import event2 from "../Assets/fear.png";
import event3 from "../Assets/progress.png";
import event4 from "../Assets/physical-wellbeing.png";

const Testpage = () => {
  const navigate = useNavigate();

  return (
    <div className="testpage-wrapper">
      <div className="testpage-container">
        <div className="header-section">
          <div className="header-content">
            <h1>Welcome to the Assessment Portal</h1>
            <p>
              Explore the key areas that impact professional and personal growth.
              Select the section that resonates with your needs and dive into our curated resources.
            </p>
          </div>
        </div>
        <div className="assessment-box-container">
          <div className="assessment-box">
            <img className="assessment-img" src={event1} alt="Job Satisfaction" />
            <div className="assessment-content">
              <h4>Job Satisfaction & Support</h4>
              <p>
                Focuses on teachers' satisfaction with resources, support,
                recognition, workload, and career growth opportunities.
              </p>
              <h5><strong>Duration:</strong> 10 mins</h5>
              <button className="assessment-btn" onClick={() => navigate("/Section1")}>Take test</button>
            </div>
          </div>
          <div className="assessment-box">
            <img className="assessment-img" src={event2} alt="Stress Management" />
            <div className="assessment-content">
              <h4>Stress Management & Workload</h4>
              <p>
                Helps manage stress and workload effectively, ensuring mental and
                emotional well-being.
              </p>
              <h5><strong>Duration:</strong> 10 mins</h5>
              <button className="assessment-btn" onClick={() => navigate("/Section2")}>Take test</button>
            </div>
          </div>
          <div className="assessment-box">
            <img className="assessment-img" src={event3} alt="Professional Development" />
            <div className="assessment-content">
              <h4>Professional Development & Collaboration</h4>
              <p>
                Provides opportunities for skill-building, collaboration, and
                professional growth.
              </p>
              <h5><strong>Duration:</strong> 10 mins</h5>
              <button className="assessment-btn" onClick={() => navigate("/Section3")}>Take test</button>
            </div>
          </div>
          <div className="assessment-box">
            <img className="assessment-img" src={event4} alt="Emotional Well-Being" />
            <div className="assessment-content">
              <h4>Workplace Environment & Emotional Well-being</h4>
              <p>
                Focuses on creating a positive workplace environment and fostering
                emotional health.
              </p>
              <h5><strong>Duration:</strong> 10 mins</h5>
              <button className="assessment-btn" onClick={() => navigate("/Section4")}>Take test</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testpage;
