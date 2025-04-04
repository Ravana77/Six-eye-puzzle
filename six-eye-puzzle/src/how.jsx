import React from "react";
import "./how.css"; // New CSS file for custom styles

function HowToPlay() {
  return (
    <div className="how-to-play-container">
      <div className="how-to-play-content">
        <h1 className="game-title">
          6 Eye Puzzle
        </h1>
        
        <div className="game-mode-section">
          <h2 className="section-title">Game Modes</h2>
          
          <div className="mode-card classic">
            <h3 className="mode-title">Classic Mode</h3>
            <ul className="mode-instructions">
              <li>classic mode has 2 modes </li>
              <li>think and answer no restriction</li>
              <li>there is a time limit of 10 s to answer</li>
              <li>Perfect for relaxed, thoughtful gameplay</li>
            </ul>
          </div>
          
          <div className="mode-card time-attack">
            <h3 className="mode-title">Time Attack</h3>
            <ul className="mode-instructions">
              <li>Race against a 60-second timer</li>
              <li>Each correct answer adds 5 seconds</li>
              <li>each wrong answer reduces 5 seconds</li>
              <li>Test your speed and accuracy</li>
            </ul>
          </div>
          
          <div className="mode-card survival">
            <h3 className="mode-title">Survival</h3>
            <ul className="mode-instructions">
              <li>Start with 3 lives</li>
              <li>10 seconds per puzzle</li>
              <li>Lose a life for each wrong answer</li>
              <li>See how long you can survive!</li>
            </ul>
          </div>
          
          <div className="mode-card memory">
            <h3 className="mode-title">Memory</h3>
            <ul className="mode-instructions">
              <li>Puzzle disappears after 5 seconds</li>
              <li>Remember the solution from memory</li>
              <li>Build a streak for greater score</li>
              <li>Highest streak wins</li>
            </ul>
          </div>
          
          <div className="mode-card scramble">
            <h3 className="mode-title">Scramble</h3>
            <ul className="mode-instructions">
              <li>Numbers appear in random order</li>
              <li>Reconstruct the correct solution</li>
              <li>10-second time limit per puzzle</li>
              <li>Increase the streak to Increase your highest score</li>
            </ul>
          </div>
        </div>
        
        <div className="general-instructions">
          <h2 className="section-title">How to Play</h2>
          <ul>
            <li>Select your preferred game mode</li>
            <li>Solve the math puzzle that appears</li>
            <li>Submit your answer before time runs out</li>
            <li>Watch your score improve with each correct answer</li>
            <li>Compete for the highest score on the leaderboard!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HowToPlay;