import React from 'react';
import './About.css';

// Importing images
import skillImage from '../Assets/about.png';
// import collaborationImage from '../Assets/collaboration.png';
// import jobImage from '../Assets/job.png';
// import stressImage from '../Assets/stress.png';

const About = () => {
  return (
    <div className="about-container">
      {/* Images Grid Section (on the left) */}
      <div className="image-grid">
        <img src={skillImage} alt="Skill Development" className="grid-image" />
        {/* <img src={collaborationImage} alt="Collaboration" className="grid-image" /> */}
        {/* <img src={jobImage} alt="Job Satisfaction" className="grid-image" /> */}
        {/* <img src={stressImage} alt="Stress Management" className="grid-image" /> */}
      </div>

      {/* About Text Section (on the right) */}
      <div className="about-text">
        <h2>About Us</h2>
        <p>
          We strive to support teaching professionals by providing assessment 
          tools<br/> tailored to measure and enhance key skills like communication, 
          stress management, <br/>and collaboration. Our mission is to create a 
          positive workplace environment that<br/> prioritizes job satisfaction, 
          professional growth, and well-being. By addressing <br/>real-world challenges, 
          we enable educators to thrive in their careers while <br/>fostering innovation 
          and learning.
        </p>
      </div>
    </div>
  );
};

export default About;