import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Easy = () => {
  const [puzzleBg, setPuzzleBg] = React.useState("#1a1a1a");
  const [puzzleSolution, setPuzzleSolution] = React.useState(null);
  const [userAnswer, setUserAnswer] = React.useState("");
  const [message, setMessage] = React.useState("");

  
/*connecting the api*/ 
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
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "#1a1a1a",
        color: "white",
      }}
    >
      <div className="container text-center">
        {puzzleBg && (
          <img
            src={puzzleBg}
            alt="Puzzle Background"
            className="img-fluid mb-3"
            style={{
              border: "5px solid #ffcc00",
              borderRadius: "10px",
              boxShadow: "0px 0px 15px #ff6600",
              filter: "invert(1)",
            }}
          />
        )}
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="form-control mb-3"
          placeholder="Enter your answer"
          style={{
            backgroundColor: "#222",
            color: "#ffcc00",
            border: "2px solid #ff6600",
            textAlign: "center",
            fontSize: "20px",
            boxShadow: "0px 0px 10px #ff3300",
          }}
        />
        <button
          onClick={checkSolution}
          className="btn mb-3"
          style={{
            background: "linear-gradient(45deg, #ff6600, #ff0000)",
            color: "white",
            fontSize: "20px",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0px 0px 15px #ff3300",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
            e.target.style.boxShadow = "0px 0px 25px #ff0000";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0px 0px 15px #ff3300";
          }}
        >
          Check Solution
        </button>

        {/* Glowing Refresh Button */}
        <button
          onClick={refreshPuzzle}
          className="btn mb-3"
          style={{
            background: "linear-gradient(45deg, #00ff00, #00cc00)",
            color: "white",
            fontSize: "20px",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0px 0px 15px #00ff00",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
            e.target.style.boxShadow = "0px 0px 25px #00ff00";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0px 0px 15px #00ff00";
          }}
        >
          Next
        </button>

        {message && (
          <div
            className="alert mt-3"
            style={{
              backgroundColor: message.includes("✔️") ? "#00ff00" : "#ff0000",
              color: "black",
              fontSize: "18px",
              padding: "10px",
              fontWeight: "bold",
              borderRadius: "5px",
              boxShadow: "0px 0px 10px white",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Easy;
