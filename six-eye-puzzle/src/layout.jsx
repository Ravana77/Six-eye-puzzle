import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import SettingsModal from "./components/SettingsModal";
import { useSettings } from "./contexts/SettingsContext";
import useSound from "./hooks/useSound";
import "./layout.css";

const NAV = [
  { to: "/game/home",         label: "Home" },
  { to: "/game/daily",        label: "Daily" },
  { to: "/game/how",          label: "How to Play" },
  { to: "/game/leaderboard",  label: "Leaderboard" },
  { to: "/game/achievements", label: "Achievements" },
  { to: "/game/aboutus",      label: "About" },
  { to: "/game/profile",      label: "Profile" },
];

/**
 * Curated arcade-style quotes — no network dependency.
 * Rotates every 15s. Replaces the slow / risky Chuck-Norris fetch
 * (which often left the footer blank for 1-2 seconds on load).
 */
const FOOTER_QUOTES = [
  "Trust the glow. Solve the code.",
  "Every neon flicker is another second slipping away.",
  "In the puzzle, your only enemy is the clock.",
  "Pixel by pixel, the answer reveals itself.",
  "Don't blink — the next puzzle is already loading.",
  "Memory, speed, instinct. Pick two and survive.",
  "The arcade never sleeps. Neither should your reflexes.",
  "Numbers don't lie — but they do scramble.",
  "Hold the line. The streak is sacred.",
  "There is no AFK in Six-Eye Puzzle.",
];

function Header({ onOpenSettings }) {
  const [open, setOpen] = useState(false);
  const { soundEnabled, setSoundEnabled } = useSettings();
  const { play } = useSound();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className="app-header crt-effect">
      <div className="app-header__bar">
        <Link to="/game/home" className="app-header__brand" aria-label="Six Eye Puzzle home">
          <img src="/logo.png" alt="" className="app-header__logo" aria-hidden="true" />
          <div className="app-header__title-block">
            <h1 className="app-header__title">Six Eye Puzzle</h1>
            <p className="app-header__subtitle">Unleash Your Inner Brainiac</p>
          </div>
        </Link>

        <nav className={`app-header__nav${open ? " is-open" : ""}`} aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link-neon${isActive ? " is-active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="app-header__actions">
          <button
            type="button"
            className="app-header__icon-btn"
            onClick={() => { setSoundEnabled(!soundEnabled); play("click"); }}
            aria-label={soundEnabled ? "Mute sound" : "Unmute sound"}
            title={soundEnabled ? "Mute" : "Unmute"}
          >
            {soundEnabled ? "🔊" : "🔇"}
          </button>
          <button
            type="button"
            className="app-header__icon-btn"
            onClick={() => { onOpenSettings(); play("click"); }}
            aria-label="Open settings"
            title="Settings"
          >
            ⚙
          </button>
          <button
            type="button"
            className={`app-header__toggle${open ? " is-open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label="Toggle navigation menu"
          >
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * FOOTER_QUOTES.length));
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % FOOTER_QUOTES.length), 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <footer className="app-footer">
      <p key={idx} className="app-footer__quote anim-fade-in">“{FOOTER_QUOTES[idx]}”</p>
      <p className="app-footer__meta">
        © {new Date().getFullYear()} Six-Eye Puzzle · v1.0 · Developed by Ranasinghege H.R
      </p>
    </footer>
  );
}

export default function Layout() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="app-shell">
      <Header onOpenSettings={() => setSettingsOpen(true)} />
      <main className="app-main">
        {/* Key on pathname so each route fades in independently */}
        <div key={location.pathname} className="app-main__inner">
          <Outlet />
        </div>
      </main>
      <Footer />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
