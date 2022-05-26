import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/Header/Header";
import PhotoModal from "../../components/PhotoModal/PhotoModal";
import Footer from "../../components/Footer/Footer";
import { Grid, Header, Message } from "semantic-ui-react";

// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function LandingPage({ user, handleLogout }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Container className="shadow-5-strong">
      <Row>
        <Col>
          <PageHeader user={user} handleLogout={handleLogout} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="bg-dark text-white shadow-5-strong">
            <Card.Img
              src="https://i.imgur.com/tywnHZX.jpg"
              alt="collage of students"
              style={{ opacity: 0.2, maxHeight: 800, objectFit: "cover" }}
            />
            <Card.ImgOverlay
              onClick={() => setModalShow(true)}
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

      <PhotoModal
        show={modalShow}
        photo="https://i.imgur.com/tywnHZX.jpg"
        onHide={() => setModalShow(false)}
      />

      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}
