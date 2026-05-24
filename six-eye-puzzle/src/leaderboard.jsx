import React, { useEffect, useState } from "react";
import { fetchLeaderboard } from "./firebase";
import { useSession } from "./sessionContext";
import "./leaderboard.css";

const GAMES = [
  { key: "Time Attack", label: "Time Attack", color: "var(--mode-timeattack)", icon: "⏳" },
  { key: "Survival",    label: "Survival",    color: "var(--mode-survival)",   icon: "❤️" },
  { key: "Memory",      label: "Memory",      color: "var(--mode-memory)",     icon: "🧠" },
  { key: "Scramble",    label: "Scramble",    color: "var(--mode-scramble)",   icon: "🎲" },
];

const MEDAL = ["🥇", "🥈", "🥉"];

const Leaderboard = () => {
  const [gameType, setGameType] = useState("Time Attack");
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSession();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchLeaderboard(gameType)
      .then((data) => {
        if (!cancelled) {
          setScores(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [gameType]);

  const active = GAMES.find((g) => g.key === gameType);

  return (
    <div className="page page--narrow lb-page">
      <header className="lb-header">
        <h1 className="title-section">🏆 Leaderboard</h1>
        <p className="lb-sub">Top ten in each mode. Stay sharp — they reset on nothing.</p>
      </header>

      <div className="lb-tabs" role="tablist" aria-label="Game mode">
        {GAMES.map((g) => (
          <button
            key={g.key}
            type="button"
            role="tab"
            aria-selected={gameType === g.key}
            className={`lb-tab${gameType === g.key ? " is-active" : ""}`}
            style={{ "--tab-color": g.color }}
            onClick={() => setGameType(g.key)}
          >
            <span className="lb-tab__icon" aria-hidden="true">{g.icon}</span>
            {g.label}
          </button>
        ))}
      </div>

      <section
        className="lb-list-card"
        style={{ "--card-accent": active?.color }}
        aria-live="polite"
      >
        {loading ? (
          <div className="lb-skeletons">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="lb-skeleton skeleton" />
            ))}
          </div>
        ) : scores.length === 0 ? (
          <div className="lb-empty">No scores yet. Be the first.</div>
        ) : (
          <ol className="lb-list">
            {scores.slice(0, 10).map((s, i) => {
              const isMe = user && s.email === user.email;
              return (
                <li key={`${s.email}-${i}`} className={`lb-row${isMe ? " is-me" : ""} ${i < 3 ? "is-top" : ""}`}>
                  <span className="lb-row__rank">
                    {i < 3 ? <span className="lb-medal" aria-hidden="true">{MEDAL[i]}</span> : <span className="lb-row__num">{i + 1}</span>}
                  </span>
                  <span className="lb-row__name">
                    {s.name || s.email}
                    {isMe && <span className="lb-row__you">you</span>}
                  </span>
                  <span className="lb-row__score">{s.score}</span>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </div>
  );
};

export default Leaderboard;
