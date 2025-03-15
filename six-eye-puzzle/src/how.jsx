import React from "react";

function how() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: "#00aaff", fontFamily: "Arial, sans-serif", fontSize: "2em" }}>
          6 Eye Puzzle
        </h1>
        <p style={{ color: "#3498db", fontFamily: "Verdana, sans-serif", fontSize: "0.8em", lineHeight: "2.5", marginBottom: "20px" }}>
          <strong style={{ color: "#ff7f50" }}>Start the Game:</strong> A random math puzzle will appear as an image on the screen.
        </p>
        <p style={{ color: "#3498db", fontFamily: "Verdana, sans-serif", fontSize: "0.8em", lineHeight: "2.5", marginBottom: "20px" }}>
          <strong style={{ color: "#ff7f50" }}>Choose Your Answer:</strong>
          <br />
          <span style={{ color: "#f39c12" }}>Hard Mode:</span> Select your answer by clicking the appropriate number button.
          <br />
          <span style={{ color: "#f39c12" }}>Easy Mode:</span> Enter your answer in the provided input field.
        </p>
        <p style={{ color: "#3498db", fontFamily: "Verdana, sans-serif", fontSize: "0.8em", lineHeight: "2.5", marginBottom: "20px" }}>
          <strong style={{ color: "#ff7f50" }}>Lock & Submit:</strong>
          <br />
          <span style={{ color: "#f39c12" }}>Hard Mode:</span> The selected number button will change color when locked.
          <br />
          Click the Submit button to confirm your answer.
        </p>
        <p style={{ color: "#3498db", fontFamily: "Verdana, sans-serif", fontSize: "0.8em", lineHeight: "2.5", marginBottom: "20px" }}>
          <strong style={{ color: "#ff7f50" }}>Check the Result:</strong>
          <br />
          If your answer is correct, a new puzzle will load.
          <br />
          If your answer is incorrect, the correct answer will be displayed before moving on to the next puzzle.
        </p>
        <p style={{ color: "#3498db", fontFamily: "Verdana, sans-serif", fontSize: "0.8em", lineHeight: "2.5", marginBottom: "20px" }}>
          <strong style={{ color: "#ff7f50" }}>Time Limit:</strong> You have 10 seconds to answer each puzzle. If time runs out, the game will automatically move to the next puzzle.
        </p>
      </header>
    </div>
  );
}

export default how;
