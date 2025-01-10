import React, { useState, useEffect } from "react";
import "./Section4.css";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto"; // Import Chart.js for generating the chart

const initialQuestions = [
  {
    question: "How comfortable are you expressing your opinions at work?",
    options: ["Very Comfortable", "Comfortable", "Neutral", "Uncomfortable"],
  },
  {
    question: "How safe do you feel in expressing your concerns or dissatisfaction without fear of repercussions?",
    options: ["Very Safe", "Safe", "Somewhat Safe", "Not Safe"],
  },
  {
    question: "How connected do you feel to your colleagues and peers?",
    options: ["Very Connected", "Connected", "Neutral", "Disconnected"],
  },
  {
    question: "How fulfilled do you feel with your teaching's impact on students?",
    options: ["Very Fulfilled", "Fulfilled", "Somewhat Fulfilled", "Not Fulfilled"],
  },
  {
    question: "How much do you feel your work aligns with your personal values?",
    options: ["Completely Aligned", "Aligned", "Somewhat Aligned", "Not Aligned"],
  },
  {
    question: "How often do you feel confident in your abilities and skills as an educator?",
    options: ["Always", "Often", "Sometimes", "Rarely"],
  },
  {
    question: "How valued do you feel for your unique teaching style and ideas?",
    options: ["Very Valued", "Valued", "Neutral", "Not Valued"],
  },
  {
    question: "How frequently do you participate in team-building activities or staff social events?",
    options: ["Frequently", "Occasionally", "Rarely", "Never"],
  },
  {
    question: "How satisfied are you with the balance between administrative tasks and actual teaching?",
    options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"],
  },
  {
    question: "How supported do you feel in balancing your emotional and mental health needs?",
    options: ["Very Supported", "Supported", "Neutral", "Not Supported"],
  },
];

