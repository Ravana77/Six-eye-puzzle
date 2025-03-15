import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App bg-dark text-white">
      <div className="container d-flex justify-content-center align-items-center min-vh-100 flex-column text-center">
        <h1 className="text-warning" style={{ textShadow: '0 0 5px #ff6600, 0 0 10px #ff6600' }}>SIX EYE PUZZLE</h1>
        <p className="description" style={{ fontSize: '1.5rem', marginBottom: '4rem', color: '#f5f5f5' }}>
          Ready for a challenge? Sign up or log in to start solving the SIX EYE PUZZLE and prove your skills.
        </p>
        <div className="d-flex gap-4">
          {/* Log In Button with Link */}
          <a 
            href="/login" 
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
    </div>
  );
}

export default App;
