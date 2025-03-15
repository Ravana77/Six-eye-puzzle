import React from "react";

const About = () => {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-dark text-light p-4">
      <div className="container text-center">
        <div className="card bg-secondary p-4 shadow-lg">
          <h1 className="text-info fw-bold text-uppercase" style={{ textShadow: "0 0 10px rgba(173, 216, 230, 0.8)" }}>
            About Us
          </h1>
          <p className="mt-3">
            Welcome to <strong>SIX EYE PUZZLE</strong>, a platform designed to challenge and enhance your problem-solving skills through an interactive six-equation game.
          </p>
          <p>
            Our project was developed as part of <strong>University of Bedfordshire</strong>'s initiative to push the boundaries of educational gaming. Using <strong>React</strong> and <strong>Firebase</strong>, we have built an intuitive and engaging experience for users who love logical challenges.
          </p>
          <p>
            The game is powered by the <strong>Banana </strong> <strong>API</strong>, ensuring a dynamic and exciting gameplay experience. We strive to bring fun and learning together in an innovative way.
          </p>
          <h2 className="mt-4 fw-semibold">Meet the Developer</h2>
          <p>👩‍💻 <strong>Ranasinghe H.R</strong> –  Developer</p>
        </div>
      </div>
    </div>
  );
};

export default About;
