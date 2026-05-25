import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "./sessionContext";
import { updateScore } from "./firebase";
import { useAchievements } from "./contexts/AchievementsContext";
import usePuzzle from "./hooks/usePuzzle";
import useSound from "./hooks/useSound";
import StartScreen from "./components/StartScreen";
import PuzzleImage from "./components/PuzzleImage";
import NumberPad from "./components/NumberPad";
import MessageAlert from "./components/MessageAlert";
import StatBox from "./components/StatBox";
import GameOverModal from "./components/GameOverModal";
import "./hard.css"; // shared game-page layout
import "./memory.css";

const INITIAL_REVEAL = 5000;
const MIN_REVEAL = 1800;
const REVEAL_STEP = 350;

/**
 * Memory mode — puzzle is shown briefly, then hidden, then the player
 * recalls the digit. Time-to-memorise shrinks each round.
 */
const Memory = () => {
  const { puzzle, loading, error, fetchPuzzle } = usePuzzle();
  const [phase, setPhase] = useState("intro"); // intro | reveal | recall | over
  const [reveal, setReveal] = useState(INITIAL_REVEAL);
  const [revealMs, setRevealMs] = useState(INITIAL_REVEAL);
  const [streak, setStreak] = useState(0);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(null);
  const [showOver, setShowOver] = useState(false);
  const [highScore, setHighScore] = useState(false);
  const [countdown, setCountdown] = useState(0);   // visible reveal countdown
  const revealTimerRef = useRef(null);
  const tickerRef = useRef(null);
  const { play } = useSound();
  const { user, updateSessionScore } = useSession();
  const { recordEvent } = useAchievements();

  const clearTimers = () => {
    if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    if (tickerRef.current) clearInterval(tickerRef.current);
    revealTimerRef.current = null;
    tickerRef.current = null;
  };

  useEffect(() => () => clearTimers(), []);

  const newRound = useCallback(async () => {
    clearTimers();
    setSelected(null);
    setMessage(null);
    setPhase("reveal");
    const p = await fetchPuzzle();
    if (!p) return;
    setCountdown(Math.ceil(reveal / 1000));
    tickerRef.current = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    revealTimerRef.current = setTimeout(() => {
      setPhase("recall");
      clearInterval(tickerRef.current);
      tickerRef.current = null;
      play("tick");
    }, reveal);
  }, [reveal, fetchPuzzle, play]);

  const start = async () => {
    play("start");
    setStreak(0);
    setReveal(INITIAL_REVEAL);
    setRevealMs(INITIAL_REVEAL);
    await newRound();
  };

  const handleSelect = async (n) => {
    if (phase !== "recall" || !puzzle || selected != null) return;
    setSelected(n);
    if (n === puzzle.solution) {
      play("correct");
      const next = streak + 1;
      setStreak(next);
      const nextReveal = Math.max(MIN_REVEAL, reveal - REVEAL_STEP);
      setReveal(nextReveal);
      setRevealMs(nextReveal);
      setMessage({ text: `✔ +1 (streak ${next})`, type: "success" });
      recordEvent({ type: "streak", mode: "memory", value: next });
      setTimeout(() => { newRound(); }, 900);
    } else {
      play("wrong");
      setMessage({ text: `Wrong — it was ${puzzle.solution}`, type: "error" });
      setPhase("over");
      setTimeout(async () => {
        if (user && streak > 0) {
          try {
            const isHigh = await updateScore(user.email, "memory", streak);
            setHighScore(!!isHigh);
            if (isHigh) updateSessionScore("memory", streak);
          } catch { /* ignore */ }
        }
        recordEvent({ type: "game_complete", mode: "memory", score: streak });
        play("gameover");
        setShowOver(true);
      }, 1300);
    }
  };

  if (phase === "intro") {
    return (
      <div className="page page--narrow memory-page">
        <StartScreen
          icon="🧠"
          title="Memory Mode"
          description="See the puzzle, remember the digit, then pick it from the pad. Each round the reveal gets shorter."
          rules={[
            `Starts at ${INITIAL_REVEAL / 1000}s reveal`,
            `Reveal shrinks by ${REVEAL_STEP / 1000}s per correct answer`,
            `Minimum reveal: ${MIN_REVEAL / 1000}s`,
            "One wrong answer ends the run",
          ]}
          cta="Begin"
          variant="memory"
          accent="var(--mode-memory)"
          meta={user ? `Best streak: ${user.memory || 0}` : null}
          onStart={start}
        />
      </div>
    );
  }

  return (
    <div className="page page--narrow memory-page">
      <header className="memory-header">
        <StatBox label="Streak" value={streak} color="var(--mode-memory)" />
        <StatBox label="Reveal" value={(revealMs / 1000).toFixed(1)} suffix="s" color="var(--mode-memory)" />
        {phase === "reveal" && (
          <StatBox label="Memorise" value={countdown} suffix="s" color="var(--status-warning)" critical={countdown <= 1 && countdown > 0} />
        )}
      </header>

      <PuzzleImage
        src={puzzle?.question}
        loading={loading}
        error={error}
        hidden={phase === "recall"}
        hint={phase === "recall"
          ? "Which number was missing?"
          : "Memorise the missing number"}
      />

      <NumberPad
        onSelect={handleSelect}
        disabled={phase !== "recall" || selected != null}
        selected={selected}
        correct={selected != null ? puzzle?.solution : null}
        accent="var(--mode-memory)"
      />

      <MessageAlert
        message={message?.text}
        type={message?.type}
        duration={1100}
        onDismiss={() => setMessage(null)}
      />

      <GameOverModal
        open={showOver}
        title="Run Complete"
        score={streak}
        scoreLabel="Best Streak"
        isHighScore={highScore}
        accent="var(--mode-memory)"
        ctaVariant="memory"
        backTo="/game/rank"
        onPlayAgain={() => { setShowOver(false); start(); }}
      />
    </div>
  );
};

export default Memory;
