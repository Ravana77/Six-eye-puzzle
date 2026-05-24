import React, { useEffect } from "react";
import { useAchievements } from "../contexts/AchievementsContext";
import useSound from "../hooks/useSound";
import "./AchievementToast.css";

/**
 * AchievementToast — listens to pending toast from AchievementsContext.
 * Mounted once near the root so it works regardless of which page unlocked.
 */
export default function AchievementToast() {
  const { pendingToast, dismissToast } = useAchievements();
  const { play } = useSound();

  useEffect(() => {
    if (!pendingToast) return;
    play("unlock");
    const id = setTimeout(() => dismissToast(), 4200);
    return () => clearTimeout(id);
  }, [pendingToast, dismissToast, play]);

  if (!pendingToast) return null;
  const a = pendingToast;

  return (
    <div
      className="ach-toast anim-fade-in-down"
      style={{ "--ach-color": a.color }}
      role="status"
      aria-live="polite"
      onClick={dismissToast}
    >
      <div className="ach-toast__icon" aria-hidden="true">{a.icon}</div>
      <div className="ach-toast__body">
        <div className="ach-toast__eyebrow">Achievement unlocked</div>
        <div className="ach-toast__title">{a.title}</div>
        <div className="ach-toast__desc">{a.desc}</div>
      </div>
    </div>
  );
}
