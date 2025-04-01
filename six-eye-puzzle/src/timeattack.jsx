import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Alert, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TimeAttack = () => {
  const [puzzleBg, setPuzzleBg] = useState("#1a1a1a");
  const [puzzleSolution, setPuzzleSolution] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false); // Start with false for initial state
  const [message, setMessage] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  const fetchPuzzleData = () => {
    fetch("https://marcconrad.com/uob/banana/api.php")
      .then(response => response.json())
      .then(data => {
        setPuzzleBg(data.question);
        setPuzzleSolution(data.solution);
      })
      .catch(error => console.error("Error fetching puzzle data:", error));
  };
/*--------------here should be the place where u take the score to check database-------------*/
  const startNewGame = () => {
    setTimeLeft(60);
    setScore(0);
    setGameActive(true);
    setMessage("");
    setSelectedAnswer(null);
    fetchPuzzleData();
    setShowGameOverModal(false);
  };

  useEffect(() => {
    if (gameActive) {
      const timer = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameActive]);

  useEffect(() => {
    if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      setShowGameOverModal(true);
    }
  }, [timeLeft, gameActive]);

  const checkSolution = (answer) => {
    if (!gameActive) return;
    setSelectedAnswer(answer);
    if (answer === puzzleSolution) {
      setMessage("✔️ Correct!");
      setScore(prev => prev + 1);
      setTimeLeft(prev => prev + 5);
      fetchPuzzleData();
    } else {
      setMessage("❌ Incorrect! -5 seconds");
      setTimeLeft(prev => (prev > 5 ? prev - 5 : 0));
    }
  };

  return (
    <Container fluid className="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white p-0">
      {/* Start Game Screen */}
      {!gameActive && !showGameOverModal && (
        <div className="text-center" style={{ maxWidth: "600px" }}>
          <h1 className="display-3 text-warning mb-4" style={{ textShadow: "0 0 15px #ffc107" }}>
          ⏳ Time Attack Mode
          </h1>
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
            START GAME
          </Button>
        </div>
      )}

      {/* Game Active Screen */}
      {gameActive && (
        <>
          {/* Header with glowing text */}
          <div className="text-center mb-4">
            <h1 className="display-4 text-warning mb-0" style={{ textShadow: "0 0 10px #ffc107" }}>
              ⏳ Time Attack Mode
            </h1>
          </div>

          {/* Score & Timer - Glowing Cards */}
          <Row className="mb-4 w-75 justify-content-center">
            <Col md={6} className="mb-3 mb-md-0">
              <div className="p-3 rounded bg-transparent border-0 text-center">
                <h3 className="text-info mb-0" style={{ textShadow: "0 0 8px #0dcaf0" }}>
                  Time Left: {timeLeft}s
                </h3>
              </div>
            </Col>
            <Col md={6}>
              <div className="p-3 rounded bg-transparent border-0 text-center">
                <h3 className="text-success mb-0" style={{ textShadow: "0 0 8px #198754" }}>
                  Score: {score}
                </h3>
              </div>
            </Col>
          </Row>

          {/* Puzzle Image with Glow */}
          {puzzleBg && (
            <div className="mb-4" style={{ 
              maxWidth: "500px",
              boxShadow: "0 0 20px #ffc107",
              borderRadius: "10px",
              overflow: "hidden"
            }}>
              <img
                src={puzzleBg}
                alt="Puzzle"
                className="img-fluid p-3"
                style={{ 
                  filter: "invert(1)",
                  width: "100%",
                  display: "block"
                }}
              />
            </div>
          )}

          {/* Number Buttons 0-9 with Glow */}
          <div className="mb-4 w-75">
            <Row className="g-2 justify-content-center">
              {[...Array(10)].map((_, index) => {
                const answer = index;
                return (
                  <Col xs="auto" key={answer}>
                    <Button
                      onClick={() => checkSolution(answer)}
                      variant={selectedAnswer === answer ? "warning" : "danger"}
                      size="lg"
                      className="fw-bold px-4 py-2"
                      style={{
                        boxShadow: `
                          ${selectedAnswer === answer ? 
                            "0 0 15px #ffc107" : 
                            "0 0 10px #dc3545"}
                        `,
                        transition: "all 0.3s ease",
                        border: "none"
                      }}
                    >
                      {answer}
                    </Button>
                  </Col>
                );
              })}
            </Row>
          </div>

          {/* Message Alert with Glow */}
          {message && (
            <Alert 
              variant={message.includes("✔️") ? "success" : "danger"} 
              className="mt-3 w-75 text-center fw-bold border-0"
              style={{
                boxShadow: `
                  ${message.includes("✔️") ? 
                    "0 0 15px #198754" : 
                    "0 0 15px #dc3545"}
                `,
                background: "rgba(25, 135, 84, 0.2)",
                backdropFilter: "blur(5px)"
              }}
            >
              {message}
            </Alert>
          )}
        </>
      )}

      {/* Game Over Modal */}
      <Modal 
        show={showGameOverModal} 
        onHide={() => setShowGameOverModal(false)}
        centered
        backdrop="static"
        className="text-white"
      >
        <Modal.Body className="bg-dark border border-warning rounded">
          <div className="text-center p-4">
            <h2 className="text-warning mb-4" style={{ textShadow: "0 0 10px #ffc107" }}>
              Game Over!
            </h2>
            <h3 className="text-info mb-4">
              Your final score: <span style={{ color: "#20c997" }}>{score}</span>
            </h3>
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

export default TimeAttack;