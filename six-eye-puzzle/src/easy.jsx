import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./easy.css"; // New CSS file for custom styles

const Easy = () => {
  const [puzzleBg, setPuzzleBg] = React.useState("#1a1a1a");
  const [puzzleSolution, setPuzzleSolution] = React.useState(null);
  const [userAnswer, setUserAnswer] = React.useState("");
  const [message, setMessage] = React.useState("");

  const fetchPuzzleData = () => {
    fetch("https://marcconrad.com/uob/banana/api.php")
      .then(response => response.json())
      .then(data => {
        setPuzzleBg(data.question);
        setPuzzleSolution(data.solution);
      })
      .catch(error => console.error("Error fetching puzzle data:", error));
  };

  React.useEffect(() => {
    const solution = localStorage.getItem("puzzleSolution");
    if (solution) {
      setPuzzleSolution(solution);
    } else {
      fetchPuzzleData();
    }
  }, []);

  const checkSolution = () => {
    if (parseInt(userAnswer) === puzzleSolution) {
      setMessage("✔️ Correct!");
      setPuzzleBg("#1a1a1a");
      setPuzzleSolution(null);
      setUserAnswer("");
      fetchPuzzleData();
    } else {
      setMessage(`❌ Incorrect! Try again.`);
    }
  };

  const refreshPuzzle = () => {
    fetchPuzzleData();
    setUserAnswer("");
    setMessage("");
  };

  return (
    <div className="easy-game-container">
      <div className="game-content">
        {puzzleBg && (
          <img
            src={puzzleBg}
            alt="Puzzle"
            className="puzzle-image"
          />
        )}
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="answer-input"
          placeholder="Enter your answer"
        />
        <div className="button-group">
          <button
            onClick={checkSolution}
            className="game-btn check-btn"
          >
            Check Solution
          </button>
          <button
            onClick={refreshPuzzle}
            className="game-btn refresh-btn"
          >
            Next Puzzle
          </button>
        </div>
        {message && (
          <div className={`message-alert ${message.includes("✔️") ? "correct" : "incorrect"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Easy;