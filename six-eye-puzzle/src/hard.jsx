import React, { useEffect, useState } from "react";
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

/**
 * Hard mode — 10s per puzzle, pick 0-10, one click locks the answer.
 * Score = number of correctly solved rounds before failing one.
 */
const Hard = () => {
  const { puzzle, loading, error, fetchPuzzle } = usePuzzle();
  const [phase, setPhase] = useState("intro");      // intro | playing | round-over | over
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(null);
  const [score, setScore] = useState(0);
  const [showOver, setShowOver] = useState(false);
  const [highScore, setHighScore] = useState(false);
  const { play } = useSound();
  const { user, updateSessionScore } = useSession();
  const { recordEvent } = useAchievements();

  const { timeLeft, start: startTimer, reset: resetTimer, pause } = useCountdownTimer({
    initialSeconds: 10,
    onExpire: () => {
      // Time's up — count as a loss
      handleResult(false, /*timedOut*/ true);
    },
  });

  // Begin a round
  const beginRound = async () => {
    setSelected(null);
    setMessage(null);
    resetTimer(10);
    const p = await fetchPuzzle();
    if (p) startTimer(10);
  };

  // Player starts the game
  const start = async () => {
    play("start");
    setScore(0);
    setPhase("playing");
    await beginRound();
  };

  // Tick SFX in last 3 seconds
  useEffect(() => {
    if (phase === "playing" && timeLeft > 0 && timeLeft <= 3) play("tick");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase]);

  const handleSelect = (n) => {
    if (phase !== "playing" || selected != null || !puzzle) return;
    setSelected(n);
    pause();
    const correct = n === puzzle.solution;
    handleResult(correct);
  };

  const handleResult = (correct, timedOut = false) => {
    if (phase !== "playing") return;
    pause();
    if (correct) {
      play("correct");
      setMessage({ text: "🔥 LEGENDARY!", type: "success" });
      const next = score + 1;
      setScore(next);
      recordEvent({ type: "streak", mode: "hard", value: next });
      // Sub-5s achievement
      if (timeLeft > 5) recordEvent({ type: "time_under", mode: "hard", seconds: 10 - timeLeft });
      setTimeout(() => beginRound(), 1100);
    } else {
      play("wrong");
      setMessage({
        text: timedOut ? "⏳ Time's up!" : `💀 Wrong — answer was ${puzzle?.solution}`,
        type: "error",
      });
      setPhase("over");
      setTimeout(async () => {
        if (user && score > 0) {
          try {
            const isHigh = await updateScore(user.email, "hard", score);
            setHighScore(!!isHigh);
            if (isHigh) updateSessionScore("hard", score);
          } catch { /* ignore */ }
        }
        recordEvent({ type: "game_complete", mode: "hard", score });
        play("gameover");
        setShowOver(true);
      }, 1300);
    }
  };

  if (phase === "intro") {
    return (
      <div className="page page--narrow hard-page">
        <StartScreen
          icon="💎"
          title="Hard Mode"
          description="10 seconds per puzzle. Pick the right digit from 0–10. One try."
          rules={[
            "Choose the digit that completes the puzzle",
            "First click locks your answer — choose carefully",
            "Run continues as long as you keep solving",
            "One wrong answer or timeout ends the run",
          ]}
          cta="Begin"
          variant="hard"
          accent="var(--mode-hard)"
          meta={user ? `Best streak: ${user.hard || 0}` : null}
          onStart={start}
        />
      </div>
    );
  }

  return (
    <div className="page page--narrow hard-page">
      <header className="hard-header">
        <StatBox label="Score"   value={score}    color="var(--mode-hard)" />
        <StatBox
          label="Time"
          value={timeLeft}
          suffix="s"
          color={timeLeft <= 3 ? "var(--status-error)" : "var(--mode-hard)"}
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
        disabled={selected != null || phase !== "playing"}
        selected={selected}
        correct={selected != null ? puzzle?.solution : null}
        includeTen
        accent="var(--mode-hard)"
      />

      <MessageAlert
        message={message?.text}
        type={message?.type}
        duration={1100}
        onDismiss={() => setMessage(null)}
      />

      <GameOverModal
        open={showOver}
        title="Game Over"
        score={score}
        scoreLabel="Streak"
        isHighScore={highScore}
        accent="var(--mode-hard)"
        ctaVariant="hard"
        backTo="/game/classic"
        backLabel="Back to Classic"
        onPlayAgain={() => { setShowOver(false); start(); }}
      />
    </div>
  );
};

export default Hard;
