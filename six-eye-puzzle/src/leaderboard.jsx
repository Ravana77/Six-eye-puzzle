import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { fetchLeaderboard } from "./firebase"; // Importing the fetchScores function

const Leaderboard = () => {
    const [gameType, setGameType] = useState("Time Attack");
    const [scores, setScores] = useState([]);

    const handleScore = async () => {
        // This function will fetch scores from a foobar function (not implemented yet)
        // and update the scores state.
        let fetchedScores = []; // Replace with foobar function call
        fetchedScores = await fetchLeaderboard(gameType);
        setScores(fetchedScores);
    };

    useEffect(() => {
        handleScore(); // Trigger on page load
    }, []);

    useEffect(() => {
        handleScore(); // Trigger on game type change
    }, [gameType]);

    return (
        <Container fluid className="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white p-0">
        <div style={{ padding: "20px" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>Leaderboard</h1>
            <div style={{ marginBottom: "20px" }}>
                <label htmlFor="gameType" style={{ fontSize: "1.2rem", marginRight: "10px" }}>
                    Game Type:
                </label>
                <select
                    id="gameType"
                    value={gameType}
                    onChange={(e) => setGameType(e.target.value)}
                    style={{ fontSize: "1rem", padding: "5px" }}
                >
                    <option value="Time Attack">Time Attack</option>
                    <option value="Scramble">Scramble</option>
                    <option value="Survival">Survival</option>
                    <option value="Memory">Memory</option>
                </select>
            </div>
            <div
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    maxWidth: "400px",
                }}
            >
                <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>Top Scores</h2>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {scores.length > 0 ? (
                        scores.slice(0, 10).map((score, index) => (
                            <li key={index} style={{ marginBottom: "5px" }}>
                                {index + 1}. {score.email} - {score.score}
                            </li>
                        ))
                    ) : (
                        <li>No scores available</li>
                    )}
                </ul>
            </div>
        </div>
        </Container>
    );
};

export default Leaderboard;