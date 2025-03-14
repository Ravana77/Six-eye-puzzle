import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



const Header = () => {
    return (
        <div>
            <header className="bg-dark text-white text-center py-4">
                <div className="container">
                    <div className="row">
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
       fontFamily: "Orbitron, sans-serif", // Futuristic gaming font
       textShadow: "2px 2px 8px rgba(255, 165, 0, 0.8)" // Orange glow effect
   }}>
   Unleash Your Inner Braniac
</p>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
            </header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav w-100 d-flex justify-content-around">
                            <li className="nav-item flex-grow-1 text-center">
                                <a className="nav-link btn btn-lg text-white fw-bold w-100 hover-effect fs-1">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item flex-grow-1 text-center">
                                <a className="nav-link btn btn-lg text-white fw-bold w-100 hover-effect fs-1">
                                    How to play
                                </a>
                            </li>
                            <li className="nav-item flex-grow-1 text-center">
                                <a className="nav-link btn btn-lg text-white fw-bold w-100 hover-effect fs-1">
                                    About Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
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

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;