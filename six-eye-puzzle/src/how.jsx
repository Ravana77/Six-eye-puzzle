import React from "react";
import { Link } from "react-router-dom";
import "./how.css";

const MODES = [
  {
    title: "Easy", to: "/game/easy", icon: "🌿", color: "var(--mode-easy)",
    rules: [
      "Type the missing number for the puzzle",
      "No timer — take your time",
      "Use this to learn the visual pattern",
    ],
  },
  {
    title: "Hard", to: "/game/hard", icon: "💎", color: "var(--mode-hard)",
    rules: [
      "10-second timer",
      "Pick the right answer from 0–10",
      "One click locks your answer in",
    ],
  },
  {
    title: "Time Attack", to: "/game/timeattack", icon: "⏳", color: "var(--mode-timeattack)",
    rules: [
      "Starts with 60 seconds",
      "+5s for every correct answer",
      "−5s for every wrong answer",
      "Game ends when the timer hits zero",
    ],
  },
  {
    title: "Survival", to: "/game/survival", icon: "❤️", color: "var(--mode-survival)",
    rules: [
      "Three lives",
      "10 seconds per puzzle",
      "Lose a life on wrong or timeout",
      "Run ends at zero lives",
    ],
  },
  {
    title: "Memory", to: "/game/memory", icon: "🧠", color: "var(--mode-memory)",
    rules: [
      "Puzzle shows briefly, then hides",
      "Remember the missing number",
      "Time-to-memorise shrinks each round",
      "Wrong answer ends the run",
    ],
  },
  {
    title: "Scramble", to: "/game/scramble", icon: "🎲", color: "var(--mode-scramble)",
    rules: [
      "Digits 0–9 appear in random order",
      "Tap them in correct order to form the answer",
      "10-second timer per puzzle",
      "Long streaks multiply your score",
    ],
  },
  {
    title: "Daily Challenge", to: "/game/daily", icon: "🌅", color: "var(--mode-daily)",
    rules: [
      "One puzzle per day",
      "Same puzzle for every player",
      "Solve it to extend your streak",
      "Miss a day, the streak resets",
    ],
  },
];

export default function HowToPlay() {
  return (
    <div className="page how-page">
      <header className="how-hero">
        <h1 className="title-section">How to Play</h1>
        <p className="how-sub">
          Six-Eye Puzzle is a series of fast banana-math puzzles. The challenge is your reaction
          speed, memory, and ability to think under pressure.
        </p>
      </header>

      <section className="how-grid">
        {MODES.map((m) => (
          <article className="how-card" key={m.title} style={{ "--how-accent": m.color }}>
            <header className="how-card__head">
              <span className="how-card__icon" aria-hidden="true">{m.icon}</span>
              <h2 className="how-card__title">{m.title}</h2>
            </header>
            <ul className="how-card__rules">
              {m.rules.map((r, i) => (<li key={i}>{r}</li>))}
            </ul>
            <Link to={m.to} className="how-card__cta">Play {m.title} →</Link>
          </article>
        ))}
      </section>
    </div>
  );
}
