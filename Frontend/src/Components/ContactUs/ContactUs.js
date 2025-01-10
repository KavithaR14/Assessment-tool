import React, { useState } from 'react';
import './ContactUs.css';
import contactimage from '../Assets/contactimage.png'; // Adjust the path based on your folder structure
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Form Submitted:', formData);
    // You can send the formData to a server or API endpoint here
    alert('Thank you for getting in touch! We will get back to you shortly.');
    // Optionally, clear the form
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="form-section">
          <h2>Get in Touch</h2>
          <p>Our experienced team is dedicated to providing exceptional customer service.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="input-field"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="input-field"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="input-field message-field"
              required
            ></textarea>
            <button type="submit" className="send-button">Send Message</button>
          </form>
        </div>
        <div className="info-section">
          <img className="small-image" src={contactimage} alt="Info Icon" />
          <ul className="info-list">
            <li>
              <i className="fas fa-map-marker-alt"></i> Kathmandu, Nepal
            </li>
            <li>
              <i className="fas fa-envelope"></i> info@example.com
            </li>
            <li>
              <i className="fas fa-phone"></i> +977 123456789
            </li>
          </ul>
          <div className="additional-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;


