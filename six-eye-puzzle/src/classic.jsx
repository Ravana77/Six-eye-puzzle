import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './classic.css'; // New CSS file for custom styles

function Classic() {
  return (
    <div className="classic-container">
      {/* Left Side: Buttons */}
      <div className="button-column">
        <a
          href="/easy"
          className="game-btn easy-btn"
        >
          Easy
        </a>
        <a
          href="/hard"
          className="game-btn hard-btn"
        >
          Hard
        </a>
      </div>

      {/* Right Side: Descriptions */}
      <div className="info-column">
        <div className="info-box easy-info">
          <h3>Easy Mode</h3>
          <p>
            Type your answer, feel the glow, and get instant feedback! It's math with a fun, high-energy twist!
          </p>
        </div>
        <div className="info-box hard-info">
          <h3>Hard Mode</h3>
          <p>
            Race against the clock! Pick the right number in 10 seconds and watch the game glow with energy!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Classic;