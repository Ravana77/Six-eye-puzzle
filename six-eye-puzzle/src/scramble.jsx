import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Alert, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSession } from "./sessionContext";
import { updateScore } from "./firebase";
import "./scramble.css";

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
  const { user, updateSessionScore } = useSession();

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
                updateSessionScore('scramble', score);
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
    <Container fluid className="scramble-container">
      {/* Start Game Screen */}
      {!gameActive && !showScoreModal && (
        <div className="start-screen">
          <h1 className="game-title">
            🔀 Scramble Mode
          </h1>
          <p className="game-description">
            Click the numbers in correct order before time runs out!
          </p>
          <Button 
            onClick={startNewGame}
            className="start-button"
          >
            START CHALLENGE
          </Button>
        </div>
      )}

      {/* Game Active Screen */}
      {gameActive && (
        <div className="game-content-container">
          <div className="game-content">
            <div className="game-header">
              <h1 className="game-title">
                🔀 Scramble Mode
              </h1>
            </div>

            <Row className="stats-row">
              <Col md={6} className="mb-3 mb-md-0">
                <div className="stat-box">
                  <h3 className="timer-display">
                    Time Left: {timer}s
                  </h3>
                </div>
              </Col>
              <Col md={6}>
                <div className="stat-box">
                  <h3 className="streak-display">
                    Streak: {streak}x
                  </h3>
                </div>
              </Col>
            </Row>

            {puzzleBg && (
              <div className="puzzle-container">
                <img
                  src={puzzleBg}
                  alt="Puzzle"
                  className="puzzle-image"
                />
              </div>
            )}

            <div className="number-buttons-container">
              <Row className="number-buttons-row">
                {shuffledNumbers.map((num) => (
                  <Col xs="auto" key={num}>
                    <Button
                      onClick={() => handleNumberClick(num)}
                      className="number-button"
                    >
                      {num}
                    </Button>
                  </Col>
                ))}
              </Row>
            </div>

            {message && (
              <Alert className={`message-alert ${message.includes("✔️") ? 'success' : 'error'}`}>
                {message}
              </Alert>
            )}
          </div>
        </div>
      )}

      <Modal 
        show={showScoreModal} 
        onHide={() => setShowScoreModal(false)}
        centered
        backdrop="static"
        className="score-modal"
      >
        <Modal.Body className="modal-content">
          <div className="modal-body">
            <h2 className="modal-title">
              Game Over!
            </h2>
            <h1 className="modal-score">
              {score}
            </h1>
            <h4 className="modal-subtitle">
              Your total score
            </h4>
            <div className="modal-buttons">
              <Button 
                onClick={startNewGame}
                className="play-again-button"
              >
                Play Again
              </Button>
              <Button 
                href="/rank"
                className="ranking-button"
              >
                QUIT
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Scramble;