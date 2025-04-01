import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css'; // Importing custom CSS for alignment fixes

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle the sign-in button hover state for glowing effect
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredSignUp, setIsHoveredSignUp] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Signed In:', username, password);
  };

  // Inline styles for the glowing effect and button appearance
  const glowingStyle = {
    transition: 'all 0.4s ease',
    backgroundColor: isHovered ? '#ff007f' : '#9b59b6', // Purple glow when idle, pink on hover
    boxShadow: isHovered ? '0 0 20px rgba(255, 0, 127, 0.8), 0 0 25px rgba(255, 0, 127, 0.6)' : '0 0 10px rgba(155, 89, 182, 0.8)',
    borderColor: isHovered ? '#ff007f' : '#9b59b6',
    color: '#fff', // White text
    transform: isHovered ? 'scale(1.1)' : 'scale(1)', // Grow on hover
  };

  const glowingSignUpStyle = {
    transition: 'all 0.4s ease',
    backgroundColor: isHoveredSignUp ? '#00ff7f' : '#3498db', // Blue glow when idle, green on hover
    boxShadow: isHoveredSignUp ? '0 0 20px rgba(0, 255, 127, 0.8), 0 0 25px rgba(0, 255, 127, 0.6)' : '0 0 10px rgba(52, 152, 219, 0.8)',
    borderColor: isHoveredSignUp ? '#00ff7f' : '#3498db',
    color: '#fff', // White text
    transform: isHoveredSignUp ? 'scale(1.1)' : 'scale(1)', // Grow on hover
  };

  return (
    <div style={{ backgroundColor: '#000', height: '100vh' }}>

      {/* Header Section */}
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

      {/* Login Form Section */}
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Row className="justify-content-center w-100">
          <Col md={6} lg={4} className="bg-dark p-5 rounded shadow-lg">
            <h2 className="text-center text-white mb-4" style={{ fontFamily: 'Press Start 2P, cursive' }}> Login</h2>
            <Form onSubmit={handleSignIn}>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    backgroundColor: '#444',
                    color: '#fff',
                    borderColor: '#444',
                    transition: 'all 0.3s ease',
                  }} // Dark input background
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    backgroundColor: '#444',
                    color: '#fff',
                    borderColor: '#444',
                    transition: 'all 0.3s ease',
                  }} // Dark input background
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                block
                className="w-100"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={glowingStyle}
                onClick={() => window.location.href = '/home'}
              >
                Sign In
              </Button>
            </Form>
            <div className="text-center mt-3">
              <span className="text-white">
                <Button
                  variant="link"
                  className="text-light"
                  style={{
                    ...glowingSignUpStyle,
                    fontSize: '16px',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={() => setIsHoveredSignUp(true)}
                  onMouseLeave={() => setIsHoveredSignUp(false)}
                  onClick={() => window.location.href = '/signup'}
                >
                  Don't have an account? Sign Up
                </Button>
              </span>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <p className="mb-1">Copyright Notice – © 2025 Six-Eye Puzzle. All rights reserved.</p>
          <p className="mb-1">Game Version – Version 1.0.0</p>
          <p className="mb-1">Contact Information – chillehasindu123@gmail.com</p>
          <p className="mb-1">Developer Credit – Developed by Ranasinghe H.R</p>
          <p className="mb-0">Tagline/Slogan (Optional) – "Challenge your mind with Six-Eye Puzzle!"</p>
        </div>
      </footer>

    </div>
  );
}

export default Login;
