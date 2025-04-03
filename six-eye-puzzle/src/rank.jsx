import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './rank.css'; // New CSS file for custom styles

function Rank() {
  return (
    <div className="rank-container">
      {/* Left Side: Buttons */}
      <div className="button-column left-column">
        <a
          href="/timeattack"
          className="game-btn timeattack-btn"
        >
          Time Attack
        </a>
        <a
          href="/survival"
          className="game-btn survival-btn"
        >
          Survival
        </a>
      </div>

      {/* Right Side: Buttons */}
      <div className="button-column right-column">
        <a
          href="/memory"
          className="game-btn memory-btn"
        >
          Memory
        </a>
        <a
          href="/scramble"
          className="game-btn scramble-btn"
        >
          Scramble
        </a>
      </div>
    </div>
  );
}

export default Rank;