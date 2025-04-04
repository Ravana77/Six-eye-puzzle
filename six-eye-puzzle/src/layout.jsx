import React from 'react';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet } from "react-router-dom";
import './layout.css';

const Header = () => {
    return (
        <div className="crt-effect">
            <header className="bg-black text-center py-2 py-md-3 border-bottom border-neon">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-4 col-md-2 order-1">
                            <img 
                                src="/logo.png" 
                                alt="Game Logo" 
                                className="img-fluid d-none d-md-block" 
                                style={{ 
                                    filter: "drop-shadow(0 0 8px #ff00ff) invert(0.8)",
                                    maxHeight: '80px'
                                }} 
                            />
                        </div>
                        <div className="col-12 col-md-8 order-3 order-md-2 mt-2 mt-md-0">
                            <h1 className="display-4 fw-bold text-uppercase mb-0 mb-md-1 neon-text-primary" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                                Six Eye Puzzle
                            </h1>
                            <p className="lead fw-bold text-uppercase neon-text-secondary mb-0" style={{ fontSize: 'clamp(0.8rem, 2vw, 1.25rem)' }}>
                                Unleash Your Inner Brainiac
                            </p>
                        </div>
                        <div className="col-8 col-md-2 order-2 order-md-3 text-end">
                            {/* Placeholder for potential mobile menu or other elements */}
                        </div>
                    </div>
                </div>
            </header>

            <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-neon">
                <div className="container px-0">
                    <button
                        className="navbar-toggler border-neon mx-auto"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav w-100 d-flex flex-wrap justify-content-center justify-content-lg-around">
                            {[
                                { to: "home", text: "Home" },
                                { to: "how", text: "How to Play" },
                                { to: "/leaderboard", text: "Leaderboard" },
                                { to: "/aboutus", text: "About Us" },
                                { to: "/profile", text: "Profile" }
                            ].map((item, index) => (
                                <li key={index} className="nav-item flex-grow-1 text-center mx-1 my-1 my-lg-0">
                                    <Link 
                                        to={item.to} 
                                        className="nav-link neon-nav-link py-2 py-lg-3"
                                        style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.25rem)' }}
                                    >
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

const Footer = () => {
    const [quote, setQuote] = useState("");

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await fetch("https://api.chucknorris.io/jokes/random");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data && data.value) { // Adjusted to use 'value' instead of 'text'
                    setQuote(data.value);
                } else {
                    setQuote("Challenge your mind with Six-Eye Puzzle!"); // Fallback quote
                }
            } catch (error) {
                console.error("Error fetching quote:", error);
                setQuote("Challenge your mind with Six-Eye Puzzle!"); // Fallback quote
            }
        };

        fetchQuote();
    }, []);
    
    return (
        <footer className="bg-black text-neon-secondary text-center py-3 border-top border-neon">
            <div>
            <h3 className="mb-1 large">{quote}</h3>
            </div>
            {/* <div className="container">
                <p className="mb-1 small">Copyright Notice – © 2025 Six-Eye Puzzle. All rights reserved.</p>
                <p className="mb-1 small">Game Version – Version 1.0.0</p>
                <p className="mb-1 small">Contact Information – chillehasindu123@gmail.com</p>
                <p className="mb-1 small">Developer Credit – Developed by Ranasinghege H.R</p>
                <p className="mb-0 small">"Challenge your mind with Six-Eye Puzzle!"</p>
            </div> */}
        </footer>
    );
};

const Layout = () => {
    return (
        <div className="text-white d-flex flex-column" style={{ minHeight: "100vh" }}>
            <Header />
            <main className="abcd py-4 flex-grow-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;