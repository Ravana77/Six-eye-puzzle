import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css'; // Importing custom CSS for alignment fixes

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle the sign-up button hover state for glowing effect
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredSignIn, setIsHoveredSignIn] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Signed Up:', username, email, password);
  };

  // Inline styles for the glowing effect, zooming effect, and button appearance
  const glowingStyle = {
    transition: 'all 0.3s ease',
    backgroundColor: isHovered ? '#ff007f' : '#ff4d4d', // Pink on hover, bright red as default
    boxShadow: isHovered ? '0 0 15px rgba(255, 0, 127, 0.7)' : 'none',
    borderColor: isHovered ? '#ff007f' : '#ff4d4d',
    color: '#fff', // White text
    transform: isHovered ? 'scale(1.1)' : 'scale(1)', // Zoom effect on hover
  };

  const glowingSignInStyle = {
    transition: 'all 0.3s ease',
    backgroundColor: isHoveredSignIn ? '#00ff7f' : '#4d94ff', // Green on hover, bright blue as default
    boxShadow: isHoveredSignIn ? '0 0 15px rgba(0, 255, 127, 0.7)' : 'none',
    borderColor: isHoveredSignIn ? '#00ff7f' : '#4d94ff',
    color: '#fff', // White text
    transform: isHoveredSignIn ? 'scale(1.1)' : 'scale(1)', // Zoom effect on hover
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

      {/* SignUp Form Section */}
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Row className="justify-content-center w-100">
          <Col md={6} lg={4} className="bg-dark p-5 rounded shadow-lg">
            <h2 className="text-center text-white mb-4" style={{ fontFamily: 'Press Start 2P, cursive' }}> Sign Up</h2>
            <Form onSubmit={handleSignUp}>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ backgroundColor: '#444', color: '#fff', borderColor: '#444' }} // Dark input background
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ backgroundColor: '#444', color: '#fff', borderColor: '#444' }} // Dark input background
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ backgroundColor: '#444', color: '#fff', borderColor: '#444' }} // Dark input background
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
                onClick={() => window.location.href = '/home'} // Redirect to home page after sign-up
              >
                Sign Up
              </Button>
            </Form>
            <div className="text-center mt-3">
              <span className="text-white">
                <Button
                  variant="link"
                  className="text-light"
                  style={{ ...glowingSignInStyle, fontSize: '16px', textDecoration: 'none' }}
                  onMouseEnter={() => setIsHoveredSignIn(true)}
                  onMouseLeave={() => setIsHoveredSignIn(false)}
                  onClick={() => window.location.href = '/login'}
                >
                  Already have an account? Sign In
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

export default SignUp;
