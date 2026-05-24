import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "./sessionContext";
import { useAchievements } from "./contexts/AchievementsContext";
import useSound from "./hooks/useSound";
import "./profile.css";

function initialsOf(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("") || "P";
}

const STATS = [
  { key: "timeattack", label: "Time Attack", icon: "⏳", color: "var(--mode-timeattack)" },
  { key: "survival",   label: "Survival",    icon: "❤️", color: "var(--mode-survival)" },
  { key: "memory",     label: "Memory",      icon: "🧠", color: "var(--mode-memory)" },
  { key: "scramble",   label: "Scramble",    icon: "🎲", color: "var(--mode-scramble)" },
];

const Profile = () => {
  const { user, logout } = useSession();
  const { all, unlocked, recent } = useAchievements();
  const { play } = useSound();
  const navigate = useNavigate();

  const unlockedCount = Object.keys(unlocked).length;
  const recentAchievements = useMemo(
    () => recent
      .map((id) => all.find((a) => a.id === id))
      .filter(Boolean)
      .slice(0, 3),
    [recent, all],
  );

  const handleLogout = () => {
    play("click");
    logout();
    navigate("/auth/login", { replace: true });
  };

  if (!user) {
    return (
      <div className="page page--narrow profile-page">
        <div className="neon-card">
          <h2 className="title-section">Not signed in</h2>
          <p className="text-soft">Log in to view your profile and stats.</p>
          <Link to="/auth/login" className="btn-neon btn-neon--cyan">Sign In</Link>
        </div>
      </div>
    );
  }

  const totalScore = STATS.reduce((sum, s) => sum + (user[s.key] || 0), 0);

  return (
    <div className="page profile-page">
      <header className="profile-hero">
        <div className="profile-avatar" aria-hidden="true">
          {initialsOf(user.name)}
        </div>
        <div className="profile-hero__text">
          <h1 className="profile-hero__name">{user.name || "Player"}</h1>
          <p className="profile-hero__email">{user.email || "—"}</p>
          <div className="profile-hero__chips">
            <span className="profile-chip">Total: <strong>{totalScore}</strong></span>
            <span className="profile-chip">Achievements: <strong>{unlockedCount}/{all.length}</strong></span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="btn-neon btn-neon--ghost btn-neon--magenta btn-neon--sm profile-hero__logout"
        >
          Sign Out
        </button>
      </header>

      <section className="profile-stats" aria-label="Personal best scores">
        {STATS.map((s) => (
          <div className="profile-stat" key={s.key} style={{ "--stat-color": s.color }}>
            <div className="profile-stat__icon" aria-hidden="true">{s.icon}</div>
            <div className="profile-stat__label">{s.label}</div>
            <div className="profile-stat__val">{user[s.key] || 0}</div>
            <div className="profile-stat__hint">Personal Best</div>
          </div>
        ))}
      </section>

      <section className="profile-achievements">
        <header className="profile-achievements__head">
          <h2 className="profile-achievements__title">Recent Achievements</h2>
          <Link to="/game/achievements" className="profile-achievements__link">
            View all →
          </Link>
        </header>

        {recentAchievements.length === 0 ? (
          <div className="profile-achievements__empty">
            No achievements yet — play a few rounds to unlock badges.
          </div>
        ) : (
          <ul className="profile-achievements__list">
            {recentAchievements.map((a) => (
              <li key={a.id} className="profile-ach" style={{ "--ach-color": a.color }}>
                <span className="profile-ach__icon" aria-hidden="true">{a.icon}</span>
                <div>
                  <div className="profile-ach__title">{a.title}</div>
                  <div className="profile-ach__desc">{a.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Profile;
