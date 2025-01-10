import React, { useState, useEffect } from "react";
import Bargraph from "./Bargraph";

const SendReport = () => {
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [sectionScores, setSectionScores] = useState({});
  const [sectionDescriptions, setSectionDescriptions] = useState({});

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    const storedSectionScores = {
      section1Score: parseInt(localStorage.getItem("section1Score")) || 0,
      section2Score: parseInt(localStorage.getItem("section2Score")) || 0,
      section3Score: parseInt(localStorage.getItem("section3Score")) || 0,
      section4Score: parseInt(localStorage.getItem("section4Score")) || 0,
    };
    const storedSectionDescriptions = {
      section1Description: localStorage.getItem("section1Description"),
      section2Description: localStorage.getItem("section2Description"),
      section3Description: localStorage.getItem("section3Description"),
      section4Description: localStorage.getItem("section4Description"),
    };

    setUsername(storedUsername);
    setUserEmail(storedEmail);
    setSectionScores(storedSectionScores);
    setSectionDescriptions(storedSectionDescriptions);
  }, []);

  const sendReportEmail = async () => {
    if (!userEmail || !username) {
      alert("User email or username not found.");
      return;
    }

    const reportData = {
      userEmail,
      userName: username,
      sectionScores,
      sectionDescriptions,
    };

    try {
      const response = await fetch("http://localhost:5005/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Report successfully sent!");
      } else {
        console.error("Failed to send report:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending report:", error);
    }
  };

  return (
    <div className="send-report-container">
      <h2>Send Report</h2>
      <Bargraph 
        sectionScores={sectionScores} 
        sectionDescriptions={sectionDescriptions} 
        username={username} 
      />
      <button onClick={sendReportEmail} className="send-report-btn">Send Report</button>
    </div>
  );
};

export default SendReport;
