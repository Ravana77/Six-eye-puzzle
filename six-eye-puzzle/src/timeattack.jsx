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
import "./timeattack.css";

const START_SECONDS = 60;
const BONUS = 5;
const PENALTY = 5;

/**
 * Time Attack — 60-second run. +5s correct, -5s wrong.
 * Replaces the original implementation that had two competing
 * useEffect blocks managing the same timer (audit critical bug).
 * Now uses a single useCountdownTimer.
 */
const TimeAttack = () => {
  const { puzzle, loading, error, fetchPuzzle } = usePuzzle();
  const [phase, setPhase] = useState("intro");
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(null);
  const [showOver, setShowOver] = useState(false);
  const [highScore, setHighScore] = useState(false);
  const [floaters, setFloaters] = useState([]); // animated +5s / -5s indicators
  const floaterIdRef = useRef(0);
  const scoreRef = useRef(0);
  const { play } = useSound();
  const { user, updateSessionScore } = useSession();
  const { recordEvent } = useAchievements();

  const finishRun = async () => {
    setPhase("over");
    play("gameover");
    if (user && scoreRef.current > 0) {
      try {
        const isHigh = await updateScore(user.email, "timeattack", scoreRef.current);
        setHighScore(!!isHigh);
        if (isHigh) updateSessionScore("timeattack", scoreRef.current);
      } catch { /* ignore */ }
    }
    recordEvent({ type: "game_complete", mode: "timeattack", score: scoreRef.current });
    setShowOver(true);
  };

  const { timeLeft, start: startTimer, reset: resetTimer, addSeconds } = useCountdownTimer({
    initialSeconds: START_SECONDS,
    onExpire: () => finishRun(),
  });

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Tick SFX in last 5 seconds
  useEffect(() => {
    if (phase === "playing" && timeLeft > 0 && timeLeft <= 5) play("tick");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase]);

  const start = async () => {
    play("start");
    setScore(0);
    setSelected(null);
    setMessage(null);
    setFloaters([]);
    resetTimer(START_SECONDS);
    setPhase("playing");
    const p = await fetchPuzzle();
    if (p) startTimer(START_SECONDS);
  };

  const pushFloater = (text, type) => {
    const id = ++floaterIdRef.current;
    setFloaters((prev) => [...prev, { id, text, type }]);
    setTimeout(() => setFloaters((prev) => prev.filter((f) => f.id !== id)), 1100);
  };

  const handleSelect = async (n) => {
    if (phase !== "playing" || !puzzle) return;
    setSelected(n);
    if (n === puzzle.solution) {
      play("correct");
      const next = scoreRef.current + 1;
      setScore(next);
      addSeconds(BONUS);
      pushFloater(`+${BONUS}s`, "success");
      setMessage({ text: "✔ Correct! +5s", type: "success" });
      recordEvent({ type: "streak", mode: "timeattack", value: next });
      const p = await fetchPuzzle();
      if (p) setSelected(null);
    } else {
      play("wrong");
      addSeconds(-PENALTY);
      pushFloater(`-${PENALTY}s`, "error");
      setMessage({ text: "✘ Wrong — −5s", type: "error" });
      // brief lockout before allowing another tap
      setTimeout(() => setSelected(null), 350);
    }
  };

  if (phase === "intro") {
    return (
      <div className="page page--narrow timeattack-page">
        <StartScreen
          icon="⏳"
          title="Time Attack"
          description={`Race against ${START_SECONDS} seconds. Right answers buy you +${BONUS}s. Wrong answers cost you −${PENALTY}s.`}
          rules={[
            `Starts with ${START_SECONDS} seconds on the clock`,
            `+${BONUS}s for every correct answer`,
            `−${PENALTY}s for every wrong answer`,
            "Game ends when the clock hits zero",
          ]}
          cta="Begin"
          variant="timeattack"
          accent="var(--mode-timeattack)"
          meta={user ? `Best: ${user.timeattack || 0}` : null}
          onStart={start}
        />
      </div>
    );
  }

  return (
    <div className="page page--narrow timeattack-page">
      <header className="timeattack-header">
        <StatBox label="Score" value={score} color="var(--mode-timeattack)" />
        <StatBox
          label="Time" value={timeLeft} suffix="s"
          color={timeLeft <= 5 ? "var(--status-error)" : "var(--mode-timeattack)"}
          critical={timeLeft <= 5 && timeLeft > 0}
        />
      </header>

      <PuzzleImage
        src={puzzle?.question}
        loading={loading}
        error={error}
        hint="Find the number that completes the puzzle"
      />

      <div className="timeattack-floaters" aria-hidden="true">
        {floaters.map((f) => (
          <span key={f.id} className={`timeattack-floater is-${f.type}`}>{f.text}</span>
        ))}
      </div>

      <NumberPad
        onSelect={handleSelect}
        disabled={phase !== "playing" || !puzzle}
        selected={selected}
        accent="var(--mode-timeattack)"
      />

      <MessageAlert
        message={message?.text}
        type={message?.type}
        duration={800}
        onDismiss={() => setMessage(null)}
      />

      <GameOverModal
        open={showOver}
        title="Time's Up"
        score={score}
        isHighScore={highScore}
        accent="var(--mode-timeattack)"
        ctaVariant="timeattack"
        backTo="/game/rank"
        onPlayAgain={() => { setShowOver(false); start(); }}
      />
    </div>
  );
};

export default TimeAttack;
