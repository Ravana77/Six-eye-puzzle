import React, { memo, useEffect, useMemo } from "react";
import "./NumberPad.css";

/**
 * NumberPad — 10-button digit grid (0–9). Replaces 4 hand-rolled grids
 * across memory, scramble, survival, timeattack (and hard's 0-10 grid).
 *
 * Props:
 *   onSelect    (number) => void
 *   disabled    boolean
 *   selected    number | null
 *   correct     number | null    -> after select, highlights correct/wrong
 *   shuffled    boolean          -> randomises display order
 *   accent      css color var    -> per-mode accent
 *   includeTen  boolean          -> add a "10" key (hard mode)
 *   onShuffle   () => any        -> called when a new shuffle is computed; receives the array
 *   shuffleSeed any              -> change this to trigger a re-shuffle
 */
function NumberPad({
  onSelect,
  disabled = false,
  selected = null,
  correct = null,
  shuffled = false,
  accent = "var(--neon-cyan)",
  includeTen = false,
  shuffleSeed = 0,
  onShuffle,
}) {
  const baseDigits = useMemo(
    () => (includeTen ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
    [includeTen],
  );

  const digits = useMemo(() => {
    if (!shuffled) return baseDigits;
    const arr = [...baseDigits];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffled, baseDigits, shuffleSeed]);

  useEffect(() => {
    if (shuffled && onShuffle) onShuffle(digits);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits]);

  return (
    <div
      className={`number-pad${includeTen ? " number-pad--11" : ""}`}
      style={{ "--pad-accent": accent }}
      role="group"
      aria-label="Number selection pad"
    >
      {digits.map((d, idx) => {
        const isSelected = selected === d;
        let state = "";
        if (isSelected && correct != null) {
          state = d === correct ? "is-correct" : "is-incorrect";
        } else if (isSelected) {
          state = "is-selected";
        }
        return (
          <button
            key={d}
            type="button"
            className={`number-key ${state} anim-fade-in-up`}
            style={{ animationDelay: `${idx * 24}ms` }}
            disabled={disabled}
            onClick={() => onSelect(d)}
            aria-label={`Number ${d}`}
          >
            {d}
          </button>
        );
      })}
    </div>
  );
}

export default memo(NumberPad);
