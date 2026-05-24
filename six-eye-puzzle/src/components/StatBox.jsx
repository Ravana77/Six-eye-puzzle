import React, { memo } from "react";
import "./StatBox.css";

/**
 * StatBox — small label/value tile (timer, score, lives).
 * `critical` triggers the timerCritical pulse animation.
 */
function StatBox({ label, value, color = "var(--neon-cyan)", critical = false, icon = null, suffix = "" }) {
  return (
    <div className={`stat-box${critical ? " is-critical" : ""}`} style={{ "--stat-color": color }}>
      {icon && <span className="stat-box__icon" aria-hidden="true">{icon}</span>}
      <span className="stat-box__label">{label}</span>
      <span className="stat-box__value">
        {value}
        {suffix && <span className="stat-box__suffix">{suffix}</span>}
      </span>
    </div>
  );
}

export default memo(StatBox);
