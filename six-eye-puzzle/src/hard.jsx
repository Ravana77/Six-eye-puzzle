import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Hard = () => {
  const [puzzleBg, setPuzzleBg] = useState("#1a1a1a");
  const [puzzleSolution, setPuzzleSolution] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(10); // ⏳ Timer starts at 10 seconds

  useEffect(() => {
    fetchPuzzleData();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(interval);
    } else if (timer === 0 && userAnswer === null) {
      setMessage("⏳ Time's Up! You didn't answer in time.");
      setUserAnswer("⏳"); // Auto-locks answer
    }
  }, [timer, userAnswer]);

/*connecting the api*/
  const fetchPuzzleData = () => {
    fetch("https://marcconrad.com/uob/banana/api.php")
      .then(response => response.json())
      .then(data => {
        setPuzzleBg(data.question);
        setPuzzleSolution(data.solution);//getting the solution from the api part is here
        setTimer(10); // Reset Timer clock thingy
        setUserAnswer(null);
        setMessage("");
      })
      .catch(error => console.error("Error fetching puzzle data:", error));
  };

  const checkSolution = () => {
    if (userAnswer === "⏳") return; // If time is up ban submission (optional)change later

    if (parseInt(userAnswer) === puzzleSolution) {
      setMessage("🔥 LEGENDARY! You got it right!");
    } else {
      setMessage(`💀 Oof! Wrong answer! The correct one was ${puzzleSolution}.`);
    }
  };

  const handleButtonClick = (num) => {
    setUserAnswer(num);
  };

  // Glowing refresh button click handler
  const handleRefresh = () => {
    fetchPuzzleData();
  };

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#1a1a1a", color: "white" }}
    >
      <div className="container text-center">
        {puzzleBg && (
          <img
            src={puzzleBg}
            alt="Puzzle Background"
            className="img-fluid mb-3"
            style={{
              width: "80%",
              maxWidth: "400px",
              borderRadius: "15px",
              filter: "invert(1)",
              boxShadow: "0 0 20px red",
              transition: "filter 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.target.style.filter = "invert(0)";
              e.target.style.boxShadow = "0 0 40px orange";
            }}
            onMouseLeave={(e) => {
              e.target.style.filter = "invert(1)";
              e.target.style.boxShadow = "0 0 20px red";
            }}
          />
        )}

        {/* Timer Display */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: timer <= 3 ? "red" : "yellow",
            textShadow: "0 0 10px red",
          }}
        >
          ⏳ {timer} sec
        </div>

        {/* Number Buttons */}
        <div className="d-flex justify-content-center mb-3">
          {[...Array(11)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(index)}
              disabled={userAnswer !== null} // Lock buttons after selecting
              className="number-btn"
              style={{
                backgroundColor: userAnswer === index ? "#ff4500" : "#ffcc00",
                color: "black",
                border: "none",
                margin: "5px",
                padding: "10px 15px",
                fontSize: "18px",
                fontWeight: "bold",
                borderRadius: "10px",
                boxShadow: "0 0 15px rgba(255, 204, 0, 0.9)",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.2)";
                e.target.style.boxShadow = "0 0 25px rgba(255, 69, 0, 1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 0 15px rgba(255, 204, 0, 0.9)";
              }}
            >
              {index}
            </button>
          ))}
        </div>

        {/* Glowy Submit Button */}
        <button
          onClick={checkSolution}
          disabled={userAnswer === null}
          className="btn btn-danger mb-3"
          style={{
            background: "linear-gradient(45deg, #ff4500, #ffcc00)",
            color: "black",
            fontWeight: "bold",
            fontSize: "20px",
            padding: "12px 25px",
            borderRadius: "15px",
            border: "none",
            boxShadow: "0 0 20px rgba(255, 69, 0, 1)",
            transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.2)";
            e.target.style.boxShadow = "0 0 35px rgba(255, 140, 0, 1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 0 20px rgba(255, 69, 0, 1)";
          }}
        >
          🔥 Check Solution 🔥
        </button>

        {/* Glowing Refresh Button */}
        <button
          onClick={handleRefresh}
          className="btn btn-warning mb-3"
          style={{
            background: "linear-gradient(45deg, #ffcc00, #ff4500)",
            color: "black",
            fontWeight: "bold",
            fontSize: "20px",
            padding: "12px 25px",
            borderRadius: "15px",
            border: "none",
            boxShadow: "0 0 20px rgba(255, 204, 0, 1)",
            transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.2)";
            e.target.style.boxShadow = "0 0 35px rgba(255, 204, 0, 1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 0 20px rgba(255, 204, 0, 1)";
          }}
        >
          🔄 Refresh Question 🔄
        </button>

        {/* Gaming-Style Message */}
        {message && (
          <div
            className="alert mt-3"
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: message.includes("LEGENDARY") ? "#ffcc00" : "#ff4500",
              color: "black",
              textShadow: "0 0 10px black",
              boxShadow: "0 0 15px rgba(255, 204, 0, 1)",
              animation: message.includes("Oof") ? "shake 0.5s" : "flash 1s",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hard;
