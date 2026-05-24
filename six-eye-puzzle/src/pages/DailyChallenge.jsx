import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import usePuzzle from "../hooks/usePuzzle";
import useSound from "../hooks/useSound";
import { useSession } from "../sessionContext";
import { useAchievements } from "../contexts/AchievementsContext";
import StartScreen from "../components/StartScreen";
import PuzzleImage from "../components/PuzzleImage";
import NumberPad from "../components/NumberPad";
import MessageAlert from "../components/MessageAlert";
import "./DailyChallenge.css";

const STORAGE_KEY = "sep_daily_v1";

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function readStored() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}

function writeStored(value) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); } catch { /* ignore */ }
}

/**
 * DailyChallenge — one puzzle per day, deterministic via date seed.
 * Tracks daily streak in localStorage.
 */
export default function DailyChallenge() {
  const today = todayKey();
  const stored = readStored();
  const todayState = stored[today];

  const { puzzle, loading, error, fetchPuzzle } = usePuzzle({ seed: today });
  const { play } = useSound();
  const { user } = useSession();
  const { recordEvent } = useAchievements();

  const [phase, setPhase] = useState(() => (todayState ? "result" : "intro"));
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(null);

  // Compute streak
  const streak = useMemo(() => {
    let n = 0;
    const d = new Date();
    // walk backwards
    for (let i = 0; i < 400; i += 1) {
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (stored[k]?.solved) n += 1;
      else if (k !== today) break; // missed day stops the streak
      d.setDate(d.getDate() - 1);
    }
    return n;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, today]);

  // Countdown to next reset
  const [timeToNext, setTimeToNext] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const next = new Date(now);
      next.setHours(24, 0, 0, 0);
      const diff = next - now;
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1000);
      setTimeToNext(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const startToday = async () => {
    play("start");
    setPhase("playing");
    await fetchPuzzle();
  };

  const submit = (answer) => {
    if (phase !== "playing" || !puzzle) return;
    setSelected(answer);
    const solved = answer === puzzle.solution;
    const next = { ...stored, [today]: { solved, answer, at: Date.now() } };
    writeStored(next);

    if (solved) {
      play("victory");
      setMessage({ text: "Correct! Streak extended.", type: "success" });
      recordEvent({ type: "game_complete", mode: "daily", score: 1 });
      // streak achievement
      const computedStreak = (() => {
        let n = 1; const d = new Date();
        d.setDate(d.getDate() - 1);
        for (let i = 0; i < 400; i += 1) {
          const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
          if (stored[k]?.solved) n += 1;
          else break;
          d.setDate(d.getDate() - 1);
        }
        return n;
      })();
      recordEvent({ type: "daily_streak", value: computedStreak });
    } else {
      play("wrong");
      setMessage({ text: "Incorrect — try again tomorrow!", type: "error" });
    }
    setTimeout(() => setPhase("result"), 1100);
  };

  if (phase === "result") {
    const state = readStored()[today];
    return (
      <main className="page page--narrow daily-page anim-fade-in">
        <header className="daily-header">
          <h1 className="title-section">🌅 Daily Challenge</h1>
          <div className="daily-streak">Streak — <strong>{streak}</strong> day{streak === 1 ? "" : "s"}</div>
        </header>

        <section className="neon-card neon-card--purple daily-result">
          <div className={`daily-result__badge ${state?.solved ? "is-success" : "is-fail"}`}>
            {state?.solved ? "✓ Solved" : "✗ Missed"}
          </div>
          <p className="daily-result__text">
            {state?.solved
              ? "Nice — come back tomorrow to extend your streak."
              : "Don't worry, the streak resets at midnight. Try again tomorrow!"}
          </p>
          <div className="daily-result__countdown">
            <span>Next puzzle in</span>
            <strong>{timeToNext}</strong>
          </div>
          <Link to="/game/home" className="btn-neon btn-neon--ghost btn-neon--cyan btn-neon--sm">Back to Hub</Link>
        </section>
      </main>
    );
  }

  if (phase === "intro") {
    return (
      <main className="page page--narrow daily-page anim-fade-in">
        <StartScreen
          icon="🌅"
          title="Daily Challenge"
          description="One puzzle. One attempt. Same for everyone. Solve it to extend your streak."
          rules={[
            `Today: ${today}`,
            user ? `Logged in as ${user.name || user.email}` : "Sign in to sync streaks with your profile",
            `Current streak: ${streak} day${streak === 1 ? "" : "s"}`,
          ]}
          cta="Begin"
          variant="daily"
          accent="var(--mode-daily)"
          onStart={startToday}
        />
      </main>
    );
  }

  return (
    <main className="page page--narrow daily-page anim-fade-in">
      <header className="daily-header">
        <h1 className="title-section">🌅 Daily Challenge</h1>
        <div className="daily-streak">Streak — <strong>{streak}</strong></div>
      </header>

      <PuzzleImage src={puzzle?.question} loading={loading} error={error} onRetry={fetchPuzzle} />

      <p className="daily-hint">Pick the number that completes the puzzle.</p>

      <NumberPad
        onSelect={submit}
        disabled={!puzzle || selected != null}
        selected={selected}
        correct={selected != null ? puzzle?.solution : null}
        accent="var(--mode-daily)"
      />

      <MessageAlert
        message={message?.text}
        type={message?.type}
        duration={1100}
        onDismiss={() => setMessage(null)}
      />
    </main>
  );
}
