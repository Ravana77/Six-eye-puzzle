import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css'; 
import { checkUser, addUser } from './firebase';
import { useSession } from './sessionContext';
import { Link } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, logout } = useSession();

  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredSignIn, setIsHoveredSignIn] = useState(false);
/* sign up functition*/
  const handleSignUp = (e) => {
    e.preventDefault();
    try {
      console.log('Signed Up:', username, email, password);
      const userExists = checkUser(username, password, login, logout, 'test');
      if (userExists === true) {
        alert('Username already exists. Please choose a different one.');
        return;
      }
      else {
        addUser(username, email, password, login, logout).then(() => {
          alert('Sign-up successful! Redirecting to home page...');
          window.location.href = '/home';
        }).catch((error) => {
          console.error('Error adding user:', error);
          alert('An error occurred. Please try again later.');
        });
      }
    }
    catch (error) {
      console.error('Error during sign-up:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="signup-container crt-effect">
      <header className="signup-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-4 col-md-2 order-1">
              <img 
                src="/logo.png" 
                alt="Game Logo" 
                className="img-fluid d-none d-md-block signup-logo" 
              />
            </div>
            <div className="col-12 col-md-8 order-3 order-md-2 mt-2 mt-md-0">
              <h1 className="signup-title">
                Six Eye Puzzle
              </h1>
              <p className="signup-subtitle">
                Unleash Your Inner Brainiac
              </p>
            </div>
            <div className="col-8 col-md-2 order-2 order-md-3 text-end">
              {/* Placeholder */}
            </div>
          </div>
        </div>
      </header>

      <main className="signup-main">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={4} className="signup-form-container">
              <h2 className="signup-form-title">Sign Up</h2>
              <Form onSubmit={handleSignUp}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="signup-input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signup-input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="signup-input"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3 signup-button"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    '--hover-state': isHovered ? 1 : 0
                  }}
                >
                  Sign Up
                </Button>
              </Form>
              <div className="text-center">
                <Link
                  to="/login"
                  className="signup-signin-link"
                  onMouseEnter={() => setIsHoveredSignIn(true)}
                  onMouseLeave={() => setIsHoveredSignIn(false)}
                  style={{
                    '--hover-state': isHoveredSignIn ? 1 : 0
                  }}
                >
                  Already have an account? Sign In
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      <footer className="signup-footer">
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

export default SignUp;