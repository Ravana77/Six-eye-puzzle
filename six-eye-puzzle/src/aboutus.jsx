import React from "react";
import './aboutus.css'; // New CSS file for custom styles

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-card">
          <h1 className="about-title">
            About Us
          </h1>
          <p className="about-text">
            Welcome to <strong>SIX EYE PUZZLE</strong>, a platform designed to challenge and enhance your problem-solving skills through an interactive six-equation game.
          </p>
          <p className="about-text">
            Our project was developed as part of <strong>University of Bedfordshire</strong>'s initiative to push the boundaries of educational gaming. Using <strong>React</strong> and <strong>Firebase</strong>, we have built an intuitive and engaging experience for users who love logical challenges.
          </p>
          <p className="about-text">
            The game is powered by the <strong>Banana </strong> <strong>API</strong>, ensuring a dynamic and exciting gameplay experience. We strive to bring fun and learning together in an innovative way.
          </p>
          <h2 className="about-subtitle">Meet the Developer</h2>
          <p className="about-text">👩‍💻 <strong>Ranasinghe H.R</strong> – Developer</p>
        </div>
      </div>
    </div>
  );
};

export default About;