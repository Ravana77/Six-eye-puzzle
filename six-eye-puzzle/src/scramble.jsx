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
import "./scramble.css";

/**
 * Scramble mode — digit pad reshuffles each round.
 * Player enters digits in order to match the solution string.
 * Score = sum of streak weights (1+2+3+…). Long streaks score huge.
 */
const Scramble = () => {
  const { puzzle, loading, error, fetchPuzzle } = usePuzzle();
  const [phase, setPhase] = useState("intro");
  const [entered, setEntered] = useState("");
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState(null);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [showOver, setShowOver] = useState(false);
  const [highScore, setHighScore] = useState(false);
  const lastClickRef = useRef(0);
  const { play } = useSound();
  const { user, updateSessionScore } = useSession();
  const { recordEvent } = useAchievements();

  const endRun = async () => {
    play("gameover");
    setPhase("over");
    if (user && score > 0) {
      try {
        const isHigh = await updateScore(user.email, "scramble", score);
        setHighScore(!!isHigh);
        if (isHigh) updateSessionScore("scramble", score);
      } catch { /* ignore */ }
    }
    recordEvent({ type: "game_complete", mode: "scramble", score });
    setShowOver(true);
  };

  const { timeLeft, start: startTimer, reset: resetTimer, pause } = useCountdownTimer({
    initialSeconds: 10,
    onExpire: () => {
      setMessage({ text: "⏳ Time's up!", type: "error" });
      setTimeout(() => endRun(), 600);
    },
  });

  // Tick SFX in last 3 seconds
  useEffect(() => {
    if (phase === "playing" && timeLeft > 0 && timeLeft <= 3) play("tick");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase]);

  const newRound = async () => {
    setEntered("");
    setMessage(null);
    setShuffleSeed((s) => s + 1);
    resetTimer(10);
    const p = await fetchPuzzle();
    if (p) startTimer(10);
  };

  const start = async () => {
    play("start");
    setScore(0);
    setStreak(0);
    setPhase("playing");
    await newRound();
  };

  const onSelect = (n) => {
    if (phase !== "playing" || !puzzle) return;
    // Debounce 80ms to prevent double-click race condition (audit finding)
    const now = Date.now();
    if (now - lastClickRef.current < 80) return;
    lastClickRef.current = now;

    const next = entered + String(n);
    setEntered(next);
    play("click");

    const expected = String(puzzle.solution);
    // Compare digit-by-digit so leading zero solutions match (audit bug fix)
    if (next[next.length - 1] !== expected[next.length - 1]) {
      play("wrong");
      pause();
      setMessage({ text: `Wrong — it was ${expected}`, type: "error" });
      setTimeout(() => endRun(), 700);
      return;
    }
    if (next.length >= expected.length) {
      // Full solution entered correctly
      pause();
      play("correct");
      const newStreak = streak + 1;
      const award = newStreak;
      setStreak(newStreak);
      setScore((s) => s + award);
      setMessage({ text: `✔ +${award} (streak ${newStreak})`, type: "success" });
      recordEvent({ type: "streak", mode: "scramble", value: newStreak });
      setTimeout(() => newRound(), 700);
    }
  };

  const backspace = () => {
    if (phase !== "playing" || entered.length === 0) return;
    play("click");
    setEntered((s) => s.slice(0, -1));
  };

  if (phase === "intro") {
    return (
      <div className="page page--narrow scramble-page">
        <StartScreen
          icon="🎲"
          title="Scramble Mode"
          description="The number pad reshuffles every round. Tap digits in correct order to form the answer."
          rules={[
            "10 seconds per puzzle",
            "Enter the solution digit by digit",
            "Misclick? Use Backspace to undo",
            "Wrong digit ends the run — score = sum of streak weights",
          ]}
          cta="Begin"
          variant="scramble"
          accent="var(--mode-scramble)"
          meta={user ? `Best: ${user.scramble || 0}` : null}
          onStart={start}
        />
      </div>
    );
  }

  return (
    <div className="page page--narrow scramble-page">
      <header className="scramble-header">
        <StatBox label="Score"  value={score}  color="var(--mode-scramble)" />
        <StatBox label="Streak" value={streak} color="var(--neon-magenta)" />
        <StatBox
          label="Time" value={timeLeft} suffix="s"
          color={timeLeft <= 3 ? "var(--status-error)" : "var(--mode-scramble)"}
          critical={timeLeft <= 3 && timeLeft > 0}
        />
      </header>

      <PuzzleImage src={puzzle?.question} loading={loading} error={error} />

      <div className="scramble-entry" aria-live="polite">
        <span className="scramble-entry__label">Entered</span>
        <span className="scramble-entry__digits">
          {entered.split("").map((d, i) => (
            <span key={i} className="scramble-entry__digit anim-scale-in">{d}</span>
          ))}
          {entered.length === 0 && <span className="scramble-entry__placeholder">—</span>}
        </span>
        <button
          type="button"
          className="btn-neon btn-neon--ghost btn-neon--magenta btn-neon--sm"
          onClick={backspace}
          disabled={entered.length === 0}
        >
          ⌫ Backspace
        </button>
      </div>

      <NumberPad
        onSelect={onSelect}
        disabled={phase !== "playing"}
        shuffled
        shuffleSeed={shuffleSeed}
        accent="var(--mode-scramble)"
      />

      <MessageAlert
        message={message?.text}
        type={message?.type}
        duration={900}
        onDismiss={() => setMessage(null)}
      />

      <GameOverModal
        open={showOver}
        title="Game Over"
        score={score}
        scoreLabel="Final Score"
        stats={[{ label: "Best Streak", value: streak }]}
        isHighScore={highScore}
        accent="var(--mode-scramble)"
        ctaVariant="scramble"
        backTo="/game/rank"
        onPlayAgain={() => { setShowOver(false); start(); }}
      />
    </div>
  );
};

export default Scramble;
