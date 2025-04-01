import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useSession } from './sessionContext';
import { fetchProfile } from './firebase'; 

const Profile = () => {
  const { user } = useSession(); // Accessing the user from session context
  const [userProfile, setUserProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log('user', user);
    if (user) {
      setUserProfile({
        username: user.name || 'Unknown Player',
        email: user.email || 'Email not detected, Log In Again',
        highestScoreTimeAttack: user.timeattack || 0,
        highestScoreSurvival: user.survival || 0,
        highestScoreMemory: user.memory || 0,
        highestScoreScramble: user.scramble || 0,
      });
    }
  }, [user]);

  if (!userProfile) {
    // Render a loading state or a fallback message while userProfile is null
    return (
      <Container fluid className="bg-dark text-white d-flex flex-column min-vh-100 py-5">
        <div className="text-center">
          <h1 className="text-info">Loading Profile...</h1>
        </div>
      </Container>
    );
  }

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