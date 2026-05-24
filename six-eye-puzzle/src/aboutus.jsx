import React from "react";
import "./aboutus.css";

const TECH = ["React 19", "React Router 7", "Firebase RTDB", "Bootstrap 5", "Banana API"];

export default function About() {
  return (
    <div className="page page--narrow about-page">
      <article className="about-card neon-card neon-card--purple">
        <header className="about-card__head">
          <h1 className="about-card__title">About</h1>
          <span className="about-card__year">© {new Date().getFullYear()}</span>
        </header>

        <p className="about-card__lead">
          <strong>Six-Eye Puzzle</strong> is a neon-soaked arcade of fast number puzzles
          designed to train your reflexes, memory, and pattern recognition.
        </p>

        <p>
          Built as part of the <strong>University of Bedfordshire</strong> coursework with
          <strong> React</strong> and <strong>Firebase Realtime Database</strong>. Puzzles
          are served by the <strong>Banana API</strong> — every round is a fresh challenge.
        </p>

        <hr className="neon-divider" />

        <h2 className="about-card__subtitle">Meet the Developer</h2>
        <p className="about-card__credit">👩‍💻 <strong>Ranasinghe H.R</strong> — Designer & Developer</p>

        <div className="about-tech">
          {TECH.map((t) => (
            <span key={t} className="about-tech__chip">{t}</span>
          ))}
        </div>
      </article>
    </div>
  );
}
