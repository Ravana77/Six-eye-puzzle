import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div className="d-flex vh-100 bg-dark align-items-center">
      {/* Left Side: Buttons */}
      <div className="d-flex flex-column align-items-center w-50 p-3">
        <a
          href="/easy" // Link to easy.jsx
          className="btn text-light fw-bold w-100 py-5 mb-3"
          style={{
            backgroundColor: 'orange',
            fontSize: '2rem',
            boxShadow: '0px 0px 30px orange',
            transition: '0.3s',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Easy
        </a>
        <a
          href="/hard" // Link to hard.jsx
          className="btn text-light fw-bold w-100 py-5"
          style={{
            backgroundColor: 'red',
            fontSize: '2rem',
            boxShadow: '0px 0px 30px red',
            transition: '0.3s',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Hard
        </a>
      </div>

    
      <div className="d-flex flex-column justify-content-center w-50 p-3 h-100">
        <div
          className="p-4 mb-3 text-light"
          style={{
            backgroundColor: '#222',
            borderRadius: '10px',
            boxShadow: '0px 0px 30px rgba(255, 165, 0, 1)',
            transition: '0.3s',
          }}
        >
          <h3 className="text-warning">Easy Mode</h3>
          <p>
          Type your answer, feel the glow, and get instant feedback! It's math with a fun, high-energy twist!
          </p>
        </div>
        <div
          className="p-4 text-light"
          style={{
            backgroundColor: '#222',
            borderRadius: '10px',
            boxShadow: '0px 0px 30px rgba(255, 0, 0, 1)',
            transition: '0.3s',
          }}
        >
          <h3 className="text-danger">Hard Mode</h3>
          <p>
          Race against the clock! Pick the right number in 10 seconds and watch the game glow with energy!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
