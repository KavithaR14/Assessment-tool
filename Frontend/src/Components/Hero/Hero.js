import React from 'react';
import './Hero.css'; // Assuming a separate CSS file for styling
import heroImage from '../Assets/hero.png'; // Adjust the path if your folder structure is different
import {Link} from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Empowering Educators for a Better Tomorrow</h1>
        <p className="hero-description">
          Discover your strengths and enhance your teaching journey with our comprehensive self-assessment tools. Analyze stress, job satisfaction, communication, and collaboration skills effortlessly.
        </p>
        <Link to="/SignupPage">
        <button className="hero-button">Start Your Assessment</button>
        </Link>
      </div>
      <div className="hero-image">
        <img 
          src={heroImage} 
          alt="Teaching Professionals Assessment" 
        />
      </div>
    </div>
  );
};

export default HeroSection;