import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const App = () => {
  const userProfile = {
    username: 'Gamer123',
    email: 'gamer123@example.com',
    highestScoreEasy: 1500,
    highestScoreHard: 1200,
  };

  return (
    <Container
      fluid
      className="text-center d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundColor: '#0a0a0a', 
        color: '#fff',
        minHeight: '100vh',
        padding: '50px 20px',
      }}
    >
      {/* Profile Heading */}
      <h1 
        className="mb-5 fw-bold"
        style={{ 
          textShadow: '0px 0px 15px #00ffff',
          color: '#00ffff',
          fontSize: '3rem'
        }}
      >
        <i className="bi bi-person-circle"></i> User Profile
      </h1>

      {/* Profile Card */}
      <Card
        className="bg-dark text-white border border-info mb-5"
        style={{
          width: '450px',
          padding: '20px',
          boxShadow: '0px 0px 25px #00ffff',
        }}
      >
        <Card.Body>
          <Card.Title className="fs-2" style={{ color: '#ff00ff', textShadow: '0px 0px 10px #ff00ff' }}>
            <i className="bi bi-controller"></i> {userProfile.username}
          </Card.Title>
          <Card.Text 
            className="fs-5 text-warning"
            style={{ textShadow: '0px 0px 10px #ffaa00' }}
          >
            <i className="bi bi-envelope"></i> {userProfile.email}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* High Score Sections */}
      <Row className="w-100 d-flex justify-content-center" style={{ gap: '50px' }}>
        {/* Easy Mode Score */}
        <Col md={5} className="mb-4">
          <Card
            className="bg-dark text-white border border-light"
            style={{
              padding: '25px',
              boxShadow: '0px 0px 30px #00ff00',
              transform: 'scale(1.1)',
            }}
          >
            <Card.Body>
              <Card.Title className="fs-2 fw-bold" style={{ color: '#00ff00', textShadow: '0px 0px 15px #00ff00' }}>
                <i className="bi bi-star-fill"></i> Highest Score (Easy)
              </Card.Title>
              <Card.Text className="fs-1 fw-bold" style={{ color: '#00ff00', textShadow: '0px 0px 15px #00ff00' }}>
                {userProfile.highestScoreEasy}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Hard Mode Score */}
        <Col md={5} className="mb-4">
          <Card
            className="bg-dark text-white border border-light"
            style={{
              padding: '25px',
              boxShadow: '0px 0px 30px #ff0000',
              transform: 'scale(1.1)',
            }}
          >
            <Card.Body>
              <Card.Title className="fs-2 fw-bold" style={{ color: '#ff0000', textShadow: '0px 0px 15px #ff0000' }}>
                <i className="bi bi-lightning-fill"></i> Highest Score (Hard)
              </Card.Title>
              <Card.Text className="fs-1 fw-bold" style={{ color: '#ff0000', textShadow: '0px 0px 15px #ff0000' }}>
                {userProfile.highestScoreHard}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
