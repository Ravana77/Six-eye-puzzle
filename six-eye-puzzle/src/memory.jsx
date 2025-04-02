import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Alert, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSession } from "./sessionContext"; // Importing the session context
import { updateScore } from "./firebase"; // Importing the updateScore function

const Memory = () => {
  const [puzzleBg, setPuzzleBg] = useState(null);
  const [puzzleSolution, setPuzzleSolution] = useState(null);
  const [message, setMessage] = useState("");
  const [showImage, setShowImage] = useState(true);
  const [timeLimit, setTimeLimit] = useState(5000);
  const [gameActive, setGameActive] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { user, updateSessionScore } = useSession(); // Accessing the user from session context

  const fetchPuzzleData = () => {
    fetch("https://marcconrad.com/uob/banana/api.php")
      .then(response => response.json())
      .then(data => {
        setPuzzleBg(data.question);
        setPuzzleSolution(data.solution);
        setShowImage(true);
        setSelectedAnswer(null);
        setTimeout(() => setShowImage(false), timeLimit);
      })
      .catch(error => console.error("Error fetching puzzle data:", error));
  };

  const startNewGame = () => {
    setCurrentStreak(0);
    setTimeLimit(5000);
    setGameActive(true);
    setMessage("");
    fetchPuzzleData();
    setShowScoreModal(false);
  };

  const checkSolution = (answer) => {
    if (!gameActive || showImage) return;
    
    setSelectedAnswer(answer);
    if (answer === puzzleSolution) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      setMessage("✔️ Correct! +1 to streak");
      setTimeLimit(prev => Math.max(2000, prev - 500));
      
      setTimeout(() => {
        setMessage("");
        fetchPuzzleData();
      }, 1000);
    } else {
      setMessage("❌ Incorrect! Game Over");
      setTimeout(() => {
        const updateGameScore = async () => {
            try {
                const a = await updateScore(user.email, 'memory', currentStreak);
                if (a) {
                    updateSessionScore('memory', currentStreak); // Update session score
                }
            } catch (error) {
                console.error("Error updating score:", error);
            }
        };
        updateGameScore();
        setGameActive(false);
        setShowScoreModal(true);
      }, 1500);
    }
  };

  return (
    <Container fluid className="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white p-0">
      {/* Start Game Screen */}
      {!gameActive && !showScoreModal && (
        <div className="text-center" style={{ maxWidth: "600px" }}>
          <h1 className="display-3 text-warning mb-4" style={{ textShadow: "0 0 15px #ffc107" }}>
            🧠 Memory Challenge
          </h1>
          <p className="text-light mb-4 fs-5" style={{ textShadow: "0 0 5px #ffffff" }}>
            Remember the number before it disappears! Score is your streak length.
          </p>
          <Button 
            variant="success" 
            size="lg" 
            onClick={startNewGame}
            className="px-5 py-3 fw-bold"
            style={{
              boxShadow: "0 0 20px #20c997",
              fontSize: "1.5rem"
            }}
          >
            START CHALLENGE
          </Button>
        </div>
      )}

      {/* Game Active Screen */}
      {gameActive && (
        <>
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="display-4 text-warning mb-0" style={{ textShadow: "0 0 10px #ffc107" }}>
              🧠 Memory Mode
            </h1>
          </div>

          {/* Current Streak */}
          <div className="p-3 rounded bg-transparent border-0 text-center mb-4">
            <h3 className="text-info mb-0" style={{ textShadow: "0 0 8px #0dcaf0" }}>
              Current Streak: {currentStreak}
            </h3>
          </div>

          {/* Puzzle Display Area */}
          <div className="mb-4" style={{ 
            minHeight: "250px",
            width: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}>
            {showImage && puzzleBg ? (
              <div style={{ 
                boxShadow: "0 0 30px #ffc107",
                borderRadius: "15px",
                overflow: "hidden"
              }}>
                <img
                  src={puzzleBg}
                  alt="Memory Puzzle"
                  className="img-fluid p-3"
                  style={{ 
                    filter: "invert(1)",
                    width: "100%",
                    display: "block"
                  }}
                />
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center">
                <div 
                  className="mb-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, #333 0%, #111 100%)",
                    boxShadow: "0 0 30px #ff0066",
                    fontSize: "3rem",
                    fontWeight: "bold",
                    color: "#ff0066"
                  }}
                >
                  ?
                </div>
                <h3 className="text-warning" style={{ textShadow: "0 0 10px #ffc107" }}>
                  What was the number?
                </h3>
              </div>
            )}
          </div>

          {/* Number Buttons 0-9 */}
          <div className="mb-4 w-75">
            <Row className="g-2 justify-content-center">
              {[...Array(10)].map((_, index) => {
                const answer = index;
                return (
                  <Col xs="auto" key={answer}>
                    <Button
                      onClick={() => checkSolution(answer)}
                      disabled={showImage}
                      variant={selectedAnswer === answer ? 
                        (answer === puzzleSolution ? "success" : "danger") : 
                        "primary"}
                      size="lg"
                      className="fw-bold px-4 py-2"
                      style={{
                        boxShadow: selectedAnswer === answer ? 
                          (answer === puzzleSolution ? 
                            "0 0 15px #198754" : 
                            "0 0 15px #dc3545") : 
                            "0 0 10px #0d6efd",
                        transition: "all 0.3s ease",
                        border: "none",
                        width: "50px"
                      }}
                    >
                      {answer}
                    </Button>
                  </Col>
                );
              })}
            </Row>
          </div>

          {/* Message Alert */}
          {message && (
            <Alert 
              variant={message.includes("✔️") ? "success" : "danger"} 
              className="mt-3 w-75 text-center fw-bold border-0"
              style={{
                boxShadow: message.includes("✔️") ? 
                  "0 0 15px #198754" : 
                  "0 0 15px #dc3545",
                background: "rgba(25, 135, 84, 0.2)",
                backdropFilter: "blur(5px)"
              }}
            >
              {message}
            </Alert>
          )}
        </>
      )}

      {/* Score Modal */}
      <Modal 
        show={showScoreModal} 
        onHide={() => setShowScoreModal(false)}
        centered
        backdrop="static"
        className="text-white"
      >
        <Modal.Body className="bg-dark border border-warning rounded">
          <div className="text-center p-4">
            <h2 className="text-warning mb-4" style={{ textShadow: "0 0 10px #ffc107" }}>
              🎯 Your Score
            </h2>
            <h1 className="display-1 text-info mb-4" style={{ 
              textShadow: "0 0 15px #0dcaf0",
              fontWeight: "bold"
            }}>
              {currentStreak}
            </h1>
            <h4 className="text-light mb-4">
              Correct answers in a row
            </h4>
            <Button 
              variant="success" 
              size="lg" 
              onClick={startNewGame}
              className="px-5 py-2 fw-bold"
              style={{
                boxShadow: "0 0 15px #20c997",
                fontSize: "1.2rem"
              }}
            >
              Play Again
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Memory;