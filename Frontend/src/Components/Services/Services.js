import React, { useState } from "react";
import Img1 from "../Assets/image03.png";
import Img2 from "../Assets/image02.png";
import Img3 from "../Assets/image010.png";
import "./Services.css";

const ServicesData = [
  {
    id: 1,
    img: Img1,
    name: "Team collaboration",
    description:
      "Effective team collaboration fosters creativity and innovation by combining diverse skills and perspectives.",
  },
  {
    id: 2,
    img: Img2,
    name: "Reduce work stress",
    description:
      "Reducing work stress can be achieved by prioritizing tasks, taking regular breaks, and maintaining a healthy work-life balance.",
  },
  {
    id: 3,
    img: Img3,
    name: "Work life balance",
    description:
      "Work-life balance is the ability to effectively manage professional responsibilities while maintaining a fulfilling personal life.",
  },
];

const Services = () => {
  const [clickedId, setClickedId] = useState(null);

  const handleCardClick = (id) => {
    setClickedId(id);
    // Reset the clickedId after animation is done (0.5s animation duration)
    setTimeout(() => setClickedId(null), 500);
  };

  return (
    <div className="services-container">
      <div className="services-header">
        <h1>KEY BENEFITS</h1>
      </div>
      <div className="services-grid">
        {ServicesData.map((service) => (
          <div
            key={service.id}
            className={`service-card ${clickedId === service.id ? "clicked" : ""}`}
            onClick={() => handleCardClick(service.id)}
          >
            <div className="service-image">
              <img
                src={service.img}
                alt={service.name}
                className={clickedId === service.id ? "clicked" : ""}
              />
            </div>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;