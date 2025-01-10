import React from 'react'; 
import './Testimonial.css';
import johnImage from '../Assets/john.jpeg'; // Replace with your local image paths
import janeImage from '../Assets/Teacher2.jpeg';
import michaelImage from '../Assets/Teacher3.jpeg';
import emilyImage from '../Assets/Teacher1.jpeg';

const Testimonials = () => {
  const reviews = [
    {
      name: "John Doe",
      position: "High School Teacher",
      review: "This assessment tool is fantastic! It helped me understand my teaching style and improve my communication with students. Highly recommended!",
      profileImage: johnImage
    },
    {
      name: "Rosy",
      position: "Primary School Educator",
      review: "The questions were very insightful and easy to follow. It gave me a clear idea of areas I can work on to reduce stress at work.",
      profileImage: janeImage
    },
    {
      name: "Violet",
      position: "College Professor",
      review: "A well-structured tool for self-assessment. It covered everything from job satisfaction to collaboration. Very helpful for educators like me!",
      profileImage: michaelImage
    },
    {
      name: "Emily",
      position: "Kindergarten Teacher",
      review: "I loved how intuitive and user-friendly this tool is. It’s great for tracking progress and setting personal goals as a teacher.",
      profileImage: emilyImage
    },
  ];

  return (
    <div className="testimonials-container">
      <h2 className="testimonial-title">What Our Educators Say</h2>
      <div className="testimonial-grid">
        {reviews.map((review, index) => (
          <div key={index} className="testimonial-card">
            <img 
              src={review.profileImage} 
              alt={review.name} 
              className="reviewer-image" 
            />
            <h3 className="reviewer-name">{review.name}</h3>
            <p className="reviewer-position">{review.position}</p>
            <p className="reviewer-review">"{review.review}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;