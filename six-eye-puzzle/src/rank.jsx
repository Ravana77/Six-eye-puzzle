import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Rank() {
  return (
    <div className="d-flex vh-100 bg-dark align-items-center">
      {/* Left Side: Buttons */}
      <div className="d-flex flex-column align-items-center w-50 p-3">
        <a
          href="/timeattack" // Link to timeattack.jsx
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
          Time Attack
        </a>
        <a
          href="/survival" // Link to survival.jsx
          className="btn text-light fw-bold w-100 py-5 mb-3"
          style={{
            backgroundColor: 'red',
            fontSize: '2rem',
            boxShadow: '0px 0px 30px red',
            transition: '0.3s',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Survival
        </a>
      </div>

      {/* Right Side: Buttons */}
      <div className="d-flex flex-column justify-content-center w-50 p-3 h-100">
        <a
          href="/memory" // Link to memory.jsx
          className="btn text-light fw-bold w-100 py-5 mb-3"
          style={{
            backgroundColor: 'blue',
            fontSize: '2rem',
            boxShadow: '0px 0px 30px blue',
            transition: '0.3s',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Memory
        </a>
        <a
          href="/scramble" // Link to scramble.jsx
          className="btn text-light fw-bold w-100 py-5 mb-3"
          style={{
            backgroundColor: 'green',
            fontSize: '2rem',
            boxShadow: '0px 0px 30px green',
            transition: '0.3s',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Scramble
        </a>
      </div>
    </div>
  );
}

export default Rank;
