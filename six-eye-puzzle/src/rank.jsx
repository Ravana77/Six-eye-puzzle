import React from "react";
import { Link } from "react-router-dom";
import { useSession } from "./sessionContext";
import "./classic.css"; // shares card styling with classic hub
import "./rank.css";

const MODES = [
  {
    to: "/game/timeattack", title: "Time Attack", icon: "⏳",
    accent: "var(--mode-timeattack)", variant: "timeattack",
    tagline: "60 seconds. +5 / -5.",
    desc: "Stack puzzles fast. Right answers buy time. Wrong ones cost dearly.",
    bestKey: "timeattack",
  },
  {
    to: "/game/survival", title: "Survival", icon: "❤️",
    accent: "var(--mode-survival)", variant: "survival",
    tagline: "Three lives. No mercy.",
    desc: "Steady 10-second clock per puzzle. Lose three and the run ends.",
    bestKey: "survival",
  },
  {
    to: "/game/memory", title: "Memory", icon: "🧠",
    accent: "var(--mode-memory)", variant: "memory",
    tagline: "Now you see it.",
    desc: "Image appears, then vanishes. Recall the digit. Each round gets faster.",
    bestKey: "memory",
  },
  {
    to: "/game/scramble", title: "Scramble", icon: "🎲",
    accent: "var(--mode-scramble)", variant: "scramble",
    tagline: "Same digits, new chaos.",
    desc: "The number pad reshuffles every round. Find the answer before the timer dies.",
    bestKey: "scramble",
  },
];

function Rank() {
  const { user } = useSession();
  return (
    <div className="page rank-page">
      <header className="rank-header">
        <Link to="/game/home" className="rank-back">← Hub</Link>
        <h1 className="title-section">Challenger</h1>
        <p className="rank-sub">High stakes. Higher scores. Pick your pressure.</p>
      </header>

      <div className="rank-grid">
        {MODES.map((m) => (
          <Link
            key={m.to}
            to={m.to}
            className={`rank-card rank-card--${m.variant}`}
            style={{ "--card-accent": m.accent }}
          >
            <div className="rank-card__icon" aria-hidden="true">{m.icon}</div>
            <div className="rank-card__head">
              <h2 className="rank-card__title">{m.title}</h2>
              <span className="rank-card__tag">{m.tagline}</span>
            </div>
            <p className="rank-card__desc">{m.desc}</p>
            {user && (
              <div className="rank-card__best">Best — {user[m.bestKey] || 0}</div>
            )}
            <div className="rank-card__cta">Play →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Rank;
