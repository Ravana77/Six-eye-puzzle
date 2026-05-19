import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Header = () => {
    return (
        <div className="crt-effect">
            <header className="login-header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-4 col-md-2 order-1">
                            <img 
                                src="/logo.png" 
                                alt="Game Logo" 
                                className="img-fluid d-none d-md-block login-logo" 
                            />
                        </div>
                        <div className="col-12 col-md-8 order-3 order-md-2 mt-2 mt-md-0">
                            <h1 className="login-title">
                                Six Eye Puzzle
                            </h1>
                            <p className="login-subtitle">
                                Unleash Your Inner Brainiac
                            </p>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="login-footer">
            <div className="container">
                <p className="mb-1 small">Copyright Notice – © 2025 Six-Eye Puzzle. All rights reserved.</p>
                <p className="mb-1 small">Game Version – Version 1.0.0</p>
                <p className="mb-1 small">Contact Information – chillehasindu123@gmail.com</p>
                <p className="mb-1 small">Developer Credit – Developed by Ranasinghege H.R</p>
                <p className="mb-0 small">"Challenge your mind with Six-Eye Puzzle!"</p>
            </div>
        </footer>
    );
};

function App() {
    const [showWelcome, setShowWelcome] = useState(true);
    const [welcomeAnimation, setWelcomeAnimation] = useState('');

    useEffect(() => {
        // Welcome animation sequence
        setWelcomeAnimation('welcome-enter');
        const timer = setTimeout(() => {
            setWelcomeAnimation('welcome-exit');
            setTimeout(() => setShowWelcome(false), 1000);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="app-container crt-effect">
            {/* Welcome Popup */}
            {showWelcome && (
                <div className={`welcome-popup ${welcomeAnimation}`}>
                    <div className="welcome-text">WELCOME TO</div>
                    <div className="welcome-text main-title">SIX-EYE-PUZZLE</div>
                </div>
            )}

            <Header />
            <main className="login-main">
                <div className="content-container">
                    <div className="container d-flex justify-content-center align-items-center min-vh-100 flex-column text-center">
                        <h1 className="app-title">SIX EYE PUZZLE</h1>
                        <p className="app-description">
                            Ready for a challenge? Sign up or log in to start solving the SIX EYE PUZZLE and prove your skills.
                        </p>
                        <div className="d-flex gap-4 app-buttons">
                            <a href="/login" className="app-login-btn">
                                Log In
                            </a>
                            <a href="/signup" className="app-signup-btn">
                                Sign Up
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;