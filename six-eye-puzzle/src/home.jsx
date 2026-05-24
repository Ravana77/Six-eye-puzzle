import React from "react";
import { Link } from "react-router-dom";
import { useSession } from "./sessionContext";
import "./home.css";

const MODE_CARDS = [
  {
    to: "/game/classic",
    title: "Classic",
    tagline: "Calm. Focused. Pure puzzle.",
    desc: "Type your answer, feel the glow, and learn the rules. Two difficulties: Easy & Hard.",
    accent: "var(--neon-purple)",
    icon: "🧩",
    variant: "purple",
    modes: ["Easy", "Hard"],
  },
  {
    to: "/game/rank",
    title: "Challenger",
    tagline: "High stakes. Higher scores.",
    desc: "Pressure modes that climb the leaderboard. Time Attack, Survival, Memory, Scramble.",
    accent: "var(--neon-magenta)",
    icon: "👑",
    variant: "magenta",
    modes: ["Time Attack", "Survival", "Memory", "Scramble"],
  },
];

function Home() {
  const { user } = useSession();

  // Pull personal-best summary if available
  const bestByMode = user
    ? {
        timeattack: user.timeattack || 0,
        survival:   user.survival   || 0,
        memory:     user.memory     || 0,
        scramble:   user.scramble   || 0,
      }
    : null;

  return (
    <div className="page home-page">
      <header className="home-hero">
        <h1 className="title-section">
          {user ? `Welcome back, ${user.name || "Player"}` : "Choose your arena"}
        </h1>
        <p className="home-hero__sub">Two paths. Six modes. One mind to sharpen.</p>
      </header>

      <section className="home-cards">
        {MODE_CARDS.map((c) => (
          <Link key={c.to} to={c.to} className={`home-card home-card--${c.variant}`}>
            <div className="home-card__icon" aria-hidden="true">{c.icon}</div>
            <h2 className="home-card__title">{c.title}</h2>
            <p className="home-card__tag">{c.tagline}</p>
            <p className="home-card__desc">{c.desc}</p>
            <div className="home-card__modes">
              {c.modes.map((m) => (
                <span key={m} className="home-card__chip">{m}</span>
              ))}
            </div>
            <div className="home-card__cta">Play →</div>
          </Link>
        ))}
      </section>

      {/* Quick-access cards */}
      <section className="home-quicks">
        <Link to="/game/daily" className="home-quick home-quick--daily">
          <span className="home-quick__icon" aria-hidden="true">🌅</span>
          <div>
            <div className="home-quick__title">Daily Challenge</div>
            <div className="home-quick__sub">One puzzle. One shot. Keep the streak alive.</div>
          </div>
          <div className="home-quick__arrow">→</div>
        </Link>

        <Link to="/game/leaderboard" className="home-quick home-quick--lb">
          <span className="home-quick__icon" aria-hidden="true">🏆</span>
          <div>
            <div className="home-quick__title">Leaderboard</div>
            <div className="home-quick__sub">See who's holding the high score this week.</div>
          </div>
          <div className="home-quick__arrow">→</div>
        </Link>
      </section>

      {bestByMode && (
        <section className="home-bests">
          <h3 className="home-bests__title">Your personal bests</h3>
          <div className="home-bests__grid">
            <div className="home-best" style={{ "--best-color": "var(--mode-timeattack)" }}>
              <span className="home-best__label">Time Attack</span>
              <span className="home-best__val">{bestByMode.timeattack}</span>
            </div>
            <div className="home-best" style={{ "--best-color": "var(--mode-survival)" }}>
              <span className="home-best__label">Survival</span>
              <span className="home-best__val">{bestByMode.survival}</span>
            </div>
            <div className="home-best" style={{ "--best-color": "var(--mode-memory)" }}>
              <span className="home-best__label">Memory</span>
              <span className="home-best__val">{bestByMode.memory}</span>
            </div>
            <div className="home-best" style={{ "--best-color": "var(--mode-scramble)" }}>
              <span className="home-best__label">Scramble</span>
              <span className="home-best__val">{bestByMode.scramble}</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
