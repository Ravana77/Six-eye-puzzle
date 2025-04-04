import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'; // New CSS file
import { useSession } from './sessionContext';
import { checkUser } from './firebase';
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, logout, user } = useSession();

  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredSignUp, setIsHoveredSignUp] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const isValidUser = await checkUser(username, password, login, logout, 'abc');
  
      if (isValidUser) {
        console.log('User logged in:', user);
        window.location.href = '/home';
      } else {
        alert('Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container crt-effect">
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
              Six Eye Puzzle
              </p>
            </div>
            <div className="col-8 col-md-2 order-2 order-md-3 text-end">
              {/* Placeholder */}
            </div>
          </div>
        </div>
      </header>
      
      <main className="login-main">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={4} className="login-form-container">
              <h2 className="login-form-title">Login</h2>
              <Form onSubmit={handleSignIn}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3 login-button"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    '--hover-state': isHovered ? 1 : 0
                  }}
                >
                  Sign In
                </Button>
              </Form>
              <div className="text-center">
                <Link
                  to="/signup"
                  className="login-signup-link"
                  onMouseEnter={() => setIsHoveredSignUp(true)}
                  onMouseLeave={() => setIsHoveredSignUp(false)}
                  style={{
                    '--hover-state': isHoveredSignUp ? 1 : 0
                  }}
                >
                  Don't have an account? Sign Up
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      <footer className="login-footer">
        <div className="container">
          <p className="mb-1 small">Copyright Notice – © 2025 Six-Eye Puzzle. All rights reserved.</p>
          <p className="mb-1 small">Game Version – Version 1.0.0</p>
          <p className="mb-1 small">Contact Information – chillehasindu123@gmail.com</p>
          <p className="mb-1 small">Developer Credit – Developed by Ranasinghege H.R</p>
          <p className="mb-0 small">"Challenge your mind with Six-Eye Puzzle!"</p>
        </div>
      </footer>
    </div>
  );
}

export default Login;