import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { fetchLeaderboard } from "./firebase";
import "./leaderboard.css"; // New CSS file for custom styles

const Leaderboard = () => {
    const [gameType, setGameType] = useState("Time Attack");
    const [scores, setScores] = useState([]);

    const handleScore = async () => {
        let fetchedScores = [];
        fetchedScores = await fetchLeaderboard(gameType);
        setScores(fetchedScores);
    };

    useEffect(() => {
        handleScore();
    }, []);

    useEffect(() => {
        handleScore();
    }, [gameType]);

    return (
        <Container fluid className="leaderboard-container">
            <div className="leaderboard-content">
                <h1 className="leaderboard-title">Leaderboard</h1>
                <div className="game-type-selector">
                    <label htmlFor="gameType" className="game-type-label">
                        Game Type:
                    </label>
                    <select
                        id="gameType"
                        value={gameType}
                        onChange={(e) => setGameType(e.target.value)}
                        className="game-type-dropdown"
                    >
                        <option value="Time Attack">Time Attack</option>
                        <option value="Scramble">Scramble</option>
                        <option value="Survival">Survival</option>
                        <option value="Memory">Memory</option>
                    </select>
                </div>
                <div className="scores-container">
                    <h2 className="top-scores-title">Top Scores</h2>
                    <ul className="scores-list">
                        {scores.length > 0 ? (
                            scores.slice(0, 10).map((score, index) => (
                                <li key={index} className="score-item">
                                    {index + 1}. {score.email} - {score.score}
                                </li>
                            ))
                        ) : (
                            <li className="no-scores">No scores available</li>
                        )}
                    </ul>
                </div>
            </div>
        </Container>
    );
};

export default Leaderboard;