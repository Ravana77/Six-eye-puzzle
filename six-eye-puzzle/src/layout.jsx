import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet } from "react-router-dom";

const Header = () => {

    return (
        <div>
            <header className="bg-dark text-white text-center py-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-2">
                            <img src="/logo.png" alt="Game Logo" width="400" height="auto" style={{ filter: "invert(1)" }} />
                        </div>
                        <div className="col-8">
                            <h1 className="display-4 text-primary fw-bold text-uppercase"
                                style={{
                                    fontFamily: "Orbitron, sans-serif",
                                    color: "#001f3f",
                                    WebkitTextStroke: "1px white",
                                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)"
                                }}>Six Eye Puzzle</h1>
                            <p className="lead text-warning fw-bold text-uppercase text-center"
                                style={{
                                    fontFamily: "Orbitron, sans-serif",
                                    textShadow: "2px 2px 8px rgba(255, 165, 0, 0.8)"
                                }}>
                                Unleash Your Inner Braniac
                            </p>
                        </div>
                        <div className="col-2 text-end align-items-center justify-content-center">
                            <img
                                src="/avatar.png"
                                alt="User Avatar"
                                width="50"
                                height="50"
                                className="rounded-circle me-2"
                            />
                            {/* Profile Button */}
                            <a href="./profile" target="_self" className="me-2">
                                <button className="btn btn-warning fw-bold text-uppercase">Profile</button>
                            </a>
                            {/* Leaderboard Button */}
                            <a href="./leaderboard" target="_self">
                                <button className="btn btn-dark fw-bold text-uppercase">Leaderboard</button>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav w-100 d-flex justify-content-around">
                            <li className="nav-item flex-grow-1 text-center">
                                <Link to="home" className="nav-link custom-glow">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item flex-grow-1 text-center">
                                <Link to="how" className="nav-link custom-glow">
                                    How to Play
                                </Link>
                            </li>
                            <li className="nav-item flex-grow-1 text-center">
                                <Link to="/aboutus" className="nav-link custom-glow">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <style>
                    {`
                        .custom-glow {
                            font-size: 1.5rem;
                            font-weight: bold;
                            text-transform: uppercase;
                            color: white;
                            text-decoration: none;
                            padding: 10px 20px;
                            border-radius: 10px;
                            transition: 0.3s ease-in-out;
                            box-shadow: 0 0 5px #ffcc00, 0 0 10px #ff9900, 0 0 15px #ff0000;
                        }

                        .custom-glow:hover {
                            transform: scale(1.1);
                            box-shadow: 0 0 10px #ff0000, 0 0 20px #ff9900, 0 0 30px #ffcc00;
                        }
                    `}
                </style>
            </nav>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-4">
            <div className="container">
                <p className="mb-1">Copyright Notice – © 2025 Six-Eye Puzzle. All rights reserved.</p>
                <p className="mb-1">Game Version – Version 1.0.0</p>
                <p className="mb-1">Contact Information – chillehasindu123@gmail.com</p>
                <p className="mb-1">Developer Credit – Developed by Ranasinghe H.R</p>
                <p className="mb-0">Tagline/Slogan (Optional) – "Challenge your mind with Six-Eye Puzzle!"</p>
            </div>
        </footer>
    );
};

const Layout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet /> {/* This renders the child routes dynamically */}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
