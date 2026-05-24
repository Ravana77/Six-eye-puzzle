import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "./sessionContext";
import "./App.css";

const FEATURES = [
  { icon: "🧠", label: "Memory Mode" },
  { icon: "⏳", label: "Time Attack" },
  { icon: "❤️", label: "Survival" },
  { icon: "🎲", label: "Scramble" },
  { icon: "🏆", label: "Leaderboard" },
  { icon: "🌅", label: "Daily Puzzle" },
];

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [exiting, setExiting] = useState(false);
  const navigate = useNavigate();
  const { user } = useSession();

  // If returning user, hop straight into the game hub
  useEffect(() => {
    if (user) {
      navigate("/game/home", { replace: true });
    }
  }, [user, navigate]);

  // Welcome animation timeline
  useEffect(() => {
    const dismissTimer = setTimeout(() => setExiting(true), 2400);
    const hideTimer    = setTimeout(() => setShowWelcome(false), 3100);
    return () => {
      clearTimeout(dismissTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const skipWelcome = () => {
    setExiting(true);
    setTimeout(() => setShowWelcome(false), 200);
  };

  return (
    <div className="splash crt-effect">
      {showWelcome && (
        <>
          <div className={`welcome-popup${exiting ? " is-exiting" : ""}`} aria-hidden="true">
            <div className="welcome-popup__line">Welcome to</div>
            <div className="welcome-popup__line is-main">Six-Eye Puzzle</div>
          </div>
          <button
            type="button"
            onClick={skipWelcome}
            className="welcome-skip btn-neon btn-neon--ghost btn-neon--sm btn-neon--cyan"
            aria-label="Skip intro animation"
          >
            Skip ▸
          </button>
        </>
      )}

      <section className="splash-hero">
        <h1 className="splash-hero__title">Six Eye Puzzle</h1>
        <p className="splash-hero__desc">
          Sharpen your reflexes. Train your memory. Beat the clock. A six-game arcade
          of neon-charged number puzzles — built to keep your mind moving.
        </p>

        <div className="splash-hero__cta">
          <Link to="/auth/login" className="btn-neon btn-neon--cyan btn-neon--lg">Log In</Link>
          <Link to="/auth/signup" className="btn-neon btn-neon--magenta btn-neon--lg">Sign Up</Link>
        </div>

        <ul className="splash-features" aria-label="Game modes preview">
          {FEATURES.map((f) => (
            <li key={f.label} className="splash-feature">
              <span aria-hidden="true">{f.icon}</span>
              {f.label}
            </li>
          ))}
        </ul>
      </section>

      <footer className="splash-footer">
        <p>© {new Date().getFullYear()} Six-Eye Puzzle · Version 1.0</p>
        <p>chillehasindu123@gmail.com · Developed by Ranasinghege H.R</p>
      </footer>
    </div>
  );
}

export default App;
