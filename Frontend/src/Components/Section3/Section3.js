import React, { useState, useEffect } from "react";
import "./Section3.css";
import { useNavigate } from "react-router-dom";

const initialQuestions = [
  {
    question: "How encouraged do you feel to develop professionally?",
    options: ["Strongly Encouraged", "Encouraged", "Neutral", "Not Encouraged"],
  },
  {
    question: "How satisfied are you with opportunities for career growth?",
    options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"],
  },
  {
    question: "How often do you receive constructive feedback?",
    options: ["Frequently", "Occasionally", "Rarely", "Never"],
  },
  {
    question: "How open is your institution to feedback and suggestions from staff?",
    options: ["Very Open", "Open", "Neutral", "Closed"],
  },
  {
    question: "How frequently do you participate in team-building activities or staff social events?",
    options: ["Frequently", "Occasionally", "Rarely", "Never"],
  },
  {
    question: "How much trust do you have in the leadership of your institution?",
    options: ["Complete Trust", "Significant Trust", "Minimal Trust", "No Trust"],
  },
  {
    question: "How would you rate the level of collaboration among your colleagues?",
    options: ["Excellent", "Good", "Average", "Poor"],
  },
  {
    question: "How motivated do you feel to improve or innovate in your teaching practices?",
    options: ["Highly Motivated", "Motivated", "Neutral", "Not Motivated"],
  },
  {
    question: "How often do you receive meaningful opportunities to discuss your career goals with your supervisor?",
    options: ["Regularly", "Occasionally", "Rarely", "Never"],
  },
  {
    question: "How satisfied are you with the balance between administrative tasks and actual teaching?",
    options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"],
  },
];

const optionScores = {
  "Strongly Encouraged": 4,
  "Encouraged": 3,
  "Neutral": 2,
  "Not Encouraged": 1,
  "Very Satisfied": 4,
  "Satisfied": 3,
  "Neutral": 2,
  "Dissatisfied": 1,
  "Frequently": 4,
  "Occasionally": 3,
  "Rarely": 2,
  "Never": 1,
  "Very Open": 4,
  "Open": 3,
  "Neutral": 2,
  "Closed": 1,
  "Complete Trust": 4,
  "Significant Trust": 3,
  "Minimal Trust": 2,
  "No Trust": 1,
  "Excellent": 4,
  "Good": 3,
  "Average": 2,
  "Poor": 1,
  "Highly Motivated": 4,
  "Motivated": 3,
  "Neutral": 2,
  "Not Motivated": 1,
  "Regularly": 4,
  "Occasionally": 3,
  "Rarely": 2,
  "Never": 1,
};

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const Section3 = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState(Array(initialQuestions.length).fill(null));
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [description, setDescription] = useState("");

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

    console.log("Section 3 Total Score:", totalScore); // Debugging

    let descriptionText = "";
    if (totalScore >= 10 && totalScore <= 20) {
      descriptionText = "Your responses indicate that you may feel unsupported or disconnected from professional growth opportunities. There may be a need to focus on improving trust, career development, and collaboration within your institution.";
    } else if (totalScore > 20 && totalScore <= 30) {
      descriptionText = "Your responses suggest that while you are motivated and have opportunities for growth, there are areas where support and collaboration could be enhanced to help you develop professionally.";
    } else if (totalScore > 30 && totalScore <= 40) {
      descriptionText = "Your responses indicate that you are experiencing strong professional development, with good support, trust, and motivation. You may continue to thrive with occasional feedback and opportunities to innovate.";
    }

    setDescription(descriptionText);

    // Save Section 3 score and description
    localStorage.setItem("section3Score", totalScore);
    localStorage.setItem("section3Description", descriptionText);

    // Navigate to Bar Graph with all scores
    navigate("/Section4");
  };

  const allAnswered = responses.every((response) => response !== null);

  return (
    <div className="screen3">
    <div className="assessments-containers">
      <h1>Professional Development & Collaboration</h1>
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

export default Section3;
