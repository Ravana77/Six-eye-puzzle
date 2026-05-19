import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Alert, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSession } from "./sessionContext";
import { updateScore } from "./firebase";
import "./timeattack.css";
import { Link } from "react-router-dom";

const TimeAttack = () => {
    const [puzzleBg, setPuzzleBg] = useState("#1a1a1a");
    const [puzzleSolution, setPuzzleSolution] = useState(null);
    const [timeLeft, setTimeLeft] = useState(60);
    const [score, setScore] = useState(0);
    const [gameActive, setGameActive] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showGameOverModal, setShowGameOverModal] = useState(false);
    const { user, updateSessionScore } = useSession();

    // Fetches puzzle data (question and solution) from an external API
    const fetchPuzzleData = () => {
        fetch("https://marcconrad.com/uob/banana/api.php")
            .then(response => response.json())
            .then(data => {
                setPuzzleBg(data.question);
                setPuzzleSolution(data.solution);
            })
            .catch(error => console.error("Error fetching puzzle data:", error));
    };

    // Starts a new game by resetting the state and fetching a new puzzle
    const startNewGame = () => {
        setTimeLeft(60);
        setScore(0);
        setGameActive(true);
        setMessage("");
        setSelectedAnswer(null);
        fetchPuzzleData();
        setShowGameOverModal(false);
    };

    // Handles the countdown timer when the game is active
    useEffect(() => {
        if (gameActive) {
            const timer = setInterval(() => {
                setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameActive]);

    // Handles the end of the game when the timer reaches 0
    useEffect(() => {
        if (timeLeft === 0 && gameActive) {
            const updateGameScore = async () => {
                try {
                    const a = await updateScore(user.email, 'timeattack', score);
                    if (a) {
                        updateSessionScore('timeattack', score);
                    }
                } catch (error) {
                    console.error("Error updating score:", error);
                }
            };
            updateGameScore();
            setGameActive(false);
            setShowGameOverModal(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft, gameActive]);

    // Checks if the selected answer is correct or incorrect
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
        <Container fluid className="timeattack-container">
            {/* Start Game Screen */}
            {!gameActive && !showGameOverModal && (
                <div className="start-screen">
                    <h1 className="game-title">
                        ⏳ Time Attack Mode
                    </h1>
                    <Button
                        onClick={startNewGame}
                        className="start-button"
                    >
                        START GAME
                    </Button>
                </div>
            )}

            {/* Game Active Screen */}
            {gameActive && (
                <div className="game-content-container">
                    <div className="game-content">
                        <div className="game-header">
                            <h1 className="game-title">
                                ⏳ Time Attack Mode
                            </h1>
                        </div>

                        <Row className="stats-row">
                            <Col md={6} className="mb-3 mb-md-0">
                                <div className="stat-box">
                                    <h3 className="time-left">
                                        Time Left: {timeLeft}s
                                    </h3>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="stat-box">
                                    <h3 className="score">
                                        Score: {score}
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

                        <div className="buttons-container">
                            <Row className="buttons-row">
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
                    </div>
                </div>
            )}

            {/* Game finish pop up screen */}
            <Modal
                show={showGameOverModal}
                onHide={() => setShowGameOverModal(false)}
                centered
                backdrop="static"
                className="game-over-modal"
            >
                <Modal.Body className="modal-content">
                    <div className="modal-body-content">
                        <h2 className="modal-title">
                            Game Over!
                        </h2>
                        <h3 className="modal-score">
                            Your final score: <span>{score}</span>
                        </h3>
                        <div className="modal-buttons">
                            <Button
                                onClick={startNewGame}
                                className="play-again-button"
                            >
                                Play Again
                            </Button>
                            <Button
                                as={Link}
                                to="/rank"
                                className="ranking-button"
                            >
                                Quit
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default TimeAttack;