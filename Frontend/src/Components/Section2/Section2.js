import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Section2.css";

// Map each option to a numeric value

const initialQuestions = [
  // Previous questions...
  {
    question: "How often do you experience stress at work?",
    options: ["Rarely", "Occasionally", "Frequently", "Always"],
  },
  {
    question: "How well does your institution handle conflicts among staff?",
    options: ["Very Well", "Well", "Poorly", "Very Poorly"],
  },
  {
    question: "How supported do you feel when managing challenging student behavior or issues?",
    options: ["Very Supported", "Supported", "Neutral", "Not Supported"],
  },
  {
    question: "How frequently do you engage in self-reflection or mindfulness practices to manage work stress?",
    options: ["Regularly", "Sometimes", "Rarely", "Never"],
  },
  {
    question: "How well does your institution support work-life balance initiatives?",
    options: ["Very Well", "Well", "Neutral", "Poorly"],
  },
  {
    question: "How often do you feel mentally exhausted by your work?",
    options: ["Rarely", "Occasionally", "Frequently", "Always"],
  },
  {
    question: "How resilient do you feel when facing challenges at work?",
    options: ["Very Resilient", "Resilient", "Somewhat Resilient", "Not Resilient"],
  },
  {
    question: "How often do you experience feelings of burnout?",
    options: ["Rarely", "Occasionally", "Frequently", "Very Often"],
  },
  {
    question: "How well do you manage work-related anxiety?",
    options: ["Very Well", "Well", "Somewhat Well", "Poorly"],
  },
  {
    question: "How supported do you feel in balancing your emotional and mental health needs?",
    options: ["Very Supported", "Supported", "Neutral", "Not Supported"],
  },
];
const optionScores = {
  // Frequency-based Options
  "Rarely": 4,
  "Occasionally": 3,
  "Frequently": 2,
  "Always": 1,
  
  // Institutional Handling Options
  "Very Well": 4,
  "Well": 3,
  "Poorly": 2,
  "Very Poorly": 1,

  // Support Options
  "Very Supported": 4,
  "Supported": 3,
  "Neutral": 2,
  "Not Supported": 1,

  "Regularly":4, 
  "Sometimes":3, 
  "Rarely":2,
  "Never":1,
  "Very Well":4,
  "Well":3,
  "Neutral":2, 
  "Poorly":1,
  "Rarely": 4,
  "Occasionally": 3,
  "Frequently": 2,
  "Always": 1,
  
     

  // Resilience Levels
  "Very Resilient": 4,
  "Resilient": 3,
  "Somewhat Resilient": 2,
  "Not Resilient": 1,
  "Rarely":4,
  "Occasionally":3,
  "Frequently":2,
  "Very Often":1,
  "Very Well":4, 
  "Well":3,
  "Somewhat Well": 2, 
  "Poorly":1,

  // Anxiety Management
  "Very Supported":4, 
  "Supported":3,
   "Neutral":2, 
   "Not Supported":1
  
};


const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const Section2 = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState(Array(initialQuestions.length).fill(null));
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    setShuffledQuestions(shuffleArray([...initialQuestions]));
  }, []);

  const handleOptionChange = (e, questionIndex) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = e.target.value;
    setResponses(newResponses);
  };
  const handleNext = () => {
    const totalScore = responses.reduce((score, response) => {
      return score + (response ? optionScores[response] : 0);
    }, 0);
  
    console.log("Section 2 Total Score:", totalScore); // Debugging
    let description = "";
  
    // Determine description based on score
    if (totalScore >= 10 && totalScore <= 20) {
      description = "Your responses indicate that you may be experiencing significant stress or dissatisfaction in your role as a teacher, with areas of improvement needed in your support, work-life balance, and mental resilience.";
    } else if (totalScore > 20 && totalScore <= 30) {
      description = "Your responses suggest that you experience moderate levels of stress, but there are areas where improvements in support, work-life balance, and self-care can enhance your well-being as a teacher.";
    } else if (totalScore > 30 && totalScore <= 40) {
      description = "Your responses indicate that you are managing well in your teaching role, with high levels of support, work-life balance, and resilience, although some minor improvements could be beneficial for sustained well-being.";
    }
  
  // Store Section 2 score and description in localStorage
  localStorage.setItem("section2Score", totalScore);
  localStorage.setItem("section2Description", description);
  
   

   // Navigate to Section 3
   navigate("/Section3");
 };
  
  

  const allAnswered = responses.every((response) => response !== null);

  return (
    <div className="screen1">
    <div className="assessments-container">
      <h1>Stress Management & Workload</h1>
      <form>
        {shuffledQuestions.map((item, index) => (
          <div key={index} className="question-container">
            <p className="question">
              {index + 1}. {item.question}
            </p>
            <div className="options">
              {item.options.map((option, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={responses[index] === option}
                    onChange={(e) => handleOptionChange(e, index)}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="nav">
          <button type="button" className="nav" onClick={handleNext} disabled={!allAnswered}>
            Next
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Section2;