const optionScores = {
  "Very Comfortable": 4,
  "Comfortable": 3,
  "Neutral": 2,
  "Uncomfortable": 1,
  "Very Safe": 4,
  "Safe": 3,
  "Somewhat Safe": 2,
  "Not Safe": 1,
  "Very Connected": 4,
  "Connected": 3,
  "Neutral": 2,
  "Disconnected": 1,
  "Very Fulfilled": 4,
  "Fulfilled": 3,
  "Somewhat Fulfilled": 2,
  "Not Fulfilled": 1,
  "Completely Aligned": 4,
  "Aligned": 3,
  "Somewhat Aligned": 2,
  "Not Aligned": 1,
  "Always": 4,
  "Often": 3,
  "Sometimes": 2,
  "Rarely": 1,
  "Very Valued": 4,
  "Valued": 3,
  "Neutral": 2,
  "Not Valued": 1,
  "Frequently": 4,
  "Occasionally": 3,
  "Rarely": 2,
  "Never": 1,
  "Very Satisfied": 4,
  "Satisfied": 3,
  "Neutral": 2,
  "Dissatisfied": 1,
  "Very Supported": 4,
  "Supported": 3,
  "Neutral": 2,
  "Not Supported": 1,
};

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const Section4 = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState(Array(initialQuestions.length).fill(null));
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  
  // State to store section scores and descriptions
  const [sectionScores, setSectionScores] = useState([]);
  const [sectionDescriptions, setSectionDescriptions] = useState([]);

  useEffect(() => {
    setShuffledQuestions(shuffleArray([...initialQuestions]));
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const handleOptionChange = (e, questionIndex) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = e.target.value;
    setResponses(newResponses);
  };
  const section1Score = parseInt(localStorage.getItem("section1Score")) || 0;
  const section2Score = parseInt(localStorage.getItem("section2Score")) || 0;
  const section3Score = parseInt(localStorage.getItem("section3Score")) || 0;
  const section4Score = parseInt(localStorage.getItem("section4Score")) || 0;

  const section1Description = localStorage.getItem("section1Description");
  const section2Description = localStorage.getItem("section2Description");
  const section3Description = localStorage.getItem("section3Description");
  const section4Description = localStorage.getItem("section4Description");

  const generateBarGraph = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 600;  // Set specific width
    canvas.height = 400; // Set specific height
    const ctx = canvas.getContext("2d");
  
    const data = {
      labels:  ["Job Satisfaction & Support", "Stress Management & Workload", "Professional Development & Collaboration", "Workplace Environment & Emotional Well-being"],
      datasets: [
        {
          label: "Assessment Scores",
          data: [
            parseInt(localStorage.getItem("section1Score")) || 0,
            parseInt(localStorage.getItem("section2Score")) || 0,
            parseInt(localStorage.getItem("section3Score")) || 0,
            parseInt(localStorage.getItem("section4Score")) || 0,
          ],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        },
      ],
    };
  
    // Create and render the chart
    new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        responsive: false, // Disable responsiveness
        animation: false, // Disable animations
        scales: {
          y: {
            beginAtZero: true,
            max: 40
          }
        }
      }
    });
  
    return canvas.toDataURL("image/png");
  };
  
  const sendReportEmail = async (currentDescription, totalScore) => {
    try {
      // Generate chart image before sending
      const chartImage = generateBarGraph();
      
      // Ensure email and username are available
      if (!userEmail || !username) {
        console.error("No email or username found in localStorage");
        return;
      }
  
      const response = await fetch("http://localhost:5006/api/send-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail,
          userName: username,
          sectionScores: {
            section1Score,
            section2Score,
            section3Score,
            section4Score
          },
          sectionDescriptions: {
            section1Description,
            section2Description,
            section3Description,
            section4Description
          },
          chartImage,
        }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send report");
  
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending report email:", error);
    }
  };
  const handleNext = async (e) => {
    e.preventDefault();
  
    try {
      const totalScore = responses.reduce((score, response) => {
        return score + (response ? optionScores[response] : 0);
      }, 0);
  
      let descriptionText = "";
      if (totalScore >= 10 && totalScore <= 20) {
        descriptionText = "Significant stress or dissatisfaction detected.";
      } else if (totalScore > 20 && totalScore <= 30) {
        descriptionText = "Moderate stress levels, improvement needed.";
      } else if (totalScore > 30 && totalScore <= 40) {
        descriptionText = "Well-managed role with minor improvements needed.";
      }
  
      setDescription(descriptionText);
      localStorage.setItem("section4Score", totalScore.toString());
      localStorage.setItem("section4Description", descriptionText);
  
      // Update sectionScores and sectionDescriptions here
      setSectionScores((prevScores) => {
        const updatedScores = [...prevScores, totalScore];
        return updatedScores;
      });
  
      setSectionDescriptions((prevDescriptions) => {
        const updatedDescriptions = [...prevDescriptions, descriptionText];
        return updatedDescriptions;
      });
  
      // Ensure that we pass the updated values of sectionScores and sectionDescriptions to sendReportEmail
      if (userEmail && username && descriptionText) {
        await sendReportEmail(descriptionText, totalScore);
      }
  
      navigate("/Bargraph", { state: { totalScore } });
    } catch (error) {
      console.error("Error in handleNext:", error);
    }
  };
  
  return (
    <div className="screen4">
    <div className="assessment1-container">
      <h1>Workplace Environment & Emotional Well-being</h1>
      <form onSubmit={handleNext}>
        {shuffledQuestions.map((item, index) => (
          <div key={index} className="question-container">
            <p className="question">{index + 1}. {item.question}</p>
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
          <button
            type="submit"
            className="nav"
            disabled={!responses.every((r) => r !== null)}
          >
            Submit
          </button>
        </div>
      </form>
      {/* <div className="description">
        {description && <p>{description}</p>}
      </div> */}
    </div>
    </div>
  );
};

export default Section4;
