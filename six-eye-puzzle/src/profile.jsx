import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useSession } from './sessionContext';
import { fetchProfile } from './firebase'; 
import './profile.css'; // New CSS file for custom styles

const Profile = () => {
  const { user } = useSession();
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
    return (
      <Container fluid className="profile-container loading">
        <div className="text-center">
          <h1 className="loading-text">Loading Profile...</h1>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <h1 className="profile-title">
          <i className="bi bi-joystick me-2"></i>
          PLAYER PROFILE
        </h1>
        <div className="profile-divider"></div>
      </div>

      {/* Profile Card */}
      <Card className="profile-card">
        <Card.Body className="profile-card-body">
          <Card.Title className="profile-username">
            <i className="bi bi-person-circle me-2"></i>
            {userProfile.username}
          </Card.Title>
          
          <div className="profile-email">
            <div className="email-label">EMAIL</div>
            <div className="email-value">{userProfile.email}</div>
          </div>
        </Card.Body>
      </Card>

      {/* Game Stats */}
      <Container className="stats-container">
        <Row className="stats-row">
          {/* Time Attack */}
          <Col md={5}>
            <Card className="stat-card timeattack">
              <Card.Body className="stat-card-body">
                <div className="stat-title">
                  <i className="bi bi-clock-fill me-2"></i>
                  TIME ATTACK HIGHEST SCORE
                </div>
                <div className="stat-value">
                  {userProfile.highestScoreTimeAttack}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Survival */}
          <Col md={5}>
            <Card className="stat-card survival">
              <Card.Body className="stat-card-body">
                <div className="stat-title">
                  <i className="bi bi-heart-pulse-fill me-2"></i>
                  SURVIVAL HIGHEST SCORE
                </div>
                <div className="stat-value">
                  {userProfile.highestScoreSurvival}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Memory */}
          <Col md={5}>
            <Card className="stat-card memory">
              <Card.Body className="stat-card-body">
                <div className="stat-title">
                  <i className="bi bi-brain-fill me-2"></i>
                  MEMORY HIGHEST SCORE
                </div>
                <div className="stat-value">
                  {userProfile.highestScoreMemory}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Scramble */}
          <Col md={5}>
            <Card className="stat-card scramble">
              <Card.Body className="stat-card-body">
                <div className="stat-title">
                  <i className="bi bi-shuffle me-2"></i>
                  SCRAMBLE HIGHEST SCORE
                </div>
                <div className="stat-value">
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