import { useCallback, useEffect, useRef } from "react";
import { useSettings } from "../contexts/SettingsContext";

/**
 * useSound — small, dependency-free SFX/haptic player.
 *
 * Uses WebAudio with simple synthesized tones (no MP3 assets needed,
 * keeps bundle tiny and offline-friendly). Each event is a short arcade-style
 * blip generated on the fly.
 *
 * Respects:
 *  - settings.soundEnabled (mute)
 *  - settings.musicVolume (master gain)
 *  - settings.hapticsEnabled (vibration)
 */
const TONES = {
  click:    { freq: 880,  dur: 0.06, type: "square",   sweep: 0,   vol: 0.18 },
  correct:  { freq: 660,  dur: 0.16, type: "triangle", sweep: 320, vol: 0.28 },
  wrong:    { freq: 220,  dur: 0.20, type: "sawtooth", sweep: -90, vol: 0.30 },
  tick:     { freq: 1320, dur: 0.04, type: "square",   sweep: 0,   vol: 0.14 },
  gameover: { freq: 200,  dur: 0.55, type: "sawtooth", sweep: -120, vol: 0.32 },
  victory:  { freq: 523,  dur: 0.35, type: "triangle", sweep: 480,  vol: 0.30 },
  unlock:   { freq: 740,  dur: 0.30, type: "triangle", sweep: 520,  vol: 0.30 },
  start:    { freq: 440,  dur: 0.18, type: "triangle", sweep: 180,  vol: 0.26 },
};

const HAPTIC_PATTERN = {
  click:    10,
  correct:  [12, 30, 16],
  wrong:    [40, 30, 40],
  gameover: [80, 60, 80, 60, 120],
  victory:  [20, 40, 20, 40, 60],
  unlock:   [30, 30, 60],
  start:    20,
};

export default function useSound() {
  const ctxRef = useRef(null);
  const { soundEnabled, musicVolume, hapticsEnabled } = useSettings();

  // Lazy-init AudioContext on first user interaction (browser autoplay policies)
  const getCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return null;
        ctxRef.current = new Ctx();
      } catch {
        return null;
      }
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume().catch(() => {});
    }
    return ctxRef.current;
  }, []);

  const play = useCallback((name) => {
    // Haptics
    if (hapticsEnabled && typeof navigator !== "undefined" && navigator.vibrate) {
      const pattern = HAPTIC_PATTERN[name];
      if (pattern) {
        try { navigator.vibrate(pattern); } catch { /* ignore */ }
      }
    }

    if (!soundEnabled) return;
    const tone = TONES[name];
    if (!tone) return;
    const ctx = getCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = tone.type;
      osc.frequency.setValueAtTime(tone.freq, now);
      if (tone.sweep) {
        osc.frequency.linearRampToValueAtTime(
          Math.max(40, tone.freq + tone.sweep),
          now + tone.dur,
        );
      }
      const peak = tone.vol * musicVolume;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(peak, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + tone.dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + tone.dur + 0.02);
    } catch {
      /* silent fail — never throw from a hook used in click handlers */
    }
  }, [soundEnabled, musicVolume, hapticsEnabled, getCtx]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (ctxRef.current && ctxRef.current.state !== "closed") {
        try { ctxRef.current.close(); } catch { /* ignore */ }
        ctxRef.current = null;
      }
    };
  }, []);

  return { play };
}
