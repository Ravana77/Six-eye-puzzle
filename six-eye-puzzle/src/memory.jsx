import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Alert, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSession } from "./sessionContext";
import { updateScore } from "./firebase";
import "./memory.css"; // New CSS file for custom styles

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
  const { user, updateSessionScore } = useSession();

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
                    updateSessionScore('memory', currentStreak);
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
    <Container fluid className="memory-container">
      {/* Start Game Screen */}
      {!gameActive && !showScoreModal && (
        <div className="start-screen">
          <h1 className="game-title">
            🧠 Memory Challenge
          </h1>
          <p className="game-description">
            Remember the number before it disappears! Score is your streak length.
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
        <>
          <div className="game-header">
            <h1 className="game-title">
              🧠 Memory Mode
            </h1>
          </div>

          <div className="streak-display">
            <h3 className="streak-text">
              Current Streak: {currentStreak}
            </h3>
          </div>

          <div className="puzzle-display">
            {showImage && puzzleBg ? (
              <div className="puzzle-image-container">
                <img
                  src={puzzleBg}
                  alt="Memory Puzzle"
                  className="puzzle-image"
                />
              </div>
            ) : (
              <div className="hidden-puzzle">
                <div className="question-mark">
                  ?
                </div>
                <h3 className="prompt-text">
                  What was the number?
                </h3>
              </div>
            )}
          </div>

          <div className="number-buttons-container">
            <Row className="number-buttons-row">
              {[...Array(10)].map((_, index) => {
                const answer = index;
                return (
                  <Col xs="auto" key={answer}>
                    <Button
                      onClick={() => checkSolution(answer)}
                      disabled={showImage}
                      className={`number-button ${selectedAnswer === answer ? 
                        (answer === puzzleSolution ? 'correct' : 'incorrect') : ''}`}
                    >
                      {answer}
                    </Button>
                  </Col>
                );
              })}
            </Row>
          </div>

          {message && (
            <Alert className={`message-alert ${message.includes("✔️") ? 'success' : 'error'}`}>
              {message}
            </Alert>
          )}
        </>
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
              🎯 Your Score
            </h2>
            <h1 className="modal-score">
              {currentStreak}
            </h1>
            <h4 className="modal-subtitle">
              Correct answers in a row
            </h4>
            <Button 
              onClick={startNewGame}
              className="play-again-button"
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