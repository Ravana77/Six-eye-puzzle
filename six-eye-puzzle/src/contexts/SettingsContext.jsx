import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

/**
 * SettingsContext — global UX preferences.
 * Persists to localStorage; syncs across tabs via storage event.
 */
const STORAGE_KEY = "sep_settings_v1";

const defaults = {
  soundEnabled: true,
  musicVolume: 0.6,
  hapticsEnabled: true,
  motion: "auto", // 'auto' | 'on' | 'off'
};

const SettingsContext = createContext(null);

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

function persist(value) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* ignore quota / private-mode errors */
  }
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(readStored);

  // Persist on change
  useEffect(() => {
    persist(settings);
    // Reflect motion preference on <html> so CSS can pick it up
    const root = document.documentElement;
    if (settings.motion === "off") root.setAttribute("data-motion", "reduced");
    else root.removeAttribute("data-motion");
  }, [settings]);

  // Cross-tab sync
  useEffect(() => {
    const handler = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try { setSettings({ ...defaults, ...JSON.parse(e.newValue) }); } catch { /* ignore */ }
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const update = (patch) => setSettings((s) => ({ ...s, ...patch }));

  const value = useMemo(() => ({
    ...settings,
    setSoundEnabled:   (v) => update({ soundEnabled: !!v }),
    setMusicVolume:    (v) => update({ musicVolume: Math.min(1, Math.max(0, v)) }),
    setHapticsEnabled: (v) => update({ hapticsEnabled: !!v }),
    setMotion:         (v) => update({ motion: v }),
    reset:             () => setSettings(defaults),
  }), [settings]);

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
