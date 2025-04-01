import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const Profile = () => {
  const userProfile = {
    username: 'Gamer123',
    userId: 'UID56789',
    email: 'gamer123@example.com',
    highestScoreTimeAttack: 1800,
    highestScoreSurvival: 1700,
    highestScoreMemory: 1600,
    highestScoreScramble: 1500,
  };

  return (
    <Container fluid className="bg-dark text-white d-flex flex-column min-vh-100 py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="text-info fw-bold mb-3">
          <i className="bi bi-joystick me-2"></i>
          PLAYER PROFILE
        </h1>
        <div className="bg-info mx-auto opacity-50" style={{ height: '2px', width: '100px' }}></div>
      </div>

      {/* Profile Card */}
      <Card className="border-info border-opacity-25 bg-dark bg-opacity-50 mx-auto mb-5" style={{ maxWidth: '500px' }}>
        <Card.Body className="p-4">
          <Card.Title className="text-info fw-bold fs-2 mb-4 text-center">
            <i className="bi bi-person-circle me-2"></i>
            {userProfile.username}
          </Card.Title>
          
          <div className="mb-3">
            <div className="text-secondary">USER ID</div>
            <div className="text-white fs-5">{userProfile.userId}</div>
          </div>
          
          <div>
            <div className="text-secondary">EMAIL</div>
            <div className="text-light fs-5">{userProfile.email}</div>
          </div>
        </Card.Body>
      </Card>

      {/* Game Stats */}
      <Container className="mb-5">
        <Row className="g-4 justify-content-center">
          {/* Time Attack */}
          <Col md={5}>
            <Card className="h-100 border-primary border-opacity-50 bg-dark bg-opacity-50 shadow-lg shadow-primary">
              <Card.Body className="text-center py-4">
                <div className="text-primary fw-bold fs-5 mb-3">
                  <i className="bi bi-clock-fill me-2"></i>
                  TIME ATTACK HIGHEST SCORE
                </div>
                <div className="text-white fw-bold display-5">
                  {userProfile.highestScoreTimeAttack}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Survival */}
          <Col md={5}>
            <Card className="h-100 border-danger border-opacity-50 bg-dark bg-opacity-50 shadow-lg shadow-danger">
              <Card.Body className="text-center py-4">
                <div className="text-danger fw-bold fs-5 mb-3">
                  <i className="bi bi-heart-pulse-fill me-2"></i>
                  SURVIVAL HIGHEST SCORE
                </div>
                <div className="text-white fw-bold display-5">
                  {userProfile.highestScoreSurvival}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Memory */}
          <Col md={5}>
            <Card className="h-100 border-success border-opacity-50 bg-dark bg-opacity-50 shadow-lg shadow-success">
              <Card.Body className="text-center py-4">
                <div className="text-success fw-bold fs-5 mb-3">
                  <i className="bi bi-brain-fill me-2"></i>
                  MEMORY HIGHEST SCORE
                </div>
                <div className="text-white fw-bold display-5">
                  {userProfile.highestScoreMemory}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Scramble */}
          <Col md={5}>
            <Card className="h-100 border-warning border-opacity-50 bg-dark bg-opacity-50 shadow-lg shadow-warning">
              <Card.Body className="text-center py-4">
                <div className="text-warning fw-bold fs-5 mb-3">
                  <i className="bi bi-shuffle me-2"></i>
                  SCRAMBLE HIGHEST SCORE
                </div>
                <div className="text-white fw-bold display-5">
                  {userProfile.highestScoreScramble}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Profile;