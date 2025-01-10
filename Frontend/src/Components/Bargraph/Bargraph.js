import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import html2pdf from "html2pdf.js";
import './Bargraph.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Bargraph = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const section1Score = parseInt(localStorage.getItem("section1Score")) || 0;
  const section2Score = parseInt(localStorage.getItem("section2Score")) || 0;
  const section3Score = parseInt(localStorage.getItem("section3Score")) || 0;
  const section4Score = parseInt(localStorage.getItem("section4Score")) || 0;

  const section1Description = localStorage.getItem("section1Description");
  const section2Description = localStorage.getItem("section2Description");
  const section3Description = localStorage.getItem("section3Description");
  const section4Description = localStorage.getItem("section4Description");

  const data = {
    labels:  ["Job Satisfaction & Support", "Stress Management & Workload", "Professional Development & Collaboration", "Workplace Environment & Emotional Well-being"],
    datasets: [
      {
        label: "Total Score",
        data: [section1Score, section2Score, section3Score, section4Score],
        backgroundColor: [
          "rgba(0, 51, 102, 0.8)",
          "rgba(102, 0, 102, 0.8)",
          "rgba(153, 76, 0, 0.8)",
          "rgba(102, 0, 0, 0.8)",
        ],
        borderColor: [
          "rgba(0, 51, 102, 1)",
          "rgba(102, 0, 102, 1)",
          "rgba(153, 76, 0, 1)",
          "rgba(102, 0, 0, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { min: 0, max: 40, ticks: { color: "#333333" }, grid: { color: "rgba(0, 0, 0, 0.1)" } },
      x: { ticks: { color: "#333333" }, grid: { color: "rgba(0, 0, 0, 0.1)" } },
    },
    plugins: {
      title: { display: true, text: "Scores by Section", color: "#333333", font: { size: 20 } },
      legend: { labels: { color: "#333333" } },
    },
  };

  const generatePDF = () => {
    const element = document.getElementById("report-content");
    const options = {
      margin: [20, 20, 20, 20],
      filename: `${username}_Report.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a2", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="bargraph-container" id="report-content">
      <h2>Performance Report</h2>
      <Bar data={data} options={options} height={400} width={600} />

      <div className="score-container">
        <h3>Section Scores:</h3>
        <div className="score-box">
          <p><strong>Job Satisfaction & Support Score:</strong> {section1Score}</p>
          <p><strong>Stress Management & Workload Score:</strong> {section2Score}</p>
          <p><strong>Professional Development & Collaboration Score:</strong> {section3Score}</p>
          <p><strong>Workplace Environment & Emotional Well-being Score:</strong> {section4Score}</p>
        </div>
      </div>

      <div className="description-container">
        <h3>Section Descriptions</h3>
        <div className="description-box">
          <p><strong>Job Satisfaction & Support:</strong> {section1Description}</p>
          <p><strong>Stress Management & Workload:</strong> {section2Description}</p>
          <p><strong>Professional Development & Collaboration:</strong> {section3Description}</p>
          <p><strong>Workplace Environment & Emotional Well-being:</strong> {section4Description}</p>
        </div>
      </div>

      

      <div>
        <button onClick={generatePDF} className="download-btn">Download Report</button>
      </div>
    </div>
  );
};

export default Bargraph;