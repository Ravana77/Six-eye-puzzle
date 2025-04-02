import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Alert, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSession } from "./sessionContext"; // Importing the session context
import { updateScore } from "./firebase"; // Importing the updateScore function

const Scramble = () => {
  const [puzzleBg, setPuzzleBg] = useState(null);
  const [puzzleSolution, setPuzzleSolution] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(10);
  const [shuffledNumbers, setShuffledNumbers] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const { user, updateSessionScore } = useSession(); // Accessing the user from session context

  const fetchPuzzleData = () => {
    fetch("https://marcconrad.com/uob/banana/api.php")
      .then(response => response.json())
      .then(data => {
        setPuzzleBg(data.question);
        setPuzzleSolution(data.solution);
        setShuffledNumbers(shuffleNumbers());
        setTimer(10);
        setUserAnswer("");
      })
      .catch(error => console.error("Error fetching puzzle data:", error));
  };

  const startNewGame = () => {
    setScore(0);
    setStreak(0);
    setGameActive(true);
    setMessage("");
    fetchPuzzleData();
    setShowScoreModal(false);
  };

  useEffect(() => {
    if (gameActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (gameActive && timer === 0) {
      handleWrongAnswer();
    }
  }, [timer, gameActive]);

  const shuffleNumbers = () => {
    return [...Array(10).keys()].sort(() => Math.random() - 0.5);
  };

  const handleNumberClick = (num) => {
    if (!gameActive || timer === 0) return;
    
    const newAnswer = userAnswer + num;
    setUserAnswer(newAnswer);
    
    if (newAnswer.length === puzzleSolution?.toString().length) {
      if (parseInt(newAnswer) === puzzleSolution) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        setScore(prev => prev + newStreak);
        setMessage("✔️ Correct!");
        setTimeout(() => {
          setMessage("");
          fetchPuzzleData();
        }, 1000);
      } else {
        handleWrongAnswer();
      }
    }
  };

  const handleWrongAnswer = () => {
    const updateGameScore = async () => {
        try {
            const a = await updateScore(user.email, 'scramble', score);
            if (a) {
                updateSessionScore('scramble', score); // Update session score
            }
        } catch (error) {
            console.error("Error updating score:", error);
        }
    };
    updateGameScore();
    setGameActive(false);
    setShowScoreModal(true);
  };

  return (
    <Container fluid className="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white p-0">
      {/* Start Game Screen */}
      {!gameActive && !showScoreModal && (
        <div className="text-center" style={{ maxWidth: "600px" }}>
          <h1 className="display-3 text-warning mb-4" style={{ textShadow: "0 0 15px #ffc107" }}>
            🔀 Scramble Mode
          </h1>
          <p className="text-light mb-4 fs-5" style={{ textShadow: "0 0 5px #ffffff" }}>
            Click the numbers in correct order before time runs out!
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
              🔀 Scramble Mode
            </h1>
          </div>

          {/* Stats */}
          <Row className="mb-4 w-75 justify-content-center">
            <Col md={6} className="mb-3 mb-md-0">
              <div className="p-3 rounded bg-transparent border-0 text-center">
                <h3 className="text-info mb-0" style={{ textShadow: "0 0 8px #0dcaf0" }}>
                  Time Left: {timer}s
                </h3>
              </div>
            </Col>
            <Col md={6}>
              <div className="p-3 rounded bg-transparent border-0 text-center">
                <h3 className="text-success mb-0" style={{ textShadow: "0 0 8px #198754" }}>
                  Streak: {streak}x
                </h3>
              </div>
            </Col>
          </Row>

          {/* Puzzle Image */}
          {puzzleBg && (
            <div className="mb-4" style={{ 
              maxWidth: "500px",
              boxShadow: "0 0 30px #ffc107",
              borderRadius: "15px",
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

          {/* Number Buttons - Horizontal Layout with Enhanced Glow */}
          <div className="mb-4 w-75">
            <Row className="g-2 justify-content-center">
              {shuffledNumbers.map((num) => (
                <Col xs="auto" key={num}>
                  <Button
                    onClick={() => handleNumberClick(num)}
                    variant="primary"
                    size="lg"
                    className="fw-bold px-4 py-2"
                    style={{
                      boxShadow: "0 0 15px #0d6efd",
                      transition: "all 0.3s ease",
                      border: "none",
                      width: "60px",
                      height: "60px",
                      fontSize: "1.5rem",
                      background: "radial-gradient(circle, #4d8eff, #0d6efd)",
                      position: "relative",
                      overflow: "hidden"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.boxShadow = "0 0 25px #4d8eff";
                      e.target.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.boxShadow = "0 0 15px #0d6efd";
                      e.target.style.transform = "scale(1)";
                    }}
                  >
                    {num}
                    <span style={{
                      position: "absolute",
                      top: "-10px",
                      left: "-10px",
                      right: "-10px",
                      bottom: "-10px",
                      background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                      opacity: "0",
                      transition: "opacity 0.3s"
                    }} className="button-glow"></span>
                  </Button>
                </Col>
              ))}
            </Row>
          </div>

          {/* Message Alert */}
          {message && (
            <Alert 
              variant={message.includes("✔️") ? "success" : "danger"} 
              className="mt-3 w-75 text-center fw-bold border-0"
              style={{
                boxShadow: message.includes("✔️") ? 
                  "0 0 25px #198754" : 
                  "0 0 25px #dc3545",
                background: "rgba(25, 135, 84, 0.2)",
                backdropFilter: "blur(5px)",
                fontSize: "1.2rem"
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
              Game Over!
            </h2>
            <h1 className="display-1 text-info mb-4" style={{ 
              textShadow: "0 0 20px #0dcaf0",
              fontWeight: "bold"
            }}>
              {score}
            </h1>
            <h4 className="text-light mb-4">
              Your total score
            </h4>
            <Button 
              variant="success" 
              size="lg" 
              onClick={startNewGame}
              className="px-5 py-2 fw-bold"
              style={{
                boxShadow: "0 0 20px #20c997",
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

export default Scramble;