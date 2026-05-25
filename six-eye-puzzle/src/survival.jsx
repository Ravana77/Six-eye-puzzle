import React, { useEffect, useRef, useState } from "react";
import { useSession } from "./sessionContext";
import { updateScore } from "./firebase";
import { useAchievements } from "./contexts/AchievementsContext";
import usePuzzle from "./hooks/usePuzzle";
import useCountdownTimer from "./hooks/useCountdownTimer";
import useSound from "./hooks/useSound";
import StartScreen from "./components/StartScreen";
import PuzzleImage from "./components/PuzzleImage";
import NumberPad from "./components/NumberPad";
import MessageAlert from "./components/MessageAlert";
import StatBox from "./components/StatBox";
import GameOverModal from "./components/GameOverModal";
import "./hard.css";
import "./survival.css";

const MAX_LIVES = 3;
const PER_PUZZLE = 10;

/**
 * Survival mode — 3 lives, 10s per puzzle.
 * Fixes the race condition where both timer-expire and wrong-click could
 * call handleWrongAnswer twice by gating with a `processing` ref.
 */
const Survival = () => {
  const { puzzle, loading, error, fetchPuzzle } = usePuzzle();
  const [phase, setPhase] = useState("intro");
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [heartShake, setHeartShake] = useState(false);
  const [message, setMessage] = useState(null);
  const [showOver, setShowOver] = useState(false);
  const [highScore, setHighScore] = useState(false);
  const processingRef = useRef(false);
  const { play } = useSound();
  const { user, updateSessionScore } = useSession();
  const { recordEvent } = useAchievements();

  // Refs so callbacks see fresh values without stale closures
  const livesRef = useRef(lives);
  const scoreRef = useRef(score);
  useEffect(() => { livesRef.current = lives; }, [lives]);
  useEffect(() => { scoreRef.current = score; }, [score]);

  const { timeLeft, start: startTimer, reset: resetTimer, pause } = useCountdownTimer({
    initialSeconds: PER_PUZZLE,
    onExpire: () => handleLoseLife(/*timedOut*/ true),
  });

  useEffect(() => {
    if (phase === "playing" && timeLeft > 0 && timeLeft <= 3) play("tick");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase]);

  const newRound = async () => {
    processingRef.current = false;
    setSelected(null);
    setMessage(null);
    resetTimer(PER_PUZZLE);
    const p = await fetchPuzzle();
    if (p) startTimer(PER_PUZZLE);
  };

  const start = async () => {
    play("start");
    setLives(MAX_LIVES);
    setScore(0);
    setPhase("playing");
    await newRound();
  };

  const finishRun = async () => {
    setPhase("over");
    play("gameover");
    if (user && scoreRef.current > 0) {
      try {
        const isHigh = await updateScore(user.email, "survival", scoreRef.current);
        setHighScore(!!isHigh);
        if (isHigh) updateSessionScore("survival", scoreRef.current);
      } catch { /* ignore */ }
    }
    recordEvent({ type: "game_complete", mode: "survival", score: scoreRef.current });
    setShowOver(true);
  };

  const handleLoseLife = (timedOut = false) => {
    if (processingRef.current || phase !== "playing") return;
    processingRef.current = true;
    pause();
    play("wrong");
    setHeartShake(true);
    setTimeout(() => setHeartShake(false), 500);
    const newLives = livesRef.current - 1;
    setLives(newLives);
    setMessage({
      text: timedOut ? "⏳ Time's up — life lost!" : `Wrong — answer was ${puzzle?.solution}`,
      type: "error",
    });
    if (newLives <= 0) {
      setTimeout(() => finishRun(), 900);
    } else {
      setTimeout(() => newRound(), 900);
    }
  };

  const handleSelect = (n) => {
    if (phase !== "playing" || !puzzle || selected != null || processingRef.current) return;
    setSelected(n);
    if (n === puzzle.solution) {
      play("correct");
      pause();
      const next = scoreRef.current + 1;
      setScore(next);
      setMessage({ text: "✔ Correct!", type: "success" });
      recordEvent({ type: "streak", mode: "survival", value: next });
      setTimeout(() => newRound(), 700);
    } else {
      handleLoseLife(false);
    }
  };

  if (phase === "intro") {
    return (
      <div className="page page--narrow survival-page">
        <StartScreen
          icon="❤️"
          title="Survival Mode"
          description="Three lives. Ten seconds per puzzle. Run as long as you can."
          rules={[
            "Pick the correct digit from 0–9",
            "Wrong answer or timeout costs a life",
            "Lose all three lives and the run ends",
            "Score is the number of correct answers",
          ]}
          cta="Begin"
          variant="survival"
          accent="var(--mode-survival)"
          meta={user ? `Best: ${user.survival || 0}` : null}
          onStart={start}
        />
      </div>
    );
  }

  return (
    <div className="page page--narrow survival-page">
      <header className="survival-header">
        <div className={`survival-lives${heartShake ? " is-shake" : ""}`} aria-label={`Lives remaining: ${lives}`}>
          {[...Array(MAX_LIVES)].map((_, i) => (
            <span
              key={i}
              className={`survival-heart${i < lives ? " is-on" : " is-off"}`}
              aria-hidden="true"
            >❤</span>
          ))}
        </div>
        <StatBox label="Score" value={score} color="var(--mode-survival)" />
        <StatBox
          label="Time" value={timeLeft} suffix="s"
          color={timeLeft <= 3 ? "var(--status-error)" : "var(--mode-survival)"}
          critical={timeLeft <= 3 && timeLeft > 0}
        />
      </header>

      <PuzzleImage
        src={puzzle?.question}
        loading={loading}
        error={error}
        hint="Find the number that completes the puzzle"
      />

      <NumberPad
        onSelect={handleSelect}
        disabled={phase !== "playing" || processingRef.current}
        selected={selected}
        correct={selected != null ? puzzle?.solution : null}
        accent="var(--mode-survival)"
      />

      <MessageAlert
        message={message?.text}
        type={message?.type}
        duration={1000}
        onDismiss={() => setMessage(null)}
      />

      <GameOverModal
        open={showOver}
        title="Game Over"
        score={score}
        isHighScore={highScore}
        accent="var(--mode-survival)"
        ctaVariant="survival"
        backTo="/game/rank"
        onPlayAgain={() => { setShowOver(false); start(); }}
      />
    </div>
  );
};

export default Survival;
