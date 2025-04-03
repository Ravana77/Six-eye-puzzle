import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./hard.css"; // New CSS file for custom styles

const Hard = () => {
  const [puzzleBg, setPuzzleBg] = useState("#1a1a1a");
  const [puzzleSolution, setPuzzleSolution] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    fetchPuzzleData();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(interval);
    } else if (timer === 0 && userAnswer === null) {
      setMessage("⏳ Time's Up! You didn't answer in time.");
      setUserAnswer("⏳");
    }
  }, [timer, userAnswer]);

  const fetchPuzzleData = () => {
    fetch("https://marcconrad.com/uob/banana/api.php")
      .then(response => response.json())
      .then(data => {
        setPuzzleBg(data.question);
        setPuzzleSolution(data.solution);
        setTimer(10);
        setUserAnswer(null);
        setMessage("");
      })
      .catch(error => console.error("Error fetching puzzle data:", error));
  };

  const checkSolution = () => {
    if (userAnswer === "⏳") return;

    if (parseInt(userAnswer) === puzzleSolution) {
      setMessage("🔥 LEGENDARY! You got it right!");
    } else {
      setMessage(`💀 Oof! Wrong answer! The correct one was ${puzzleSolution}.`);
    }
  };

  const handleButtonClick = (num) => {
    setUserAnswer(num);
  };

  const handleRefresh = () => {
    fetchPuzzleData();
  };

  return (
    <div className="hard-game-container">
      <div className="game-content">
        {puzzleBg && (
          <img
            src={puzzleBg}
            alt="Puzzle"
            className="puzzle-image"
          />
        )}

        <div className={`timer-display ${timer <= 3 ? "critical" : ""}`}>
          ⏳ {timer} sec
        </div>

        <div className="number-buttons">
          {[...Array(11)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(index)}
              disabled={userAnswer !== null}
              className={`number-btn ${userAnswer === index ? "selected" : ""}`}
            >
              {index}
            </button>
          ))}
        </div>

        <div className="action-buttons">
          <button
            onClick={checkSolution}
            disabled={userAnswer === null}
            className="game-btn submit-btn"
          >
            🔥 Check Solution 🔥
          </button>

          <button
            onClick={handleRefresh}
            className="game-btn refresh-btn"
          >
            🔄 Refresh Question 🔄
          </button>
        </div>

        {message && (
          <div className={`message-alert ${message.includes("LEGENDARY") ? "success" : "error"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hard;