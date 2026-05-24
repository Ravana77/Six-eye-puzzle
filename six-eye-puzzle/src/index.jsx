import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';

import { SessionProvider } from './sessionContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { AchievementsProvider } from './contexts/AchievementsContext';
import AchievementToast from './components/AchievementToast';

// Eagerly-loaded shell (small)
import App from './App';
import Layout from './layout';

// Lazy-loaded pages — reduces initial bundle and warms up while the
// splash animation runs.
const Login        = lazy(() => import('./login'));
const SignUp       = lazy(() => import('./signup'));
const Home         = lazy(() => import('./home'));
const Aboutus      = lazy(() => import('./aboutus'));
const Easy         = lazy(() => import('./easy'));
const Hard         = lazy(() => import('./hard'));
const How          = lazy(() => import('./how'));
const Profile      = lazy(() => import('./profile'));
const TimeAttack   = lazy(() => import('./timeattack'));
const Survival     = lazy(() => import('./survival'));
const Memory       = lazy(() => import('./memory'));
const Scramble     = lazy(() => import('./scramble'));
const Classic      = lazy(() => import('./classic'));
const Rank         = lazy(() => import('./rank'));
const Leaderboard  = lazy(() => import('./leaderboard'));
const DailyChallenge = lazy(() => import('./pages/DailyChallenge'));
const Achievements   = lazy(() => import('./pages/Achievements'));

function RouteFallback() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--neon-cyan)',
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      textShadow: '0 0 10px var(--neon-cyan)',
    }}>Loading…</div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SettingsProvider>
      <SessionProvider>
        <AchievementsProvider>
          <Router>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                {/* Splash (no chrome) */}
                <Route path="/" element={<App />} />

                {/* Auth (no chrome) */}
                <Route path="/auth/login"  element={<Login />} />
                <Route path="/auth/signup" element={<SignUp />} />

                {/* Legacy auth paths → redirect */}
                <Route path="/login"  element={<Navigate to="/auth/login"  replace />} />
                <Route path="/signup" element={<Navigate to="/auth/signup" replace />} />

                {/* Game (with Layout chrome) */}
                <Route path="/game" element={<Layout />}>
                  <Route index               element={<Navigate to="/game/home" replace />} />
                  <Route path="home"         element={<Home />} />
                  <Route path="aboutus"      element={<Aboutus />} />
                  <Route path="easy"         element={<Easy />} />
                  <Route path="hard"         element={<Hard />} />
                  <Route path="how"          element={<How />} />
                  <Route path="profile"      element={<Profile />} />
                  <Route path="timeattack"   element={<TimeAttack />} />
                  <Route path="survival"     element={<Survival />} />
                  <Route path="memory"       element={<Memory />} />
                  <Route path="scramble"     element={<Scramble />} />
                  <Route path="classic"      element={<Classic />} />
                  <Route path="rank"         element={<Rank />} />
                  <Route path="leaderboard"  element={<Leaderboard />} />
                  <Route path="daily"        element={<DailyChallenge />} />
                  <Route path="achievements" element={<Achievements />} />
                </Route>

                {/* Legacy game paths → redirect */}
                <Route path="/home"         element={<Navigate to="/game/home"         replace />} />
                <Route path="/aboutus"      element={<Navigate to="/game/aboutus"      replace />} />
                <Route path="/easy"         element={<Navigate to="/game/easy"         replace />} />
                <Route path="/hard"         element={<Navigate to="/game/hard"         replace />} />
                <Route path="/how"          element={<Navigate to="/game/how"          replace />} />
                <Route path="/profile"      element={<Navigate to="/game/profile"      replace />} />
                <Route path="/timeattack"   element={<Navigate to="/game/timeattack"   replace />} />
                <Route path="/survival"     element={<Navigate to="/game/survival"     replace />} />
                <Route path="/memory"       element={<Navigate to="/game/memory"       replace />} />
                <Route path="/scramble"     element={<Navigate to="/game/scramble"     replace />} />
                <Route path="/classic"      element={<Navigate to="/game/classic"      replace />} />
                <Route path="/rank"         element={<Navigate to="/game/rank"         replace />} />
                <Route path="/leaderboard"  element={<Navigate to="/game/leaderboard"  replace />} />

                {/* Catch-all → splash */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
            <AchievementToast />
          </Router>
        </AchievementsProvider>
      </SessionProvider>
    </SettingsProvider>
  </React.StrictMode>
);
