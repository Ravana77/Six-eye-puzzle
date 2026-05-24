import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "./sessionContext";
import { addUser, checkUser } from "./firebase";
import AuthShell from "./components/AuthShell";
import useSound from "./hooks/useSound";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formErr, setFormErr] = useState("");
  const [errors, setErrors] = useState({});
  const { login, logout } = useSession();
  const { play } = useSound();
  const navigate = useNavigate();

  const validate = () => {
    const next = {};
    if (!username.trim() || username.trim().length < 3) next.username = "Username must be at least 3 characters";
    if (!email || !EMAIL_RE.test(email)) next.email = "Enter a valid email";
    if (!password || password.length < 6) next.password = "Password must be at least 6 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErr("");
    if (!validate()) {
      play("wrong");
      return;
    }
    setSubmitting(true);
    try {
      // Check for username collision without side-effects (type === 'test')
      const exists = await checkUser(username, password, login, logout, "test");
      if (exists === true) {
        play("wrong");
        setFormErr("Username already taken. Try another.");
        setSubmitting(false);
        return;
      }
      const added = await addUser(username, email, password, login, logout);
      if (added) {
        play("victory");
        navigate("/game/home");
      } else {
        play("wrong");
        setFormErr("Could not create account. Check your details and try again.");
      }
    } catch (err) {
      play("wrong");
      setFormErr("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell>
      <section className="auth-card" aria-labelledby="signup-title">
        <h2 id="signup-title" className="auth-card__title">Sign Up</h2>

        {formErr && <div className="auth-alert" role="alert">{formErr}</div>}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label className="auth-field__label" htmlFor="signup-username">Username</label>
            <input
              id="signup-username"
              type="text"
              autoComplete="username"
              minLength={3}
              className="input-neon"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-invalid={!!errors.username}
              aria-describedby="signup-username-err"
              required
            />
            <span id="signup-username-err" className="auth-field__err">{errors.username}</span>
          </div>

          <div className="auth-field">
            <label className="auth-field__label" htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              className="input-neon"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby="signup-email-err"
              required
            />
            <span id="signup-email-err" className="auth-field__err">{errors.email}</span>
          </div>

          <div className="auth-field">
            <label className="auth-field__label" htmlFor="signup-password">Password</label>
            <div className="auth-pw-wrap">
              <input
                id="signup-password"
                type={showPw ? "text" : "password"}
                autoComplete="new-password"
                minLength={6}
                className="input-neon"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
                aria-describedby="signup-password-err"
                required
              />
              <button
                type="button"
                className="auth-pw-toggle"
                onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
            <span id="signup-password-err" className="auth-field__err">{errors.password}</span>
          </div>

          <button
            type="submit"
            className="btn-neon btn-neon--magenta btn-neon--block btn-neon--lg auth-submit"
            disabled={submitting}
            aria-busy={submitting}
          >
            {submitting && <span className="auth-spinner" aria-hidden="true" />}
            {submitting ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          Already a player?
          <Link to="/auth/login">Sign in</Link>
        </p>
      </section>
    </AuthShell>
  );
}

export default SignUp;
