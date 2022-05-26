import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/Header/Header";
import { Grid, Header, Message } from "semantic-ui-react";

// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function LandingPage({ user, handleLogout }) {
  return (
    <Container>
      <Row>
        <Col>
          <PageHeader user={user} handleLogout={handleLogout} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="bg-dark text-white">
            <Card.Img
              src="https://i.imgur.com/tywnHZX.jpg"
              alt="collage of students"
              style={{ opacity: 0.2, maxHeight: 800, objectFit: "cover" }}
            />
            <Card.ImgOverlay
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card.Title>
                <h1>Hebron Youth Group</h1>
              </Card.Title>
              <Card.Text>
                <Link to="/events">
                  <Button variant="outline-light">Get Started</Button>
                </Link>
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
