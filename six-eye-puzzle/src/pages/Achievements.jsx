import React from "react";
import { Link } from "react-router-dom";
import { useAchievements } from "../contexts/AchievementsContext";
import "./Achievements.css";

export default function Achievements() {
  const { all, unlocked } = useAchievements();
  const unlockedCount = Object.keys(unlocked).length;

  return (
    <main className="page achievements-page anim-fade-in">
      <header className="achievements-header">
        <div>
          <h1 className="title-section">🏆 Achievements</h1>
          <p className="achievements-sub">
            Unlocked <strong>{unlockedCount}</strong> of <strong>{all.length}</strong>
          </p>
        </div>
        <Link to="/game/profile" className="btn-neon btn-neon--ghost btn-neon--sm btn-neon--cyan">
          ← Profile
        </Link>
      </header>

      <div className="achievements-progress">
        <div className="achievements-progress__bar" style={{ width: `${(unlockedCount / all.length) * 100}%` }} />
      </div>

      <ul className="achievements-grid">
        {all.map((ach) => {
          const u = unlocked[ach.id];
          return (
            <li key={ach.id} className={`achievement-card${u ? " is-unlocked" : ""}`} style={{ "--ach-color": ach.color }}>
              <div className="achievement-card__icon" aria-hidden="true">{ach.icon}</div>
              <div className="achievement-card__body">
                <div className="achievement-card__title">{ach.title}</div>
                <div className="achievement-card__desc">{ach.desc}</div>
                {u && (
                  <div className="achievement-card__unlocked">
                    Unlocked {new Date(u.unlockedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
