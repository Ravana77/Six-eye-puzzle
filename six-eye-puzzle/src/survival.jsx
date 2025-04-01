import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Alert, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Survival = () => {
  const [puzzleBg, setPuzzleBg] = useState("#1a1a1a");
  const [puzzleSolution, setPuzzleSolution] = useState(null);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [message, setMessage] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameActive, setGameActive] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  const fetchPuzzleData = () => {
    fetch("https://marcconrad.com/uob/banana/api.php")
      .then(response => response.json())
      .then(data => {
        setPuzzleBg(data.question);
        setPuzzleSolution(data.solution);
        setTimeLeft(10);
        setSelectedAnswer(null);
      })
      .catch(error => console.error("Error fetching puzzle data:", error));
  };

  const startNewGame = () => {
    setLives(3);
    setScore(0);
    setGameActive(true);
    setMessage("");
    fetchPuzzleData();
    setShowGameOverModal(false);
  };

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameActive && timeLeft === 0) {
      handleWrongAnswer();
    }
  }, [timeLeft, gameActive]);

  const checkSolution = (answer) => {
    if (!gameActive) return;
    setSelectedAnswer(answer);
    if (answer === puzzleSolution) {
      setMessage("✔️ Correct!");
      setScore(prev => prev + 1);
      setTimeout(() => {
        setMessage("");
        fetchPuzzleData();
      }, 1000);
    } else {
      handleWrongAnswer();
    }
  };

  const handleWrongAnswer = () => {
    const newLives = lives - 1;
    setLives(newLives);
    setMessage(newLives > 0 ? "❌ Incorrect! Try again." : "");
    
    if (newLives <= 0) {
      setGameActive(false);
      setShowGameOverModal(true);
    } else {
      fetchPuzzleData();
    }
  };

  return (
    <Container fluid className="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white p-0">
      {/* Start Game Screen */}
      {!gameActive && !showGameOverModal && (
        <div className="text-center" style={{ maxWidth: "600px" }}>
          <h1 className="display-3 text-warning mb-4" style={{ textShadow: "0 0 15px #ffc107" }}>
            🛡️ Survival Mode
          </h1>
          <p className="text-light mb-4 fs-5" style={{ textShadow: "0 0 5px #ffffff" }}>
            Solve puzzles before time runs out! You only have 3 lives.
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
              🛡️ Survival Mode
            </h1>
          </div>

          {/* Lives & Timer */}
          <Row className="mb-4 w-75 justify-content-center">
            <Col md={6} className="mb-3 mb-md-0">
              <div className="p-3 rounded bg-transparent border-0 text-center">
                <h3 className="text-danger mb-0" style={{ textShadow: "0 0 8px #dc3545" }}>
                  Lives: {"❤️".repeat(lives)}
                </h3>
              </div>
            </Col>
            <Col md={6}>
              <div className="p-3 rounded bg-transparent border-0 text-center">
                <h3 className="text-info mb-0" style={{ textShadow: "0 0 8px #0dcaf0" }}>
                  Time Left: {timeLeft}s
                </h3>
              </div>
            </Col>
          </Row>

          {/* Puzzle Image */}
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

          {/* Number Buttons 0-9 */}
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
                Score: {score}
                You survived with: <span style={{ color: "#20c997" }}>{lives} lives</span>
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

export default Survival;