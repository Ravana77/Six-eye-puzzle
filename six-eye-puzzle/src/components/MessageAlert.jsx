import React, { useEffect } from "react";
import "./MessageAlert.css";

/**
 * MessageAlert — animated correct/wrong/info toast.
 * Fixed-position so it never goes off-screen on mobile.
 * Auto-dismisses after `duration` ms (default 1500).
 */
export default function MessageAlert({ message, type = "info", duration = 1500, onDismiss }) {
  useEffect(() => {
    if (!message || !duration) return;
    const id = setTimeout(() => onDismiss && onDismiss(), duration);
    return () => clearTimeout(id);
  }, [message, duration, onDismiss]);

  if (!message) return null;

  return (
    <div className={`message-alert message-alert--${type} anim-scale-in`} role="status" aria-live="polite">
      <span className="message-alert__text">{message}</span>
    </div>
  );
}
