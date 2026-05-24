import React from "react";
import "../styles/auth.css";

/**
 * AuthShell — shared header/footer wrapper for /auth/login and /auth/signup.
 * Replaces the duplicated chrome that lived inline in both login.jsx and signup.jsx.
 */
export default function AuthShell({ children }) {
  return (
    <div className="auth-shell crt-effect">
      <header className="auth-header">
        <img
          src="/logo.png"
          alt=""
          className="auth-header__logo"
          aria-hidden="true"
        />
        <h1 className="auth-header__title">Six Eye Puzzle</h1>
        <p className="auth-header__subtitle">Unleash Your Inner Brainiac</p>
      </header>

      <main className="auth-main">{children}</main>

      <footer className="auth-footer">
        <p className="auth-footer__tag">Challenge your mind with Six-Eye Puzzle.</p>
        <p>© {new Date().getFullYear()} Six-Eye Puzzle · Version 1.0.0</p>
        <p>chillehasindu123@gmail.com · Developed by Ranasinghege H.R</p>
      </footer>
    </div>
  );
}
