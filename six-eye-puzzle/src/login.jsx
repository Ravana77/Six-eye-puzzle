import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "./sessionContext";
import { checkUser } from "./firebase";
import AuthShell from "./components/AuthShell";
import useSound from "./hooks/useSound";

function Login() {
  const [username, setUsername] = useState("");
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
    if (!username.trim()) next.username = "Username is required";
    if (!password) next.password = "Password is required";
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
      const ok = await checkUser(username, password, login, logout, "abc");
      if (ok) {
        play("victory");
        navigate("/game/home");
      } else {
        play("wrong");
        setFormErr("Invalid username or password.");
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
      <section className="auth-card" aria-labelledby="login-title">
        <h2 id="login-title" className="auth-card__title">Login</h2>

        {formErr && <div className="auth-alert" role="alert">{formErr}</div>}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label className="auth-field__label" htmlFor="login-username">Username</label>
            <input
              id="login-username"
              type="text"
              autoComplete="username"
              className="input-neon"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-invalid={!!errors.username}
              aria-describedby="login-username-err"
              required
            />
            <span id="login-username-err" className="auth-field__err">{errors.username}</span>
          </div>

          <div className="auth-field">
            <label className="auth-field__label" htmlFor="login-password">Password</label>
            <div className="auth-pw-wrap">
              <input
                id="login-password"
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                className="input-neon"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
                aria-describedby="login-password-err"
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
            <span id="login-password-err" className="auth-field__err">{errors.password}</span>
          </div>

          <button
            type="submit"
            className="btn-neon btn-neon--cyan btn-neon--block btn-neon--lg auth-submit"
            disabled={submitting}
            aria-busy={submitting}
          >
            {submitting && <span className="auth-spinner" aria-hidden="true" />}
            {submitting ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="auth-switch">
          New here?
          <Link to="/auth/signup">Create an account</Link>
        </p>
      </section>
    </AuthShell>
  );
}

export default Login;
