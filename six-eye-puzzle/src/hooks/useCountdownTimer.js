import { useEffect, useRef, useState, useCallback } from "react";

/**
 * useCountdownTimer — single source of truth for in-game countdowns.
 * Fixes the dual-useEffect bug in timeattack.jsx, stale closures in hard.jsx
 * and scramble.jsx, and the missing cleanup in memory.jsx.
 *
 * Behavior:
 *  - Pure useEffect interval, cleaned up on unmount.
 *  - `running` is the only "should the clock tick" gate.
 *  - `addSeconds` mutates timeLeft outside the interval so bonuses/penalties
 *    apply immediately without conflicting with the tick.
 *  - Fires `onExpire` exactly once when timeLeft transitions to 0.
 */
export default function useCountdownTimer({
  initialSeconds = 60,
  onExpire,
  tickIntervalMs = 1000,
} = {}) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const onExpireRef = useRef(onExpire);
  const firedRef = useRef(false);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, tickIntervalMs);
    return () => clearInterval(id);
  }, [running, tickIntervalMs]);

  // Fire expire callback only once per countdown
  useEffect(() => {
    if (running && timeLeft === 0 && !firedRef.current) {
      firedRef.current = true;
      setRunning(false);
      if (onExpireRef.current) onExpireRef.current();
    }
  }, [timeLeft, running]);

  const start = useCallback((seconds) => {
    firedRef.current = false;
    if (typeof seconds === "number") setTimeLeft(seconds);
    else setTimeLeft(initialSeconds);
    setRunning(true);
  }, [initialSeconds]);

  const pause  = useCallback(() => setRunning(false), []);
  const resume = useCallback(() => setRunning(true), []);

  const reset = useCallback((seconds) => {
    firedRef.current = false;
    setRunning(false);
    setTimeLeft(typeof seconds === "number" ? seconds : initialSeconds);
  }, [initialSeconds]);

  const addSeconds = useCallback((delta) => {
    setTimeLeft((prev) => Math.max(0, prev + delta));
  }, []);

  return { timeLeft, running, start, pause, resume, reset, addSeconds };
}
