import React from "react";
import { Link } from "react-router-dom";
import { useSession } from "./sessionContext";
import "./classic.css";

const MODES = [
  {
    to: "/game/easy",
    title: "Easy",
    accent: "var(--mode-easy)",
    variant: "easy",
    icon: "🌿",
    tagline: "Learn the rhythm.",
    desc: "Type your answer. No timer. Get the feel for the puzzle before the gloves come off.",
    bestKey: null, // Easy doesn't save score yet
  },
  {
    to: "/game/hard",
    title: "Hard",
    accent: "var(--mode-hard)",
    variant: "hard",
    icon: "💎",
    tagline: "10-second showdown.",
    desc: "One puzzle. Ten seconds. Tap the right number from a row of 11. No second chances.",
    bestKey: null,
  },
];

function Classic() {
  const { user } = useSession();

  return (
    <div className="page page--narrow classic-page">
      <header className="classic-header">
        <Link to="/game/home" className="classic-back">← Hub</Link>
        <h1 className="title-section">Classic</h1>
        <p className="classic-sub">Pure puzzle. No rush, then all rush.</p>
      </header>

      <div className="classic-grid">
        {MODES.map((m) => (
          <Link
            key={m.to}
            to={m.to}
            className={`classic-card classic-card--${m.variant}`}
            style={{ "--card-accent": m.accent }}
          >
            <div className="classic-card__icon" aria-hidden="true">{m.icon}</div>
            <div className="classic-card__head">
              <h2 className="classic-card__title">{m.title}</h2>
              <span className="classic-card__tag">{m.tagline}</span>
            </div>
            <p className="classic-card__desc">{m.desc}</p>
            {m.bestKey && user && (
              <div className="classic-card__best">Best — {user[m.bestKey] || 0}</div>
            )}
            <div className="classic-card__cta">Play →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Classic;
