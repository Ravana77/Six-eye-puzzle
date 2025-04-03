import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css'; // New CSS file for custom styles

function Home() {
  return (
    // Add background image to this div (see CSS file)
    <div className="home-container d-flex vh-100 align-items-center">
      {/* Left Side: Buttons */}
      <div className="d-flex flex-column align-items-center w-50 p-3">
        <a
          href="/classic"
          className="btn game-btn classic-btn w-100 py-5 mb-3"
        >
          Classic
        </a>
        <a
          href="/rank"
          className="btn game-btn rank-btn w-100 py-5"
        >
          Rank
        </a>
      </div>

      {/* Right Side: Descriptions */}
      <div className="d-flex flex-column justify-content-center w-50 p-3 h-100">
        <div className="info-box classic-info p-4 mb-3">
          <h3>Classic Mode</h3>
          <p>
            Type your answer, feel the glow, and get instant feedback! It's math with a fun, high-energy twist!
          </p>
        </div>
        <div className="info-box rank-info p-4">
          <h3>Rank Mode</h3>
          <p>
            Race against the clock! Pick the right number in 10 seconds and watch the game glow with energy!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;