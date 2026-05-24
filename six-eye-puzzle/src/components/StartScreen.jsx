import React from "react";
import "./StartScreen.css";

/**
 * StartScreen — shared "press to begin" splash for every game mode.
 * Avoids duplication of the same JSX across 6 game files.
 */
export default function StartScreen({
  icon,
  title,
  description,
  cta = "Start",
  accent = "var(--neon-cyan)",
  variant = "cyan", // matches .btn-neon-- variants: cyan|magenta|easy|hard|timeattack|survival|memory|scramble|daily
  onStart,
  meta = null,         // optional small line (e.g. "Best: 12")
  rules = null,        // optional array of rule strings
}) {
  return (
    <section className="start-screen anim-fade-in-up" style={{ "--start-accent": accent }}>
      {icon && <div className="start-screen__icon" aria-hidden="true">{icon}</div>}
      <h1 className="start-screen__title">{title}</h1>
      {description && <p className="start-screen__desc">{description}</p>}

      {rules && rules.length > 0 && (
        <ul className="start-screen__rules" aria-label="How to play">
          {rules.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      )}

      {meta && <div className="start-screen__meta">{meta}</div>}

      <button
        type="button"
        className={`btn-neon btn-neon--${variant} btn-neon--lg btn-neon--block start-screen__cta`}
        onClick={onStart}
      >
        {cta} ▶
      </button>
    </section>
  );
}
