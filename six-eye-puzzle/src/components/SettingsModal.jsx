import React, { useEffect } from "react";
import { useSettings } from "../contexts/SettingsContext";
import useSound from "../hooks/useSound";
import "./SettingsModal.css";

/**
 * SettingsModal — a small accessible drawer for sound/motion/haptics.
 * Implemented without bootstrap modals so it shares the project's neon
 * aesthetic + keyboard handling we control end-to-end.
 */
export default function SettingsModal({ open, onClose }) {
  const {
    soundEnabled, musicVolume, hapticsEnabled, motion,
    setSoundEnabled, setMusicVolume, setHapticsEnabled, setMotion, reset,
  } = useSettings();
  const { play } = useSound();

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock background scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="sep-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="settings-title" onClick={onClose}>
      <div className="sep-modal sep-modal--settings anim-scale-in-bounce" onClick={(e) => e.stopPropagation()}>
        <header className="sep-modal__header">
          <h2 id="settings-title" className="sep-modal__title">⚙ Settings</h2>
          <button className="sep-modal__close" onClick={onClose} aria-label="Close settings">×</button>
        </header>

        <div className="sep-modal__body stack-lg">
          <label className="setting-row">
            <span className="setting-row__label">Sound effects</span>
            <input
              type="checkbox"
              className="toggle-input"
              checked={soundEnabled}
              onChange={(e) => { setSoundEnabled(e.target.checked); if (e.target.checked) play("click"); }}
              aria-label="Enable sound effects"
            />
            <span className="toggle-switch" aria-hidden="true" />
          </label>

          <div className="setting-row setting-row--column">
            <span className="setting-row__label">Volume — {Math.round(musicVolume * 100)}%</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={musicVolume}
              onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
              className="volume-slider"
              aria-label="Master volume"
            />
          </div>

          <label className="setting-row">
            <span className="setting-row__label">Haptic feedback (mobile)</span>
            <input
              type="checkbox"
              className="toggle-input"
              checked={hapticsEnabled}
              onChange={(e) => setHapticsEnabled(e.target.checked)}
              aria-label="Enable haptic feedback"
            />
            <span className="toggle-switch" aria-hidden="true" />
          </label>

          <div className="setting-row setting-row--column">
            <span className="setting-row__label">Animations</span>
            <div className="segmented">
              {[
                { v: "auto", l: "Auto" },
                { v: "on",   l: "On" },
                { v: "off",  l: "Reduced" },
              ].map((opt) => (
                <button
                  key={opt.v}
                  className={`segmented__btn${motion === opt.v ? " is-active" : ""}`}
                  onClick={() => { setMotion(opt.v); play("click"); }}
                  type="button"
                  aria-pressed={motion === opt.v}
                >
                  {opt.l}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="btn-neon btn-neon--ghost btn-neon--error btn-neon--sm"
            onClick={() => {
              if (window.confirm("Reset all settings to defaults? (Game scores are not affected.)")) {
                reset();
                play("click");
              }
            }}
          >
            Reset Settings
          </button>
        </div>
      </div>
    </div>
  );
}
