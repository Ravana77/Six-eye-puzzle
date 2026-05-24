import React, { useEffect, useState } from "react";
import { useSession } from "./sessionContext";
import { updateScore } from "./firebase";
import { useAchievements } from "./contexts/AchievementsContext";
import usePuzzle from "./hooks/usePuzzle";
import useSound from "./hooks/useSound";
import StartScreen from "./components/StartScreen";
import PuzzleImage from "./components/PuzzleImage";
import MessageAlert from "./components/MessageAlert";
import StatBox from "./components/StatBox";
import GameOverModal from "./components/GameOverModal";
import "./easy.css";

const Easy = () => {
  const { puzzle, loading, error, fetchPuzzle } = usePuzzle();
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState(null);
  const [score, setScore] = useState(0);
  const [skips, setSkips] = useState(0);
  const [phase, setPhase] = useState("intro"); // intro | playing | over
  const [showOver, setShowOver] = useState(false);
  const [highScore, setHighScore] = useState(false);
  const { play } = useSound();
  const { user, updateSessionScore } = useSession();
  const { recordEvent } = useAchievements();

  const start = async () => {
    play("start");
    setScore(0);
    setSkips(0);
    setAnswer("");
    setMessage(null);
    setPhase("playing");
    await fetchPuzzle();
  };

  const submit = (e) => {
    e?.preventDefault();
    if (phase !== "playing" || !puzzle || answer === "") return;
    const num = Number.parseInt(answer, 10);
    if (Number.isNaN(num)) {
      setMessage({ text: "Enter a number 0-9", type: "warn" });
      return;
    }
    if (num === puzzle.solution) {
      const next = score + 1;
      setScore(next);
      play("correct");
      setMessage({ text: "Correct!", type: "success" });
      setAnswer("");
      setTimeout(() => fetchPuzzle(), 350);
      recordEvent({ type: "streak", mode: "easy", value: next });
    } else {
      play("wrong");
      setMessage({ text: `Not quite — try again`, type: "error" });
    }
  };

  const skip = async () => {
    if (phase !== "playing") return;
    play("click");
    setSkips((s) => s + 1);
    setAnswer("");
    await fetchPuzzle();
  };

  const endRun = async () => {
    if (phase !== "playing") return;
    setPhase("over");
    play("gameover");

    if (user && score > 0) {
      try {
        const isHigh = await updateScore(user.email, "easy", score);
        setHighScore(!!isHigh);
        if (isHigh) updateSessionScore("easy", score);
      } catch { /* swallow — UI will still show modal */ }
    }
    recordEvent({ type: "game_complete", mode: "easy", score });
    setShowOver(true);
  };

  // Esc to end run
  useEffect(() => {
    if (phase !== "playing") return;
    const h = (e) => { if (e.key === "Escape") endRun(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, score]);

  if (phase === "intro") {
    return (
      <div className="page page--narrow easy-page">
        <StartScreen
          icon="🌿"
          title="Easy Mode"
          description="Type the missing digit. No timer. Build a streak — press End Run when you're done."
          rules={[
            "Type a digit 0-9 then hit Submit",
            "Wrong answers don't end the run — keep going",
            "Press Skip to move on (small cost to your skip count)",
            "End Run to save your score",
          ]}
          cta="Begin"
          variant="easy"
          accent="var(--mode-easy)"
          meta={user ? `Best: ${user.easy || 0}` : null}
          onStart={start}
        />
      </div>
    );
  }

  return (
    <div className="page page--narrow easy-page">
      <header className="easy-header">
        <StatBox label="Score" value={score} color="var(--mode-easy)" />
        <StatBox label="Skips" value={skips} color="var(--text-muted)" />
        <button type="button" className="btn-neon btn-neon--ghost btn-neon--magenta btn-neon--sm" onClick={endRun}>End Run</button>
      </header>

      <PuzzleImage src={puzzle?.question} loading={loading} error={error} onRetry={fetchPuzzle} />

      <form className="easy-form" onSubmit={submit}>
        <label htmlFor="easy-answer" className="sr-only">Your answer</label>
        <input
          id="easy-answer"
          type="number"
          inputMode="numeric"
          min="0"
          max="9"
          placeholder="?"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="input-neon easy-input"
          autoFocus
        />
        <button type="submit" className="btn-neon btn-neon--easy" disabled={!puzzle || answer === ""}>
          Submit
        </button>
        <button type="button" className="btn-neon btn-neon--ghost btn-neon--cyan" onClick={skip}>
          Skip
        </button>
      </form>

      <MessageAlert
        message={message?.text}
        type={message?.type}
        duration={1200}
        onDismiss={() => setMessage(null)}
      />

      <GameOverModal
        open={showOver}
        title="Run Complete"
        score={score}
        scoreLabel="Total Solved"
        stats={[
          { label: "Skips", value: skips },
        ]}
        isHighScore={highScore}
        accent="var(--mode-easy)"
        ctaVariant="easy"
        backTo="/game/classic"
        backLabel="Back to Classic"
        onPlayAgain={() => { setShowOver(false); start(); }}
      />
    </div>
  );
};

export default Easy;
