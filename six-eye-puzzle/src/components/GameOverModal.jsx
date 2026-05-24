import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./SettingsModal.css"; // shared overlay/modal frame
import "./GameOverModal.css";

/**
 * GameOverModal — single source of the four near-identical modals that
 * lived in memory.jsx, scramble.jsx, survival.jsx, timeattack.jsx.
 */
export default function GameOverModal({
  open,
  title = "Game Over",
  score,
  scoreLabel = "Score",
  stats = [],            // [{ label, value }]
  isHighScore = false,
  accent = "var(--neon-magenta)",
  onPlayAgain,
  backTo = "/game/rank",
  backLabel = "Back to Menu",
  ctaVariant = "magenta",
}) {
  // Esc to play again (close + restart) — but only if onPlayAgain provided
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Enter" && onPlayAgain) onPlayAgain();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onPlayAgain]);

  if (!open) return null;

  return (
    <div className="sep-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="game-over-title">
      <div
        className="sep-modal sep-modal--gameover anim-scale-in-bounce"
        style={{ "--modal-accent": accent }}
      >
        <div className="sep-modal__body">
          <h2 id="game-over-title" className="game-over__title">{title}</h2>

          {isHighScore && (
            <div className="game-over__highscore">🏆 New Personal Best!</div>
          )}

          <div className="game-over__score-block">
            <div className="game-over__score-label">{scoreLabel}</div>
            <div className="game-over__score-value">{score}</div>
          </div>

          {stats.length > 0 && (
            <div className="game-over__stats">
              {stats.map((s) => (
                <div className="game-over__stat" key={s.label}>
                  <span className="game-over__stat-label">{s.label}</span>
                  <span className="game-over__stat-value">{s.value}</span>
                </div>
              ))}
            </div>
          )}

          <div className="game-over__actions">
            <button
              type="button"
              className={`btn-neon btn-neon--${ctaVariant} btn-neon--block`}
              onClick={onPlayAgain}
            >
              Play Again
            </button>
            <Link to={backTo} className="btn-neon btn-neon--ghost btn-neon--purple btn-neon--block">
              {backLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
