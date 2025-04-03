import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Alert, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { updateScore } from "./firebase";
import { useSession } from "./sessionContext";
import "./survival.css"; // New CSS file for custom styles

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
    const { user, updateSessionScore } = useSession();

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
            const updateGameScore = async () => {
                try {
                    const a = await updateScore(user.email, 'survival', score);
                    if (a) {
                        updateSessionScore('survival', score);
                    }
                } catch (error) {
                    console.error("Error updating score:", error);
                }
            };
            updateGameScore();
            setGameActive(false);
            setShowGameOverModal(true);
        } else {
            fetchPuzzleData();
        }
    };

    return (
        <Container fluid className="survival-container">
            {/* Start Game Screen */}
            {!gameActive && !showGameOverModal && (
                <div className="start-screen">
                    <h1 className="game-title">
                        🛡️ Survival Mode
                    </h1>
                    <p className="game-description">
                        Solve puzzles before time runs out! You only have 3 lives.
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
                            🛡️ Survival Mode
                        </h1>
                    </div>

                    <Row className="stats-row">
                        <Col md={6} className="mb-3 mb-md-0">
                            <div className="stat-box">
                                <h3 className="lives-display">
                                    Lives: {"❤️".repeat(lives)}
                                </h3>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="stat-box">
                                <h3 className="timer-display">
                                    Time Left: {timeLeft}s
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
                            {[...Array(10)].map((_, index) => {
                                const answer = index;
                                return (
                                    <Col xs="auto" key={answer}>
                                        <Button
                                            onClick={() => checkSolution(answer)}
                                            className={`number-button ${selectedAnswer === answer ? 'selected' : ''}`}
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
                show={showGameOverModal}
                onHide={() => setShowGameOverModal(false)}
                centered
                backdrop="static"
                className="game-over-modal"
            >
                <Modal.Body className="modal-content">
                    <div className="modal-body">
                        <h2 className="modal-title">
                            Game Over!
                        </h2>
                        <h3 className="modal-score">
                            Score: {score}
                        </h3>
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

export default Survival;