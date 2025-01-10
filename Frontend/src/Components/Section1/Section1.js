import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Section1.css";


// Mapping of answers to their respective scores (updated to 4, 3, 2, 1)
const optionScores = {
  "Very Satisfied": 4,
  "Satisfied": 3,
  "Neutral": 2,
  "Dissatisfied": 1,
  "Very Supported": 4,
  "Somewhat Supported": 3,
  "Neutral": 2,
  "Not Supported at all": 1,
  "Highly Valued": 4,
  "Valued": 3,
  "Neutral": 2,
  "Not Valued": 1,
  "Very Balanced": 4,
  "Somewhat Balanced": 3,
  "Not Very Balanced": 2,
  "Not Balanced at all": 1,
  "A Great Deal": 4,
  "Some": 3,
  "Minimal": 2,
  "None": 1,
  "Always": 4,
  "Often": 3,
  "Occasionally": 2,
  "Rarely/Never": 1,
  "Very Clear": 4,
  "Somewhat Clear": 3,
  "Vague": 2,
  "Unclear": 1,
  "Very Fair": 4,
  "Fair": 3,
  "Neutral": 2,
  "Unfair": 1,
  "Very Often": 4,
  "Often": 3,
  "Neutral": 2,
  "Rarely": 1,
};

// Initial questions
const initialQuestions = [
  {
    question: "How satisfied are you with the resources provided for teaching?",
    options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"],
  },
  {
    question: "How supported do you feel by your administration?",
    options: ["Very Supported", "Somewhat Supported", "Neutral", "Not Supported at all"],
  },
  {
    question: "How valued do you feel in your workplace?",
    options: ["Highly Valued", "Valued", "Neutral", "Not Valued"],
  },
  {
    question: "How balanced do you feel your work and personal life are?",
    options: ["Very Balanced", "Somewhat Balanced", "Not Very Balanced", "Not Balanced at all"],
  },
  {
    question: "How much autonomy do you feel you have in your teaching methods?",
    options: ["A Great Deal", "Some", "Minimal", "None"],
  },
  {
    question: "How clear are the goals and expectations set by your institution?",
    options: ["Very Clear", "Somewhat Clear", "Vague", "Unclear"],
  },
  {
    question: "How fair do you feel about the performance evaluation process?",
    options: ["Very Fair", "Fair", "Neutral", "Unfair"],
  },
  {
    question: "How satisfied are you with your teaching workload?",
    options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"],
  },
  {
    question: "How satisfied are you with opportunities for career growth?",
    options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"],
  },
  {
    question: "How often do you feel recognized for your contribution?",
    options: ["Very Often", "Often", "Occasionally", "Rarely/Never"],
  },
];

// Shuffle questions
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const Section1 = () => {
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

  // Section1 Component
  const handleNext = () => {
    const totalScore = responses.reduce((score, response) => {
      return score + (response ? optionScores[response] : 0);
    }, 0);

    console.log("Section 1 Total Score:", totalScore); // Debugging

    // Determine the description based on the total score
    let description = "";

    if (totalScore >= 10 && totalScore <= 20) {
      description = "Your responses indicate that you may have a low level of job satisfaction, with several areas needing improvement.";
    } else if (totalScore > 20 && totalScore <= 30) {
      description = "Your responses suggest a moderate level of job satisfaction, with room for improvement in certain areas.";
    } else if (totalScore > 30 && totalScore <= 40) {
      description = "Your responses indicate a high level of job satisfaction, with most areas meeting or exceeding expectations.";
    }

    // Save the score and description to local storage
    localStorage.setItem("section1Score", totalScore);
    localStorage.setItem("section1Description", description);

    // Navigate to Section 2
    navigate("/Section2");
  };

  const allAnswered = responses.every((response) => response !== null);

  return (
    <div className="screen">
    <div className="assessment-containers">
      <h1>JOB SATISFACTION</h1>
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

export default Section1;