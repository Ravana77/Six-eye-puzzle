import React from 'react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllUsers } from './firebase'; // Import the usersRef from firebase.js

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
                    </div>
                </div>
            </header>
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

function App() {
  const handleGetUsers = async () => {
    try {
      const users = await getAllUsers(); // Call the async function and wait for the result
      console.log("Users:", users); // Log the fetched users
    } catch (error) {
      console.error("Error fetching users:", error); // Handle any errors
    }
  };

  return (
    <div className="App bg-dark text-white">
      <Header />
      <div className="container d-flex justify-content-center align-items-center min-vh-100 flex-column text-center">
        <h1 className="text-warning" style={{ textShadow: '0 0 5px #ff6600, 0 0 10px #ff6600' }}>SIX EYE PUZZLE</h1>
        <p className="description" style={{ fontSize: '1.5rem', marginBottom: '4rem', color: '#f5f5f5' }}>
          Ready for a challenge? Sign up or log in to start solving the SIX EYE PUZZLE and prove your skills.
        </p>
        <div className="d-flex gap-4">
          {/* Log In Button with Link */}
          <a 
            href="/login"
            onClick={(e) => {
              e.preventDefault(); // Prevent default navigation
              handleGetUsers();
            }}
            className="btn btn-warning btn-lg" 
            style={{ 
              transition: 'transform 0.3s, box-shadow 0.3s', 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              padding: '50px 100px', 
              boxShadow: '0 0 10px #ff6600, 0 0 20px #ff6600, 0 0 30px #ff6600'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.boxShadow = '0 0 15px #ff6600, 0 0 25px #ff6600, 0 0 35px #ff6600';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 0 10px #ff6600, 0 0 20px #ff6600, 0 0 30px #ff6600';
            }}
          >
            Log In
          </a>
          
          {/* Sign Up Button with Link */}
          <a 
            href="/signup" 
            className="btn btn-danger btn-lg"
            style={{ 
              transition: 'transform 0.3s, box-shadow 0.3s', 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              padding: '50px 100px', 
              boxShadow: '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.boxShadow = '0 0 15px #ff0000, 0 0 25px #ff0000, 0 0 35px #ff0000';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000';
            }}
          >
            Sign Up
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;