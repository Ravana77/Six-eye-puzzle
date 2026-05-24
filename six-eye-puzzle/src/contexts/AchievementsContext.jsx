import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "sep_achievements_v1";

/**
 * Achievement catalog. Each entry knows how to evaluate itself against an
 * event the games dispatch (`recordEvent`).
 *
 * Event shapes:
 *   { type: 'game_complete', mode, score }
 *   { type: 'streak',        mode, value }
 *   { type: 'time_under',    mode, seconds }
 *   { type: 'daily_streak',  value }
 *   { type: 'daily_solved',  date }
 *   { type: 'mode_played',   mode }
 */
export const ACHIEVEMENTS = [
  { id: "first_blood",    title: "First Blood",          desc: "Win your first game in any mode.",        icon: "💥", color: "var(--neon-magenta)",
    check: (ev) => ev.type === "game_complete" && ev.score > 0 },

  { id: "streak_10",      title: "On A Roll",            desc: "Score a streak of 10 in any mode.",        icon: "🔥", color: "var(--mode-survival)",
    check: (ev) => ev.type === "streak" && ev.value >= 10 },

  { id: "streak_25",      title: "Untouchable",          desc: "Score a streak of 25 in any mode.",        icon: "👑", color: "var(--mode-scramble)",
    check: (ev) => ev.type === "streak" && ev.value >= 25 },

  { id: "time_attack_20", title: "Speed Demon",          desc: "Score 20+ in Time Attack.",                icon: "⚡", color: "var(--mode-timeattack)",
    check: (ev) => ev.type === "game_complete" && ev.mode === "timeattack" && ev.score >= 20 },

  { id: "memory_15",      title: "Photographic Memory",  desc: "Score 15+ in Memory mode.",                icon: "🧠", color: "var(--mode-memory)",
    check: (ev) => ev.type === "game_complete" && ev.mode === "memory" && ev.score >= 15 },

  { id: "survival_15",    title: "Last One Standing",    desc: "Score 15+ in Survival mode.",              icon: "❤️", color: "var(--mode-survival)",
    check: (ev) => ev.type === "game_complete" && ev.mode === "survival" && ev.score >= 15 },

  { id: "scramble_20",    title: "Sequence Master",      desc: "Score 20+ in Scramble mode.",              icon: "🎲", color: "var(--mode-scramble)",
    check: (ev) => ev.type === "game_complete" && ev.mode === "scramble" && ev.score >= 20 },

  { id: "hard_winner",    title: "Hard Mode Hero",       desc: "Win a round of Hard mode.",                icon: "💎", color: "var(--mode-hard)",
    check: (ev) => ev.type === "game_complete" && ev.mode === "hard" && ev.score > 0 },

  { id: "explorer",       title: "Explorer",             desc: "Play every game mode at least once.",       icon: "🗺️", color: "var(--neon-cyan)",
    check: (_, state) => {
      const modes = ["easy", "hard", "memory", "scramble", "survival", "timeattack"];
      return modes.every((m) => state.modesPlayed[m]);
    }},

  { id: "daily_3",        title: "Three In A Row",       desc: "Complete a 3-day daily streak.",            icon: "📅", color: "var(--mode-daily)",
    check: (ev) => ev.type === "daily_streak" && ev.value >= 3 },

  { id: "daily_7",        title: "Weekly Warrior",       desc: "Complete a 7-day daily streak.",            icon: "🗓️", color: "var(--mode-daily)",
    check: (ev) => ev.type === "daily_streak" && ev.value >= 7 },

  { id: "daily_30",       title: "Monthly Master",       desc: "Complete a 30-day daily streak.",           icon: "🏅", color: "var(--mode-daily)",
    check: (ev) => ev.type === "daily_streak" && ev.value >= 30 },

  { id: "century",        title: "Centurion",            desc: "Reach a score of 100 in any mode.",         icon: "💯", color: "var(--neon-cyan)",
    check: (ev) => ev.type === "game_complete" && ev.score >= 100 },

  { id: "perfectionist",  title: "Perfectionist",        desc: "Win Hard mode in under 5 seconds.",         icon: "⏱️", color: "var(--mode-hard)",
    check: (ev) => ev.type === "time_under" && ev.mode === "hard" && ev.seconds < 5 },

  { id: "night_owl",      title: "Night Owl",            desc: "Play between 12 AM and 5 AM.",              icon: "🌙", color: "var(--neon-purple)",
    check: () => { const h = new Date().getHours(); return h < 5; }},
];

const AchievementsContext = createContext(null);

const emptyState = () => ({
  unlocked: {},            // { [id]: { unlockedAt } }
  modesPlayed: {},          // { [mode]: true }
  recent: [],               // [id, id, id]
});

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    return { ...emptyState(), ...JSON.parse(raw) };
  } catch { return emptyState(); }
}

export function AchievementsProvider({ children }) {
  const [state, setState] = useState(readStored);
  const [pendingToast, setPendingToast] = useState(null); // achievement just unlocked

  // Persist
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state]);

  const unlock = useCallback((id) => {
    const ach = ACHIEVEMENTS.find((a) => a.id === id);
    if (!ach) return false;
    let didUnlock = false;
    setState((prev) => {
      if (prev.unlocked[id]) return prev;
      didUnlock = true;
      const unlockedAt = Date.now();
      const recent = [id, ...prev.recent.filter((r) => r !== id)].slice(0, 5);
      return {
        ...prev,
        unlocked: { ...prev.unlocked, [id]: { unlockedAt } },
        recent,
      };
    });
    if (didUnlock) setPendingToast(ach);
    return didUnlock;
  }, []);

  const recordEvent = useCallback((event) => {
    // mark mode played
    if (event.mode) {
      setState((prev) =>
        prev.modesPlayed[event.mode]
          ? prev
          : { ...prev, modesPlayed: { ...prev.modesPlayed, [event.mode]: true } }
      );
    }
    // evaluate after the state update so explorer can see fresh modesPlayed
    setTimeout(() => {
      setState((prev) => {
        const newlyUnlocked = [];
        ACHIEVEMENTS.forEach((ach) => {
          if (prev.unlocked[ach.id]) return;
          try {
            if (ach.check(event, prev)) newlyUnlocked.push(ach);
          } catch { /* never let a bad check break the game */ }
        });
        if (!newlyUnlocked.length) return prev;
        const now = Date.now();
        const unlocked = { ...prev.unlocked };
        const recent = [...prev.recent];
        newlyUnlocked.forEach((ach) => {
          unlocked[ach.id] = { unlockedAt: now };
          recent.unshift(ach.id);
        });
        // queue the first unlock for the toast
        setPendingToast(newlyUnlocked[0]);
        return { ...prev, unlocked, recent: recent.slice(0, 5) };
      });
    }, 0);
  }, []);

  const dismissToast = useCallback(() => setPendingToast(null), []);

  const value = useMemo(() => ({
    all: ACHIEVEMENTS,
    unlocked: state.unlocked,
    recent: state.recent,
    isUnlocked: (id) => Boolean(state.unlocked[id]),
    unlock,
    recordEvent,
    pendingToast,
    dismissToast,
  }), [state, unlock, recordEvent, pendingToast, dismissToast]);

  return (
    <AchievementsContext.Provider value={value}>{children}</AchievementsContext.Provider>
  );
}

export function useAchievements() {
  const ctx = useContext(AchievementsContext);
  if (!ctx) throw new Error("useAchievements must be used within AchievementsProvider");
  return ctx;
}
